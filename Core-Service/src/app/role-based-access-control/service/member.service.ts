import type { Knex } from "knex";
import { db } from "../../../lib/knex/knex";
import { toMs } from "../../../pkg/utils/time";
import { createPasswordReset } from "../../auth/repository/password-reset.repo";
import { generateOTP, hashOTP } from "../../auth/utils";
import { SystemRole } from "../../user/enums";
import { userService } from "../../user/service/user.service";
import { CreateMemberDTO } from "../dto/member.dto";
import type { UpdateMemberBranchesDTO, UpdateMemberDTO } from "../dto/member.dto";
import { MemberBranch } from "../entity/member-branch.entity";
import { MemberStatus } from "../enums";
import {
    CannotCreateOwnerUserError,
    RoleNotFoundError,
    MemberNotFoundError,
    CannotDeleteOwnerError,
    NotAuthorizedErrorToManageBranches
} from "../errors";
import {
    setMemberBranches,
    countBranchesByIdsAndRestaurant
} from "../repository/member-branch.repo";
import {
    createRestaurantMember,
    findMembersByRestaurantId,
    findMemberWithRoleName,
    updateMember,
    deleteMember
} from "../repository/restaurant_member.repo";
import { findRoleByName } from "../repository/role.repo";
import { getPermissionsDetailsByRoleName } from "../repository/permission.repo";
import { BranchesNotBelongToRestaurantError } from "../../branch/error";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../../lib/di/tokens";


@injectable()
export class MemberService {
    // 1. Inject the userService into the constructor for proper layering
    constructor(@inject(TOKENS.UserService) private readonly userServiceImpl = userService) { }

    // =========================================================
    // CREATION METHODS
    // =========================================================

    // Called by AuthService during restaurant registration
    async createOwnerMember(restaurantId: number, userId: number, trx?: Knex.Transaction) {
        const roleId = await findRoleByName('owner', trx);
        if (!roleId) {
            throw RoleNotFoundError;
        }

        return createRestaurantMember({
            restaurantId,
            userId,
            roleId,
            status: MemberStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, trx);
    }

    // Called by Restaurant Owners/Admins to invite staff
    async createMember(restaurantId: number, data: CreateMemberDTO) {
        if (data.role == 'owner') {
            throw CannotCreateOwnerUserError;
        }

        const roleId = await findRoleByName(data.role);
        if (!roleId) {
            throw RoleNotFoundError;
        }

        // Validate branch ownership before starting the transaction (Avoid N+1)
        if (data.branchIds && data.branchIds.length > 0) {
            const count = await countBranchesByIdsAndRestaurant(data.branchIds, restaurantId);
            if (count !== data.branchIds.length) {
                throw BranchesNotBelongToRestaurantError;
            }
        }

        const trx = await db.transaction();
        try {
            const now = new Date();

            // Refactored: Call user service instead of repo directly
            const user = await this.userServiceImpl.create({
                email: data.email,
                name: data.name,
                phone: data.phoneNumber,
                password: '', // Blank password for invited members
                systemRole: SystemRole.RESTAURANT_USER,
            }, trx);

            const member = await createRestaurantMember({
                restaurantId,
                userId: user.id,
                roleId,
                createdAt: now,
                updatedAt: now,
                status: MemberStatus.INACTIVE
            }, trx);

            // Assign branches
            if (data.branchIds && data.branchIds.length > 0) {
                const rows = data.branchIds.map(branchId => new MemberBranch({
                    branchId: branchId,
                    memberId: member.id,
                    createdAt: now,
                }));
                await setMemberBranches(member.id, rows, trx);
            }

            // Generate OTP, create password reset record and send email
            const otp = generateOTP();
            const hashedOtp = hashOTP(otp);
            await createPasswordReset({
                userId: user.id,
                otpHash: hashedOtp,
                expiresAt: new Date(Date.now() + toMs(1, 'h')),
                createdAt: new Date(),
            }, trx);

            // TODO: integrate email provider
            console.log(`mocked email sent ${otp}`);

            await trx.commit();
            return { message: "Member created successfully", member };
        } catch (err) {
            await trx.rollback();
            throw err;
        }
    }

    // =========================================================
    // MANAGEMENT METHODS
    // =========================================================

    async listMembers(restaurantId: number) {
        const members = await findMembersByRestaurantId(restaurantId);
        return { data: members };
    }

    async updateMember(restaurantId: number, memberId: number, data: UpdateMemberDTO) {
        // Use JOIN query to avoid N+1
        const result = await findMemberWithRoleName(memberId);
        if (!result) throw MemberNotFoundError;

        // Ensure the member belongs to the calling user's restaurant
        if (Number(result.member.restaurantId) !== Number(restaurantId)) {
            throw MemberNotFoundError;
        }

        let roleId;
        if (data.role) {
            roleId = await findRoleByName(data.role);
            if (!roleId) throw RoleNotFoundError;

            // Protect against promoting someone to owner via update
            if (data.role === 'owner') throw CannotCreateOwnerUserError;
        }

        const updatePayload: { roleId?: number; status?: string } = {};

        if (roleId) {
            updatePayload.roleId = roleId;
        }

        if (data.status) {
            updatePayload.status = data.status;
        }

        await updateMember(memberId, updatePayload);
        return { message: "Member updated successfully" };
    }

    async deleteMember(restaurantId: number, memberId: number) {
        const result = await findMemberWithRoleName(memberId);
        if (!result) throw MemberNotFoundError;

        if (Number(result.member.restaurantId) !== Number(restaurantId)) {
            throw MemberNotFoundError;
        }

        // Check if roleName === 'owner' (One query fetched both!)
        if (result.roleName === 'owner') {
            throw CannotDeleteOwnerError;
        }

        await deleteMember(memberId);
        return { message: "Member deleted successfully" };
    }

    async updateMemberBranches(restaurantId: number, memberId: number, data: UpdateMemberBranchesDTO) {
        const result = await findMemberWithRoleName(memberId);
        if (!result) throw MemberNotFoundError;

        if (Number(result.member.restaurantId) !== Number(restaurantId)) {
            throw MemberNotFoundError;
        }

        // Owners implicitly have access to all branches, so setting branches for them doesn't make sense
        if (result.roleName === 'owner') {
            throw NotAuthorizedErrorToManageBranches;
        }

        // Validate branch ownership using COUNT
        if (data.branchIds && data.branchIds.length > 0) {
            const count = await countBranchesByIdsAndRestaurant(data.branchIds, restaurantId);
            if (count !== data.branchIds.length) {
                throw BranchesNotBelongToRestaurantError;
            }
        }

        const now = new Date();
        const rows = data.branchIds.map(branchId => new MemberBranch({
            branchId: branchId,
            memberId: memberId,
            createdAt: now,
        }));

        await setMemberBranches(memberId, rows);

        return { message: "Branches updated successfully" };
    }

    // =========================================================
    // PERMISSION METHODS
    // =========================================================

    async getRolePermissions(roleName: string) {
        const permissions = await getPermissionsDetailsByRoleName(roleName);
        return {
            role: roleName,
            permissions: permissions.map(p => p.permission) // Returns array of 'resource:action' strings
        };
    }
}


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { db } from "../../../lib/knex/knex";
import {} from "../../restaurant/service/restaurant.service";
import { findBranchIdsByMemberId } from "../../role-based-access-control/repository/member-branch.repo";
import { activateMemberByUserId, findRestaurantMemberWithRole } from "../../role-based-access-control/repository/restaurant_member.repo";
import { MemberService } from "../../role-based-access-control/service/member.service";
import { SystemRole } from "../../user/enums";
import { findUserByEmail, updateUserPassword } from "../../user/repository/users.repo";
import { UserService } from "../../user/service/user.service";
import { CannotSignupAsSystemAdmin, InvalidRole, IncorrectCredentials, InvalidOTPError, InvalidRefreshTokenError, RestaurantDataRequiredError } from "../errors";
import { createPasswordReset, findLatestPasswordResetByUserId, updatePasswordResetConsumedAt } from "../repository/password-reset.repo";
import { comparePassword, createAccessToken, createRefreshToken, generateOTP, hashOTP, hashPassword, verifyRefreshToken } from "../utils";
import { TOKENS } from "../../../lib/di/tokens";
import { injectable, inject } from "tsyringe";
import { passwordResetEmail } from "../templates/password-reset";
let AuthService = class AuthService {
    restaurantService;
    userService;
    memberService;
    emailProvider;
    constructor(restaurantService, userService, memberService, emailProvider) {
        this.restaurantService = restaurantService;
        this.userService = userService;
        this.memberService = memberService;
        this.emailProvider = emailProvider;
    }
    register = async (data) => {
        if (data.role == SystemRole.SYSTEM_ADMIN) {
            throw CannotSignupAsSystemAdmin;
        }
        if (!Object.values(SystemRole).includes(data.role)) {
            throw InvalidRole;
        }
        const trx = await db.transaction();
        let user;
        let restaurant;
        // Define outside the try block so it's accessible when building the JWT payload
        let restaurantMemberInfo = null;
        try {
            // 1. Centralize user creation
            // (Duplicate checks, password hashing, and DB insertion are now handled in UserService)
            user = await this.userService.create({
                email: data.email,
                phone: data.phone,
                name: data.name,
                password: data.password,
                systemRole: data.role,
            }, trx);
            // 2. Handle restaurant specific creation logic
            if (data.role == SystemRole.RESTAURANT_USER) {
                if (data.restaurant == undefined) {
                    throw RestaurantDataRequiredError;
                }
                // Create the restaurant
                restaurant = await this.restaurantService.create(user.id, data.restaurant, trx);
                // Create the missing owner member record (Homework Fix)
                await this.memberService.createOwnerMember(restaurant.id, user.id, trx);
                // Build the extra JWT payload info
                restaurantMemberInfo = {
                    restaurantId: restaurant.id,
                    restaurantRole: 'owner',
                    branchIds: []
                };
            }
            await trx.commit();
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
        // 3. Create access token & refresh token, spreading in the restaurant info if it exists
        const payload = {
            userId: user.id,
            role: data.role,
            email: user.email,
            ...(restaurantMemberInfo && restaurantMemberInfo)
        };
        const accessToken = createAccessToken(payload);
        const refreshToken = createRefreshToken(payload);
        // 4. Return tokens and user data
        return {
            message: "successfully registered user",
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                phone: user.phone,
                systemRole: user.systemRole,
            },
            restaurant
        };
    };
    login = async (data) => {
        // find the user by email input
        const user = await findUserByEmail(data.email);
        if (!user) {
            throw IncorrectCredentials;
        }
        // compare passwords
        const match = await comparePassword(data.password, user.passwordHash);
        // if passwords doesnt match throw err
        if (!match) {
            throw IncorrectCredentials;
        }
        let restaurantMemberInfo = null;
        if (user.systemRole == SystemRole.RESTAURANT_USER) {
            const memberData = await findRestaurantMemberWithRole(user.id);
            const branchIds = await findBranchIdsByMemberId(memberData.member.id);
            if (memberData) {
                restaurantMemberInfo = {
                    restaurantId: memberData.member.restaurantId,
                    restaurantRole: memberData.roleName,
                    branchIds
                };
            }
        }
        // generate tokens
        const payload = { userId: user.id, role: user.systemRole, email: user.email, ...restaurantMemberInfo };
        const accessToken = createAccessToken(payload);
        const refreshToken = createRefreshToken(payload);
        // return the data
        return {
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                phone: user.phone,
                systemRole: user.systemRole,
                createdAt: user.createdAt,
            }
        };
    };
    forgetPassword = async (data) => {
        // check if user exists
        const user = await findUserByEmail(data.email);
        if (!user) {
            return;
        }
        // generate an otp
        const otp = generateOTP();
        // hash the otp
        const hashedOtp = hashOTP(otp);
        // insert the otp
        await createPasswordReset({
            userId: user.id,
            otpHash: hashedOtp,
            expiresAt: new Date(Date.now() + (10 * 60 * 1000)),
            createdAt: new Date(),
        });
        // send email
        const email = passwordResetEmail(otp);
        await this.emailProvider.send(data.email, email.subject, email.html);
    };
    resetPassword = async (data) => {
        // find user
        const user = await findUserByEmail(data.email);
        if (!user) {
            throw InvalidOTPError;
        }
        // find reset password
        const reset = await findLatestPasswordResetByUserId(user.id);
        if (!reset) {
            throw InvalidOTPError;
        }
        // verify otp and expiry date
        const inputOTPHash = hashOTP(data.otp);
        if (inputOTPHash != reset.otpHash || reset.isExpired()) {
            throw InvalidOTPError;
        }
        // update user password
        const hashedPassword = await hashPassword(data.newPassword);
        await updateUserPassword(user.id, hashedPassword);
        // update reset password
        await updatePasswordResetConsumedAt(reset.id);
        return user;
    };
    refresh = async (refreshToken) => {
        try {
            const payload = verifyRefreshToken(refreshToken);
            const accessToken = createAccessToken({
                userId: payload.userId,
                email: payload.email,
                role: payload.role,
            });
            return {
                accessToken,
            };
        }
        catch (err) {
            throw InvalidRefreshTokenError;
        }
    };
    acceptInvite = async (data) => {
        const user = await this.resetPassword(data);
        // activate member
        await activateMemberByUserId(user.id);
    };
};
AuthService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.RestaurantService)),
    __param(1, inject(TOKENS.UserService)),
    __param(2, inject(TOKENS.MemberService)),
    __param(3, inject(TOKENS.EmailProvider)),
    __metadata("design:paramtypes", [Function, UserService,
        MemberService, Function])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map
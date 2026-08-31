import type { Knex } from "knex";
import type { UserService } from "../../user/service/user.service";
import { CreateMemberDTO } from "../dto/member.dto";
import type { UpdateMemberBranchesDTO, UpdateMemberDTO } from "../dto/member.dto";
import type { MailjetEmailProvider } from "../../../pkg/email/mailjet";
export declare class MemberService {
    private readonly userServiceImpl;
    private readonly emailProvider;
    constructor(userServiceImpl: UserService, emailProvider: MailjetEmailProvider);
    createOwnerMember(restaurantId: number, userId: number, trx?: Knex.Transaction): Promise<import("../entity/restaurant-member.entity").RestaurantMember>;
    createMember(restaurantId: number, data: CreateMemberDTO): Promise<{
        message: string;
        member: import("../entity/restaurant-member.entity").RestaurantMember;
    }>;
    listMembers(restaurantId: number): Promise<{
        data: any[];
    }>;
    updateMember(restaurantId: number, memberId: number, data: UpdateMemberDTO): Promise<{
        message: string;
    }>;
    deleteMember(restaurantId: number, memberId: number): Promise<{
        message: string;
    }>;
    updateMemberBranches(restaurantId: number, memberId: number, data: UpdateMemberBranchesDTO): Promise<{
        message: string;
    }>;
    getRolePermissions(roleName: string): Promise<{
        role: string;
        permissions: any[];
    }>;
    getPermissionsByRole(roleName: string): Promise<{
        role: string;
        permissions: string[];
    }>;
}
//# sourceMappingURL=member.service.d.ts.map
import type { Knex } from "knex";
import { RestaurantMember } from "../entity/restaurant-member.entity";
export declare function createRestaurantMember(data: Partial<RestaurantMember>, conn?: Knex): Promise<RestaurantMember>;
export declare function activateMemberByUserId(userId: number, conn?: Knex): Promise<void>;
export declare function findRestaurantMemberWithRole(userId: number): Promise<{
    member: RestaurantMember;
    roleName: string;
}>;
export declare function findMembersByRestaurantId(restaurantId: number): Promise<any[]>;
export declare function findMemberWithRoleName(memberId: number): Promise<{
    member: RestaurantMember;
    roleName: any;
} | null>;
export declare function updateMember(memberId: number, data: {
    roleId?: number;
    status?: string;
}): Promise<void>;
export declare function deleteMember(memberId: number): Promise<void>;
//# sourceMappingURL=restaurant_member.repo.d.ts.map
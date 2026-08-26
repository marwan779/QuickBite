import { MemberStatus } from "../enums";
export declare class RestaurantMember {
    id: number;
    restaurantId: number;
    userId: number;
    roleId: number;
    status: MemberStatus;
    createdAt: Date;
    updatedAt: Date;
    constructor(data: Partial<RestaurantMember>);
}
//# sourceMappingURL=restaurant-member.entity.d.ts.map
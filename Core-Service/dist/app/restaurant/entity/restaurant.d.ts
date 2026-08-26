import type { RestaurantStatus } from "../enums";
export declare class RestaurantEntity {
    id: number;
    ownerId: number;
    name: string;
    logoURL: string;
    status: RestaurantStatus;
    primaryCountry: string;
    createdAt: Date;
    updatedAt: Date;
    statusUpdatedAt: Date;
    constructor(data: Partial<RestaurantEntity>);
}
//# sourceMappingURL=restaurant.d.ts.map
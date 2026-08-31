import { RestaurantStatus } from "../enums";
export declare class CreateRestaurantOwnerDTO {
    email: string;
    phone: string;
    name: string;
    password: string;
}
export declare class CreateRestaurantDTO {
    owner: CreateRestaurantOwnerDTO;
    name: string;
    logoUrl?: string;
    primaryCountry: string;
}
export declare class UpdateRestaurantDTO {
    name?: string;
    logoUrl?: string;
    primaryCountry?: string;
}
export declare class UpdateRestaurantStatusDTO {
    status: RestaurantStatus;
}
//# sourceMappingURL=restaurant.dto.d.ts.map
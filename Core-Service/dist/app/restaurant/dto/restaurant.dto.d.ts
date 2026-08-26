import { RestaurantStatus } from "../enums";
export declare class CreateRestaurantDTO {
    name: string;
    logoURL?: string;
    primaryCountry: string;
}
export declare class UpdateRestaurantDTO {
    name?: string;
    logoURL?: string;
    primaryCountry?: string;
}
export declare class UpdateRestaurantStatusDTO {
    status: RestaurantStatus;
}
//# sourceMappingURL=restaurant.dto.d.ts.map
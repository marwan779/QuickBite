import { Currency } from "../enums";
export declare class CreateBranchDTO {
    countryCode: string;
    label: string;
    addressText: string;
    lat: number;
    lng: number;
    opensAt: string;
    closesAt: string;
    deliveryRadius: number;
    currency: Currency;
}
export declare class UpdateBranchDTO {
    countryCode?: string;
    label?: string;
    addressText?: string;
    lat?: number;
    lng?: number;
    opensAt?: string;
    closesAt?: string;
    deliveryRadius?: number;
    currency?: Currency;
    isActive?: boolean;
    acceptOrders?: boolean;
}
export declare class UpdateBranchStatusDTO {
    isActive: boolean;
}
//# sourceMappingURL=branch.dto.d.ts.map
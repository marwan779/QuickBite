import type { Currency } from "../enums";
export declare class Branch {
    id: number;
    restaurantId: number;
    countryCode: string;
    addressText: string;
    label: string;
    lat: number;
    lng: number;
    isActive: boolean;
    opensAt: string;
    closesAt: string;
    acceptOrders: boolean;
    createdAt: Date;
    updatedAt: Date;
    deliveryRadius: number;
    currency: Currency;
    commission: number;
    location?: String;
    constructor(data: Partial<Branch>);
}
//# sourceMappingURL=branch.entity.d.ts.map
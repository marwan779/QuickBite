export declare enum AddressType {
    OFFICE = "office",
    HOME = "home",
    PUBLIC_PLACE = "public_place"
}
export declare class CreateCustomerAddressDTO {
    label: string;
    country: string;
    city: string;
    street: string;
    building?: string;
    apartmentNumber?: string;
    type: AddressType;
    lat: number;
    lng: number;
    isDefault: boolean;
}
export declare class UpdateCustomerAddressDTO {
    label?: string;
    country?: string;
    city?: string;
    street?: string;
    building?: string;
    apartmentNumber?: string;
    type?: AddressType;
    lat?: number;
    lng?: number;
    isDefault?: boolean;
}
//# sourceMappingURL=address.dto.d.ts.map
import type { CreateCustomerAddressDTO, UpdateCustomerAddressDTO } from "../dto/address.dto";
export declare class CustomerAddressService {
    getAddresses: (userId: number) => Promise<any[]>;
    getById: (id: number) => Promise<{
        id: any;
        userId: any;
        label: any;
        country: any;
        city: any;
        street: any;
        building: any;
        apartmentNumber: any;
        lat: any;
        lng: any;
    }>;
    addAddress: (userId: number, data: CreateCustomerAddressDTO) => Promise<any>;
    updateAddress: (userId: number, addressId: number, data: UpdateCustomerAddressDTO) => Promise<any>;
    deleteAddress: (userId: number, addressId: number) => Promise<void>;
}
//# sourceMappingURL=customer-address.service.d.ts.map
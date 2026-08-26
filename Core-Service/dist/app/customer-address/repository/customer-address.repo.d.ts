import type { CreateCustomerAddressDTO, UpdateCustomerAddressDTO } from "../dto/address.dto";
export declare const findAddressesByUserId: (userId: number) => Promise<any[]>;
export declare const createAddress: (userId: number, data: CreateCustomerAddressDTO) => Promise<any>;
export declare const findAddressById: (addressId: number, userId: number) => Promise<any>;
export declare const updateAddress: (addressId: number, userId: number, data: UpdateCustomerAddressDTO) => Promise<any>;
export declare const deleteAddress: (addressId: number, userId: number) => Promise<number>;
//# sourceMappingURL=customer-address.repo.d.ts.map
import type { CreateCustomerAddressDTO, UpdateCustomerAddressDTO } from "../dto/address.dto";
import { AddressNotFoundError } from "../error";
import { createAddress, deleteAddress, findAddressById, findAddressesByUserId, updateAddress } from "../repository/customer-address.repo";

export class CustomerAddressService {

    getAddresses = async (userId: number) => {
        const addresses = await findAddressesByUserId(userId);

        return addresses;
    };


    addAddress = async (
        userId: number,
        data: CreateCustomerAddressDTO
    ) => {
        const address = await createAddress(userId, data);

        return address;
    };


    updateAddress = async (
        userId: number,
        addressId: number,
        data: UpdateCustomerAddressDTO
    ) => {

        const existingAddress = await findAddressById(
            addressId,
            userId
        );

        if (!existingAddress) {
            throw AddressNotFoundError;
        }

        const address = await updateAddress(
            addressId,
            userId,
            data
        );

        return address;
    };


    deleteAddress = async (
        userId: number,
        addressId: number
    ) => {

        const existingAddress = await findAddressById(
            addressId,
            userId
        );

        if (!existingAddress) {
            throw AddressNotFoundError;
        }

        await deleteAddress(addressId, userId);
    };
}


export const customerAddressService =
    new CustomerAddressService();
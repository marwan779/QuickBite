import type { CreateCustomerAddressDTO, UpdateCustomerAddressDTO } from "../dto/address.dto";
import { AddressNotFoundError } from "../error";
import { createAddress, deleteAddress, findAddressById, findAddressesByUserId, updateAddress } from "../repository/customer-address.repo";
import { injectable} from "tsyringe";

@injectable()
export class CustomerAddressService {

    getAddresses = async (userId: number) => {
        const addresses = await findAddressesByUserId(userId);

        return addresses;
    };

    getById = async (id: number) => {
        const address = await findAddressById(id);
        if (!address) throw AddressNotFoundError;
        return {
            id: address.id,
            userId: address.user_id,
            label: address.label,
            country: address.country,
            city: address.city,
            street: address.street,
            building: address.building,
            apartmentNumber: address.apartment_number,
            lat: address.lat,
            lng: address.lng,
        };
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



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AddressNotFoundError } from "../error";
import { createAddress, deleteAddress, findAddressById, findAddressesByUserId, updateAddress } from "../repository/customer-address.repo";
import { injectable } from "tsyringe";
let CustomerAddressService = class CustomerAddressService {
    getAddresses = async (userId) => {
        const addresses = await findAddressesByUserId(userId);
        return addresses;
    };
    getById = async (id) => {
        const address = await findAddressById(id);
        if (!address)
            throw AddressNotFoundError;
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
    addAddress = async (userId, data) => {
        const address = await createAddress(userId, data);
        return address;
    };
    updateAddress = async (userId, addressId, data) => {
        const existingAddress = await findAddressById(addressId, userId);
        if (!existingAddress) {
            throw AddressNotFoundError;
        }
        const address = await updateAddress(addressId, userId, data);
        return address;
    };
    deleteAddress = async (userId, addressId) => {
        const existingAddress = await findAddressById(addressId, userId);
        if (!existingAddress) {
            throw AddressNotFoundError;
        }
        await deleteAddress(addressId, userId);
    };
};
CustomerAddressService = __decorate([
    injectable()
], CustomerAddressService);
export { CustomerAddressService };
//# sourceMappingURL=customer-address.service.js.map
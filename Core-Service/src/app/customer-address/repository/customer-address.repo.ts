import { db } from "../../../lib/knex/knex";
import type { CreateCustomerAddressDTO, UpdateCustomerAddressDTO } from "../dto/address.dto";


export const findAddressesByUserId = async (userId: number) => {
    return db("customer_addresses")
        .where("user_id", userId)
        .select(
            "id",
            "label",
            "country",
            "city",
            "street",
            "building",
            "apartment_number as apartmentNumber",
            "type",
            "lat",
            "lng",
            "is_default as isDefault"
        );
};


export const createAddress = async (
    userId: number,
    data: CreateCustomerAddressDTO
) => {
    const [address] = await db("customer_addresses")
        .insert({
            user_id: userId,
            label: data.label,
            country: data.country,
            city: data.city,
            street: data.street,
            building: data.building,
            apartment_number: data.apartmentNumber,
            type: data.type,
            lat: data.lat,
            lng: data.lng,
            is_default: data.isDefault,
        })
        .returning([
            "id",
            "label",
            "country",
            "city",
            "street",
            "building",
            "apartment_number",
            "type",
            "lat",
            "lng",
            "is_default",
        ]);

    return address;
};

export const findAddressById = async (
    addressId: number,
    userId: number
) => {
    return db("customer_addresses")
        .where({
            id: addressId,
            user_id: userId,
        })
        .first();
};


export const updateAddress = async (
    addressId: number,
    userId: number,
    data: UpdateCustomerAddressDTO
) => {
    const updateData = {
        ...(data.label !== undefined && { label: data.label }),
        ...(data.country !== undefined && { country: data.country }),
        ...(data.city !== undefined && { city: data.city }),
        ...(data.street !== undefined && { street: data.street }),
        ...(data.building !== undefined && {
            building: data.building,
        }),
        ...(data.apartmentNumber !== undefined && {
            apartment_number: data.apartmentNumber,
        }),
        ...(data.type !== undefined && { type: data.type }),
        ...(data.lat !== undefined && { lat: data.lat }),
        ...(data.lng !== undefined && { lng: data.lng }),
        ...(data.isDefault !== undefined && {
            is_default: data.isDefault,
        }),
    };

    const [address] = await db("customer_addresses")
        .where({
            id: addressId,
            user_id: userId,
        })
        .update(updateData)
        .returning([
            "id",
            "label",
            "country",
            "city",
            "street",
            "building",
            "apartment_number",
            "type",
            "lat",
            "lng",
            "is_default",
        ]);

    return address;
};


export const deleteAddress = async (
    addressId: number,
    userId: number
) => {
    return db("customer_addresses")
        .where({
            id: addressId,
            user_id: userId,
        })
        .delete();
};
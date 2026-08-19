import type { Knex } from "knex";
import { RegisterRestaurantDTO } from "../../auth/dto/auth.dto";
import { RestaurantStatus } from "../enums";
import { createRestaurant, findAllRestaurants, findRestaurantById, updateRestaurant, updateRestaurantStatus } from "../repository/restaurant.repo";
import { RestaurantEntity } from "../entity/restaurant";
import { AppError } from "../../../lib/error/AppError";
import { NotFoundError } from "../../../lib/auth/error";

export class RestaurantService {

    create = async (
        userId: number,
        data: RegisterRestaurantDTO,
        trx?: Knex
    ) => {
        const now = new Date();

        const restaurant = new RestaurantEntity({
            ownerId: userId,
            name: data.name,
            logoURL: data.logoURL ?? "",
            primaryCountry: data.primaryCountry,
            status: RestaurantStatus.PENDING,
            createdAt: now,
            updatedAt: now,
            statusUpdatedAt: now
        });

        const result = await createRestaurant(restaurant, trx);
        return result;
    };

    findAll = async () => {
        const result = await findAllRestaurants();
        return result;
    };

    findById = async (id: number) => {
        const restaurant = await findRestaurantById(id);
        if (!restaurant) {
            throw NotFoundError;
        }
        return restaurant;
    };

    update = async (id: number, data: Partial<RestaurantEntity>) => {
        const restaurant = await findRestaurantById(id);
        if (!restaurant) {
            throw NotFoundError;
        }
        const updated = await updateRestaurant(id, data);
        return updated;
    };

    updateStatus = async (id: number, status: RestaurantStatus) => {
        const restaurant = await findRestaurantById(id);
        if (!restaurant) {
            throw NotFoundError;
        }
        const updated = await updateRestaurantStatus(id, status);
        return updated;
    };
}

export const restaurantService = new RestaurantService();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RegisterRestaurantDTO } from "../../auth/dto/auth.dto";
import { RestaurantStatus } from "../enums";
import { createRestaurant, findAllRestaurants, findRestaurantById, updateRestaurant, updateRestaurantStatus } from "../repository/restaurant.repo";
import { RestaurantEntity } from "../entity/restaurant";
import { NotFoundError } from "../../../lib/auth/error";
import { injectable } from "tsyringe";
import { buildPaginationResult } from "../../../lib/http/pagination/cursor-pagination";
let RestaurantService = class RestaurantService {
    create = async (userId, data, trx) => {
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
    findAll = async (params, filters) => {
        const result = await findAllRestaurants(params, filters);
        return buildPaginationResult(result, params.limit, params.sortBy);
    };
    findById = async (id) => {
        const restaurant = await findRestaurantById(id);
        if (!restaurant) {
            throw NotFoundError;
        }
        return restaurant;
    };
    update = async (id, data) => {
        const restaurant = await findRestaurantById(id);
        if (!restaurant) {
            throw NotFoundError;
        }
        const updated = await updateRestaurant(id, data);
        return updated;
    };
    updateStatus = async (id, status) => {
        const restaurant = await findRestaurantById(id);
        if (!restaurant) {
            throw NotFoundError;
        }
        const updated = await updateRestaurantStatus(id, status);
        return updated;
    };
};
RestaurantService = __decorate([
    injectable()
], RestaurantService);
export { RestaurantService };
//# sourceMappingURL=restaurant.service.js.map
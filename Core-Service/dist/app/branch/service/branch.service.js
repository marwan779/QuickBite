var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NotFoundError } from "../../../lib/auth/error";
import { findRestaurantById } from "../../restaurant/repository/restaurant.repo";
import { findNearbyBranches, createBranch, findBranchesByRestaurant, findBranchById, updateBranch, updateBranchStatus } from "../repository/branch.repository";
import { injectable } from "tsyringe";
let BranchService = class BranchService {
    findNearby = async (lat, lng) => {
        const rows = await findNearbyBranches(lat, lng);
        return rows;
    };
    create = async (restaurantId, data) => {
        const restaurant = await findRestaurantById(restaurantId);
        if (!restaurant)
            throw NotFoundError;
        const now = new Date();
        const branch = await createBranch({
            restaurantId: restaurantId,
            label: data.label,
            countryCode: data.countryCode,
            lat: data.lat,
            lng: data.lng,
            addressText: data.addressText,
            isActive: false,
            opensAt: data.opensAt,
            closesAt: data.closesAt,
            currency: data.currency,
            deliveryRadius: data.deliveryRadius,
            commission: 0,
            createdAt: now,
            updatedAt: now,
            acceptOrders: true,
        });
        return branch;
    };
    findByRestaurant = async (restaurantId, pagination) => {
        const restaurant = await findRestaurantById(restaurantId);
        if (!restaurant) {
            throw NotFoundError;
        }
        return findBranchesByRestaurant(restaurantId, pagination);
    };
    update = async (branchId, data) => {
        const branch = await findBranchById(branchId);
        if (!branch)
            throw NotFoundError;
        return updateBranch(branchId, data);
    };
    updateStatus = async (branchId, data) => {
        const branch = await findBranchById(branchId);
        if (!branch)
            throw NotFoundError;
        return updateBranchStatus(branchId, data.isActive);
    };
};
BranchService = __decorate([
    injectable()
], BranchService);
export { BranchService };
//# sourceMappingURL=branch.service.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NotFoundError } from "../../../lib/auth/error";
import { findRestaurantById } from "../../restaurant/repository/restaurant.repo";
import { findNearbyBranches, createBranch, findBranchesByRestaurant, findBranchById, updateBranch, updateBranchStatus, } from "../repository/branch.repository";
import { injectable } from "tsyringe";
import { db } from "../../../lib/knex/knex";
import { insertOutboxEvent } from "../../../lib/events/outbox.repo";
import { EVENT_TYPES } from "../../../lib/events/event-types";
let BranchService = class BranchService {
    findNearby = async (lat, lng) => {
        const rows = await findNearbyBranches(lat, lng);
        return rows;
    };
    findByIdWithRestaurant = async (branchId) => {
        const branch = await findBranchById(branchId);
        if (!branch)
            return null;
        const restaurant = await findRestaurantById(branch.restaurantId);
        return { branch, restaurantStatus: restaurant?.status ?? "unknown" };
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
            deliveryFee: data.deliveryFee ?? 0,
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
        const trx = await db.transaction();
        try {
            const existing = await findBranchById(branchId, trx);
            if (!existing)
                throw NotFoundError;
            const updated = await updateBranch(branchId, data, trx);
            await insertOutboxEvent(trx, {
                aggregateType: "branch",
                aggregateId: String(branchId),
                eventType: EVENT_TYPES.BRANCH_UPDATED,
                payload: {
                    branchId: updated.id,
                    restaurantId: updated.restaurantId,
                    label: updated.label,
                    isActive: updated.isActive,
                    acceptOrders: updated.acceptOrders,
                    opensAt: updated.opensAt,
                    closesAt: updated.closesAt,
                    deliveryRadius: updated.deliveryRadius,
                    deliveryFee: updated.deliveryFee,
                    currency: updated.currency,
                    countryCode: updated.countryCode,
                    addressText: updated.addressText,
                    lat: updated.lat,
                    lng: updated.lng,
                },
            });
            if (data.isActive === false || (existing.isActive && !updated.isActive)) {
                await insertOutboxEvent(trx, {
                    aggregateType: "branch",
                    aggregateId: String(branchId),
                    eventType: EVENT_TYPES.BRANCH_DEACTIVATED,
                    payload: {
                        branchId: updated.id,
                        restaurantId: updated.restaurantId,
                    },
                });
            }
            await trx.commit();
            return updated;
        }
        catch (err) {
            await trx.rollback();
            throw err;
        }
    };
    updateStatus = async (branchId, data) => {
        const trx = await db.transaction();
        try {
            const existing = await findBranchById(branchId, trx);
            if (!existing)
                throw NotFoundError;
            const updated = await updateBranchStatus(branchId, data.isActive, trx);
            await insertOutboxEvent(trx, {
                aggregateType: "branch",
                aggregateId: String(branchId),
                eventType: EVENT_TYPES.BRANCH_UPDATED,
                payload: {
                    branchId: updated.id,
                    restaurantId: updated.restaurantId,
                    label: updated.label,
                    isActive: updated.isActive,
                    acceptOrders: updated.acceptOrders,
                    opensAt: updated.opensAt,
                    closesAt: updated.closesAt,
                    deliveryRadius: updated.deliveryRadius,
                    deliveryFee: updated.deliveryFee,
                    currency: updated.currency,
                },
            });
            if (!data.isActive) {
                await insertOutboxEvent(trx, {
                    aggregateType: "branch",
                    aggregateId: String(branchId),
                    eventType: EVENT_TYPES.BRANCH_DEACTIVATED,
                    payload: {
                        branchId: updated.id,
                        restaurantId: updated.restaurantId,
                    },
                });
            }
            await trx.commit();
            return updated;
        }
        catch (err) {
            await trx.rollback();
            throw err;
        }
    };
};
BranchService = __decorate([
    injectable()
], BranchService);
export { BranchService };
//# sourceMappingURL=branch.service.js.map
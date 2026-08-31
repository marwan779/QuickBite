import { NotFoundError } from "../../../lib/auth/error";
import type { PaginationParams } from "../../../lib/http/pagination/cursor-pagination";
import { findRestaurantById } from "../../restaurant/repository/restaurant.repo";
import type { CreateBranchDTO, UpdateBranchDTO, UpdateBranchStatusDTO } from "../dto/branch.dto";
import {
    findNearbyBranches,
    createBranch,
    findBranchesByRestaurant,
    findBranchById,
    updateBranch,
    updateBranchStatus,
    type NearbyBranch,
} from "../repository/branch.repository";
import { injectable } from "tsyringe";
import { db } from "../../../lib/knex/knex";
import { insertOutboxEvent } from "../../../lib/events/outbox.repo";
import { EVENT_TYPES } from "../../../lib/events/event-types";

@injectable()
export class BranchService {

    findNearby = async (lat: number, lng: number): Promise<NearbyBranch[]> => {
        const rows = await findNearbyBranches(lat, lng);
        return rows;
    }

    create = async (restaurantId: number, data: CreateBranchDTO) => {
        const restaurant = await findRestaurantById(restaurantId);
        if (!restaurant) throw NotFoundError;

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
    }

    findByRestaurant = async (
        restaurantId: number,
        pagination: PaginationParams
    ) => {
        const restaurant = await findRestaurantById(restaurantId);

        if (!restaurant) {
            throw NotFoundError;
        }

        return findBranchesByRestaurant(
            restaurantId,
            pagination
        );
    };

    update = async (branchId: number, data: UpdateBranchDTO) => {
        const trx = await db.transaction();
        try {
            const existing = await findBranchById(branchId, trx);
            if (!existing) throw NotFoundError;

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
        } catch (err) {
            await trx.rollback();
            throw err;
        }
    }

    updateStatus = async (branchId: number, data: UpdateBranchStatusDTO) => {
        const trx = await db.transaction();
        try {
            const existing = await findBranchById(branchId, trx);
            if (!existing) throw NotFoundError;

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
        } catch (err) {
            await trx.rollback();
            throw err;
        }
    }
}

import { UnAuthorisedError, NotFoundError } from "../../../lib/auth/error";
import type { PaginationParams } from "../../../lib/http/pagination/cursor-pagination";
import { findRestaurantById } from "../../restaurant/repository/restaurant.repo";
import { SystemRole } from "../../user/enums";
import type { CreateBranchDTO, UpdateBranchDTO, UpdateBranchStatusDTO } from "../dto/branch.dto";
import { findNearbyBranches, createBranch, findBranchesByRestaurant, findBranchById, updateBranch, updateBranchStatus, type NearbyBranch } from "../repository/branch.repository";
import { injectable } from "tsyringe";

@injectable()
export class BranchService {

    findNearby = async (lat: number, lng: number): Promise<NearbyBranch[]> => {
        const rows = await findNearbyBranches(lat, lng);
        return rows;
    }

    create = async (restaurantId: number, userId: number, userRole: SystemRole, data: CreateBranchDTO) => {
        const restaurant = await findRestaurantById(restaurantId);
        if (!restaurant) throw NotFoundError;

        if (userRole != SystemRole.SYSTEM_ADMIN && (Number(restaurant.ownerId) !== Number(userId))) {
            throw UnAuthorisedError
        }

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
    update = async (branchId: number, userId: number, userRole: SystemRole, data: UpdateBranchDTO) => {
        const branch = await findBranchById(branchId);
        if (!branch) throw NotFoundError;

        const restaurant = await findRestaurantById(branch.restaurantId);
        if (!restaurant) throw NotFoundError;
        if (userRole != SystemRole.SYSTEM_ADMIN && (Number(restaurant.ownerId) !== Number(userId))) {
            throw UnAuthorisedError
        }

        return updateBranch(branchId, data);
    }

    updateStatus = async (branchId: number, userId: number, userRole: SystemRole, data: UpdateBranchStatusDTO) => {
        const branch = await findBranchById(branchId);
        if (!branch) throw NotFoundError;

        const restaurant = await findRestaurantById(branch.restaurantId);
        if (!restaurant) throw NotFoundError;
        if (userRole != SystemRole.SYSTEM_ADMIN && (Number(restaurant.ownerId) !== Number(userId))) {
            throw UnAuthorisedError
        }

        return updateBranchStatus(branchId, data.isActive);
    }
}

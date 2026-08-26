import type { Knex } from "knex";
import { Branch } from "../entity/branch.entity";
import { type PaginationParams } from "../../../lib/http/pagination/cursor-pagination";
export interface NearbyBranch {
    id: number;
    restaurantId: number;
    addressText: string;
    label: string;
    lat: number;
    lng: number;
    isActive: boolean;
    acceptOrders: boolean;
    currency: string;
    name: string;
    logoUrl: string | null;
}
export declare function createBranch(data: Partial<Branch>, conn?: Knex): Promise<Branch>;
export declare function findBranchesByRestaurant(restaurantId: number, pagination: PaginationParams): Promise<Branch[]>;
export declare function findBranchById(id: number): Promise<Branch | undefined>;
export declare function updateBranch(id: number, data: Partial<Branch>, conn?: Knex): Promise<Branch>;
export declare function updateBranchStatus(id: number, isActive: boolean, conn?: Knex): Promise<Branch>;
export declare function findNearbyBranches(lat: number, lng: number): Promise<NearbyBranch[]>;
//# sourceMappingURL=branch.repository.d.ts.map
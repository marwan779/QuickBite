import type { PaginationParams } from "../../../lib/http/pagination/cursor-pagination";
import type { CreateBranchDTO, UpdateBranchDTO, UpdateBranchStatusDTO } from "../dto/branch.dto";
import { type NearbyBranch } from "../repository/branch.repository";
export declare class BranchService {
    findNearby: (lat: number, lng: number) => Promise<NearbyBranch[]>;
    create: (restaurantId: number, data: CreateBranchDTO) => Promise<import("../entity/branch.entity").Branch>;
    findByRestaurant: (restaurantId: number, pagination: PaginationParams) => Promise<import("../entity/branch.entity").Branch[]>;
    update: (branchId: number, data: UpdateBranchDTO) => Promise<import("../entity/branch.entity").Branch>;
    updateStatus: (branchId: number, data: UpdateBranchStatusDTO) => Promise<import("../entity/branch.entity").Branch>;
}
//# sourceMappingURL=branch.service.d.ts.map
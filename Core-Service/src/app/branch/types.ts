import type { Branch } from "./entity/branch.entity";

export interface BranchWithRestaurant {
    branch: Branch;
    restaurantStatus: string;
}


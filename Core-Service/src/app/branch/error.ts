import {AppError} from "../../lib/error/AppError";

export const BranchesNotBelongToRestaurantError = new AppError('One or more branches do not belong to this restaurant', 400);
export const BranchNotFoundError = new AppError('Branch not found', 404);


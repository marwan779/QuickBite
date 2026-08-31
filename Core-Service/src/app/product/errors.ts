import { AppError } from "../../lib/error/AppError";


export const ProductNotFoundError = new AppError(
    "Product not found",
    404
);


export const CategoryNotFoundError = new AppError(
    "Category not found",
    404
);


export const BranchProductDetailsNotFoundError = new AppError(
    "Product branch details not found",
    404
);


export const InvalidBranchIdError = new AppError(
    "Invalid branch ID",
    400
);

export const InvalidReserveItemsError = new AppError('items must be a non-empty array of {productId, quantity}', 400);
export const MissingProductIdsQueryError = new AppError('ids query is required', 400);

export function outOfStockError(offending: unknown) {
    return new AppError(`OutOfStock: ${JSON.stringify(offending)}`, 409);
}

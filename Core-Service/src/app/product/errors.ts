import { AppError } from "../../common/error/AppError";


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
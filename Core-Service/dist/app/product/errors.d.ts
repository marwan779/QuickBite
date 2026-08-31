import { AppError } from "../../lib/error/AppError";
export declare const ProductNotFoundError: AppError;
export declare const CategoryNotFoundError: AppError;
export declare const BranchProductDetailsNotFoundError: AppError;
export declare const InvalidBranchIdError: AppError;
export declare const InvalidReserveItemsError: AppError;
export declare const MissingProductIdsQueryError: AppError;
export declare function outOfStockError(offending: unknown): AppError;
//# sourceMappingURL=errors.d.ts.map
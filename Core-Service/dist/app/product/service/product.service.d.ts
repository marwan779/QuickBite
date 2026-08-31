import type { CreateProductDTO, UpdateProductDTO } from "../dto/product.dto";
import type { BranchProductRow, ReserveStockInput, ReserveStockResult } from "../types";
export declare class ProductService {
    create: (restaurantId: number, data: CreateProductDTO) => Promise<any>;
    findByRestaurant: (restaurantId: number) => Promise<any[]>;
    findCategories: (restaurantId: number) => Promise<any[]>;
    findByBranch: (branchId: number) => Promise<any[]>;
    findById: (id: number) => Promise<any>;
    update: (productId: number, branchId: number | undefined, data: UpdateProductDTO) => Promise<any>;
    findByBranchAndIds: (branchId: number, productIds: number[]) => Promise<BranchProductRow[]>;
    /**
     * Atomically decrements branch stock for each item. Locks the rows FOR UPDATE
     * and emits product.stock.changed per decrement so order-service invalidates
     * its cache.
     */
    reserveStock: (branchId: number, items: ReserveStockInput[]) => Promise<ReserveStockResult>;
}
//# sourceMappingURL=product.service.d.ts.map
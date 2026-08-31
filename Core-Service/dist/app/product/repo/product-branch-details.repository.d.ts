import type { Knex } from "knex";
import type { UpdateProductDTO } from "../dto/product.dto";
export declare const findBranchDetails: (productId: number, branchId: number, conn?: Knex) => Promise<any>;
export declare const updateBranchDetails: (productId: number, branchId: number, data: UpdateProductDTO, conn?: Knex) => Promise<any>;
//# sourceMappingURL=product-branch-details.repository.d.ts.map
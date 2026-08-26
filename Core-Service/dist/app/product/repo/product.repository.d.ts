import type { CreateProductDTO, UpdateProductDTO } from "../dto/product.dto";
export declare const findProductById: (productId: number) => Promise<any>;
export declare const findProductsByRestaurant: (restaurantId: number) => Promise<any[]>;
export declare const findProductsByBranch: (branchId: number) => Promise<any[]>;
export declare const createProduct: (restaurantId: number, categoryId: number | null, data: CreateProductDTO) => Promise<any>;
export declare const updateProduct: (productId: number, categoryId: number | null | undefined, data: UpdateProductDTO) => Promise<any>;
//# sourceMappingURL=product.repository.d.ts.map
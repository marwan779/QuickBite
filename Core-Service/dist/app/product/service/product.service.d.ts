import type { CreateProductDTO, UpdateProductDTO } from "../dto/product.dto";
import { type RestaurantService } from "../../restaurant/service/restaurant.service";
export declare class ProductService {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    findCategories: (restaurantId: number) => Promise<any[]>;
    findByBranch: (branchId: number) => Promise<any[]>;
    findByRestaurant: (restaurantId: number) => Promise<any[]>;
    findById: (productId: number) => Promise<any>;
    create: (restaurantId: number, data: CreateProductDTO) => Promise<any>;
    update: (productId: number, branchId: number | undefined, data: UpdateProductDTO) => Promise<{
        product: any;
        branchDetails: any;
    }>;
    private checkRestaurantAccess;
}
//# sourceMappingURL=product.service.d.ts.map
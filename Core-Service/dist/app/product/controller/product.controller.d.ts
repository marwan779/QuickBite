import type { Request, Response, NextFunction } from "express";
import { type ProductService } from "../service/product.service";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findCategories: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    findByBranch: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    findByRestaurant: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    findById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=product.controller.d.ts.map
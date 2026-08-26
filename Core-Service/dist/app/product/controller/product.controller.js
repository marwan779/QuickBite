var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import {} from "../service/product.service";
import { CreateProductDTO, UpdateProductDTO, } from "../dto/product.dto";
import { validateBody } from "../../../lib/validation/validate";
import { TOKENS } from "../../../lib/di/tokens";
import { injectable, inject } from "tsyringe";
let ProductController = class ProductController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    findCategories = async (req, res, next) => {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const categories = await this.productService.findCategories(restaurantId);
            res.status(200).json({
                data: categories,
            });
        }
        catch (err) {
            next(err);
        }
    };
    findByBranch = async (req, res, next) => {
        try {
            const branchId = Number(req.params.branchId);
            const products = await this.productService.findByBranch(branchId);
            res.status(200).json({
                data: products,
            });
        }
        catch (err) {
            next(err);
        }
    };
    findByRestaurant = async (req, res, next) => {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const products = await this.productService.findByRestaurant(restaurantId);
            res.status(200).json({
                data: products,
            });
        }
        catch (err) {
            next(err);
        }
    };
    findById = async (req, res, next) => {
        try {
            const productId = Number(req.params.id);
            const product = await this.productService.findById(productId);
            res.status(200).json(product);
        }
        catch (err) {
            next(err);
        }
    };
    create = async (req, res, next) => {
        try {
            const data = await validateBody(CreateProductDTO, req.body);
            const restaurantId = Number(req.params.restaurantId);
            const product = await this.productService.create(restaurantId, data);
            res.status(201).json({
                message: "Product created",
                product,
            });
        }
        catch (err) {
            next(err);
        }
    };
    update = async (req, res, next) => {
        try {
            const data = await validateBody(UpdateProductDTO, req.body);
            const productId = Number(req.params.id);
            const branchId = req.query.branchId !== undefined
                ? Number(req.query.branchId)
                : undefined;
            const result = await this.productService.update(productId, branchId, data);
            res.status(200).json({
                message: "Product updated",
                product: result.product,
                ...(result.branchDetails && {
                    branchDetails: result.branchDetails,
                }),
            });
        }
        catch (err) {
            next(err);
        }
    };
};
ProductController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.ProductService)),
    __metadata("design:paramtypes", [Function])
], ProductController);
export { ProductController };
//# sourceMappingURL=product.controller.js.map
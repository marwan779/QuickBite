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
import { BranchProductDetailsNotFoundError, ProductNotFoundError, } from "../errors";
import {} from "../../restaurant/service/restaurant.service";
import { createCategory, findCategoriesByRestaurant, findCategoryByName } from "../repo/category.repository";
import { createProduct, findProductById, findProductsByBranch, findProductsByRestaurant, updateProduct } from "../repo/product.repository";
import { findBranchDetails, updateBranchDetails } from "../repo/product-branch-details.repository";
import { TOKENS } from "../../../lib/di/tokens";
import { injectable, inject } from "tsyringe";
let ProductService = class ProductService {
    restaurantService;
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }
    findCategories = async (restaurantId) => {
        return findCategoriesByRestaurant(restaurantId);
    };
    findByBranch = async (branchId) => {
        return findProductsByBranch(branchId);
    };
    findByRestaurant = async (restaurantId) => {
        await this.checkRestaurantAccess(restaurantId);
        return findProductsByRestaurant(restaurantId);
    };
    findById = async (productId) => {
        const product = await findProductById(productId);
        if (!product) {
            throw ProductNotFoundError;
        }
        return product;
    };
    create = async (restaurantId, data) => {
        await this.checkRestaurantAccess(restaurantId);
        let categoryId = null;
        if (data.categoryName) {
            const existingCategory = await findCategoryByName(restaurantId, data.categoryName);
            if (existingCategory) {
                categoryId = existingCategory.id;
            }
            else {
                const category = await createCategory(restaurantId, data.categoryName);
                categoryId = category.id;
            }
        }
        const product = await createProduct(restaurantId, categoryId, data);
        return product;
    };
    update = async (productId, branchId, data) => {
        const existingProduct = await findProductById(productId);
        if (!existingProduct) {
            throw ProductNotFoundError;
        }
        await this.checkRestaurantAccess(existingProduct.restaurantId);
        let categoryId;
        if (data.categoryName !== undefined) {
            const existingCategory = await findCategoryByName(existingProduct.restaurantId, data.categoryName);
            if (existingCategory) {
                categoryId = existingCategory.id;
            }
            else {
                const category = await createCategory(existingProduct.restaurantId, data.categoryName);
                categoryId = category.id;
            }
        }
        const product = await updateProduct(productId, categoryId, data);
        let branchDetails;
        const hasBranchFields = data.price !== undefined ||
            data.stock !== undefined ||
            data.isAvailable !== undefined;
        if (branchId !== undefined && hasBranchFields) {
            branchDetails = await findBranchDetails(productId, branchId);
            if (!branchDetails) {
                throw BranchProductDetailsNotFoundError;
            }
            branchDetails = await updateBranchDetails(productId, branchId, data);
        }
        return {
            product,
            branchDetails,
        };
    };
    checkRestaurantAccess = async (restaurantId) => {
        /*
         * Do not access RestaurantRepository directly here.
         *
         * ProductService talks to RestaurantService,
         * keeping the module boundary clean.
         * Throws NotFoundError if restaurant does not exist.
         */
        await this.restaurantService.findById(restaurantId);
    };
};
ProductService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.RestaurantService)),
    __metadata("design:paramtypes", [Function])
], ProductService);
export { ProductService };
//# sourceMappingURL=product.service.js.map
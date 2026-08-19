
import type {
    CreateProductDTO,
    UpdateProductDTO,
} from "../dto/product.dto";

import {
    BranchProductDetailsNotFoundError,
    ProductNotFoundError,
} from "../errors";

import {type RestaurantService } from "../../restaurant/service/restaurant.service";
import { SystemRole } from "../../user/enums";
import { createCategory, findCategoriesByRestaurant, findCategoryByName } from "../repo/category.repository";
import { createProduct, findProductById, findProductsByBranch, findProductsByRestaurant, updateProduct } from "../repo/product.repository";
import { findBranchDetails, updateBranchDetails } from "../repo/product-branch-details.repository";
import { NotAuthorizedErrorToManageRestaurant } from "../../role-based-access-control/errors";
import { TOKENS } from "../../../lib/di/tokens";
import { injectable, inject } from "tsyringe";

@injectable()
export class ProductService {

    constructor(
        @inject(TOKENS.RestaurantService) private readonly restaurantService: RestaurantService
    ) {}


    findCategories = async (
        restaurantId: number
    ) => {
        return findCategoriesByRestaurant(restaurantId);
    };


    findByBranch = async (
        branchId: number
    ) => {
        return findProductsByBranch(branchId);
    };


    findByRestaurant = async (
        restaurantId: number,
        userId: number,
        role: string
    ) => {

        await this.checkRestaurantAccess(
            restaurantId,
            userId,
            role
        );

        return findProductsByRestaurant(restaurantId);
    };


    findById = async (
        productId: number
    ) => {

        const product = await findProductById(productId);

        if (!product) {
            throw ProductNotFoundError;
        }

        return product;
    };


    create = async (
        restaurantId: number,
        userId: number,
        role: string,
        data: CreateProductDTO
    ) => {

        await this.checkRestaurantAccess(
            restaurantId,
            userId,
            role
        );

        let categoryId: number | null = null;

        if (data.categoryName) {

            const existingCategory =
                await findCategoryByName(
                    restaurantId,
                    data.categoryName
                );

            if (existingCategory) {
                categoryId = existingCategory.id;
            } else {
                const category = await createCategory(
                    restaurantId,
                    data.categoryName
                );

                categoryId = category.id;
            }
        }

        const product = await createProduct(
            restaurantId,
            categoryId,
            data
        );

        return product;
    };


    update = async (
        productId: number,
        userId: number,
        role: string,
        branchId: number | undefined,
        data: UpdateProductDTO
    ) => {

        const existingProduct =
            await findProductById(productId);

        if (!existingProduct) {
            throw ProductNotFoundError;
        }

        await this.checkRestaurantAccess(
            existingProduct.restaurantId,
            userId,
            role
        );

        let categoryId: number | null | undefined;

        if (data.categoryName !== undefined) {

            const existingCategory =
                await findCategoryByName(
                    existingProduct.restaurantId,
                    data.categoryName
                );

            if (existingCategory) {
                categoryId = existingCategory.id;
            } else {
                const category = await createCategory(
                    existingProduct.restaurantId,
                    data.categoryName
                );

                categoryId = category.id;
            }
        }

        const product = await updateProduct(
            productId,
            categoryId,
            data
        );

        let branchDetails;

        const hasBranchFields =
            data.price !== undefined ||
            data.stock !== undefined ||
            data.isAvailable !== undefined;

        if (branchId !== undefined && hasBranchFields) {

            branchDetails = await findBranchDetails(
                productId,
                branchId
            );

            if (!branchDetails) {
                throw BranchProductDetailsNotFoundError;
            }

            branchDetails = await updateBranchDetails(
                productId,
                branchId,
                data
            );
        }

        return {
            product,
            branchDetails,
        };
    };


    private checkRestaurantAccess = async (
        restaurantId: number,
        userId: number,
        role: string
    ) => {

        if (role === SystemRole.SYSTEM_ADMIN) {
            return;
        }

        /*
         * Do not access RestaurantRepository directly here.
         *
         * ProductService talks to RestaurantService,
         * keeping the module boundary clean.
         */
        const restaurant =
            await this.restaurantService.findById(restaurantId);

        if (!restaurant || restaurant.ownerId !== userId) {
            throw NotAuthorizedErrorToManageRestaurant;
        }
    };
}



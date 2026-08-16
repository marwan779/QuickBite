import type {
    Request,
    Response,
    NextFunction,
} from "express";

import {
    productService,
    type ProductService,
} from "../service/product.service";

import {
    CreateProductDTO,
    UpdateProductDTO,
} from "../dto/product.dto";

import { validateBody } from "../../../common/validation/validate";
import { NotAuthenticated } from "../../../common/auth/error";



export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) {}


    findCategories = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const restaurantId =
                Number(req.params.restaurantId);

            const categories =
                await this.productService.findCategories(
                    restaurantId
                );

            res.status(200).json({
                data: categories,
            });

        } catch (err) {
            next(err);
        }
    };


    findByBranch = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const branchId =
                Number(req.params.branchId);

            const products =
                await this.productService.findByBranch(
                    branchId
                );

            res.status(200).json({
                data: products,
            });

        } catch (err) {
            next(err);
        }
    };


    findByRestaurant = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            if (!req.user) {
                throw NotAuthenticated;
            }

            const restaurantId =
                Number(req.params.restaurantId);

            const products =
                await this.productService.findByRestaurant(
                    restaurantId,
                    req.user.userId,
                    req.user.role
                );

            res.status(200).json({
                data: products,
            });

        } catch (err) {
            next(err);
        }
    };


    findById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const productId =
                Number(req.params.id);

            const product =
                await this.productService.findById(
                    productId
                );

            res.status(200).json(product);

        } catch (err) {
            next(err);
        }
    };


    create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            if (!req.user) {
                throw NotAuthenticated;
            }

            const data =
                await validateBody(
                    CreateProductDTO,
                    req.body
                );

            const restaurantId =
                Number(req.params.restaurantId);

            const product =
                await this.productService.create(
                    restaurantId,
                    req.user.userId,
                    req.user.role,
                    data
                );

            res.status(201).json({
                message: "Product created",
                product,
            });

        } catch (err) {
            next(err);
        }
    };


    update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            if (!req.user) {
                throw NotAuthenticated;
            }

            const data =
                await validateBody(
                    UpdateProductDTO,
                    req.body
                );

            const productId =
                Number(req.params.id);

            const branchId =
                req.query.branchId !== undefined
                    ? Number(req.query.branchId)
                    : undefined;

            const result =
                await this.productService.update(
                    productId,
                    req.user.userId,
                    req.user.role,
                    branchId,
                    data
                );

            res.status(200).json({
                message: "Product updated",
                product: result.product,
                ...(result.branchDetails && {
                    branchDetails: result.branchDetails,
                }),
            });

        } catch (err) {
            next(err);
        }
    };
}


export const productController =
    new ProductController(productService);
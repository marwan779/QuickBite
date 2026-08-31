import type {
    Request,
    Response,
    NextFunction,
} from "express";

import {
    type ProductService,
} from "../service/product.service";

import {
    CreateProductDTO,
    UpdateProductDTO,
} from "../dto/product.dto";

import { validateBody } from "../../../lib/validation/validate";
import { TOKENS } from "../../../lib/di/tokens";
import { injectable, inject } from "tsyringe";
import { sendSuccess } from "../../../lib/http/response";
import { InvalidReserveItemsError } from "../errors";

@injectable()
export class ProductController {

    constructor(
        @inject(TOKENS.ProductService) private readonly productService: ProductService
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
            const restaurantId =
                Number(req.params.restaurantId);

            const products =
                await this.productService.findByRestaurant(
                    restaurantId
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


    reserveStock = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const branchId = Number(req.params.id);
            const items = req.body?.items;
            if (!Array.isArray(items) || items.length === 0) {
                throw InvalidReserveItemsError;
            }
            const result = await this.productService.reserveStock(branchId, items);
            sendSuccess(res, result);
        } catch (err) {
            next(err);
        }
    }

}


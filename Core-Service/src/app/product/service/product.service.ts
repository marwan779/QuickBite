import { injectable } from "tsyringe";
import { NotFoundError } from "../../../lib/auth/error";
import { findRestaurantById } from "../../restaurant/repository/restaurant.repo";
import {
    ProductNotFoundError,
    InvalidReserveItemsError,
    outOfStockError,
    BranchProductDetailsNotFoundError,
} from "../errors";
import { db } from "../../../lib/knex/knex";
import { insertOutboxEvent } from "../../../lib/events/outbox.repo";
import { EVENT_TYPES } from "../../../lib/events/event-types";
import type { CreateProductDTO, UpdateProductDTO } from "../dto/product.dto";
import type {
    BranchProductRow,
    ReserveStockInput,
    ReserveStockResult,
    ReserveStockApplied,
    OutOfStockItem,
} from "../types";
import {
    createProduct,
    findProductById,
    findProductsByBranch,
    findProductsByRestaurant,
    updateProduct,
} from "../repo/product.repository";
import {
    findCategoryByName,
    findCategoriesByRestaurant,
    createCategory,
} from "../repo/category.repository";
import {
    findBranchDetails,
    updateBranchDetails,
} from "../repo/product-branch-details.repository";

@injectable()
export class ProductService {

    create = async (restaurantId: number, data: CreateProductDTO) => {
        const restaurant = await findRestaurantById(restaurantId);
        if (!restaurant) throw NotFoundError;

        let categoryId: number | null = null;
        if (data.categoryName) {
            let category = await findCategoryByName(restaurantId, data.categoryName);
            if (!category) {
                category = await createCategory(restaurantId, data.categoryName);
            }
            categoryId = category.id;
        }

        return await createProduct(restaurantId, categoryId, data);
    }

    findByRestaurant = async (restaurantId: number) => {
        const restaurant = await findRestaurantById(restaurantId);
        if (!restaurant) throw NotFoundError;
        return await findProductsByRestaurant(restaurantId);
    }

    findCategories = async (restaurantId: number) => {
        return await findCategoriesByRestaurant(restaurantId);
    }

    findByBranch = async (branchId: number) => {
        return await findProductsByBranch(branchId);
    }

    findById = async (id: number) => {
        const product = await findProductById(id);
        if (!product) {
            throw ProductNotFoundError;
        }
        return product;
    }

    update = async (productId: number, branchId: number | undefined, data: UpdateProductDTO) => {
        const product = await findProductById(productId);
        if (!product) {
            throw ProductNotFoundError;
        }

        const restaurant = await findRestaurantById(product.restaurantId);
        if (!restaurant) throw NotFoundError;

        let categoryId: number | null | undefined = undefined;
        if (data.categoryName !== undefined) {
            let category = await findCategoryByName(product.restaurantId, data.categoryName);
            if (!category) {
                category = await createCategory(product.restaurantId, data.categoryName);
            }
            categoryId = category.id;
        }

        const updatedProduct = await updateProduct(productId, categoryId, data);

        let branchDetails;
        if (branchId !== undefined && (data.price !== undefined || data.stock !== undefined || data.isAvailable !== undefined)) {
            const trx = await db.transaction();
            try {
                const existing = await findBranchDetails(productId, branchId, trx);
                if (!existing) {
                    throw BranchProductDetailsNotFoundError;
                }

                const entity = await updateBranchDetails(productId, branchId, data, trx);
                if (data.price !== undefined) {
                    await insertOutboxEvent(trx, {
                        aggregateType: "product_branch_details",
                        aggregateId: `${branchId}:${productId}`,
                        eventType: EVENT_TYPES.PRODUCT_PRICE_CHANGED,
                        payload: { branchId, productId, newPrice: entity!.price },
                    });
                }
                if (data.stock !== undefined || data.isAvailable !== undefined) {
                    await insertOutboxEvent(trx, {
                        aggregateType: "product_branch_details",
                        aggregateId: `${branchId}:${productId}`,
                        eventType: EVENT_TYPES.PRODUCT_STOCK_CHANGED,
                        payload: {
                            branchId,
                            productId,
                            newStock: entity!.stock,
                            isAvailable: entity!.isAvailable,
                        },
                    });
                }
                await trx.commit();
                branchDetails = entity;
            } catch (err) {
                await trx.rollback();
                throw err;
            }
        }

        return {
            product: updatedProduct,
            ...(branchDetails && { branchDetails }),
        };
    }

    findByBranchAndIds = async (branchId: number, productIds: number[]): Promise<BranchProductRow[]> => {
        if (productIds.length === 0) return [];
        const rows = await db("product_branch_details as pbd")
            .join("products as p", "p.id", "pbd.product_id")
            .where("pbd.branch_id", branchId)
            .whereIn("pbd.product_id", productIds)
            .whereNull("p.deleted_at")
            .select(
                "pbd.product_id",
                "p.name",
                "p.image_url",
                "pbd.price",
                "pbd.stock",
                "pbd.is_available"
            );
        return rows.map((r: any) => ({
            productId: r.product_id,
            name: r.name,
            imageUrl: r.image_url,
            price: r.price,
            stock: r.stock,
            isAvailable: r.is_available,
        }));
    }

    /**
     * Atomically decrements branch stock for each item. Locks the rows FOR UPDATE
     * and emits product.stock.changed per decrement so order-service invalidates
     * its cache.
     */
    reserveStock = async (branchId: number, items: ReserveStockInput[]): Promise<ReserveStockResult> => {
        const sanitized = items
            .map((it) => ({ productId: Number(it.productId), quantity: Number(it.quantity) }))
            .filter((it) => Number.isInteger(it.productId) && Number.isInteger(it.quantity) && it.quantity > 0);

        if (sanitized.length !== items.length) {
            throw InvalidReserveItemsError;
        }

        const productIds = sanitized.map((i) => i.productId);

        const trx = await db.transaction();
        try {
            const rows = await trx("product_branch_details")
                .where("branch_id", branchId)
                .whereIn("product_id", productIds)
                .select("product_id", "stock", "is_available")
                .forUpdate();

            const byProduct = new Map<number, { stock: number; isAvailable: boolean }>();
            for (const r of rows) byProduct.set(Number(r.product_id), { stock: r.stock, isAvailable: r.is_available });

            const offending: OutOfStockItem[] = [];
            for (const it of sanitized) {
                const current = byProduct.get(it.productId);
                if (!current || !current.isAvailable) {
                    offending.push({ productId: it.productId, requested: it.quantity, available: 0 });
                    continue;
                }
                if (current.stock < it.quantity) {
                    offending.push({ productId: it.productId, requested: it.quantity, available: current.stock });
                }
            }

            if (offending.length > 0) {
                throw outOfStockError(offending);
            }

            const applied: ReserveStockApplied[] = [];
            for (const it of sanitized) {
                const newStock = byProduct.get(it.productId)!.stock - it.quantity;
                await trx("product_branch_details")
                    .where("branch_id", branchId)
                    .where("product_id", it.productId)
                    .update({ stock: newStock });
                applied.push({ productId: it.productId, newStock });
            }

            for (const a of applied) {
                await insertOutboxEvent(trx, {
                    aggregateType: "product_branch_details",
                    aggregateId: `${branchId}:${a.productId}`,
                    eventType: EVENT_TYPES.PRODUCT_STOCK_CHANGED,
                    payload: { branchId, productId: a.productId, newStock: a.newStock },
                });
            }

            await trx.commit();
            return { ok: true, applied };
        } catch (err) {
            await trx.rollback();
            throw err;
        }
    }
}

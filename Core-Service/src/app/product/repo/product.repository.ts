import { db } from "../../../common/knex/knex";
import type {
    CreateProductDTO,
    UpdateProductDTO,
} from "../dto/product.dto";


export const findProductById = async (productId: number) => {
    return db("products")
        .where({
            "products.id": productId,
        })
        .whereNull("products.deleted_at")
        .select(
            "products.id",
            "products.name",
            "products.description",
            "products.image_url as imageUrl",
            "products.restaurant_id as restaurantId",
            "products.category_id as categoryId",
            "products.created_at as createdAt",
            "products.updated_at as updatedAt"
        )
        .first();
};


export const findProductsByRestaurant = async (
    restaurantId: number
) => {
    return db("products")
        .where({
            "products.restaurant_id": restaurantId,
        })
        .whereNull("products.deleted_at")
        .select(
            "products.id",
            "products.name",
            "products.description",
            "products.image_url as imageUrl",
            "products.restaurant_id as restaurantId",
            "products.category_id as categoryId",
            "products.created_at as createdAt",
            "products.updated_at as updatedAt"
        );
};


export const findProductsByBranch = async (
    branchId: number
) => {
    return db("products")
        .join(
            "product_branch_details",
            "products.id",
            "product_branch_details.product_id"
        )
        .leftJoin(
            "product_categories",
            "products.category_id",
            "product_categories.id"
        )
        .where({
            "product_branch_details.branch_id": branchId,
        })
        .whereNull("products.deleted_at")
        .select(
            "products.id",
            "products.name",
            "products.description",
            "products.image_url as imageUrl",
            "products.restaurant_id as restaurantId",
            "products.category_id as categoryId",
            "product_categories.name as categoryName",
            "product_branch_details.price",
            "product_branch_details.stock",
            "product_branch_details.is_available as isAvailable"
        );
};


export const createProduct = async (
    restaurantId: number,
    categoryId: number | null,
    data: CreateProductDTO
) => {
    const now = new Date();

    const [product] = await db("products")
        .insert({
            restaurant_id: restaurantId,
            name: data.name,
            description: data.description ?? null,
            image_url: data.imageUrl ?? null,
            category_id: categoryId,
            created_at: now,
            updated_at: now,
        })
        .returning([
            "id",
            "name",
            "description",
            "image_url as imageUrl",
            "restaurant_id as restaurantId",
            "category_id as categoryId",
            "created_at as createdAt",
            "updated_at as updatedAt",
        ]);

    return product;
};


export const updateProduct = async (
    productId: number,
    categoryId: number | null | undefined,
    data: UpdateProductDTO
) => {
    const updateData: Record<string, unknown> = {
        updated_at: new Date(),
    };

    if (data.name !== undefined) {
        updateData.name = data.name;
    }

    if (data.description !== undefined) {
        updateData.description = data.description;
    }

    if (data.imageUrl !== undefined) {
        updateData.image_url = data.imageUrl;
    }

    if (categoryId !== undefined) {
        updateData.category_id = categoryId;
    }

    const [product] = await db("products")
        .where("id", productId)
        .whereNull("deleted_at")
        .update(updateData)
        .returning([
            "id",
            "name",
            "description",
            "image_url as imageUrl",
            "restaurant_id as restaurantId",
            "category_id as categoryId",
            "created_at as createdAt",
            "updated_at as updatedAt",
        ]);

    return product;
};
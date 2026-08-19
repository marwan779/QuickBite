import { db } from "../../../lib/knex/knex";

export const findCategoriesByRestaurant = async (
    restaurantId: number
) => {
    return db("product_categories")
        .where({
            restaurant_id: restaurantId,
        })
        .select(
            "id",
            "restaurant_id as restaurantId",
            "name",
            "created_at as createdAt",
            "updated_at as updatedAt"
        )
        .orderBy("name", "asc");
};


export const findCategoryByName = async (
    restaurantId: number,
    name: string
) => {
    return db("product_categories")
        .where({
            restaurant_id: restaurantId,
            name,
        })
        .first();
};


export const createCategory = async (
    restaurantId: number,
    name: string
) => {
    const now = new Date();

    const [category] = await db("product_categories")
        .insert({
            restaurant_id: restaurantId,
            name,
            created_at: now,
            updated_at: now,
        })
        .returning([
            "id",
            "restaurant_id as restaurantId",
            "name",
            "created_at as createdAt",
            "updated_at as updatedAt",
        ]);

    return category;
};
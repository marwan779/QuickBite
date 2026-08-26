import { db } from "../../../lib/knex/knex";
import { RestaurantEntity } from "../entity/restaurant";
import { RestaurantStatus } from "../enums";
import { applyCursorPagination, applyFilters } from "../../../lib/http/pagination/cursor-pagination";
const RESTAURANT_COLUMNS = ['id', 'owner_id', 'name', 'logo_url', 'status', 'primary_country',
    'created_at', 'updated_at', 'status_updated_at'];
function toEntity(row) {
    return new RestaurantEntity({
        id: row.id,
        ownerId: row.owner_id,
        name: row.name,
        logoURL: row.logo_url,
        status: row.status,
        primaryCountry: row.primary_country,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        statusUpdatedAt: row.status_updated_at
    });
}
export async function findAllRestaurants(params, filters) {
    let query = db("restaurants").select(RESTAURANT_COLUMNS);
    query = applyFilters(query, filters);
    query = applyCursorPagination(query, params); // `SELECT * FROM ETC WHERE ETCC ORDEY BY LIMIT
    const rows = await query;
    return rows.map(toEntity);
}
export async function findRestaurantById(id) {
    const row = await db("restaurants").select(RESTAURANT_COLUMNS).where("id", id).first();
    return row ? toEntity(row) : undefined;
}
export async function updateRestaurant(id, data, conn = db) {
    const [row] = await conn("restaurants")
        .where("id", id)
        .update({
        ...data,
        updated_at: new Date(),
    })
        .returning(RESTAURANT_COLUMNS);
    return toEntity(row);
}
export async function updateRestaurantStatus(id, status, conn = db) {
    const [row] = await conn("restaurants")
        .where("id", id)
        .update({
        status,
        status_updated_at: new Date(),
        updated_at: new Date(),
    })
        .returning(RESTAURANT_COLUMNS);
    return toEntity(row);
}
export async function createRestaurant(data, conn = db) {
    const [row] = await conn("restaurants").insert({
        owner_id: data.ownerId,
        name: data.name,
        logo_url: data.logoURL,
        status: data.status,
        primary_country: data.primaryCountry,
        created_at: data.createdAt,
        updated_at: data.updatedAt,
        status_updated_at: data.statusUpdatedAt
    }).returning(RESTAURANT_COLUMNS);
    return toEntity(row);
}
//# sourceMappingURL=restaurant.repo.js.map
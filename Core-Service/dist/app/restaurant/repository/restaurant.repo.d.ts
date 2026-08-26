import type { Knex } from "knex";
import { RestaurantEntity } from "../entity/restaurant";
import { RestaurantStatus } from "../enums";
import { type FilterParams, type PaginationParams } from "../../../lib/http/pagination/cursor-pagination";
export declare function findAllRestaurants(params: PaginationParams, filters: FilterParams[]): Promise<RestaurantEntity[]>;
export declare function findRestaurantById(id: number): Promise<RestaurantEntity | undefined>;
export declare function updateRestaurant(id: number, data: Partial<RestaurantEntity>, conn?: Knex): Promise<RestaurantEntity>;
export declare function updateRestaurantStatus(id: number, status: RestaurantStatus, conn?: Knex): Promise<RestaurantEntity>;
export declare function createRestaurant(data: Partial<RestaurantEntity>, conn?: Knex): Promise<RestaurantEntity>;
//# sourceMappingURL=restaurant.repo.d.ts.map
import type { Knex } from "knex";
import { RegisterRestaurantDTO } from "../../auth/dto/auth.dto";
import { RestaurantStatus } from "../enums";
import { RestaurantEntity } from "../entity/restaurant";
import { type FilterParams, type PaginationParams } from "../../../lib/http/pagination/cursor-pagination";
export declare class RestaurantService {
    create: (userId: number, data: RegisterRestaurantDTO, trx?: Knex) => Promise<RestaurantEntity>;
    findAll: (params: PaginationParams, filters: FilterParams[]) => Promise<{
        data: RestaurantEntity[];
        meta: import("../../../lib/http/pagination/cursor-pagination").PaginationMeta;
    }>;
    findById: (id: number) => Promise<RestaurantEntity>;
    update: (id: number, data: Partial<RestaurantEntity>) => Promise<RestaurantEntity>;
    updateStatus: (id: number, status: RestaurantStatus) => Promise<RestaurantEntity>;
}
//# sourceMappingURL=restaurant.service.d.ts.map
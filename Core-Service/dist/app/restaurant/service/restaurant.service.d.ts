import type { Knex } from "knex";
import { RegisterRestaurantDTO } from "../../auth/dto/auth.dto";
import { RestaurantEntity } from "../entity/restaurant";
import { type FilterParams, type PaginationParams } from "../../../lib/http/pagination/cursor-pagination";
import { SystemRole } from "../../user/enums";
import type { CreateRestaurantDTO, UpdateRestaurantDTO, UpdateRestaurantStatusDTO } from "../dto/restaurant.dto";
import type { UserService } from "../../user/service/user.service";
export declare class RestaurantService {
    private readonly userService;
    constructor(userService: UserService);
    createWithOwner: (userRole: SystemRole, data: CreateRestaurantDTO) => Promise<{
        restaurant: RestaurantEntity;
        owner: {
            id: number;
            email: string;
            phone: string;
            name: string;
            systemRole: SystemRole;
        };
    }>;
    create: (userId: number, data: RegisterRestaurantDTO, trx?: Knex) => Promise<RestaurantEntity>;
    findAll: (params: PaginationParams, filters: FilterParams[]) => Promise<{
        data: RestaurantEntity[];
        meta: import("../../../lib/http/pagination/cursor-pagination").PaginationMeta;
    }>;
    findById: (id: number) => Promise<RestaurantEntity>;
    update: (id: number, data: UpdateRestaurantDTO) => Promise<RestaurantEntity>;
    updateStatus: (id: number, userRole: SystemRole, data: UpdateRestaurantStatusDTO) => Promise<RestaurantEntity>;
}
//# sourceMappingURL=restaurant.service.d.ts.map
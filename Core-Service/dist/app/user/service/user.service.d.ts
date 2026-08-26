import type { UpdateUserDTO } from "../dto/user.dto";
import type { SystemRole } from "../enums";
import type { Knex } from "knex";
export interface CreateUserData {
    email: string;
    phone: string;
    name: string;
    password?: string;
    systemRole: SystemRole;
}
export declare class UserService {
    create: (data: CreateUserData, trx?: Knex.Transaction) => Promise<import("../entity/user").User>;
    getByUserId: (userId: number) => Promise<{
        id: number;
        email: string;
        name: string;
        phone: string;
        systemRole: SystemRole;
    }>;
    updateProfile: (userId: number, data: UpdateUserDTO) => Promise<{
        id: number;
        email: string;
        name: string;
        phone: string;
        systemRole: SystemRole;
    }>;
}
export declare const userService: UserService;
//# sourceMappingURL=user.service.d.ts.map
import type { Knex } from "knex";
import { User } from "../entity/user";
export declare function findUserByEmail(email: string): Promise<User | undefined>;
export declare function findUserExistsByEmailOrPhone(email: string, phone: string): Promise<Boolean>;
export declare function createUser(user: Partial<User>, conn: Knex): Promise<User>;
export declare function updateUserPassword(id: number, password: string): Promise<void>;
export declare function findUserById(id: number): Promise<User | undefined>;
export declare function updateUser(id: number, data: Partial<{
    name: string;
    phone: string;
}>): Promise<User>;
//# sourceMappingURL=users.repo.d.ts.map
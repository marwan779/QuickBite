import { User } from "../entity/user";
export declare function findUserByEmail(email: string): Promise<User | undefined>;
export declare function findUserExistsByEmailOrPhone(email: string, phone: string): Promise<Boolean>;
export declare function createUser(user: Partial<User>): Promise<User>;
//# sourceMappingURL=users.repo.d.ts.map
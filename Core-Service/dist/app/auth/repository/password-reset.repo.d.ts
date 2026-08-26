import { PasswordReset } from "../entity/password-resets";
import type { Knex } from "knex";
export declare function createPasswordReset(passwordReset: Partial<PasswordReset>, conn?: Knex): Promise<void>;
export declare function findLatestPasswordResetByUserId(userId: number): Promise<PasswordReset | undefined>;
export declare function updatePasswordResetConsumedAt(id: number): Promise<void>;
//# sourceMappingURL=password-reset.repo.d.ts.map
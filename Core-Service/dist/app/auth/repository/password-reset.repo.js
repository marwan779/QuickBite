import { db } from "../../../lib/knex/knex";
import { PasswordReset } from "../entity/password-resets";
const PASSWORD_RESET_COLUMNS = ['id', 'user_id', 'otp_hash', 'expires_at', 'consumed_at', 'created_at'];
function toEntity(row) {
    return new PasswordReset({
        id: row.id,
        userId: row.user_id,
        otpHash: row.otp_hash,
        expiresAt: row.expires_at,
        consumedAt: row.consumed_at,
        createdAt: row.created_at,
    });
}
export async function createPasswordReset(passwordReset, conn) {
    const connection = conn || db;
    await connection("password_resets").insert({
        user_id: passwordReset.userId,
        otp_hash: passwordReset.otpHash,
        expires_at: passwordReset.expiresAt,
        created_at: passwordReset.createdAt,
    });
}
export async function findLatestPasswordResetByUserId(userId) {
    const row = await db("password_resets").
        select(PASSWORD_RESET_COLUMNS).
        where("user_id", userId).
        whereNull('consumed_at').
        orderBy('id', 'desc').
        first();
    return toEntity(row);
}
export async function updatePasswordResetConsumedAt(id) {
    await db("password_resets").where('id', id).update({
        consumed_at: new Date(),
    });
}
//# sourceMappingURL=password-reset.repo.js.map
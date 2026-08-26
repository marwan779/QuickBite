import { db } from "../../../lib/knex/knex";
import { User } from "../entity/user";
const USER_COLUMNS = [
    "id", "email", "phone", "name", "password_hash", "system_role", "created_at", "updated_at", "deleted_at"
];
function toEntity(row) {
    return new User({
        id: row.id,
        email: row.email,
        phone: row.phone,
        name: row.name,
        passwordHash: row.password_hash,
        systemRole: row.system_role,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        deletedAt: row.deleted_at,
    });
}
export async function findUserByEmail(email) {
    const row = await db("users").select(USER_COLUMNS).where("email", email).whereNull("deleted_at").first();
    console.log(row);
    return row ? toEntity(row) : undefined;
}
export async function findUserExistsByEmailOrPhone(email, phone) {
    const result = await db.raw(`
    SELECT EXISTS (SELECT 1 FROM users WHERE email = ? OR phone = ?) AS "exists"
    `, [email, phone]);
    return result.rows[0].exists;
}
export async function createUser(user, conn) {
    const [row] = await conn("users").insert({
        email: user.email,
        phone: user.phone,
        name: user.name,
        password_hash: user.passwordHash,
        system_role: user.systemRole,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
    }).returning(USER_COLUMNS);
    return toEntity(row);
}
export async function updateUserPassword(id, password) {
    await db("users").where("id", id).
        update({ password_hash: password });
}
export async function findUserById(id) {
    const row = await db("users").select(USER_COLUMNS).where("id", id).whereNull("deleted_at").first();
    return row ? toEntity(row) : undefined;
}
export async function updateUser(id, data) {
    const [row] = await db("users").where("id", id).update({
        ...data,
        updated_at: new Date(),
    }).returning(USER_COLUMNS);
    return toEntity(row);
}
//# sourceMappingURL=users.repo.js.map
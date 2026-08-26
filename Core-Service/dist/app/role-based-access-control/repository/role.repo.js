import { db } from "../../../lib/knex/knex";
export async function findRoleByName(name, trx) {
    const query = trx || db;
    const row = await query("roles")
        .select('id')
        .where("name", name)
        .first();
    if (!row)
        return null;
    return row.id;
}
//# sourceMappingURL=role.repo.js.map
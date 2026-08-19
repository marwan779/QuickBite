import type { Knex } from "knex";
import { db } from "../../../lib/knex/knex";


export async function findRoleByName(
    name: string,
    trx?: Knex.Transaction
): Promise<number | null> {
    const query = trx || db;
    const row = await query("roles")
        .select('id')
        .where("name", name)
        .first();

    if (!row) return null;

    return row.id;
}
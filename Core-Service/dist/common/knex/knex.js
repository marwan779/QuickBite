import knex from "knex";
import config from "./knexFile";
export const db = knex(config);
export async function pingDB() {
    await db.raw("Select 1");
}
//# sourceMappingURL=knex.js.map
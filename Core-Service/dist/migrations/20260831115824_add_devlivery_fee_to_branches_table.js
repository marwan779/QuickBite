/**
 * Flat per-branch delivery fee in minor units of the branch currency.
 * Reads by order-service at checkout via the internal /branches/:id endpoint.
 */
export async function up(knex) {
    await knex.raw(`
        ALTER TABLE restaurant_branches
        ADD COLUMN delivery_fee INT NOT NULL DEFAULT 0;
    `);
}
export async function down(knex) {
    await knex.raw(`ALTER TABLE restaurant_branches DROP COLUMN delivery_fee;`);
}
//# sourceMappingURL=20260831115824_add_devlivery_fee_to_branches_table.js.map
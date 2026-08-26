export async function up(knex) {
    await knex.raw(`
        ALTER TABLE password_resets ALTER COLUMN consumed_at DROP NOT NULL;`);
}
export async function down(knex) {
    await knex.raw(`
        ALTER TABLE password_resets ALTER COLUMN consumed_at SET NOT NULL;
    `);
}
//# sourceMappingURL=20260810142857_alter_password_resets_table.js.map
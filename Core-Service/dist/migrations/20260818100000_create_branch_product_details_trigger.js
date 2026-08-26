export async function up(knex) {
    await knex.raw(`
        -- Trigger: auto-insert product_branch_details for all existing products when a new branch is created
        CREATE OR REPLACE FUNCTION fn_insert_branch_product_details()
        RETURNS TRIGGER AS $$
        BEGIN
            INSERT INTO product_branch_details (branch_id, product_id, price, stock, is_available)
            SELECT NEW.id, p.id, 0, 0, false
            FROM products p
            WHERE p.restaurant_id = NEW.restaurant_id
              AND p.deleted_at IS NULL
            ON CONFLICT (branch_id, product_id) DO NOTHING;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER trg_branch_after_insert
        AFTER INSERT ON restaurant_branches
        FOR EACH ROW
        EXECUTE FUNCTION fn_insert_branch_product_details();
    `);
}
export async function down(knex) {
    await knex.raw(`
        DROP TRIGGER IF EXISTS trg_branch_after_insert ON restaurant_branches;
        DROP FUNCTION IF EXISTS fn_insert_branch_product_details;
    `);
}
//# sourceMappingURL=20260818100000_create_branch_product_details_trigger.js.map
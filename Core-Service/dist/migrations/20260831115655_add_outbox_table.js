export async function up(knex) {
    await knex.raw(`
        CREATE TABLE events_outbox (
            id              BIGSERIAL PRIMARY KEY,
            aggregate_type  TEXT NOT NULL,
            aggregate_id    TEXT NOT NULL,
            event_type      TEXT NOT NULL,
            event_id        UUID NOT NULL UNIQUE,
            payload         JSONB NOT NULL,
            created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
            dispatched_at   TIMESTAMP NULL,
            attempts        INT NOT NULL DEFAULT 0,
            last_error      TEXT NULL
        );

        -- supports dispatcher scan: pending events ordered by id
        CREATE INDEX idx_events_outbox_pending ON events_outbox (id) WHERE dispatched_at IS NULL;
    `);
}
export async function down(knex) {
    await knex.raw(`DROP TABLE IF EXISTS events_outbox;`);
}
//# sourceMappingURL=20260831115655_add_outbox_table.js.map
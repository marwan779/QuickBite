import type { Knex } from "knex";
/**
 * Seed of the full order-service RBAC catalog (see order-service docs/business-logic/rbac.md).
 *
 * Extend this catalog freely in later migrations (new permissions or new role
 * mappings). The `ON CONFLICT DO NOTHING` clauses make re-seeding safe.
 *
 *   Resources:  orders | payments | deliveries | finance
 *   Roles:      owner | branch_manager | staff  (system_admin bypasses RBAC)
 *
 *   payments:refund and finance:payout_create are admin-bypassed today (per docs),
 *   seeded here so non-admin roles can be granted them later without a code change.
 */
export declare function up(knex: Knex): Promise<void>;
export declare function down(knex: Knex): Promise<void>;
//# sourceMappingURL=20260831115936_seed_order_service_permissions.d.ts.map
import type { Knex } from "knex";
/**
 * Flat per-branch delivery fee in minor units of the branch currency.
 * Reads by order-service at checkout via the internal /branches/:id endpoint.
 */
export declare function up(knex: Knex): Promise<void>;
export declare function down(knex: Knex): Promise<void>;
//# sourceMappingURL=20260831115824_add_devlivery_fee_to_branches_table.d.ts.map
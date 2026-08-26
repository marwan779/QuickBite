import type { Knex } from "knex";
import { MemberBranch } from "../entity/member-branch.entity";
export declare function setMemberBranches(memberId: number, rows: MemberBranch[], trx?: Knex.Transaction): Promise<void>;
export declare function findBranchIdsByMemberId(memberId: number): Promise<number[]>;
export declare function countBranchesByIdsAndRestaurant(branchIds: number[], restaurantId: number): Promise<number>;
//# sourceMappingURL=member-branch.repo.d.ts.map
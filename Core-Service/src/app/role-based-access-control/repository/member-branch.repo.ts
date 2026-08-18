import type { Knex } from "knex";
import {db} from "../../../common/knex/knex";
import {MemberBranch} from "../entity/member-branch.entity";



export async function setMemberBranches(memberId: number, rows: MemberBranch[], trx?: Knex.Transaction) {
    // delete
    const query = trx || db
    await query("member_branches").where('member_id', memberId).delete();
    // insert
    if(rows.length > 0) {
        await query("member_branches").insert(
            rows.map(row => ({
                member_id: row.memberId,
                branch_id: row.branchId,
                created_at: row.createdAt
            }))
        );
    }
}

export async function findBranchIdsByMemberId(memberId: number): Promise<number[]> {
    const rows = await db("member_branches").select("branch_id").where("member_id", memberId);
    return rows?.map(row => row.branch_id); // [{branch_id:2}, {branch_id:3}] -> [2,3]
}

export async function countBranchesByIdsAndRestaurant(branchIds: number[], restaurantId: number): Promise<number> {
    if (!branchIds.length) return 0;
    const row = await db("restaurant_branches")
        .count("id as count")
        .whereIn("id", branchIds)
        .andWhere("restaurant_id", restaurantId)
        .first();
    
    return Number(row?.count || 0);
}
import { db } from "../../../lib/knex/knex";
export const findBranchDetails = async (productId, branchId) => {
    return db("product_branch_details")
        .where({
        product_id: productId,
        branch_id: branchId,
    })
        .select("id", "branch_id as branchId", "product_id as productId", "price", "stock", "is_available as isAvailable")
        .first();
};
export const updateBranchDetails = async (productId, branchId, data) => {
    const updateData = {};
    if (data.price !== undefined) {
        updateData.price = data.price;
    }
    if (data.stock !== undefined) {
        updateData.stock = data.stock;
    }
    if (data.isAvailable !== undefined) {
        updateData.is_available = data.isAvailable;
    }
    if (Object.keys(updateData).length === 0) {
        return findBranchDetails(productId, branchId);
    }
    const [details] = await db("product_branch_details")
        .where({
        product_id: productId,
        branch_id: branchId,
    })
        .update(updateData)
        .returning([
        "id",
        "branch_id as branchId",
        "product_id as productId",
        "price",
        "stock",
        "is_available as isAvailable",
    ]);
    return details;
};
//# sourceMappingURL=product-branch-details.repository.js.map
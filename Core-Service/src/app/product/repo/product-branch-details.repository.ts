
import { db } from "../../../common/knex/knex";
import type {
    UpdateProductDTO,
} from "../dto/product.dto";


export const findBranchDetails = async (
    productId: number,
    branchId: number
) => {
    return db("product_branch_details")
        .where({
            product_id: productId,
            branch_id: branchId,
        })
        .select(
            "id",
            "branch_id as branchId",
            "product_id as productId",
            "price",
            "stock",
            "is_available as isAvailable"
        )
        .first();
};


export const updateBranchDetails = async (
    productId: number,
    branchId: number,
    data: UpdateProductDTO
) => {
    const updateData: Record<string, unknown> = {};

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
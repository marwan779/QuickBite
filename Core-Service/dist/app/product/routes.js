import { Router } from "express";
import { ProductController } from "./controller/product.controller";
import { authenticate } from "../../lib/auth/gaurd";
import { rbac, requireRestaurantMember } from "../../lib/auth/rbac";
import { TOKENS } from "../../lib/di/tokens";
import { container } from "../../lib/di/container";
const productController = container.resolve(TOKENS.ProductController);
const productRouter = Router();
// Public routes
productRouter.get("/restaurants/:restaurantId/categories", productController.findCategories);
productRouter.get("/branches/:branchId/products", productController.findByBranch);
productRouter.get("/products/:id", productController.findById);
// Protected routes
productRouter.get("/restaurants/:restaurantId/products", authenticate, requireRestaurantMember('restaurantId'), rbac({ resource: "core:product", action: "read" }), productController.findByRestaurant);
productRouter.post("/restaurants/:restaurantId/products", authenticate, requireRestaurantMember('restaurantId'), rbac({ resource: "core:product", action: "create" }), productController.create);
productRouter.patch("/products/:id", authenticate, rbac({ resource: "core:product", action: "update" }), productController.update);
export default productRouter;
//# sourceMappingURL=routes.js.map
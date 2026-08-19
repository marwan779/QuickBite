import { Router } from "express";

import { ProductController} from "./controller/product.controller";
import { authenticate } from "../../lib/auth/gaurd";
import { rbac, requireBranchAccess, requireRestaurantMember } from "../../lib/auth/rbac";
import { TOKENS } from "../../lib/di/tokens";
import { container } from "../../lib/di/container";

const productController = container.resolve<ProductController>(TOKENS.ProductController);

const productRouter = Router();


productRouter.get(
    "/restaurants/:restaurantId/categories",
    productController.findCategories
);


productRouter.get(
    "/branches/:branchId/products",
    productController.findByBranch
);


productRouter.get(
    "/restaurants/:restaurantId/products",
    authenticate,
    productController.findByRestaurant
);


productRouter.get(
    "/products/:id",
    productController.findById
);


productRouter.post(
    "/restaurants/:restaurantId/products",
    authenticate,
    productController.create
);


productRouter.patch(
    "/products/:id",
    authenticate,
    productController.update
);

productRouter.get("/restaurants/:restaurantId/products",
    authenticate,
    requireRestaurantMember('restaurantId'),
    rbac({resource:"core:product", action:"read"}),
    productController.findByRestaurant
);

productRouter.post("/restaurants/:restaurantId/products",
    authenticate,
    requireRestaurantMember('restaurantId'),
    rbac({resource:"core:product", action:"create"}),
    productController.create
);

productRouter.patch("/products/:id",
    authenticate,
    // Assuming product payload contains branchId or route is adjusted. If the route is just /:id, ensure requireBranchAccess knows how to find the branchId (maybe from DB inside controller, or pass it in body if applicable). 
    // Homework specifies: add requireBranchAccess('branchId')
    requireBranchAccess('branchId'), 
    rbac({resource:"core:product", action:"update"}),
    productController.update
);


export default productRouter;
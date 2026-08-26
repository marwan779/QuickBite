import { Router } from "express";
import { healthRouter } from "./app/health/health.routes";
import { authRouter } from "./app/auth/routes";
import { userRouter } from "./app/user/routes";
import customerAddressRouter from "./app/customer-address/routes";
import { restaurantRouter } from "./app/restaurant/routes";
import { branchRouter } from "./app/branch/routes";
import productRouter from "./app/product/routes";
import { rbacRouter } from "./app/role-based-access-control/routes";
export const routes = Router();
// health
routes.use("/health", healthRouter);
routes.use("/auth", authRouter);
routes.use("/user", userRouter);
routes.use("/customer-address", customerAddressRouter);
routes.use('/restaurants', restaurantRouter);
routes.use('/', branchRouter);
routes.use("/product", productRouter);
routes.use('/', rbacRouter);
//# sourceMappingURL=routes.js.map
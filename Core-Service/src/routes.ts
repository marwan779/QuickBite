import {Router} from "express"
import { healthRouter } from "./app/health/health.routes";
import { authRouter } from "./app/auth/routes";
import { userRouter } from "./app/user/routes";
import customerAddressRouter from "./app/customer-address/routes";

export const routes = Router();

// health
routes.use("/health", healthRouter);
routes.use("/auth", authRouter);
routes.use("/user", userRouter);
routes.use("/customer-address", customerAddressRouter);

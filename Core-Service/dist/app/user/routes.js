import { Router } from "express";
import { UserController } from "./controller/user.controller";
import { authenticate } from "../../lib/auth/gaurd";
import { requireInternalApiKey } from "../../lib/auth/api-key";
import { container } from "../../lib/di/container";
import { TOKENS } from "../../lib/di/tokens";
const userController = container.resolve(TOKENS.UserController);
export const userRouter = Router();
// protect
userRouter.get('/me', authenticate, userController.getMe);
userRouter.patch('/me', authenticate, userController.updateMe);
// Internal (service-to-service)
userRouter.get('/internal/agents/:id', requireInternalApiKey, userController.getAgentById);
//# sourceMappingURL=routes.js.map
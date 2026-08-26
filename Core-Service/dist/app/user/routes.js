import { Router } from "express";
import { UserController } from "./controller/user.controller";
import { authenticate } from "../../lib/auth/gaurd";
import { container } from "../../lib/di/container";
import { TOKENS } from "../../lib/di/tokens";
const userController = container.resolve(TOKENS.UserController);
export const userRouter = Router();
// protect
userRouter.get('/me', authenticate, userController.getMe);
userRouter.patch('/me', authenticate, userController.updateMe);
//# sourceMappingURL=routes.js.map
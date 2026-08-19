import { Router } from "express";
import { userController } from "./controller/user.controller";
import { authenticate } from "../../lib/auth/gaurd";

export const userRouter = Router();

// protect
userRouter.get('/me', authenticate, userController.getMe);
userRouter.patch('/me', authenticate, userController.updateMe);

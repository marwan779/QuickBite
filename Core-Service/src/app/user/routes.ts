import { Router } from "express";
import { userController } from "./controller/user.controller";
import { authenticate } from "../../common/auth/gaurd";

export const userRouter = Router();

// protect
userRouter.get('/me', authenticate, userController.getMe);
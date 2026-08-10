import { Router } from "express";
import { authController } from "./controller/auth.controller.js";
export const authRouter = Router();
authRouter.post('/register', authController.register);
//# sourceMappingURL=routes.js.map
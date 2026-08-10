import type { Request, Response, NextFunction } from "express";
import { type AuthService } from "../service/auth.service.js";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export declare const authController: AuthController;
//# sourceMappingURL=auth.controller.d.ts.map
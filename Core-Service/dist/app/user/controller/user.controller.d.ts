import type { Request, Response, NextFunction } from "express";
import { type UserService } from "../service/user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getMe: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateMe: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAgentById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map
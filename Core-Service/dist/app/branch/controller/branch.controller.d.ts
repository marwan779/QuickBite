import type { Request, Response, NextFunction } from "express";
import { type BranchService } from "../service/branch.service";
export declare class BranchController {
    private readonly branchService;
    constructor(branchService: BranchService);
    create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    findNearby: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    findByRestaurant: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    findByIdWithRestaurant: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=branch.controller.d.ts.map
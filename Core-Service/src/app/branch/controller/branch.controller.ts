import type { Request, Response, NextFunction } from "express";
import { CreateBranchDTO, UpdateBranchDTO, UpdateBranchStatusDTO } from "../dto/branch.dto";
import { type BranchService } from "../service/branch.service";
import { validateBody } from "../../../lib/validation/validate";
import { TOKENS } from "../../../lib/di/tokens";
import { injectable, inject } from "tsyringe";
import { parsePaginationQuery } from "../../../lib/http/pagination/parse-query";

@injectable()
export class BranchController {
    constructor(@inject(TOKENS.BranchService) private readonly branchService: BranchService) {
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await validateBody(CreateBranchDTO, req.body);
            const branch = await this.branchService.create(Number(req.params.restaurantId), data);
            res.status(201).json({ message: "Branch added", branch });
        } catch (err) {
            next(err);
        }
    }

    findNearby = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const results = await this.branchService.findNearby(Number(req.query.lat), Number(req.query.lng));
            res.status(200).json({ data: results });
        } catch (err) {
            next(err);
        }
    }

    findByRestaurant = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const pagination = parsePaginationQuery(req.query, [
                'createdAt',
                'label',
                'status',
            ]);

            const branches = await this.branchService.findByRestaurant(
                Number(req.params.restaurantId),
                pagination
            );

            res.status(200).json({
                data: branches,
            });
        } catch (err) {
            next(err);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await validateBody(UpdateBranchDTO, req.body);
            const branch = await this.branchService.update(Number(req.params.branchId), data);
            res.status(200).json({ message: "Branch updated", branch });
        } catch (err) {
            next(err);
        }
    }

    updateStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await validateBody(UpdateBranchStatusDTO, req.body);
            const branch = await this.branchService.updateStatus(Number(req.params.branchId), data);
            res.status(200).json({ message: "Branch status updated", branch });
        } catch (err) {
            next(err);
        }
    }
}


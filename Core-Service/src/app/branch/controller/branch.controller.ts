import type { Request, Response, NextFunction } from "express";
import { CreateBranchDTO, UpdateBranchDTO, UpdateBranchStatusDTO } from "../dto/branch.dto";
import { type BranchService } from "../service/branch.service";
import { validateBody } from "../../../lib/validation/validate";
import { TOKENS } from "../../../lib/di/tokens";
import { injectable, inject } from "tsyringe";
import { parsePaginationQuery } from "../../../lib/http/pagination/parse-query";
import { BranchNotFoundError } from "../error";
import { sendSuccess } from "../../../lib/http/response";

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

    findByIdWithRestaurant = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const result = await this.branchService.findByIdWithRestaurant(id);
            if (!result) throw BranchNotFoundError;
            const { branch, restaurantStatus } = result;
            sendSuccess(res, {
                id: branch.id,
                restaurantId: branch.restaurantId,
                restaurantStatus,
                region: branch.countryCode,
                isActive: branch.isActive,
                acceptOrders: branch.acceptOrders,
                deliveryFee: branch.deliveryFee,
                commissionBps: branch.commission,
                currency: branch.currency,
                lat: Number(branch.lat),
                lng: Number(branch.lng),
                name: branch.label,
                addressText: branch.addressText,
            });
        } catch (err) {
            next(err);
        }
    }
}


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { CreateBranchDTO, UpdateBranchDTO, UpdateBranchStatusDTO } from "../dto/branch.dto";
import {} from "../service/branch.service";
import { validateBody } from "../../../lib/validation/validate";
import { TOKENS } from "../../../lib/di/tokens";
import { injectable, inject } from "tsyringe";
import { parsePaginationQuery } from "../../../lib/http/pagination/parse-query";
import { BranchNotFoundError } from "../error";
import { sendSuccess } from "../../../lib/http/response";
let BranchController = class BranchController {
    branchService;
    constructor(branchService) {
        this.branchService = branchService;
    }
    create = async (req, res, next) => {
        try {
            const data = await validateBody(CreateBranchDTO, req.body);
            const branch = await this.branchService.create(Number(req.params.restaurantId), data);
            res.status(201).json({ message: "Branch added", branch });
        }
        catch (err) {
            next(err);
        }
    };
    findNearby = async (req, res, next) => {
        try {
            const results = await this.branchService.findNearby(Number(req.query.lat), Number(req.query.lng));
            res.status(200).json({ data: results });
        }
        catch (err) {
            next(err);
        }
    };
    findByRestaurant = async (req, res, next) => {
        try {
            const pagination = parsePaginationQuery(req.query, [
                'createdAt',
                'label',
                'status',
            ]);
            const branches = await this.branchService.findByRestaurant(Number(req.params.restaurantId), pagination);
            res.status(200).json({
                data: branches,
            });
        }
        catch (err) {
            next(err);
        }
    };
    update = async (req, res, next) => {
        try {
            const data = await validateBody(UpdateBranchDTO, req.body);
            const branch = await this.branchService.update(Number(req.params.branchId), data);
            res.status(200).json({ message: "Branch updated", branch });
        }
        catch (err) {
            next(err);
        }
    };
    updateStatus = async (req, res, next) => {
        try {
            const data = await validateBody(UpdateBranchStatusDTO, req.body);
            const branch = await this.branchService.updateStatus(Number(req.params.branchId), data);
            res.status(200).json({ message: "Branch status updated", branch });
        }
        catch (err) {
            next(err);
        }
    };
    findByIdWithRestaurant = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const result = await this.branchService.findByIdWithRestaurant(id);
            if (!result)
                throw BranchNotFoundError;
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
        }
        catch (err) {
            next(err);
        }
    };
};
BranchController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.BranchService)),
    __metadata("design:paramtypes", [Function])
], BranchController);
export { BranchController };
//# sourceMappingURL=branch.controller.js.map
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
import { RestaurantService } from "../service/restaurant.service";
import { validateBody } from "../../../lib/validation/validate";
import { CreateRestaurantDTO, UpdateRestaurantDTO, UpdateRestaurantStatusDTO } from "../dto/restaurant.dto";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../../lib/di/tokens";
import { sendPaginated } from "../../../lib/http/response";
import { parseFilters, parsePaginationQuery } from "../../../lib/http/pagination/parse-query";
let RestaurantController = class RestaurantController {
    restaurantService;
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }
    getAll = async (req, res, next) => {
        try {
            const params = parsePaginationQuery(req.query, ['createdAt', 'name', 'status', 'primaryCountry', 'id']);
            const filters = parseFilters(req.query, ['id', 'status', 'name']);
            const result = await this.restaurantService.findAll(params, filters);
            sendPaginated(res, result.data, result.meta);
        }
        catch (err) {
            next(err);
        }
    };
    getById = async (req, res, next) => {
        try {
            const result = await this.restaurantService.findById(Number(req.params.id));
            res.status(200).json({ data: result });
        }
        catch (err) {
            next(err);
        }
    };
    create = async (req, res, next) => {
        try {
            const data = await validateBody(CreateRestaurantDTO, req.body);
            // Standalone create for system admins (uses default db connection, not transaction)
            const result = await this.restaurantService.create(req.user.userId, data);
            res.status(201).json({ message: "Restaurant created", data: result });
        }
        catch (err) {
            next(err);
        }
    };
    update = async (req, res, next) => {
        try {
            const data = await validateBody(UpdateRestaurantDTO, req.body);
            const result = await this.restaurantService.update(Number(req.params.id), data);
            res.status(200).json({ message: "Restaurant updated", data: result });
        }
        catch (err) {
            next(err);
        }
    };
    updateStatus = async (req, res, next) => {
        try {
            const data = await validateBody(UpdateRestaurantStatusDTO, req.body);
            const result = await this.restaurantService.updateStatus(Number(req.params.id), data.status);
            res.status(200).json({ message: "Restaurant status updated", data: result });
        }
        catch (err) {
            next(err);
        }
    };
};
RestaurantController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.RestaurantService)),
    __metadata("design:paramtypes", [RestaurantService])
], RestaurantController);
export { RestaurantController };
//# sourceMappingURL=restaurant.controller.js.map
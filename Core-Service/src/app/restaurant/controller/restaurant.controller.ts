import type { NextFunction, Request, Response } from "express";
import { RestaurantService, restaurantService } from "../service/restaurant.service";
import { validateBody } from "../../../lib/validation/validate";
import { CreateRestaurantDTO, UpdateRestaurantDTO, UpdateRestaurantStatusDTO } from "../dto/restaurant.dto";

export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.restaurantService.findAll();
            res.status(200).json({ data: result });
        } catch (err) {
            next(err);
        }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.restaurantService.findById(Number(req.params.id));
            res.status(200).json({ data: result });
        } catch (err) {
            next(err);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await validateBody(CreateRestaurantDTO, req.body);
            // Standalone create for system admins (uses default db connection, not transaction)
            const result = await this.restaurantService.create(req.user!.userId, data as any);
            res.status(201).json({ message: "Restaurant created", data: result });
        } catch (err) {
            next(err);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await validateBody(UpdateRestaurantDTO, req.body);
            const result = await this.restaurantService.update(Number(req.params.id), data);
            res.status(200).json({ message: "Restaurant updated", data: result });
        } catch (err) {
            next(err);
        }
    }

    updateStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await validateBody(UpdateRestaurantStatusDTO, req.body);
            const result = await this.restaurantService.updateStatus(Number(req.params.id), data.status);
            res.status(200).json({ message: "Restaurant status updated", data: result });
        } catch (err) {
            next(err);
        }
    }
}

export const restaurantController = new RestaurantController(restaurantService);
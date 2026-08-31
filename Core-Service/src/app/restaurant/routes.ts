import { Router } from "express";
import { RestaurantController} from "./controller/restaurant.controller";
import { authenticate } from "../../lib/auth/gaurd";
import { rbac, requireRestaurantMember } from "../../lib/auth/rbac";
import { container } from "../../lib/di/container";
import { TOKENS } from "../../lib/di/tokens";

const restaurantController = container.resolve<RestaurantController>(TOKENS.RestaurantController);

export const restaurantRouter = Router();

restaurantRouter.get('/', restaurantController.getAll);
restaurantRouter.get('/:id', restaurantController.getById);
restaurantRouter.post('/', authenticate, restaurantController.create); // system_admin only, checked in service
restaurantRouter.patch('/:id',
    authenticate,
    requireRestaurantMember('id'),
    rbac({ resource: "core:restaurant", action: 'update' }),
    restaurantController.update
);
restaurantRouter.patch('/:id/status', authenticate, restaurantController.updateStatus); // system_admin only, checked in service
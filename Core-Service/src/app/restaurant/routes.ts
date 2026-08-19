import { Router } from "express";
import { restaurantController } from "./controller/restaurant.controller";
import { authenticate } from "../../lib/auth/gaurd";
import { authorize } from "../../lib/auth/authorize";
import { SystemRole } from "../user/enums";

export const restaurantRouter = Router();

restaurantRouter.get('/', restaurantController.getAll);
restaurantRouter.get('/:id', restaurantController.getById);

// Protected routes - require authentication
restaurantRouter.use(authenticate);

// Restaurant user can create their own restaurant (standalone)
restaurantRouter.post('/', authorize([SystemRole.RESTAURANT_USER, SystemRole.SYSTEM_ADMIN]), restaurantController.create);

// Restaurant user can update their own restaurant
restaurantRouter.patch('/:id', authorize([SystemRole.RESTAURANT_USER, SystemRole.SYSTEM_ADMIN]), restaurantController.update);

// System admin can update restaurant status
restaurantRouter.patch('/:id/status', authorize([SystemRole.SYSTEM_ADMIN]), restaurantController.updateStatus);
import { Router } from "express";
import { branchController} from "./controller/branch.controller";
import { authenticate } from "../../common/auth/gaurd";

export const branchRouter = Router();

branchRouter.get('/branches/nearby', branchController.findNearby)
branchRouter.post('/restaurants/:restaurantId/branches', authenticate, branchController.create)
branchRouter.get('/restaurants/:restaurantId/branches', authenticate, branchController.findByRestaurant)
branchRouter.patch('/branches/:branchId', authenticate, branchController.update)
branchRouter.patch('/branches/:branchId/status', authenticate, branchController.updateStatus)
import { Router } from "express";
import { branchController} from "./controller/branch.controller";
import { authenticate } from "../../common/auth/gaurd";

export const branchRouter = Router();

branchRouter.get('/branches/nearby', branchController.findNearby)
branchRouter.post('/restaurants/:restaurantId/branches', authenticate, branchController.create)
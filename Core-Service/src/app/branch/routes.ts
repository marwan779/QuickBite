import { Router } from "express";
import { BranchController} from "./controller/branch.controller";
import { authenticate } from "../../lib/auth/gaurd";
import { rbac, requireBranchAccess, requireRestaurantMember } from "../../lib/auth/rbac";
import { container } from "../../lib/di/container";
import { TOKENS } from "../../lib/di/tokens";

const branchController = container.resolve<BranchController>(TOKENS.BranchController);


export const branchRouter = Router();

branchRouter.get('/branches/nearby', branchController.findNearby)
branchRouter.post('/restaurants/:restaurantId/branches', authenticate, branchController.create)
branchRouter.get('/restaurants/:restaurantId/branches', authenticate, branchController.findByRestaurant)
branchRouter.patch('/branches/:branchId', authenticate, branchController.update)
branchRouter.patch('/branches/:branchId/status', authenticate, branchController.updateStatus)

branchRouter.post('/restaurants/:restaurantId/branches', 
    authenticate, 
    requireRestaurantMember('restaurantId'),
    rbac({resource:"core:branch", action:"create"}),
    branchController.create
);

branchRouter.patch('/branches/:branchId', 
    authenticate, 
    requireBranchAccess('branchId'),
    rbac({resource:"core:branch", action:"update"}),
    branchController.update
);
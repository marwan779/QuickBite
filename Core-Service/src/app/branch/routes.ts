import { Router } from "express";
import { branchController} from "./controller/branch.controller";
import { authenticate } from "../../common/auth/gaurd";
import { rbac, requireBranchAccess, requireRestaurantMember } from "../../common/auth/rbac";

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
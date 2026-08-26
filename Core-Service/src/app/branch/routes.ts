import { Router } from "express";
import { BranchController} from "./controller/branch.controller";
import { authenticate } from "../../lib/auth/gaurd";
import { rbac, requireBranchAccess, requireRestaurantMember } from "../../lib/auth/rbac";
import { container } from "../../lib/di/container";
import { TOKENS } from "../../lib/di/tokens";
import { withCache } from "../../lib/cache/withcache";
import { idempotency } from "../../lib/idempotency/idempotency";

const branchController = container.resolve<BranchController>(TOKENS.BranchController);


export const branchRouter = Router();

branchRouter.get('/branches/nearby', withCache(), branchController.findNearby);

branchRouter.post(
    '/restaurants/:restaurantId/branches',
    authenticate,
    requireRestaurantMember('restaurantId'),
    rbac({ resource: "core:branch", action: "create" }),
    idempotency({ strict: true }),
    branchController.create
);

branchRouter.get(
    '/restaurants/:restaurantId/branches',
    authenticate,
    requireRestaurantMember('restaurantId'),
    branchController.findByRestaurant
);

branchRouter.patch(
    '/branches/:branchId',
    authenticate,
    requireBranchAccess('branchId'),
    rbac({ resource: "core:branch", action: "update" }),
    idempotency({ strict: true }),
    branchController.update
);

branchRouter.patch(
    '/branches/:branchId/status',
    authenticate,
    requireBranchAccess('branchId'),
    rbac({ resource: "core:branch", action: "update" }),
    idempotency({ strict: true }),
    branchController.updateStatus
);
import {Router} from "express";
import {requireRestaurantMember, rbac} from "../../lib/auth/rbac";
import {memberController} from "./controller/member.controller";
import { authenticate } from "../../lib/auth/gaurd";

export const rbacRouter = Router();

rbacRouter.post('/restaurants/:restaurantId/members',
    authenticate,
    requireRestaurantMember('restaurantId'),
    rbac({resource:"core:member", action:'create'}),
    memberController.createMember
);

// GET role permissions is public
rbacRouter.get('/roles/:role/permissions', memberController.getRolePermissions);

rbacRouter.get('/restaurants/:restaurantId/members',
    authenticate,
    requireRestaurantMember('restaurantId'),
    rbac({resource:"core:member", action:"read"}),
    memberController.listMembers
);

rbacRouter.patch('/restaurants/:restaurantId/members/:memberId',
    authenticate,
    requireRestaurantMember('restaurantId'),
    rbac({resource:"core:member", action:"update"}),
    memberController.updateMember
);

rbacRouter.delete('/restaurants/:restaurantId/members/:memberId',
    authenticate,
    requireRestaurantMember('restaurantId'),
    rbac({resource:"core:member", action:"delete"}),
    memberController.deleteMember
);

rbacRouter.put('/restaurants/:restaurantId/members/:memberId/branches',
    authenticate,
    requireRestaurantMember('restaurantId'),
    rbac({resource:"core:member", action:"update"}),
    memberController.updateMemberBranches
);
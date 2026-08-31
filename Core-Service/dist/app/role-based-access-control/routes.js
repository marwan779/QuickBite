import { Router } from "express";
import { requireRestaurantMember, rbac } from "../../lib/auth/rbac";
import { requireInternalApiKey } from "../../lib/auth/api-key";
import { MemberController } from "./controller/member.controller";
import { authenticate } from "../../lib/auth/gaurd";
import { container } from "../../lib/di/container";
import { TOKENS } from "../../lib/di/tokens";
const memberController = container.resolve(TOKENS.MemberController);
export const rbacRouter = Router();
// GET role permissions is public
rbacRouter.get('/roles/:role/permissions', memberController.getRolePermissions);
// Internal (service-to-service)
rbacRouter.get('/internal/rbac/permissions', requireInternalApiKey, memberController.getPermissionsByRole);
rbacRouter.post('/restaurants/:restaurantId/members', authenticate, requireRestaurantMember('restaurantId'), rbac({ resource: "core:member", action: 'create' }), memberController.createMember);
rbacRouter.get('/restaurants/:restaurantId/members', authenticate, requireRestaurantMember('restaurantId'), rbac({ resource: "core:member", action: "read" }), memberController.listMembers);
rbacRouter.patch('/restaurants/:restaurantId/members/:memberId', authenticate, requireRestaurantMember('restaurantId'), rbac({ resource: "core:member", action: "update" }), memberController.updateMember);
rbacRouter.delete('/restaurants/:restaurantId/members/:memberId', authenticate, requireRestaurantMember('restaurantId'), rbac({ resource: "core:member", action: "delete" }), memberController.deleteMember);
rbacRouter.put('/restaurants/:restaurantId/members/:memberId/branches', authenticate, requireRestaurantMember('restaurantId'), rbac({ resource: "core:member", action: "update" }), memberController.updateMemberBranches);
//# sourceMappingURL=routes.js.map
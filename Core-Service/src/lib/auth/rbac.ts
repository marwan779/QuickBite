import type { Request, Response, NextFunction } from "express";
import { SystemRole } from "../../app/user/enums";
import { NotAuthenticated } from "./error";
import { permissionCacheService } from "../../app/role-based-access-control/service/permission-cache.service";

export interface RBACOptions {
    resource: string;
    action: string;
    allowSystemAdmin?: boolean;
}

export function rbac(options: RBACOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) throw NotAuthenticated;
            const { resource, action, allowSystemAdmin = true } = options;

            // BUG FIX: changed `!allowSystemAdmin` to `allowSystemAdmin`
            if (allowSystemAdmin && req.user.role == SystemRole.SYSTEM_ADMIN) {
                return next();
            }

            if (req.user.role == SystemRole.RESTAURANT_USER) {
                const permissions = await permissionCacheService.getPermissions(req.user.restaurantRole!);
                if (!permissionCacheService.hasPermission(permissions, resource, action)) {
                    return res.status(403).json({ error: "Permission denied" });
                }
                return next();
            }

            return res.status(403).json({ error: "Permission denied" });
        } catch (error) {
            next(error);
        }
    }
}

export function requireRestaurantMember(paramName: string = 'restaurantId') {
    return async (req: Request, res: Response, next: NextFunction) => {
        const restaurantId = parseInt(req.params[paramName] as string);
        if (!restaurantId) return res.status(400).json({ message: "Invalid restaurant id" });

        // BUG FIX: Proper early returns and ordering
        if (req.user?.role == SystemRole.SYSTEM_ADMIN) return next();

        if (Number(req.user?.restaurantId) !== Number(restaurantId)) {
            return res.status(403).json({ error: "Permission denied" });
        }
        next();
    }
}

export function requireBranchAccess(paramName: string = 'branchId') {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (req.user?.role == SystemRole.SYSTEM_ADMIN) return next();
        if (req.user?.restaurantRole === 'owner') return next(); // Owners have access to all branches

        const branchId = parseInt(req.params[paramName] as string);
        if (!branchId) return res.status(400).json({ message: "Invalid branch id" });

        // Make sure branchIds array is typed correctly from your JWT decode
        const branchIds = req.user?.branchIds || [];
        
        if (!branchIds.includes(branchId)) {
            return res.status(403).json({ error: "Branch permission denied" });
        }
        next();
    }
}

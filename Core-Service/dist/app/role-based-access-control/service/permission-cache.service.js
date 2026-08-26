var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from "tsyringe";
import { toMs } from "../../../pkg/utils/time";
import { getPermissionsByRoleName } from "../repository/permission.repo";
let PermissionCacheService = class PermissionCacheService {
    cache = new Map();
    TTL = toMs(1, 'h');
    async getPermissions(roleName) {
        // check cache, if it is in the cache, return it, if not ftch from db
        const cached = this.cache.get(roleName);
        if (cached && Date.now() - cached.cachedAt < this.TTL) {
            return cached.permissions;
        }
        // after calling db, to insert it into the cache
        const permissions = await getPermissionsByRoleName(roleName);
        this.cache.set(roleName, { permissions, cachedAt: Date.now() });
        return permissions;
    }
    hasPermission(permissions, resource, action) {
        return permissions.includes(`${resource}:${action}`);
    }
};
PermissionCacheService = __decorate([
    injectable()
], PermissionCacheService);
export { PermissionCacheService };
//# sourceMappingURL=permission-cache.service.js.map
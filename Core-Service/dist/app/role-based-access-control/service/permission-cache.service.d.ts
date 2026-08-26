export declare class PermissionCacheService {
    private cache;
    private readonly TTL;
    getPermissions(roleName: string): Promise<string[]>;
    hasPermission(permissions: string[], resource: string, action: string): boolean;
}
//# sourceMappingURL=permission-cache.service.d.ts.map
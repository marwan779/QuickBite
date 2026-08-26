import type { Request, Response, NextFunction } from "express";
export interface RBACOptions {
    resource: string;
    action: string;
    allowSystemAdmin?: boolean;
}
export declare function rbac(options: RBACOptions): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare function requireRestaurantMember(paramName?: string): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare function requireBranchAccess(paramName?: string): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=rbac.d.ts.map
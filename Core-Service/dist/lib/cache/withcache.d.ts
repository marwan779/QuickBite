import type { Request, Response, NextFunction } from "express";
export declare function withCache(ttl?: number, userScoped?: boolean): (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=withcache.d.ts.map
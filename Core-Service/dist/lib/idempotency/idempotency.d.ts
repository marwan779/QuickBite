import type { Request, Response, NextFunction } from "express";
interface IdempotencyOptions {
    strict?: boolean;
}
export declare const idempotency: (options?: IdempotencyOptions) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=idempotency.d.ts.map
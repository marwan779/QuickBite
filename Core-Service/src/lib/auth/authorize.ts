import type { Request, Response, NextFunction } from "express";
import { UnAuthorisedError } from "./error";

export function authorize(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw UnAuthorisedError;
        }
        if (!allowedRoles.includes(req.user.role)) {
            throw UnAuthorisedError;
        }
        next();
    };
}
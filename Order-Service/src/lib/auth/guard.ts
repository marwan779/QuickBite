import {verifyAccessToken} from "./jwt";
import {NotAuthenticated} from "./errors";
import type {Request, Response, NextFunction } from "express";

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.access_token;
    if (!token) throw NotAuthenticated;

    req.user = verifyAccessToken(token);
    next();
}

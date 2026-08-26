import type {Request, Response, NextFunction } from "express";
import {verifyAccessToken} from "../../app/auth/utils";
import { NotAuthenticated } from "./error";

export function authenticate(req: Request, _res: Response, next: NextFunction) {
    const token = req.cookies.access_token;
    if (!token) {
        throw NotAuthenticated
    }

    req.user = verifyAccessToken(token);
    next();
}
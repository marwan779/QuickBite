import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

export function requireInternalApiKey(req: Request, res: Response, next: NextFunction): void {
    if (!env.internal.apiKey) {
        res.status(500).json({ error: "Internal api key not configured" });
        return;
    }
    if (req.headers["api-key"] !== env.internal.apiKey) {
        res.status(401).json({ error: "Invalid api key" });
        return;
    }
    next();
}

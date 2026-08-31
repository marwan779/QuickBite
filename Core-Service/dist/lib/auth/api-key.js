import { env } from "../config/env";
export function requireInternalApiKey(req, res, next) {
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
//# sourceMappingURL=api-key.js.map
import type { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { TOKENS } from "../di/tokens";
import type { ICacheProvider } from "../../pkg/cache/cache.interface";
import { toMs } from "../../pkg/utils/time";

interface IdempotencyOptions {
    strict?: boolean;
}

export const idempotency = (options: IdempotencyOptions = {}) => {
    const { strict = false } = options;

    return async (req: Request, res: Response, next: NextFunction) => {
        // Idempotency is only needed for operations that can modify data
        if (!["POST", "PUT", "PATCH"].includes(req.method)) {
            return next();
        }

        const idempotencyKey = req.get("Idempotency-Key");

        // No idempotency key
        if (!idempotencyKey) {
            if (strict) {
                return res.status(400).json({
                    message: "Idempotency-Key header is required",
                });
            }

            return next();
        }

        let cacheProvider: ICacheProvider;

        try {
            cacheProvider = container.resolve<ICacheProvider>(
                TOKENS.CacheProvider
            );
        } catch {
            if (strict) {
                return res.status(503).json({
                    message: "Idempotency service is unavailable",
                });
            }

            return next();
        }

        const key = `idempotency:${req.method}:${req.originalUrl}:${idempotencyKey}`;

        try {
            // Check if this request was already processed
            const cachedResponse = await cacheProvider.get(key);

            if (cachedResponse) {
                return res.status(200).json(JSON.parse(cachedResponse));
            }

            // Keep the original res.json()
            const originalJson = res.json.bind(res);

            // Replace res.json() temporarily
            res.json = ((body: any) => {
                // Save the response asynchronously
                cacheProvider
                    .set(key, JSON.stringify(body), toMs(1, 'd'))
                    .catch((error) => {
                        console.error(
                            "Failed to store idempotency response:",
                            error
                        );
                    });

                // Send the response normally
                return originalJson(body);
            }) as typeof res.json;

            return next();
        } catch (error) {
            if (strict) {
                return res.status(503).json({
                    message: "Idempotency service is unavailable",
                });
            }

            return next();
        }
    };
};
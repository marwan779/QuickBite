import { logger } from "../logger/logger";
export function errorHandler(err, req, res, _next) {
    const operational = err.isOperational;
    logger.error(err.message, {
        statusCode: err.statusCode,
        stack: err.stack,
        operational: operational,
        body: req.body,
        correlationId: req.correlationId
    });
    if (operational) {
        return res.status(err.statusCode).json({
            error: err.message,
        });
    }
    return res.status(500).json({
        error: 'Something went wrong',
    });
}
//# sourceMappingURL=errorHandler.js.map
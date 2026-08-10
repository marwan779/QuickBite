import { v4 as uuidv4 } from 'uuid';
export function correlationId(req, res, next) {
    req.correlationId = uuidv4();
    res.setHeader('X-CorrelationId', uuidv4());
    next();
}
//# sourceMappingURL=correlationId.js.map
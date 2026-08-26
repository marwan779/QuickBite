import { UnAuthorisedError } from "./error";
export function authorize(allowedRoles) {
    return (req, _res, next) => {
        if (!req.user) {
            throw UnAuthorisedError;
        }
        if (!allowedRoles.includes(req.user.role)) {
            throw UnAuthorisedError;
        }
        next();
    };
}
//# sourceMappingURL=authorize.js.map
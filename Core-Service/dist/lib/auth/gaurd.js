import { verifyAccessToken } from "../../app/auth/utils";
import { NotAuthenticated } from "./error";
export function authenticate(req, _res, next) {
    const token = req.cookies.access_token;
    if (!token) {
        throw NotAuthenticated;
    }
    req.user = verifyAccessToken(token);
    next();
}
//# sourceMappingURL=gaurd.js.map
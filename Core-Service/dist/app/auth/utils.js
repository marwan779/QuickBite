import bcrypt from "bcrypt";
import jwt, {} from "jsonwebtoken";
import { env } from "../../common/config/env.js";
export async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}
export function createAccessToken(payload) {
    const options = { expiresIn: Number(env.jwt.accessExpiresIn) };
    return jwt.sign(payload, env.jwt.accessSecret, options);
}
export function createRefreshToken(payload) {
    const options = { expiresIn: Number(env.jwt.refreshExpiresIn) };
    return jwt.sign(payload, env.jwt.refreshSecret, options);
}
//# sourceMappingURL=utils.js.map
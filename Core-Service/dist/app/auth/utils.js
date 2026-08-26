import bcrypt from "bcrypt";
import jwt, {} from "jsonwebtoken";
import { env } from "../../lib/config/env";
import crypto from "crypto";
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
export function comparePassword(passwordInput, hashedPassword) {
    return bcrypt.compare(passwordInput, hashedPassword);
}
export function generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
}
export function hashOTP(otp) {
    return crypto.createHash("sha256").update(otp).digest("hex");
}
export function verifyAccessToken(token) {
    return jwt.verify(token, env.jwt.accessSecret);
}
export function verifyRefreshToken(token) {
    return jwt.verify(token, env.jwt.refreshSecret);
}
//# sourceMappingURL=utils.js.map
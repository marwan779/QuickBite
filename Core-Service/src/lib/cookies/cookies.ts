import { toMs } from "../../pkg/utils/time";

export const accessTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: toMs(1, 'h'),
};

export const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: toMs(7, 'd'),
    path: "/api/auth/refresh",
};
import { daysToMs, hoursToMs } from "../time/time";

export const accessTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: hoursToMs(1),
};

export const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: daysToMs(7),
    path: "/api/auth/refresh",
};
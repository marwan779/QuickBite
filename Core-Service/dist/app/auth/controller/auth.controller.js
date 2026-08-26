var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import {} from "../service/auth.service";
import { ForgetPasswordDTO, LoginDTO, RegisterDTO, ResetPasswordDTO } from "../dto/auth.dto";
import { validateBody } from "../../../lib/validation/validate";
import { accessTokenCookieOptions, refreshTokenCookieOptions } from "../../../lib/cookies/cookies";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../../lib/di/tokens";
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register = async (req, res, next) => {
        try {
            const data = await validateBody(RegisterDTO, req.body);
            const result = await this.authService.register(data);
            res.cookie("access_token", result.accessToken, accessTokenCookieOptions);
            res.cookie("refresh_token", result.refreshToken, refreshTokenCookieOptions);
            res.status(201).json({
                message: result.message,
                user: result.user,
                restaurant: result.restaurant
            });
        }
        catch (err) {
            next(err);
        }
    };
    login = async (req, res, next) => {
        try {
            const data = await validateBody(LoginDTO, req.body);
            const result = await this.authService.login(data);
            res.cookie("access_token", result.accessToken, accessTokenCookieOptions);
            res.cookie("refresh_token", result.refreshToken, refreshTokenCookieOptions);
            res.status(200).json({
                message: result.message,
                user: result.user,
            });
        }
        catch (err) {
            next(err);
        }
    };
    refresh = async (req, res, next) => {
        try {
            const refreshToken = req.cookies.refresh_token;
            const result = await this.authService.refresh(refreshToken);
            res.cookie("access_token", result.accessToken, accessTokenCookieOptions);
            res.status(200).json({
                message: "success",
            });
        }
        catch (err) {
            next(err);
        }
    };
    forgetPassword = async (req, res, next) => {
        try {
            const data = await validateBody(ForgetPasswordDTO, req.body);
            await this.authService.forgetPassword(data);
            res.status(200).json({
                "message": "Email Sent with OTP",
            });
        }
        catch (err) {
            next(err);
        }
    };
    resetPassword = async (req, res, next) => {
        try {
            const data = await validateBody(ResetPasswordDTO, req.body);
            await this.authService.resetPassword(data);
            res.status(200).json({
                "message": "Password reset successfully, please login again",
            });
        }
        catch (err) {
            next(err);
        }
    };
    acceptInvite = async (req, res, next) => {
        try {
            const data = await validateBody(ResetPasswordDTO, req.body);
            await this.authService.acceptInvite(data);
            res.status(200).json({
                "message": "Invitation accepted successfully, please login again",
            });
        }
        catch (err) {
            next(err);
        }
    };
};
AuthController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.AuthService)),
    __metadata("design:paramtypes", [Function])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map
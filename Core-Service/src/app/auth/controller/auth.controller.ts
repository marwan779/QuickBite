import type { Request, Response, NextFunction } from "express";
import { authService, type AuthService } from "../service/auth.service";
import { ForgetPasswordDTO, LoginDTO, RegisterDTO, ResetPasswordDTO } from "../dto/auth.dto";
import { validateBody } from "../../../common/validation/validate";
import { accessTokenCookieOptions, refreshTokenCookieOptions } from "../../../common/cookies/cookies";

export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await validateBody(RegisterDTO, req.body);
            const result = await this.authService.register(data);

            res.cookie(
                "access_token",
                result.accessToken,
                accessTokenCookieOptions
            );

            res.cookie(
                "refresh_token",
                result.refreshToken,
                refreshTokenCookieOptions
            );

            res.status(201).json({
                message: result.message,
                user: result.user,
                restaurant: result.restaurant
            });
        } catch (err) {
            next(err);
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await validateBody(LoginDTO, req.body);
            const result = await this.authService.login(data);

            res.cookie(
                "access_token",
                result.accessToken,
                accessTokenCookieOptions
            );

            res.cookie(
                "refresh_token",
                result.refreshToken,
                refreshTokenCookieOptions
            );

            res.status(200).json({
                message: result.message,
                user: result.user,
            });
        } catch (err) {
            next(err);
        }
    }


    refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const refreshToken = req.cookies.refresh_token;

            const result = await this.authService.refresh(refreshToken);

            res.cookie(
                "access_token",
                result.accessToken,
                accessTokenCookieOptions
            );

            res.status(200).json({
                message: "success",
            });
        } catch (err) {
            next(err);
        }
    }


    forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await validateBody(ForgetPasswordDTO, req.body);
            await this.authService.forgetPassword(data);
            res.status(200).json({
                "message": "Email Sent with OTP",
            })
        }
        catch (err) {
            next(err);
        }
    }

    resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await validateBody(ResetPasswordDTO, req.body);
            await this.authService.resetPassword(data);
            res.status(200).json({
                "message": "Password reset successfully, please login again",
            })
        }
        catch (err) {
            next(err);
        }
    }

    acceptInvite = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const data = await validateBody(ResetPasswordDTO, req.body);
            await this.authService.acceptInvite(data);
            res.status(200).json({
                "message": "Invitation accepted successfully, please login again",
            })
        }
        catch(err) {
            next(err);
        }
    }

}



export const authController = new AuthController(authService);
import type {Request, Response, NextFunction } from "express";
import { type UserService } from "../service/user.service";
import { UpdateUserDTO } from "../dto/user.dto";
import { validateBody } from "../../../lib/validation/validate";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../../lib/di/tokens";

@injectable()
export class UserController {
    constructor(@inject(TOKENS.UserService) private readonly userService: UserService) {}

    getMe = async(req: Request, res: Response, next : NextFunction) => {
        try {
            const user = await this.userService.getByUserId(req.user?.userId!);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    // update user
    updateMe = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await validateBody(UpdateUserDTO, req.body);
            const user = await this.userService.updateProfile(req.user?.userId!, data);
            res.status(200).json({message: "Profile updated", user});
        } catch (err) {
            next(err);
        }
    }

    getAgentById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const agent = await this.userService.getAgentById(Number(req.params.id));
            res.status(200).json({ data: agent });
        } catch (err) {
            next(err);
        }
    }
}
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
import {} from "../service/user.service";
import { UpdateUserDTO } from "../dto/user.dto";
import { validateBody } from "../../../lib/validation/validate";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../../lib/di/tokens";
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    getMe = async (req, res, next) => {
        try {
            const user = await this.userService.getByUserId(req.user?.userId);
            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    };
    // update user
    updateMe = async (req, res, next) => {
        try {
            const data = await validateBody(UpdateUserDTO, req.body);
            const user = await this.userService.updateProfile(req.user?.userId, data);
            res.status(200).json({ message: "Profile updated", user });
        }
        catch (err) {
            next(err);
        }
    };
    getAgentById = async (req, res, next) => {
        try {
            const agent = await this.userService.getAgentById(Number(req.params.id));
            res.status(200).json({ data: agent });
        }
        catch (err) {
            next(err);
        }
    };
};
UserController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.UserService)),
    __metadata("design:paramtypes", [Function])
], UserController);
export { UserController };
//# sourceMappingURL=user.controller.js.map
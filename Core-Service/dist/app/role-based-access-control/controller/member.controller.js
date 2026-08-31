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
import { validateBody } from "../../../lib/validation/validate";
import { CreateMemberDTO, UpdateMemberBranchesDTO, UpdateMemberDTO } from "../dto/member.dto";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../../lib/di/tokens";
import { RoleQueryRequiredError } from "../errors";
let MemberController = class MemberController {
    memberService;
    constructor(memberService) {
        this.memberService = memberService;
    }
    createMember = async (req, res, next) => {
        try {
            const data = await validateBody(CreateMemberDTO, req.body);
            const result = await this.memberService.createMember(Number(req.params.restaurantId), data);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    listMembers = async (req, res, next) => {
        try {
            const result = await this.memberService.listMembers(Number(req.params.restaurantId));
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
    updateMember = async (req, res, next) => {
        try {
            const data = await validateBody(UpdateMemberDTO, req.body);
            const result = await this.memberService.updateMember(Number(req.params.restaurantId), Number(req.params.memberId), data);
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
    deleteMember = async (req, res, next) => {
        try {
            const result = await this.memberService.deleteMember(Number(req.params.restaurantId), Number(req.params.memberId));
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
    updateMemberBranches = async (req, res, next) => {
        try {
            const data = await validateBody(UpdateMemberBranchesDTO, req.body);
            const result = await this.memberService.updateMemberBranches(Number(req.params.restaurantId), Number(req.params.memberId), data);
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
    getRolePermissions = async (req, res, next) => {
        try {
            // Cast the param to a string so TypeScript knows it's safe
            const roleName = req.params.role;
            const result = await this.memberService.getRolePermissions(roleName);
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
    getPermissionsByRole = async (req, res, next) => {
        try {
            const role = String(req.query.role ?? "");
            if (!role)
                throw RoleQueryRequiredError;
            const result = await this.memberService.getPermissionsByRole(role);
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
};
MemberController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.MemberService)),
    __metadata("design:paramtypes", [Function])
], MemberController);
export { MemberController };
//# sourceMappingURL=member.controller.js.map
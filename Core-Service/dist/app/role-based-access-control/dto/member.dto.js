var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsNotEmpty, IsString, IsArray, IsOptional, IsNumber, IsIn } from "class-validator";
export class CreateMemberDTO {
    email;
    name;
    phoneNumber;
    role;
    branchIds;
}
__decorate([
    IsEmail(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "email", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "name", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "phoneNumber", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "role", void 0);
__decorate([
    IsArray(),
    IsOptional(),
    __metadata("design:type", Array)
], CreateMemberDTO.prototype, "branchIds", void 0);
export class UpdateMemberDTO {
    role;
    status;
}
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateMemberDTO.prototype, "role", void 0);
__decorate([
    IsOptional(),
    IsIn(['active', 'inactive', 'suspended']),
    __metadata("design:type", String)
], UpdateMemberDTO.prototype, "status", void 0);
export class UpdateMemberBranchesDTO {
    branchIds;
}
__decorate([
    IsArray(),
    IsNumber({}, { each: true }),
    __metadata("design:type", Array)
], UpdateMemberBranchesDTO.prototype, "branchIds", void 0);
//# sourceMappingURL=member.dto.js.map
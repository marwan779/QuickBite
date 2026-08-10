var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, MinLength, IsString, IsStrongPassword, MaxLength, IsEnum } from "class-validator";
import { SystemRole } from "../../user/enums.js";
export class RegisterDTO {
    email;
    phone;
    name;
    password;
    role;
}
__decorate([
    IsEmail(),
    __metadata("design:type", String)
], RegisterDTO.prototype, "email", void 0);
__decorate([
    MinLength(10),
    MaxLength(11),
    __metadata("design:type", String)
], RegisterDTO.prototype, "phone", void 0);
__decorate([
    IsString(),
    MinLength(1),
    __metadata("design:type", String)
], RegisterDTO.prototype, "name", void 0);
__decorate([
    IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, {
        message: 'Password is not strong enough. It must contain at least 8 characters, one uppercase letter, one lowercase letter, one number.',
    }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "password", void 0);
__decorate([
    IsEnum(SystemRole),
    __metadata("design:type", String)
], RegisterDTO.prototype, "role", void 0);
//# sourceMappingURL=auth.dto.js.map
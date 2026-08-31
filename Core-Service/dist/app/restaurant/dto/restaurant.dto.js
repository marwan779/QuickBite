var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsEmail, MinLength, MaxLength, IsStrongPassword, ValidateNested } from "class-validator";
import { RestaurantStatus } from "../enums";
export class CreateRestaurantOwnerDTO {
    email;
    phone;
    name;
    password;
}
__decorate([
    IsEmail(),
    __metadata("design:type", String)
], CreateRestaurantOwnerDTO.prototype, "email", void 0);
__decorate([
    MinLength(10),
    MaxLength(11),
    __metadata("design:type", String)
], CreateRestaurantOwnerDTO.prototype, "phone", void 0);
__decorate([
    IsString(),
    MinLength(1),
    __metadata("design:type", String)
], CreateRestaurantOwnerDTO.prototype, "name", void 0);
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
], CreateRestaurantOwnerDTO.prototype, "password", void 0);
export class CreateRestaurantDTO {
    owner;
    name;
    logoUrl;
    primaryCountry;
}
__decorate([
    ValidateNested(),
    Type(() => CreateRestaurantOwnerDTO),
    __metadata("design:type", CreateRestaurantOwnerDTO)
], CreateRestaurantDTO.prototype, "owner", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateRestaurantDTO.prototype, "name", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateRestaurantDTO.prototype, "logoUrl", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateRestaurantDTO.prototype, "primaryCountry", void 0);
export class UpdateRestaurantDTO {
    name;
    logoUrl;
    primaryCountry;
}
__decorate([
    IsOptional(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], UpdateRestaurantDTO.prototype, "name", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateRestaurantDTO.prototype, "logoUrl", void 0);
__decorate([
    IsOptional(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], UpdateRestaurantDTO.prototype, "primaryCountry", void 0);
export class UpdateRestaurantStatusDTO {
    status;
}
__decorate([
    IsEnum(RestaurantStatus),
    __metadata("design:type", String)
], UpdateRestaurantStatusDTO.prototype, "status", void 0);
//# sourceMappingURL=restaurant.dto.js.map
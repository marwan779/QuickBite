var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsNumber, IsInt, Min, IsEnum, IsOptional, IsBoolean, MinLength } from "class-validator";
import { Currency } from "../enums";
export class CreateBranchDTO {
    countryCode;
    label;
    addressText;
    lat;
    lng;
    opensAt;
    closesAt;
    deliveryRadius;
    currency;
}
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateBranchDTO.prototype, "countryCode", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateBranchDTO.prototype, "label", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateBranchDTO.prototype, "addressText", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], CreateBranchDTO.prototype, "lat", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], CreateBranchDTO.prototype, "lng", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], CreateBranchDTO.prototype, "opensAt", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], CreateBranchDTO.prototype, "closesAt", void 0);
__decorate([
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], CreateBranchDTO.prototype, "deliveryRadius", void 0);
__decorate([
    IsEnum(Currency),
    __metadata("design:type", String)
], CreateBranchDTO.prototype, "currency", void 0);
export class UpdateBranchDTO {
    countryCode;
    label;
    addressText;
    lat;
    lng;
    opensAt;
    closesAt;
    deliveryRadius;
    currency;
    isActive;
    acceptOrders;
}
__decorate([
    IsOptional(),
    IsString(),
    IsNotEmpty(),
    MinLength(1),
    __metadata("design:type", String)
], UpdateBranchDTO.prototype, "countryCode", void 0);
__decorate([
    IsOptional(),
    IsString(),
    IsNotEmpty(),
    MinLength(1),
    __metadata("design:type", String)
], UpdateBranchDTO.prototype, "label", void 0);
__decorate([
    IsOptional(),
    IsString(),
    IsNotEmpty(),
    MinLength(1),
    __metadata("design:type", String)
], UpdateBranchDTO.prototype, "addressText", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], UpdateBranchDTO.prototype, "lat", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], UpdateBranchDTO.prototype, "lng", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateBranchDTO.prototype, "opensAt", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateBranchDTO.prototype, "closesAt", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], UpdateBranchDTO.prototype, "deliveryRadius", void 0);
__decorate([
    IsOptional(),
    IsEnum(Currency),
    __metadata("design:type", String)
], UpdateBranchDTO.prototype, "currency", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateBranchDTO.prototype, "isActive", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateBranchDTO.prototype, "acceptOrders", void 0);
export class UpdateBranchStatusDTO {
    isActive;
}
__decorate([
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateBranchStatusDTO.prototype, "isActive", void 0);
//# sourceMappingURL=branch.dto.js.map
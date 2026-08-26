var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, IsEnum, MinLength, IsUrl } from "class-validator";
import { RestaurantStatus } from "../enums";
export class CreateRestaurantDTO {
    name;
    logoURL;
    primaryCountry;
}
__decorate([
    IsString(),
    IsNotEmpty(),
    MinLength(1),
    __metadata("design:type", String)
], CreateRestaurantDTO.prototype, "name", void 0);
__decorate([
    IsOptional(),
    IsUrl(),
    __metadata("design:type", String)
], CreateRestaurantDTO.prototype, "logoURL", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    MinLength(1),
    __metadata("design:type", String)
], CreateRestaurantDTO.prototype, "primaryCountry", void 0);
export class UpdateRestaurantDTO {
    name;
    logoURL;
    primaryCountry;
}
__decorate([
    IsOptional(),
    IsString(),
    MinLength(1),
    __metadata("design:type", String)
], UpdateRestaurantDTO.prototype, "name", void 0);
__decorate([
    IsOptional(),
    IsUrl(),
    __metadata("design:type", String)
], UpdateRestaurantDTO.prototype, "logoURL", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MinLength(1),
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength, } from "class-validator";
export class CreateProductDTO {
    name;
    description;
    imageUrl;
    categoryName;
}
__decorate([
    IsString(),
    MinLength(1),
    MaxLength(255),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "name", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "description", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "imageUrl", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MinLength(1),
    MaxLength(255),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "categoryName", void 0);
export class UpdateProductDTO {
    name;
    description;
    imageUrl;
    categoryName;
    price;
    stock;
    isAvailable;
}
__decorate([
    IsOptional(),
    IsString(),
    MinLength(1),
    MaxLength(255),
    __metadata("design:type", String)
], UpdateProductDTO.prototype, "name", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateProductDTO.prototype, "description", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateProductDTO.prototype, "imageUrl", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MinLength(1),
    MaxLength(255),
    __metadata("design:type", String)
], UpdateProductDTO.prototype, "categoryName", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], UpdateProductDTO.prototype, "price", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], UpdateProductDTO.prototype, "stock", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateProductDTO.prototype, "isAvailable", void 0);
//# sourceMappingURL=product.dto.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, MaxLength, } from "class-validator";
export var AddressType;
(function (AddressType) {
    AddressType["OFFICE"] = "office";
    AddressType["HOME"] = "home";
    AddressType["PUBLIC_PLACE"] = "public_place";
})(AddressType || (AddressType = {}));
export class CreateCustomerAddressDTO {
    label;
    country;
    city;
    street;
    building;
    apartmentNumber;
    type;
    lat;
    lng;
    isDefault;
}
__decorate([
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateCustomerAddressDTO.prototype, "label", void 0);
__decorate([
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateCustomerAddressDTO.prototype, "country", void 0);
__decorate([
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateCustomerAddressDTO.prototype, "city", void 0);
__decorate([
    IsString(),
    MaxLength(255),
    __metadata("design:type", String)
], CreateCustomerAddressDTO.prototype, "street", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateCustomerAddressDTO.prototype, "building", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateCustomerAddressDTO.prototype, "apartmentNumber", void 0);
__decorate([
    IsEnum(AddressType),
    __metadata("design:type", String)
], CreateCustomerAddressDTO.prototype, "type", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], CreateCustomerAddressDTO.prototype, "lat", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], CreateCustomerAddressDTO.prototype, "lng", void 0);
__decorate([
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateCustomerAddressDTO.prototype, "isDefault", void 0);
export class UpdateCustomerAddressDTO {
    label;
    country;
    city;
    street;
    building;
    apartmentNumber;
    type;
    lat;
    lng;
    isDefault;
}
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], UpdateCustomerAddressDTO.prototype, "label", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], UpdateCustomerAddressDTO.prototype, "country", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], UpdateCustomerAddressDTO.prototype, "city", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(255),
    __metadata("design:type", String)
], UpdateCustomerAddressDTO.prototype, "street", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], UpdateCustomerAddressDTO.prototype, "building", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], UpdateCustomerAddressDTO.prototype, "apartmentNumber", void 0);
__decorate([
    IsOptional(),
    IsEnum(AddressType),
    __metadata("design:type", String)
], UpdateCustomerAddressDTO.prototype, "type", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], UpdateCustomerAddressDTO.prototype, "lat", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], UpdateCustomerAddressDTO.prototype, "lng", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateCustomerAddressDTO.prototype, "isDefault", void 0);
//# sourceMappingURL=address.dto.js.map
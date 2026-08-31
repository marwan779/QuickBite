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
import {} from "../service/customer-address.service";
import { CreateCustomerAddressDTO, UpdateCustomerAddressDTO, } from "../dto/address.dto";
import { validateBody } from "../../../lib/validation/validate";
import { NotAuthenticated } from "../../../lib/auth/error";
import { TOKENS } from "../../../lib/di/tokens";
import { injectable, inject } from "tsyringe";
let CustomerAddressController = class CustomerAddressController {
    customerAddressService;
    constructor(customerAddressService) {
        this.customerAddressService = customerAddressService;
    }
    getAddresses = async (req, res, next) => {
        try {
            if (!req.user) {
                throw NotAuthenticated;
            }
            const addresses = await this.customerAddressService.getAddresses(req.user.userId);
            res.status(200).json({
                data: addresses,
            });
        }
        catch (err) {
            next(err);
        }
    };
    addAddress = async (req, res, next) => {
        try {
            if (!req.user) {
                throw NotAuthenticated;
            }
            const data = await validateBody(CreateCustomerAddressDTO, req.body);
            const address = await this.customerAddressService.addAddress(req.user.userId, data);
            res.status(201).json({
                message: "Address added",
                address,
            });
        }
        catch (err) {
            next(err);
        }
    };
    updateAddress = async (req, res, next) => {
        try {
            if (!req.user) {
                throw NotAuthenticated;
            }
            const data = await validateBody(UpdateCustomerAddressDTO, req.body);
            const addressId = Number(req.params.addressId);
            const address = await this.customerAddressService.updateAddress(req.user.userId, addressId, data);
            res.status(200).json({
                message: "Address updated",
                address,
            });
        }
        catch (err) {
            next(err);
        }
    };
    deleteAddress = async (req, res, next) => {
        try {
            if (!req.user) {
                throw NotAuthenticated;
            }
            const addressId = Number(req.params.addressId);
            await this.customerAddressService.deleteAddress(req.user.userId, addressId);
            res.status(200).json({
                message: "Address deleted",
            });
        }
        catch (err) {
            next(err);
        }
    };
    getById = async (req, res, next) => {
        try {
            const address = await this.customerAddressService.getById(Number(req.params.id));
            res.status(200).json({ data: address });
        }
        catch (err) {
            next(err);
        }
    };
};
CustomerAddressController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.CustomerAddressService)),
    __metadata("design:paramtypes", [Function])
], CustomerAddressController);
export { CustomerAddressController };
//# sourceMappingURL=customer-address.controller.js.map
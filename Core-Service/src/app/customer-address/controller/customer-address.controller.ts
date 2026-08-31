import type { Request, Response, NextFunction } from "express";
import {
    type CustomerAddressService,
} from "../service/customer-address.service";
import {
    CreateCustomerAddressDTO,
    UpdateCustomerAddressDTO,
} from "../dto/address.dto";
import { validateBody } from "../../../lib/validation/validate";
import { NotAuthenticated } from "../../../lib/auth/error";
import { TOKENS } from "../../../lib/di/tokens";
import { injectable, inject } from "tsyringe";

@injectable()
export class CustomerAddressController {
    constructor(
        @inject(TOKENS.CustomerAddressService) private readonly customerAddressService: CustomerAddressService
    ) {}


    getAddresses = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.user) {
                throw NotAuthenticated;
            }

            const addresses =
                await this.customerAddressService.getAddresses(
                    req.user.userId
                );

            res.status(200).json({
                data: addresses,
            });
        } catch (err) {
            next(err);
        }
    };


    addAddress = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.user) {
                throw NotAuthenticated;
            }

            const data = await validateBody(
                CreateCustomerAddressDTO,
                req.body
            );

            const address =
                await this.customerAddressService.addAddress(
                    req.user.userId,
                    data
                );

            res.status(201).json({
                message: "Address added",
                address,
            });
        } catch (err) {
            next(err);
        }
    };


    updateAddress = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.user) {
                throw NotAuthenticated;
            }

            const data = await validateBody(
                UpdateCustomerAddressDTO,
                req.body
            );

            const addressId = Number(req.params.addressId);

            const address =
                await this.customerAddressService.updateAddress(
                    req.user.userId,
                    addressId,
                    data
                );

            res.status(200).json({
                message: "Address updated",
                address,
            });
        } catch (err) {
            next(err);
        }
    };


    deleteAddress = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.user) {
                throw NotAuthenticated;
            }

            const addressId = Number(req.params.addressId);

            await this.customerAddressService.deleteAddress(
                req.user.userId,
                addressId
            );

            res.status(200).json({
                message: "Address deleted",
            });
        } catch (err) {
            next(err);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const address = await this.customerAddressService.getById(Number(req.params.id));
            res.status(200).json({ data: address });
        } catch (err) {
            next(err);
        }
    };
}



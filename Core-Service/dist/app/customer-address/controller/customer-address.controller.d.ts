import type { Request, Response, NextFunction } from "express";
import { type CustomerAddressService } from "../service/customer-address.service";
export declare class CustomerAddressController {
    private readonly customerAddressService;
    constructor(customerAddressService: CustomerAddressService);
    getAddresses: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    addAddress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateAddress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteAddress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=customer-address.controller.d.ts.map
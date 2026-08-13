import { Router } from "express";
import { authenticate } from "../../common/auth/gaurd";
import { customerAddressController } from "./controller/customer-address.controller";

const customerAddressRouter = Router();

customerAddressRouter.get(
    "/",
    authenticate,
    customerAddressController.getAddresses
);

customerAddressRouter.post(
    "/",
    authenticate,
    customerAddressController.addAddress
);

customerAddressRouter.patch(
    "/:addressId",
    authenticate,
    customerAddressController.updateAddress
);

customerAddressRouter.delete(
    "/:addressId",
    authenticate,
    customerAddressController.deleteAddress
);

export default customerAddressRouter;
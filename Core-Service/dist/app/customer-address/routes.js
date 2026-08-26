import { Router } from "express";
import { authenticate } from "../../lib/auth/gaurd";
import { CustomerAddressController } from "./controller/customer-address.controller";
import { TOKENS } from "../../lib/di/tokens";
import { container } from "../../lib/di/container";
const customerAddressController = container.resolve(TOKENS.CustomerAddressController);
const customerAddressRouter = Router();
customerAddressRouter.get("/", authenticate, customerAddressController.getAddresses);
customerAddressRouter.post("/", authenticate, customerAddressController.addAddress);
customerAddressRouter.patch("/:addressId", authenticate, customerAddressController.updateAddress);
customerAddressRouter.delete("/:addressId", authenticate, customerAddressController.deleteAddress);
export default customerAddressRouter;
//# sourceMappingURL=routes.js.map
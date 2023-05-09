import { Router } from "express";

import { AddressController } from "@modules/client/controller/AddressController";
import { ensureClientAuthenticated } from "@shared/infra/http/middlewares/ensureClientAuthenticated";

const addressController = new AddressController();

const addressRouter = Router();

addressRouter.post("/", ensureClientAuthenticated, addressController.create);
addressRouter.put("/:id", ensureClientAuthenticated, addressController.update);
addressRouter.delete(
  "/:id",
  ensureClientAuthenticated,
  addressController.delete
);

export { addressRouter };

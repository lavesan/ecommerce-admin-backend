import { Router } from "express";

import { AddressController } from "@modules/client/controller/AddressController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const addressController = new AddressController();

const addressRouter = Router();

addressRouter.post(
  "/",
  ensureAuthenticated("client"),
  addressController.create
);
addressRouter.put(
  "/:id",
  ensureAuthenticated("client"),
  addressController.update
);
addressRouter.patch(
  "/:id",
  ensureAuthenticated("client"),
  addressController.updateDefault
);
addressRouter.delete(
  "/:id",
  ensureAuthenticated("client"),
  addressController.delete
);

export { addressRouter };

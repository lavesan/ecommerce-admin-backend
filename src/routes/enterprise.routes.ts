import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { EnterpriseController } from "@modules/enterprise/controller/EnterpriseController";

const enterpriseController = new EnterpriseController();

const enterpriseRouter = Router();

enterpriseRouter.get("/all", enterpriseController.findAll);
enterpriseRouter.get("/all/products", enterpriseController.findAllWithProducts);
enterpriseRouter.get("/menu/:id", enterpriseController.findMenuById);
enterpriseRouter.get("/:id", enterpriseController.findById);

enterpriseRouter.get("/", ensureAuthenticated, enterpriseController.paginate);
enterpriseRouter.post("/", ensureAuthenticated, enterpriseController.create);
enterpriseRouter.put("/:id", ensureAuthenticated, enterpriseController.update);
enterpriseRouter.delete(
  "/:id",
  ensureAuthenticated,
  enterpriseController.delete
);

export { enterpriseRouter };

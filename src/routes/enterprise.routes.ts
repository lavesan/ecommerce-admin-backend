import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { EnterpriseController } from "@modules/enterprise/controller/EnterpriseController";

const enterpriseController = new EnterpriseController();

const enterpriseRouter = Router();

enterpriseRouter.get("/all", enterpriseController.findAll);
enterpriseRouter.get("/menu/:id", enterpriseController.findMenuById);

enterpriseRouter.get("/", ensureAuthenticated, enterpriseController.paginate);
enterpriseRouter.get(
  "/:id",
  ensureAuthenticated,
  enterpriseController.findById
);
enterpriseRouter.post("/", ensureAuthenticated, enterpriseController.create);
enterpriseRouter.put("/:id", ensureAuthenticated, enterpriseController.update);
enterpriseRouter.delete(
  "/:id",
  ensureAuthenticated,
  enterpriseController.delete
);

export { enterpriseRouter };

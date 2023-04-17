import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { EnterpriseController } from "@modules/enterprise/controller/EnterpriseController";

const enterpriseController = new EnterpriseController();

const enterpriseRouter = Router();

enterpriseRouter.get("/", enterpriseController.paginate);
enterpriseRouter.get("/:id", enterpriseController.findById);
enterpriseRouter.get("/menu/:id", enterpriseController.findAllMenuById);
enterpriseRouter.post("/", enterpriseController.create);
enterpriseRouter.put("/:id", enterpriseController.update);
enterpriseRouter.delete("/:id", enterpriseController.delete);

export { enterpriseRouter };

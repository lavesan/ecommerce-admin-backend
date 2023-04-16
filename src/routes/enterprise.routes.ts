import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { EnterpriseController } from "@modules/enterprise/controller/EnterpriseController";

const enterpriseController = new EnterpriseController();

const enterpriseRouter = Router();

enterpriseRouter.get("/", enterpriseController.paginate);
enterpriseRouter.post("/", enterpriseController.create);

export { enterpriseRouter };

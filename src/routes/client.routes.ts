import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlwares/ensureAuthenticated";
import { ClientController } from "@modules/client/controller/ClientController";

const clientController = new ClientController();

const clientRouter = Router();

clientRouter.get("/", clientController.paginate);
clientRouter.get("/:id", clientController.findById);
clientRouter.post("/", clientController.create);
clientRouter.put("/:id", clientController.update);

export { clientRouter };

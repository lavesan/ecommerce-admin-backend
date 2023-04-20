import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ClientController } from "@modules/client/controller/ClientController";

const clientController = new ClientController();

const clientRouter = Router();

clientRouter.get("/", ensureAuthenticated, clientController.paginate);

clientRouter.post("/", clientController.create);
clientRouter.put("/:id", clientController.update);
clientRouter.get("/:id", clientController.findById);

export { clientRouter };

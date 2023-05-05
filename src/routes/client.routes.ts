import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ClientController } from "@modules/client/controller/ClientController";

const clientController = new ClientController();

const clientRouter = Router();

clientRouter.get("/", ensureAuthenticated, clientController.paginate);
clientRouter.get("/me", ensureAuthenticated, clientController.findMe);
clientRouter.get("/:id", ensureAuthenticated, clientController.findById);

clientRouter.post("/login", clientController.login);
clientRouter.post("/", clientController.create);
clientRouter.put("/:id", clientController.update);

export { clientRouter };

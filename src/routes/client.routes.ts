import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ClientController } from "@modules/client/controller/ClientController";
import { ensureGoogleAuthenticated } from "@shared/infra/http/middlewares/ensureGoogleAuthenticated";
import { ensureClientAuthenticated } from "@shared/infra/http/middlewares/ensureClientAuthenticated";

const clientController = new ClientController();

const clientRouter = Router();

// Login by google
clientRouter.post(
  "/google-oauth",
  ensureGoogleAuthenticated,
  clientController.loginByGoogle
);

// Logged Routes
clientRouter.get("/me", ensureClientAuthenticated, clientController.findMe);
clientRouter.put("/:id", ensureClientAuthenticated, clientController.update);

// Admin routes
clientRouter.get("/", ensureAuthenticated, clientController.paginate);
clientRouter.get("/:id", ensureAuthenticated, clientController.findById);

// Public routes
clientRouter.post("/login", clientController.login);
clientRouter.post("/", clientController.create);

export { clientRouter };

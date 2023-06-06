import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ClientController } from "@modules/client/controller/ClientController";
import { ensureGoogleAuthenticated } from "@shared/infra/http/middlewares/ensureGoogleAuthenticated";
import { ensureForgotPwdAuthenticated } from "@shared/infra/http/middlewares/ensureForgoPwdAuthenticated";

const clientController = new ClientController();

const clientRouter = Router();

// Login by google
clientRouter.post(
  "/google-oauth",
  ensureGoogleAuthenticated,
  clientController.loginByGoogle
);

// Logged Routes
clientRouter.get("/me", ensureAuthenticated("client"), clientController.findMe);
clientRouter.put(
  "/:id",
  ensureAuthenticated("client"),
  clientController.update
);

// Admin routes
clientRouter.get(
  "/",
  ensureAuthenticated("dashboard"),
  clientController.paginate
);
clientRouter.get(
  "/:id",
  ensureAuthenticated("dashboard"),
  clientController.findById
);

// Public routes
clientRouter.post("/login", clientController.login);
clientRouter.post("/", clientController.create);
clientRouter.post("/forgot-password", clientController.forgotPassword);

// Reset Password route
clientRouter.patch(
  "/reset-password",
  ensureForgotPwdAuthenticated,
  clientController.resetPassword
);

export { clientRouter };

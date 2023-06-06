import { Router } from "express";

import { RefreshAuthTokenController } from "@modules/auth/controller/RefreshAuthTokenController";
import { ensureRefreshAuthenticated } from "@shared/infra/http/middlewares/ensureRefreshAuthenticated";

const refreshAuthTokenController = new RefreshAuthTokenController();

const refreshTokenRouter = Router();

// Client refresh token
refreshTokenRouter.post(
  "/client/refresh",
  ensureRefreshAuthenticated("client"),
  refreshAuthTokenController.refresh
);
refreshTokenRouter.delete(
  "/client/logout",
  ensureRefreshAuthenticated("client"),
  refreshAuthTokenController.logout
);

// User dashboard refresh token
refreshTokenRouter.post(
  "/user/refresh",
  ensureRefreshAuthenticated("dashboard"),
  refreshAuthTokenController.logout
);
refreshTokenRouter.delete(
  "/user/logout",
  ensureRefreshAuthenticated("dashboard"),
  refreshAuthTokenController.logout
);

export { refreshTokenRouter };

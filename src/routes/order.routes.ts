import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { OrderController } from "@modules/order/controller/OrderController";

const orderController = new OrderController();

const orderRouter = Router();

// Client routes
orderRouter.post("/", ensureAuthenticated("client"), orderController.create);
orderRouter.get(
  "/mine/all",
  ensureAuthenticated("client"),
  orderController.paginateMine
);
orderRouter.get(
  "/mine/:id",
  ensureAuthenticated("client"),
  orderController.findMineById
);
orderRouter.patch(
  "/mine/conclude/:id",
  ensureAuthenticated("client"),
  orderController.conclude
);

// Dashboard routes
orderRouter.get(
  "/",
  ensureAuthenticated("dashboard"),
  orderController.paginate
);
orderRouter.get(
  "/active-orders",
  ensureAuthenticated("dashboard"),
  orderController.activeOrdersCount
);
orderRouter.get(
  "/:id",
  ensureAuthenticated("dashboard"),
  orderController.findById
);
orderRouter.patch(
  "/:id",
  ensureAuthenticated("dashboard"),
  orderController.update
);

export { orderRouter };

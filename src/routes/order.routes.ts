import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { OrderController } from "@modules/order/controller/OrderController";

const orderController = new OrderController();

const orderRouter = Router();

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
  "/mine/conclude",
  ensureAuthenticated("client"),
  orderController.conclude
);

orderRouter.get(
  "/",
  ensureAuthenticated("dashboard"),
  orderController.paginate
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

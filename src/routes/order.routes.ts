import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { OrderController } from "@modules/order/controller/OrderController";
import { ensureClientAuthenticated } from "@shared/infra/http/middlewares/ensureClientAuthenticated";

const orderController = new OrderController();

const orderRouter = Router();

orderRouter.post("/", ensureClientAuthenticated, orderController.create);

orderRouter.get("/", ensureAuthenticated, orderController.paginate);
orderRouter.get("/:id", ensureAuthenticated, orderController.findById);
orderRouter.patch("/:id", ensureAuthenticated, orderController.update);

export { orderRouter };

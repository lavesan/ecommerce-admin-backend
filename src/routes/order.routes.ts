import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { OrderController } from "@modules/order/controller/OrderController";

const orderController = new OrderController();

const orderRouter = Router();

orderRouter.get("/", ensureAuthenticated, orderController.paginate);
orderRouter.get("/:id", ensureAuthenticated, orderController.findById);
orderRouter.patch("/:id", ensureAuthenticated, orderController.update);

orderRouter.post("/", orderController.create);

export { orderRouter };

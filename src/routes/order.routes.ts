import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { OrderController } from "@modules/order/controller/OrderController";

const orderController = new OrderController();

const orderRouter = Router();

orderRouter.get("/", orderController.paginate);
orderRouter.get("/:id", orderController.findById);
orderRouter.post("/", orderController.create);
orderRouter.patch("/:id", orderController.update);

export { orderRouter };

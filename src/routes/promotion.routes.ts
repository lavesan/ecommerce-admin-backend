import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { PromotionController } from "@modules/promotion/controller/PromotionController";

const promotionController = new PromotionController();

const promotionRouter = Router();

promotionRouter.get("/", ensureAuthenticated, promotionController.paginate);
promotionRouter.get("/:id", ensureAuthenticated, promotionController.findById);
promotionRouter.post("/", ensureAuthenticated, promotionController.create);
promotionRouter.put("/:id", ensureAuthenticated, promotionController.update);

export { promotionRouter };

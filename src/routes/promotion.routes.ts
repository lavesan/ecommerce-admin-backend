import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlwares/ensureAuthenticated";
import { PromotionController } from "@modules/promotion/controller/PromotionController";

const promotionController = new PromotionController();

const promotionRouter = Router();

promotionRouter.get("/", promotionController.paginate);
promotionRouter.get("/:id", promotionController.findById);
promotionRouter.post("/", promotionController.create);

export { promotionRouter };

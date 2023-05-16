import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { PromotionController } from "@modules/promotion/controller/PromotionController";

const promotionController = new PromotionController();

const promotionRouter = Router();

promotionRouter.get("/all", promotionController.findAll);
promotionRouter.get("/:id", promotionController.findById);
promotionRouter.get("/:enterpriseId/:weekDay", promotionController.findById);

promotionRouter.get("/", ensureAuthenticated, promotionController.paginate);
promotionRouter.post("/", ensureAuthenticated, promotionController.create);
promotionRouter.put("/:id", ensureAuthenticated, promotionController.update);

export { promotionRouter };

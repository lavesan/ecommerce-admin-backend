import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { CategoryController } from "@modules/product/controller/CategoryController";

const categoryController = new CategoryController();

const categoryRouter = Router();

categoryRouter.get(
  "/",
  ensureAuthenticated("dashboard"),
  categoryController.paginate
);
categoryRouter.get(
  "/:id",
  ensureAuthenticated("dashboard"),
  categoryController.findById
);
categoryRouter.post(
  "/",
  ensureAuthenticated("dashboard"),
  categoryController.create
);
categoryRouter.put(
  "/:id",
  ensureAuthenticated("dashboard"),
  categoryController.update
);

export { categoryRouter };

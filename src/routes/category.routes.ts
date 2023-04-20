import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { CategoryController } from "@modules/product/controller/CategoryController";

const categoryController = new CategoryController();

const categoryRouter = Router();

categoryRouter.get("/", ensureAuthenticated, categoryController.paginate);
categoryRouter.get("/:id", ensureAuthenticated, categoryController.findById);
categoryRouter.post("/", ensureAuthenticated, categoryController.create);
categoryRouter.put("/:id", ensureAuthenticated, categoryController.update);

export { categoryRouter };

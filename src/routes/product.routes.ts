import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ProductController } from "@modules/product/controller/ProductController";

const productController = new ProductController();

const productRouter = Router();

productRouter.get("/:id", productController.findById);

productRouter.get(
  "/",
  ensureAuthenticated("dashboard"),
  productController.paginate
);
productRouter.get(
  "/enterprise/:enterpriseId",
  ensureAuthenticated("dashboard"),
  productController.findManyByEnterpriseId
);
productRouter.post(
  "/",
  ensureAuthenticated("dashboard"),
  productController.create
);
productRouter.put(
  "/:id",
  ensureAuthenticated("dashboard"),
  productController.update
);

export { productRouter };

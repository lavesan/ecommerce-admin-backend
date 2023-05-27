import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { FreightController } from "@modules/freight/controller/FreightController";

const freightController = new FreightController();

const freightRouter = Router();

freightRouter.get("/all/:enterpriseId", freightController.findAll);

freightRouter.post(
  "/",
  ensureAuthenticated("dashboard"),
  freightController.create
);

export { freightRouter };

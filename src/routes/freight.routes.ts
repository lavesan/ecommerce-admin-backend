import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { FreightController } from "@modules/freight/controller/FreightController";

const freightController = new FreightController();

const freightRouter = Router();

freightRouter.post("/", ensureAuthenticated, freightController.create);

freightRouter.get("/all/:enterpriseId", freightController.findAll);

export { freightRouter };

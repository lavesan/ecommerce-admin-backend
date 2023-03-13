import { Router } from "express";

import { CreateAgentController } from "@modules/agent/useCases/createAgent/CreateAgentController";

const agentsRouter = Router();
const createAgentController = new CreateAgentController();

agentsRouter.post("/", createAgentController.execute);

export { agentsRouter };

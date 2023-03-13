import { Router, Request, Response } from "express";

import { authenticationRouter } from "./authentication.routes";
import { agentsRouter } from "./agents.routes";

const router = Router();

router.get("/healthy", (req: Request, res: Response) => res.send("Ok"));

router.use("/", authenticationRouter);
router.use("/public/agents", agentsRouter);

export { router };

import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshAuthTokenService } from "../services/RefreshAuthTokenService";
import { getRefreshToken } from "@helpers/auth.helper";

export class RefreshAuthTokenController {
  async logout(req: Request, res: Response) {
    const service = container.resolve(RefreshAuthTokenService);

    const refreshToken = getRefreshToken(req);

    const result = await service.logout(refreshToken);

    return res.json({ ok: result });
  }

  async refresh(req: Request, res: Response) {
    const service = container.resolve(RefreshAuthTokenService);

    const refreshToken = getRefreshToken(req);

    let id = "";

    if (req.userRole === "client") id = req.client.id;
    else id = req.user.id;

    const result = await service.refresh(refreshToken, req.userRole, id);

    return res.json(result);
  }
}

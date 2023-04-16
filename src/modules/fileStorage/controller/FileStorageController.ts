import { Request, Response } from "express";
import { container } from "tsyringe";
import { FileStorageService } from "../services/FileStorageService";

export class FileStorageController {
  async upload(req: Request, res: Response) {
    const service = container.resolve(FileStorageService);

    const { key } = req.body;

    const result = await service.upload({ file: req.file, imageKey: key });

    return res.json(result);
  }

  async findByKey(req: Request, res: Response) {
    const service = container.resolve(FileStorageService);

    const { key } = req.params;

    const result = await service.find(key);

    return res.json(result);
  }

  async deleteByKey(req: Request, res: Response) {
    const service = container.resolve(FileStorageService);

    const { key } = req.params;

    const result = await service.delete(key);

    return res.json(result);
  }
}

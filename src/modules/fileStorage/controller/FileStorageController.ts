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

    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.write(result, "binary");
    return res.end(null, "binary");
  }

  async findBase64ByKey(req: Request, res: Response) {
    const service = container.resolve(FileStorageService);

    const { key } = req.params;

    const result = await service.findBase64(key);

    return res.json({ base64: result });
  }

  async deleteByKey(req: Request, res: Response) {
    const service = container.resolve(FileStorageService);

    const { key } = req.params;

    const result = await service.delete(key);

    return res.json(result);
  }
}

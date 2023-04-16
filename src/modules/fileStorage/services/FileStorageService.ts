import { inject, injectable } from "tsyringe";
import { IFileStorageRepository } from "../repositories/IFileStorageRepository";
import { IUploadImageRequest } from "../models/IUploadImageRequest";

@injectable()
export class FileStorageService {
  constructor(
    @inject("FileStorageRepository")
    private readonly fileStorageRepository: IFileStorageRepository
  ) {}

  upload(body: IUploadImageRequest) {
    return this.fileStorageRepository.upload(body);
  }

  find(key: string) {
    return this.fileStorageRepository.find(key);
  }

  delete(key: string) {
    return this.fileStorageRepository.delete(key);
  }
}

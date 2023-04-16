import { IDeleteImageResponse } from "../models/IDeleteImageResponse";
import { IFindImageResponse } from "../models/IFindImageResponse";
import { IUploadImageRequest } from "../models/IUploadImageRequest";
import { IUploadImageResponse } from "../models/IUploadImageResponse";

export interface IFileStorageRepository {
  upload(body: IUploadImageRequest): Promise<IUploadImageResponse>;
  delete(key: string): Promise<IDeleteImageResponse>;
  find(key: string): Promise<IFindImageResponse>;
}

import aws, { S3 } from "aws-sdk";
import fs from "fs";

import { IFileStorageRepository } from "./IFileStorageRepository";
import { IUploadImageRequest } from "../models/IUploadImageRequest";
import { IUploadImageResponse } from "../models/IUploadImageResponse";
import { IDeleteImageResponse } from "../models/IDeleteImageResponse";

export class AWSS3Repository implements IFileStorageRepository {
  private readonly s3: S3;
  private readonly bucket: string;

  constructor() {
    this.s3 = new aws.S3({
      apiVersion: "2006-03-01",
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_KEY,
      },
    });

    this.bucket = process.env.S3_BUCKET;
  }

  async upload({
    file,
    imageKey,
  }: IUploadImageRequest): Promise<IUploadImageResponse> {
    await this.delete(imageKey);

    // @ts-ignore
    const base64Img = Buffer.from(fs.readFileSync(file.path), "base64");

    fs.unlinkSync(file.path);

    // call S3 to retrieve upload file to specified bucket
    const s3Response = await this.s3
      .upload({ Bucket: this.bucket, Key: imageKey, Body: base64Img })
      .promise();

    return { key: s3Response.Key };
  }

  async find(key: string): Promise<any> {
    const s3Response = await this.s3
      .getObject({ Bucket: this.bucket, Key: key })
      .promise();
    return s3Response.Body;
  }

  async delete(key: string): Promise<IDeleteImageResponse> {
    await this.s3.deleteObject({ Bucket: this.bucket, Key: key }).promise();

    return { deleted: true };
  }
}

import { ProductAdditionalType } from "../enums/ProductAdditionalType";

export interface ICreateProductAdditionalCategory {
  name: string;
  description: string;
  limit: number;
  type: ProductAdditionalType;
  imageUrl: string;
  isOptional: boolean;
}

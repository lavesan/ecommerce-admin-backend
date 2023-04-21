import { ProductAdditionalType } from "../enums/ProductAdditionalType";

export interface ICreateProductAdditionalCategory {
  name: string;
  description: string;
  limit: number;
  type: ProductAdditionalType;
  isOptional: boolean;
  isDisabled: boolean;
}

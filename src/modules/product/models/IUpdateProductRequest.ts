import { ProductAdditionalType } from "../enums/ProductAdditionalType";

interface IUpdateProductAdditionalCategory {
  id?: string;
  name: string;
  description: string;
  limit: number;
  type: ProductAdditionalType;
  imageKey: string;
  isOptional: boolean;
  isDisabled?: boolean;
  productAdditionals: {
    id?: string;
    name: string;
    imageKey: string;
    value: number;
    isDisabled?: boolean;
  }[];
}

export interface IUpdateProductRequest {
  categoryId: string;
  name: string;
  description: string;
  boldDescription: string;
  imageKey: string;
  value: number;
  givenPoints: number;
  sellPoints: number;
  isDisabled?: boolean;
  productAdditionalCategory: IUpdateProductAdditionalCategory[];
}

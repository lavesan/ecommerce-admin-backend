import { PaymentType } from "../enums/PaymentType";

export interface ICreateOrder {
  freightValue: number;
  productsValue: number;
  promotionsDiscount?: number;
  paymentType: PaymentType;
  enterpriseId: string;
  freightId: string;
  clientId: string;
  hasCents?: boolean;
  products: {
    id: string;
    quantity: number;
    value: number;
    points: number;
    additionals: {
      id: string;
      value: number;
      quantity: number;
    }[];
  }[];
  address: {
    cep: string;
    street: string;
    complement?: string;
    number: string;
    district: string;
    state: string;
    city: string;
    shortName?: string;
  };
  moneyExchange?: {
    value: number;
    quantity: number;
  }[];
}

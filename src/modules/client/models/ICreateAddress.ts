export interface ICreateAddress {
  cep: string;
  street: string;
  complement: string;
  number: string;
  district: string;
  state: string;
  city: string;
  shortName: string;
  isDefault: boolean;
  clientId?: string;
  orderId?: string;
}

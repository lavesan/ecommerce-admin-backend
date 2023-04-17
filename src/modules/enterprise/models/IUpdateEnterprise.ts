export interface IUpdateEnterprise {
  name: string;
  email: string;
  description: string;
  cnpj: string;
  cep: string;
  street: string;
  complement: string;
  number: string;
  district: string;
  state: string;
  city: string;
  imageKey: string;
  userId: string;
  freights: {
    id?: string;
    addressKey: string;
    addressValue: string;
    value: number;
  }[];
}

export interface IUpdateClient {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  addressses?: {
    id?: string;
    cep: string;
    street: string;
    complement?: string;
    number: string;
    district: string;
    state: string;
    city: string;
    shortName: string;
  }[];
}

export interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  enterpriseId?: string;
}

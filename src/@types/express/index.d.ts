import { RoleType } from "@shared/infra/http/middlewares/ensureAuthenticated";

declare namespace Express {
  export interface Request {
    user: {
      id: string;
      name: string;
      email: string;
      isAdmin: boolean;
    };
    client: {
      id?: string;
      name: string;
      email: string;
    };
    userRole: RoleType;
  }
}

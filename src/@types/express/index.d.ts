declare namespace Express {
  export interface Request {
    user: {
      id: string;
      domain: string;
    };
  }
}

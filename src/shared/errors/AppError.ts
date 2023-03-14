export class AppError {
  readonly message: string;

  readonly statusCode: number;

  readonly data: any;

  constructor(message: string, statusCode = 400, data = {}) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

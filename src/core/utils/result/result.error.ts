type ErrorCode = 404 | 500 | 400 | 401 | 409;

export class ResultError extends Error {
  public code: ErrorCode;
  constructor(message: string, code: ErrorCode) {
    super(message);
    this.code = code;
  }
}

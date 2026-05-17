class CustomResponseError extends Error {
  public status: number;
  public isOperational: boolean;

  constructor(errorMessage: string, statusCode: number) {
    super(errorMessage);
    this.status = statusCode;
    this.isOperational = true;

    Object.setPrototypeOf(this, CustomResponseError.prototype);
  }
}

export default CustomResponseError;
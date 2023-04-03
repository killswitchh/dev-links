class AppError {
  message: string;
  errorCode: number;

  constructor(message: string, errorCode: number) {
    this.errorCode = errorCode;
    this.message = message;
  }
}

export default AppError;

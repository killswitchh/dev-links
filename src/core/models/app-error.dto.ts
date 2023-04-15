import type { HttpError } from '@sveltejs/kit';
import { ERROR_MESSAGES } from '../../constants';

class AppError {
  message: string;
  errorCode: number;

  constructor(message: string, errorCode: number) {
    this.errorCode = errorCode;
    this.message = message;
  }
}

export default AppError;

export function getErrorMessage(error: HttpError | AppError | unknown) {
  console.error('ERROR', error);
  let message = ERROR_MESSAGES.DEFAULT;
  if (error instanceof AppError) {
    message = error.message;
  } else {
    const err = error as HttpError;
    message = err.body.message;
  }
  return message;
}

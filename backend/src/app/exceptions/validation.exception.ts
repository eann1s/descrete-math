import { HttpException, HttpStatus } from '@nestjs/common';

export enum ValidationExceptionMessage {
  VALIDATION_FAILED = 'Validation failed',
}

export class ValidationException extends HttpException {
  constructor(public readonly errors: unknown[]) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: ValidationExceptionMessage.VALIDATION_FAILED,
        errors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

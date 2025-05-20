import { BadRequestException } from '@nestjs/common';

export enum BooleanLogicError {
  INVALID_EXPRESSION = 'INVALID_EXPRESSION',
  TOO_MANY_VARIABLES = 'TOO_MANY_VARIABLES',
}

export class InvalidExpressionException extends BadRequestException {
  constructor(message: string = BooleanLogicError.INVALID_EXPRESSION) {
    super(message);
  }
}

export class TooManyVariablesException extends BadRequestException {
  constructor(message: string = BooleanLogicError.TOO_MANY_VARIABLES) {
    super(message);
  }
}

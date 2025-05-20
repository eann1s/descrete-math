import { ApiBadRequestResponse } from '@nestjs/swagger';
import { BooleanLogicError } from './exceptions';
import { validationErrorResponseExamples } from '../app/swagger/global.swagger';

export const BooleanLogicBadRequestResponse = () => {
  return ApiBadRequestResponse({
    examples: {
      [BooleanLogicError.INVALID_EXPRESSION]: {
        summary: BooleanLogicError.INVALID_EXPRESSION,
        value: {
          message: 'Invalid expression',
        },
      },
      [BooleanLogicError.TOO_MANY_VARIABLES]: {
        summary: BooleanLogicError.TOO_MANY_VARIABLES,
        value: {
          message: 'Too many variables',
        },
      },
      ...validationErrorResponseExamples,
    },
  });
};

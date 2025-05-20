import { ApiBadRequestResponse } from '@nestjs/swagger';
import { ValidationExceptionMessage } from '../exceptions/validation.exception';

export const validationErrorResponseExamples = {
  [ValidationExceptionMessage.VALIDATION_FAILED]: {
    summary: ValidationExceptionMessage.VALIDATION_FAILED,
    value: {
      errors: [{ field: 'field', messages: ['message'] }],
    },
  },
};

export const ValidationFailedResponse = () => {
  return ApiBadRequestResponse({
    examples: validationErrorResponseExamples,
  });
};

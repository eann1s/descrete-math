import { BadRequestException } from '@nestjs/common';

export enum SetsException {
  SET_IS_NOT_SUBSET = 'SET_IS_NOT_SUBSET',
}

export class SetIsNotSubsetException extends BadRequestException {
  constructor(message: string = SetsException.SET_IS_NOT_SUBSET) {
    super(message);
  }
}

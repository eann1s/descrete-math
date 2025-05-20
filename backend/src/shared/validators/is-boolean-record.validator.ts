import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsBooleanRecord(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isBooleanRecord',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (typeof value !== 'object' || value === null) return false;
          return Object.values(value).every(
            (v) =>
              typeof v === 'boolean' ||
              (typeof v === 'string' && (v === 'true' || v === 'false')),
          );
        },
        defaultMessage() {
          return 'Each value in variables must be a boolean';
        },
      },
    });
  };
}

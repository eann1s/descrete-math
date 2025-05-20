import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsSetValue(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isSetValue',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' || typeof value === 'number';
        },
        defaultMessage() {
          return `${propertyName} must be a string or a number`;
        },
      },
    });
  };
}

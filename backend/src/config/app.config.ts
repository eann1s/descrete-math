import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ValidationException } from '../app/exceptions/validation.exception';
import * as cookieParser from 'cookie-parser';

export function configureGlobals(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory(errors) {
        const res = errors.map((error) => {
          return {
            field: error.property,
            messages: Object.values(error.constraints ?? {}),
          };
        });
        return new ValidationException(res);
      },
      stopAtFirstError: false,
    }),
  );
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');
}

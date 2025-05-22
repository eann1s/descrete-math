import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/open-api.config';
import { configureGlobals } from './config/app.config';
import { EnvService } from './config/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);

  app.useLogger(
    envService.get('DEBUG_MODE')
      ? ['error', 'fatal', 'log', 'warn', 'debug', 'verbose']
      : ['error', 'fatal', 'log', 'warn'],
  );

  const origins = envService.get('CORS_ORIGINS');
  app.enableCors({
    origin: origins,
    credentials: true,
  });

  configureGlobals(app);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = envService.get('BACKEND_PORT');
  await app.listen(port, '0.0.0.0');
  Logger.log(`Server is running on http://localhost:${port}`);
  Logger.log(`Swagger is running on http://localhost:${port}/api`);
}
bootstrap();

import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { EnvModule } from '../config/env/env.module';
import { CombinatoricsModule } from '../combinatorics/combinatorics.module';

@Module({
  imports: [EnvModule, CombinatoricsModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { EnvModule } from '../config/env/env.module';
import { CombinatoricsModule } from '../combinatorics/combinatorics.module';
import { BooleanLogicModule } from '../boolean-logic/boolean-logic.module';
import { SetsModule } from '../sets/sets.module';

@Module({
  imports: [EnvModule, CombinatoricsModule, BooleanLogicModule, SetsModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}

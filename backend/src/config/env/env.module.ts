import { Module } from '@nestjs/common';
import { defaultEnv, EnvService } from './env.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validate: (env) => {
        return defaultEnv.parse(env);
      },
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}

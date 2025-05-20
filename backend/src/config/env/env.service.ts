import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

export const defaultEnv = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  CORS_ORIGINS: z
    .string()
    .default('*')
    .transform((val) => (val === '*' ? '*' : val.split(','))),

  REDIS_HOST: z.string().nonempty(),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string().nonempty(),

  DEBUG_MODE: z.coerce.boolean().default(false),
});

export type Env = z.infer<typeof defaultEnv>;

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}

  get<T extends keyof Env>(key: T) {
    return this.configService.get(key, {
      infer: true,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

export const defaultEnv = z.object({
  BACKEND_PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  CORS_ORIGINS: z
    .string()
    .default('*')
    .transform((val) => (val === '*' ? '*' : val.split(','))),

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

import { Module } from '@nestjs/common';
import { CombinatoricsService } from './combinatorics.service';
import { CombinatoricsController } from './combinatorics.controller';
import { EnvModule } from '../config/env/env.module';

@Module({
  imports: [EnvModule],
  controllers: [CombinatoricsController],
  providers: [CombinatoricsService],
  exports: [CombinatoricsService],
})
export class CombinatoricsModule {}

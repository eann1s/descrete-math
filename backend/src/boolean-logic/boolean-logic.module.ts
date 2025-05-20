import { Module } from '@nestjs/common';
import { BooleanLogicController } from './boolean-logic.controller';
import { BooleanLogicService } from './boolean-logic.service';

@Module({
  controllers: [BooleanLogicController],
  providers: [BooleanLogicService],
  exports: [BooleanLogicService],
})
export class BooleanLogicModule {}

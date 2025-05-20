import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsString,
  Matches,
} from 'class-validator';
import { IsBooleanRecord } from '../shared/validators/is-boolean-record.validator';

export class GenerateTruthTableRequest {
  @ApiProperty({
    description: 'Boolean expression',
    example: 'A ∨ B → C ',
  })
  @Matches(/^[A-Za-z0-9()¬∧∨→↔||&&!\s]+$/)
  expression: string;

  @ApiProperty({
    description: 'List of variables',
    example: ['A', 'B', 'C'],
  })
  @IsString({ each: true })
  @IsArray()
  variables: string[];
}

export class TruthTable {
  @ApiProperty({
    description: 'List of variables',
    example: ['A', 'B', 'C'],
  })
  variables: string[];

  @ApiProperty({
    description: 'List of rows',
    example: [
      {
        combination: { A: true, B: false, C: true },
        result: true,
      },
    ],
  })
  rows: { combination: Record<string, boolean>; result: boolean }[];
}

export class VariableValueDto {
  @ApiProperty({
    description: 'Variable value',
    example: true,
  })
  @IsBoolean()
  @Type(() => Boolean)
  value: boolean;
}

export class EvaluateExpressionRequest {
  @ApiProperty({
    description: 'Boolean expression',
    example: 'A ∨ B → C ',
  })
  @Matches(/^[A-Za-z0-9()¬∧∨→↔||&&!\s]+$/)
  @IsString()
  @IsNotEmpty()
  expression: string;

  @ApiProperty({
    description: 'List of variables',
    example: { A: true, B: false, C: true },
  })
  @IsBooleanRecord()
  @IsObject()
  variables: Record<string, boolean>;
}

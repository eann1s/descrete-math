import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayUnique, IsArray } from 'class-validator';
import { IsSetValue } from '../shared/validators/is-set-value.validator';

export class SetValue {
  @ApiProperty({
    description: 'Set value (string or number)',
    example: 'A',
  })
  @IsSetValue()
  value: string | number;
}

export class SetDto {
  @ApiProperty({
    description: 'Set of elements',
    type: [SetValue],
    example: ['A', 'B', 'C'],
  })
  @IsArray()
  @ArrayUnique()
  @Type(() => SetValue)
  set: SetValue[];
}

export class TwoSetsDto {
  @ApiProperty({
    type: [SetValue],
    description: 'First set of elements',
    example: ['A', 'B', 'C'],
  })
  @IsArray()
  @ArrayUnique()
  @Type(() => SetValue)
  set1: SetValue[];

  @ApiProperty({
    type: [SetValue],
    description: 'Second set of elements',
    example: ['A', 'B', 'C'],
  })
  @IsArray()
  @ArrayUnique()
  @Type(() => SetValue)
  set2: SetValue[];
}

export class UniversalAndSubsetDto {
  @ApiProperty({
    type: [SetValue],
    description: 'Universal set of elements',
    example: ['A', 'B', 'C'],
  })
  @IsArray()
  @ArrayUnique()
  @Type(() => SetValue)
  universal: SetValue[];

  @ApiProperty({
    type: [SetValue],
    description: 'Subset of universal set',
    example: ['A', 'B', 'C'],
  })
  @IsArray()
  @ArrayUnique()
  @Type(() => SetValue)
  subset: SetValue[];
}

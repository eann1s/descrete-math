import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class PermutationsRequest {
  @ApiProperty({
    type: [Number],
    example: [1, 2, 3],
    description: 'Numbers to permute',
    isArray: true,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  numbers: number[];
}

export class PermutationsResponse {
  @ApiProperty({
    type: [Number],
    example: [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ],
    description: 'Permutations of numbers',
  })
  permutations: number[][];
}

export class CombinationsRequest {
  @ApiProperty({
    type: Number,
    example: 5,
    description: 'Number of elements',
  })
  @Type(() => Number)
  @IsNumber()
  n: number;

  @ApiProperty({
    type: Number,
    example: 2,
    description: 'Number of elements to choose',
  })
  @Type(() => Number)
  @IsNumber()
  k: number;
}

export class CombinationsResponse {
  @ApiProperty({
    type: [Number],
    example: [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ],
    description: 'Combinations of numbers',
  })
  combinations: number[][];
}

import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CombinatoricsService } from './combinatorics.service';
import {
  CombinationsRequest,
  CombinationsResponse,
  PermutationsRequest,
  PermutationsResponse,
} from './dtos';

@ApiTags('Combinatorics')
@Controller('combinatorics')
export class CombinatoricsController {
  constructor(private readonly combinatoricsService: CombinatoricsService) {}

  @Post('permutations')
  @HttpCode(200)
  @ApiOkResponse({
    type: PermutationsResponse,
    description: 'Permutations',
  })
  @ApiOperation({ summary: 'Generate permutations' })
  generatePermutations(
    @Body() { numbers }: PermutationsRequest,
  ): PermutationsResponse {
    const res = this.combinatoricsService.generatePermutations(numbers);
    return { permutations: res.sort((a, b) => a[0] - b[0]) };
  }

  @Get('permutations')
  @HttpCode(200)
  @ApiOkResponse({
    type: Number,
    description: 'Permutations',
  })
  @ApiOperation({ summary: 'Generate permutations' })
  calculatePermutations(@Query() { n, k }: CombinationsRequest): number {
    const res = this.combinatoricsService.calculatePermutations(n, k);
    return res;
  }

  @Post('combinations')
  @HttpCode(200)
  @ApiOkResponse({
    type: Number,
    description: 'Combinations',
  })
  @ApiOperation({ summary: 'Generate combinations' })
  generateCombinations(
    @Body() { n, k }: CombinationsRequest,
  ): CombinationsResponse {
    const res = this.combinatoricsService.generateCombinations(n, k);
    return { combinations: res.sort((a, b) => a[0] - b[0]) };
  }

  @Get('combinations')
  @HttpCode(200)
  @ApiOkResponse({
    type: Number,
    description: 'Combinations',
  })
  @ApiOperation({ summary: 'Generate combinations' })
  calculateCombinations(@Query() { n, k }: CombinationsRequest): number {
    const res = this.combinatoricsService.calculateCombinations(n, k);
    return res;
  }
}

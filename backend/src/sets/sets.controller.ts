import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SetsService } from './sets.service';
import { SetDto, SetValue, TwoSetsDto, UniversalAndSubsetDto } from './dtos';

@ApiTags('Sets')
@Controller('sets')
export class SetsController {
  constructor(private readonly setsService: SetsService) {}

  @Post('union')
  @HttpCode(200)
  @ApiOkResponse({ type: [SetValue], description: 'Union of two sets' })
  @ApiOperation({ summary: 'Union of two sets' })
  union(@Body() { set1, set2 }: TwoSetsDto): SetValue[] {
    return this.setsService.union(set1, set2);
  }

  @Post('intersection')
  @HttpCode(200)
  @ApiOkResponse({ type: [SetValue], description: 'Intersection of two sets' })
  @ApiOperation({ summary: 'Intersection of two sets' })
  intersection(@Body() { set1, set2 }: TwoSetsDto): SetValue[] {
    return this.setsService.intersection(set1, set2);
  }

  @Post('difference')
  @HttpCode(200)
  @ApiOkResponse({ type: [SetValue], description: 'Difference of two sets' })
  @ApiOperation({ summary: 'Difference of two sets' })
  difference(@Body() { set1, set2 }: TwoSetsDto): SetValue[] {
    return this.setsService.difference(set1, set2);
  }

  @Post('symmetric-difference')
  @HttpCode(200)
  @ApiOkResponse({
    type: [SetValue],
    description: 'Symmetric difference of two sets',
  })
  @ApiOperation({ summary: 'Symmetric difference of two sets' })
  symmetricDifference(@Body() { set1, set2 }: TwoSetsDto): SetValue[] {
    return this.setsService.symmetricDifference(set1, set2);
  }

  @Post('complement')
  @HttpCode(200)
  @ApiOkResponse({ type: [SetValue], description: 'Complement of a set' })
  @ApiOperation({ summary: 'Complement of a set' })
  complement(@Body() { universal, subset }: UniversalAndSubsetDto): SetValue[] {
    return this.setsService.complement(universal, subset);
  }

  @Post('cartesian-product')
  @HttpCode(200)
  @ApiOkResponse({
    type: [SetValue],
    description: 'Cartesian product of two sets',
  })
  @ApiOperation({ summary: 'Cartesian product of two sets' })
  cartesianProduct(@Body() { set1, set2 }: TwoSetsDto): SetValue[][] {
    return this.setsService.cartesianProduct(set1, set2);
  }

  @Post('power-set')
  @HttpCode(200)
  @ApiOkResponse({ type: [SetValue], description: 'Power set of a set' })
  @ApiOperation({ summary: 'Power set of a set' })
  powerSet(@Body() { set }: SetDto): SetValue[][] {
    return this.setsService.powerSet(set);
  }

  @Post('is-subset')
  @HttpCode(200)
  @ApiOkResponse({ type: Boolean, description: 'Is subset' })
  @ApiOperation({ summary: 'Is subset' })
  isSubset(@Body() { subset, universal }: UniversalAndSubsetDto): boolean {
    return this.setsService.isSubset(subset, universal);
  }

  @Post('cardinality')
  @HttpCode(200)
  @ApiOkResponse({ type: Number, description: 'Cardinality of a set' })
  @ApiOperation({ summary: 'Cardinality of a set' })
  cardinality(@Body() { set }: SetDto): number {
    return this.setsService.cardinality(set);
  }

  @Post('is-disjoint')
  @HttpCode(200)
  @ApiOkResponse({ type: Boolean, description: 'Is disjoint' })
  @ApiOperation({ summary: 'Is disjoint' })
  isDisjoint(@Body() { set1, set2 }: TwoSetsDto): boolean {
    return this.setsService.isDisjoint(set1, set2);
  }
}

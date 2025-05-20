import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { BooleanLogicService } from './boolean-logic.service';
import {
  EvaluateExpressionRequest,
  GenerateTruthTableRequest,
  TruthTable,
} from './dtos';
import { BooleanLogicBadRequestResponse } from './swagger';

@ApiTags('Boolean Logic')
@Controller('boolean-logic')
export class BooleanLogicController {
  constructor(private readonly booleanLogicService: BooleanLogicService) {}

  @Post('generate-truth-table')
  @HttpCode(200)
  @ApiOkResponse({ type: TruthTable, description: 'Truth table' })
  @ApiOperation({ summary: 'Generate truth table' })
  @BooleanLogicBadRequestResponse()
  generateTruthTable(
    @Body() { expression, variables }: GenerateTruthTableRequest,
  ): TruthTable {
    return this.booleanLogicService.generateTruthTable(expression, variables);
  }

  @Post('evaluate-expression')
  @HttpCode(200)
  @ApiOkResponse({ type: Boolean, description: 'Evaluation result' })
  @ApiOperation({ summary: 'Evaluate expression' })
  @BooleanLogicBadRequestResponse()
  evaluateExpression(
    @Body() { expression, variables }: EvaluateExpressionRequest,
  ): boolean {
    return this.booleanLogicService.evaluateExpression(expression, variables);
  }
}

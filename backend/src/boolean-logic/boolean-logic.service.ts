import { Injectable } from '@nestjs/common';
import {
  InvalidExpressionException,
  TooManyVariablesException,
} from './exceptions';
import { TruthTable } from './dtos';

@Injectable()
export class BooleanLogicService {
  generateTruthTable(expression: string, variables: string[]): TruthTable {
    const table: TruthTable = { variables, rows: [] };

    if (variables.length > 6) {
      throw new TooManyVariablesException();
    }

    for (let i = 0; i < 2 ** variables.length; i++) {
      const combination = {};
      const binary = i.toString(2).padStart(variables.length, '0');

      variables.forEach((variable, index) => {
        combination[variable] = binary[index] === '1';
      });

      const res = this.evaluateExpression(expression, combination);
      table.rows.push({ combination: { ...combination }, result: res });
    }

    return table;
  }

  evaluateExpression(expression: string, vars: Record<string, boolean>) {
    const substitute = this.substituteVariables(expression, vars);
    const isValid = this.hasBalancedParentheses(substitute);
    if (!isValid) {
      throw new InvalidExpressionException();
    }
    const sanitized = this.sanitizeExpression(substitute);
    return this.safeEvaluateExpression(sanitized);
  }

  private substituteVariables(
    expression: string,
    vars: Record<string, boolean>,
  ) {
    return Object.entries(vars).reduce((acc, [variable, value]) => {
      return acc.replace(new RegExp(variable, 'g'), value.toString());
    }, expression);
  }

  private hasBalancedParentheses(expression: string) {
    const stack: string[] = [];
    for (const char of expression) {
      if (char === '(') {
        stack.push(char);
      } else if (char === ')') {
        if (stack.length === 0) {
          return false;
        }
        stack.pop();
      }
    }
    return stack.length === 0;
  }

  private sanitizeExpression(expression: string) {
    let converted = expression
      .replace(/∧/g, '&&')
      .replace(/∨/g, '||')
      .replace(/¬/g, '!')
      .replace(/\s+/g, '');
    converted = converted.replace(
      /([A-Za-z0-9]+)→([A-Za-z0-9]+)/g,
      '(!$1||$2)',
    );
    converted = converted.replace(
      /([A-Za-z0-9]+)↔([A-Za-z0-9]+)/g,
      '((!$1||$2)&&(!$2||$1))',
    );
    return converted;
  }

  private safeEvaluateExpression(expression: string) {
    try {
      return eval(expression);
    } catch (e) {
      console.error(e);
      throw new InvalidExpressionException();
    }
  }
}

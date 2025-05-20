import { Injectable } from '@nestjs/common';
import { factorial } from '../shared/utils';

@Injectable()
export class CombinatoricsService {
  constructor() {}

  generatePermutations(numbers: number[]): number[][] {
    if (numbers.length === 1) {
      return [numbers];
    }
    const permutations = this.generatePermutations(numbers.slice(1));
    const res: number[][] = [];
    for (const permutation of permutations) {
      for (let i = 0; i <= permutation.length; i++) {
        const newPermutation = [...permutation];
        newPermutation.splice(i, 0, numbers[0]);
        res.push(newPermutation);
      }
    }
    return res;
  }

  calculatePermutations(n: number, k: number) {
    return factorial(n) / factorial(n - k);
  }

  generateCombinations(n: number, k: number): number[][] {
    if (k === 0 || k === n) {
      return [Array.from({ length: k }, (_, i) => i)];
    }
    const combinations = this.generateCombinations(n - 1, k - 1);
    for (let i = 0; i < combinations.length; i++) {
      combinations[i].push(n - 1);
    }
    return combinations.concat(this.generateCombinations(n - 1, k));
  }

  calculateCombinations(n: number, k: number) {
    if (k === 0 || k === n) {
      return 1;
    }
    return factorial(n) / (factorial(k) * factorial(n - k));
  }
}

import { Injectable } from '@nestjs/common';
import { SetIsNotSubsetException } from './exceptions';
import { SetValue } from './dtos';

@Injectable()
export class SetsService {
  constructor() {}

  union(arr1: SetValue[], arr2: SetValue[]): SetValue[] {
    return [...new Set([...arr1, ...arr2])];
  }

  intersection(arr1: SetValue[], arr2: SetValue[]): SetValue[] {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return [...new Set([...set1].filter((x) => set2.has(x)))];
  }

  difference(arr1: SetValue[], arr2: SetValue[]): SetValue[] {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return [...new Set([...set1].filter((x) => !set2.has(x)))];
  }

  symmetricDifference(arr1: SetValue[], arr2: SetValue[]): SetValue[] {
    return [
      ...new Set([
        ...this.difference(arr1, arr2),
        ...this.difference(arr2, arr1),
      ]),
    ];
  }

  complement(set1: SetValue[], set2: SetValue[]): SetValue[] {
    if (!this.isSubset(set2, set1)) {
      throw new SetIsNotSubsetException('set1 is not a subset of set2');
    }
    return this.difference(set1, set2);
  }

  cartesianProduct(arr1: SetValue[], arr2: SetValue[]): SetValue[][] {
    return arr1.flatMap((x) => arr2.map((y) => [x, y]));
  }

  powerSet(arr: SetValue[]): SetValue[][] {
    const set = new Set(arr);
    const elems: SetValue[] = [...set];
    const subsets: SetValue[][] = [];
    for (let i = 0; i < 2 ** arr.length; i++) {
      const subset: SetValue[] = [];
      for (let j = 0; j < arr.length; j++) {
        if (i & (1 << j)) {
          subset.push(elems[j]);
        }
      }
      subsets.push(subset);
    }
    return subsets;
  }

  isSubset(subset: SetValue[], universal: SetValue[]): boolean {
    const subsetSet = new Set(subset);
    const universalSet = new Set(universal);
    return [...subsetSet].every((x) => universalSet.has(x));
  }

  isDisjoint(arr1: SetValue[], arr2: SetValue[]): boolean {
    return this.intersection(arr1, arr2).length === 0;
  }

  cardinality(arr: SetValue[]): number {
    return new Set(arr).size;
  }
}

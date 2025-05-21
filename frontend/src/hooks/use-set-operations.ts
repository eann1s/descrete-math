import { useCallback } from "react";
import { setsApi } from "@/lib/api";
import { SetOperation, SetProperty } from "../lib/enums";

export const useSetOperations = () => {
  const parseSet = useCallback((input: string): (string | number)[] => {
    return input
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const num = Number(item);
        return isNaN(num) ? item : num;
      });
  }, []);

  const validateSet = useCallback(
    (set: (string | number)[], operation: string) => {
      if (set.length === 0) {
        throw new Error(`At least one element required for ${operation}`);
      }
    },
    []
  );

  const handleOperation = useCallback(
    async (operation: string, params: Record<string, any>) => {
      try {
        switch (operation) {
          case SetOperation.Union:
          case SetOperation.Intersection:
          case SetOperation.Difference:
          case SetOperation.SymmetricDifference:
          case SetOperation.CartesianProduct:
          case SetOperation.Complement:
          case SetProperty.IsDisjoint:
            return await setsApi[operation](params.set1, params.set2);
          case SetProperty.IsSubset:
            return await setsApi[operation](params.subset, params.universal);
          case SetOperation.PowerSet:
          case SetProperty.Cardinality:
            return await setsApi[operation](params.set);
          default:
            throw new Error("Invalid operation");
        }
      } catch (err) {
        throw err instanceof Error ? err : new Error("Operation failed");
      }
    },
    []
  );

  return { parseSet, validateSet, handleOperation };
};

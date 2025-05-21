import axios, { AxiosInstance, AxiosResponse } from "axios";
import { SetOperation, SetProperty } from "./enums";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchApi<T>(func: () => Promise<AxiosResponse<T>>) {
  try {
    const response = await func();
    return response.data;
  } catch (error) {
    console.error(`API Error: ${error}`);
    throw error;
  }
}

export const booleanLogicApi = {
  generateTruthTable: async (expression: string, variables: string[]) =>
    fetchApi(() =>
      api.post(`/boolean-logic/generate-truth-table`, { expression, variables })
    ),
  evaluateExpression: async (
    expression: string,
    variables: Record<string, boolean>
  ) =>
    fetchApi(() =>
      api.post(`/boolean-logic/evaluate-expression`, { expression, variables })
    ),
};

export const combinatoricsApi = {
  generatePermutations: async (numbers: number[]) =>
    fetchApi(() => api.post("/combinatorics/permutations", { numbers })),

  calculatePermutations: async (n: number, k: number) =>
    fetchApi(() =>
      api.get(`/combinatorics/permutations`, { params: { n, k } })
    ),

  generateCombinations: async (n: number, k: number) =>
    fetchApi(() => api.post("/combinatorics/combinations", { n, k })),

  calculateCombinations: async (n: number, k: number) =>
    fetchApi(() =>
      api.get(`/combinatorics/combinations`, { params: { n, k } })
    ),
};

export const setsApi = {
  [SetOperation.Union]: async (set1: any[], set2: any[]) =>
    fetchApi(() => api.post("/sets/union", { set1, set2 })),

  [SetOperation.Intersection]: async (set1: any[], set2: any[]) =>
    fetchApi(() => api.post("/sets/intersection", { set1, set2 })),

  [SetOperation.Difference]: async (set1: any[], set2: any[]) =>
    fetchApi(() => api.post("/sets/difference", { set1, set2 })),

  [SetOperation.SymmetricDifference]: async (set1: any[], set2: any[]) =>
    fetchApi(() => api.post("/sets/symmetric-difference", { set1, set2 })),

  [SetOperation.CartesianProduct]: async (set1: any[], set2: any[]) =>
    fetchApi(() => api.post("/sets/cartesian-product", { set1, set2 })),

  [SetOperation.PowerSet]: async (set: any[]) =>
    fetchApi(() => api.post("/sets/power-set", { set })),

  [SetProperty.IsSubset]: async (subset: any[], universal: any[]) =>
    fetchApi(() => api.post("/sets/is-subset", { subset, universal })),

  [SetProperty.Cardinality]: async (set: any[]) =>
    fetchApi(() => api.post("/sets/cardinality", { set })),

  [SetProperty.IsDisjoint]: async (set1: any[], set2: any[]) =>
    fetchApi(() => api.post("/sets/is-disjoint", { set1, set2 })),

  [SetOperation.Complement]: async (set1: any[], set2: any[]) =>
    fetchApi(() => api.post("/sets/complement", { set1, set2 })),
};

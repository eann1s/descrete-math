"use client";

import { useState, useCallback } from "react";
import { combinatoricsApi } from "@/lib/api";

export default function CombinationCalculator() {
  const [activeTab, setActiveTab] = useState<"generate" | "calculate">(
    "generate"
  );
  const [nValue, setNValue] = useState("");
  const [kValue, setKValue] = useState("");
  const [combinations, setCombinations] = useState<number[][]>([]);
  const [combinationCount, setCombinationCount] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const n = parseInt(nValue);
        const k = parseInt(kValue);

        if (isNaN(n) || isNaN(k)) {
          throw new Error("Please enter valid numbers for n and k");
        }

        if (n < 0 || k < 0) {
          throw new Error("n and k must be non-negative integers");
        }

        if (k > n) {
          throw new Error("k cannot be greater than n");
        }

        const result = await combinatoricsApi.generateCombinations(n, k);
        setCombinations(result.combinations);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to generate combinations"
        );
        setCombinations([]);
      } finally {
        setLoading(false);
      }
    },
    [nValue, kValue]
  );

  const handleCalculateSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const n = parseInt(nValue);
        const k = parseInt(kValue);

        if (isNaN(n) || isNaN(k)) {
          throw new Error("Please enter valid numbers for n and k");
        }

        if (n < 0 || k < 0) {
          throw new Error("n and k must be non-negative integers");
        }

        if (k > n) {
          throw new Error("k cannot be greater than n");
        }

        const result = await combinatoricsApi.calculateCombinations(n, k);
        setCombinationCount(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to calculate combinations"
        );
        setCombinationCount(null);
      } finally {
        setLoading(false);
      }
    },
    [nValue, kValue]
  );

  return (
    <div className="p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Combinations Calculator</h3>

      <div className="mb-6">
        <nav className="flex border-b" aria-label="Tabs">
          <button
            type="button"
            onClick={() => setActiveTab("generate")}
            className={`px-4 py-2 font-medium ${
              activeTab === "generate"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            role="tab"
            aria-selected={activeTab === "generate"}
          >
            Generate Combinations
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("calculate")}
            className={`px-4 py-2 font-medium ${
              activeTab === "calculate"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            role="tab"
            aria-selected={activeTab === "calculate"}
          >
            Calculate C(n, k)
          </button>
        </nav>
      </div>

      {activeTab === "generate" ? (
        <form onSubmit={handleGenerateSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="comb-n-value"
                className="block text-sm font-medium mb-1"
              >
                Total elements (n)
              </label>
              <input
                id="comb-n-value"
                type="number"
                value={nValue}
                onChange={(e) => setNValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                min="0"
                required
              />
            </div>

            <div>
              <label
                htmlFor="comb-k-value"
                className="block text-sm font-medium mb-1"
              >
                Selected elements (k)
              </label>
              <input
                id="comb-k-value"
                type="number"
                value={kValue}
                onChange={(e) => setKValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                min="0"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Generating..." : "Generate Combinations"}
          </button>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
          )}

          {combinations.length > 0 && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">
                {combinations.length} Combinations Found:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {combinations.map((comb, index) => (
                  <div
                    key={index}
                    className="p-2 rounded border border-gray-200 break-all"
                  >
                    [{comb.join(", ")}]
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      ) : (
        <form onSubmit={handleCalculateSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="calc-n-value"
                className="block text-sm font-medium mb-1"
              >
                Total elements (n)
              </label>
              <input
                id="calc-n-value"
                type="number"
                value={nValue}
                onChange={(e) => setNValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                min="0"
                required
              />
            </div>

            <div>
              <label
                htmlFor="calc-k-value"
                className="block text-sm font-medium mb-1"
              >
                Selected elements (k)
              </label>
              <input
                id="calc-k-value"
                type="number"
                value={kValue}
                onChange={(e) => setKValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                min="0"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Calculating..." : "Calculate Combinations"}
          </button>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
          )}

          {combinationCount !== null && (
            <div className="mt-4 p-4 rounded">
              <p className="text-lg font-semibold">
                C({nValue}, {kValue}) = {combinationCount}
              </p>
              <p className="text-sm mt-1">
                Number of ways to choose {kValue} items from {nValue} items
              </p>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

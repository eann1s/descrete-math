"use client";

import { useState, useCallback } from "react";
import { combinatoricsApi } from "@/lib/api";

export default function PermutationCalculator() {
  const [activeTab, setActiveTab] = useState<"generate" | "calculate">(
    "generate"
  );
  const [numbersInput, setNumbersInput] = useState("");
  const [permutations, setPermutations] = useState<number[][]>([]);
  const [nValue, setNValue] = useState("");
  const [kValue, setKValue] = useState("");
  const [permutationCount, setPermutationCount] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const numbers = numbersInput
          .split(",")
          .map((num) => num.trim())
          .filter(Boolean)
          .map(Number);

        if (numbers.some(isNaN)) {
          throw new Error("Please enter valid numbers separated by commas");
        }

        if (numbers.length < 1) {
          throw new Error("Please enter at least one number");
        }

        const result = await combinatoricsApi.generatePermutations(numbers);
        setPermutations(result.permutations);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to generate permutations"
        );
        setPermutations([]);
      } finally {
        setLoading(false);
      }
    },
    [numbersInput]
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

        const result = await combinatoricsApi.calculatePermutations(n, k);
        setPermutationCount(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to calculate permutations"
        );
        setPermutationCount(null);
      } finally {
        setLoading(false);
      }
    },
    [nValue, kValue]
  );

  return (
    <div className="p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Permutations Calculator</h3>

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
            Generate Permutations
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
            Calculate P(n, k)
          </button>
        </nav>
      </div>

      {activeTab === "generate" ? (
        <form onSubmit={handleGenerateSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="numbers"
              className="block text-sm font-medium  mb-1"
            >
              Numbers (comma-separated)
            </label>
            <input
              id="numbers"
              type="text"
              value={numbersInput}
              onChange={(e) => setNumbersInput(e.target.value)}
              placeholder="e.g., 1, 2, 3"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter numbers to generate all possible permutations
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Generating..." : "Generate Permutations"}
          </button>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
          )}

          {permutations.length > 0 && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">
                {permutations.length} Permutations Found:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {permutations.map((perm, index) => (
                  <div
                    key={index}
                    className="p-2 rounded border border-gray-200 break-all"
                  >
                    [{perm.join(", ")}]
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
                htmlFor="n-value"
                className="block text-sm font-medium mb-1"
              >
                Total elements (n)
              </label>
              <input
                id="n-value"
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
                htmlFor="k-value"
                className="block text-sm font-medium mb-1"
              >
                Selected elements (k)
              </label>
              <input
                id="k-value"
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
            {loading ? "Calculating..." : "Calculate Permutations"}
          </button>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
          )}

          {permutationCount !== null && (
            <div className="mt-4 p-4 rounded">
              <p className="text-lg font-semibold">
                P({nValue}, {kValue}) = {permutationCount}
              </p>
              <p className="text-sm mt-1">
                Number of ways to arrange {kValue} items from {nValue} items
              </p>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

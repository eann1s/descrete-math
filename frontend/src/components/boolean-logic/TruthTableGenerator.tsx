"use client";

import { useState } from "react";
import { booleanLogicApi } from "@/lib/api";

interface TruthTableRow {
  combination: Record<string, boolean>;
  result: boolean;
}

interface TruthTable {
  variables: string[];
  rows: TruthTableRow[];
}

export default function TruthTableGenerator() {
  const [expression, setExpression] = useState("");
  const [variables, setVariables] = useState("");
  const [truthTable, setTruthTable] = useState<TruthTable | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const variablesArray = variables
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);

      if (variablesArray.length === 0) {
        throw new Error("Please enter at least one variable");
      }

      const result = await booleanLogicApi.generateTruthTable(
        expression,
        variablesArray
      );
      setTruthTable(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setTruthTable(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Truth Table Generator</h3>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label
            htmlFor="expression"
            className="block text-sm font-medium mb-1"
          >
            Boolean Expression
          </label>
          <input
            id="expression"
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="e.g., A ∧ B ∨ ¬C"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <p className="text-sm mt-1">
            Use ∧ for AND, ∨ for OR, ¬ for NOT, → for implication, ↔ for
            biconditional
          </p>
        </div>

        <div>
          <label htmlFor="variables" className="block text-sm font-medium mb-1">
            Variables (comma-separated)
          </label>
          <input
            id="variables"
            type="text"
            value={variables}
            onChange={(e) => setVariables(e.target.value)}
            placeholder="e.g., A, B, C"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Generating..." : "Generate Truth Table"}
        </button>
      </form>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded mb-4">{error}</div>
      )}

      {truthTable && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                {truthTable.variables.map((variable) => (
                  <th
                    key={variable}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {variable}
                  </th>
                ))}
                <th className="border border-gray-300 px-4 py-2">
                  {expression}
                </th>
              </tr>
            </thead>
            <tbody>
              {truthTable.rows.map((row, index) => (
                <tr key={index}>
                  {truthTable.variables.map((variable) => (
                    <td
                      key={variable}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {row.combination[variable] ? "T" : "F"}
                    </td>
                  ))}
                  <td className="border border-gray-300 px-4 py-2 text-center font-medium">
                    {row.result ? "T" : "F"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

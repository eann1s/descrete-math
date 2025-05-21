"use client";

import { useState } from "react";
import { booleanLogicApi } from "@/lib/api";

export default function ExpressionEvaluator() {
  const [expression, setExpression] = useState("");
  const [variablesInput, setVariablesInput] = useState<
    { name: string; value: boolean }[]
  >([{ name: "", value: false }]);
  const [result, setResult] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addVariable = () => {
    setVariablesInput([...variablesInput, { name: "", value: false }]);
  };

  const removeVariable = (index: number) => {
    setVariablesInput(variablesInput.filter((_, i) => i !== index));
  };

  const updateVariableName = (index: number, name: string) => {
    const newVars = [...variablesInput];
    newVars[index].name = name;
    setVariablesInput(newVars);
  };

  const updateVariableValue = (index: number, value: boolean) => {
    const newVars = [...variablesInput];
    newVars[index].value = value;
    setVariablesInput(newVars);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate variable names
      const emptyNames = variablesInput.some((v) => !v.name.trim());
      if (emptyNames) {
        throw new Error("All variables must have names");
      }

      // Check for duplicate variable names
      const names = variablesInput.map((v) => v.name.trim());
      const uniqueNames = new Set(names);
      if (names.length !== uniqueNames.size) {
        throw new Error("Variable names must be unique");
      }

      // Convert to the format expected by the API
      const variables: Record<string, boolean> = {};
      variablesInput.forEach((v) => {
        variables[v.name.trim()] = v.value;
      });

      const evalResult = await booleanLogicApi.evaluateExpression(
        expression,
        variables
      );
      setResult(evalResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Expression Evaluator</h3>

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
          <label className="block text-sm font-medium mb-2">
            Variables
          </label>

          {variablesInput.map((variable, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={variable.name}
                onChange={(e) => updateVariableName(index, e.target.value)}
                placeholder="Variable name"
                className="p-2 border border-gray-300 rounded w-1/3"
              />

              <select
                value={variable.value ? "true" : "false"}
                onChange={(e) =>
                  updateVariableValue(index, e.target.value === "true")
                }
                className="p-2 border border-gray-300 rounded"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>

              <button
                type="button"
                onClick={() => removeVariable(index)}
                className="p-2 text-red-500 hover:text-red-700"
                disabled={variablesInput.length <= 1}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addVariable}
            className="mt-2 px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Add Variable
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Evaluating..." : "Evaluate Expression"}
        </button>
      </form>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded mb-4">{error}</div>
      )}

      {result !== null && (
        <div className="mt-4 p-4 rounded">
          <p className="font-medium">Result:</p>
          <p className="text-xl mt-1">
            {expression} ={" "}
            <span className="font-bold">{result ? "True" : "False"}</span>
          </p>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import { SetInput } from "./SetInput";
import { ResultDisplay } from "./ResultDisplay";
import { useSetOperations } from "../../hooks/use-set-operations";
import { OperationTabs } from "./OperationTabs";
import { SetOperation } from "../../lib/enums";

export default function SetOperations() {
  const [set1Input, setSet1Input] = useState("");
  const [set2Input, setSet2Input] = useState("");
  const [setInput, setSetInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { parseSet, validateSet, handleOperation } = useSetOperations();

  const handleSubmit = async (operation: string) => {
    setError("");
    setLoading(true);

    let result;
    try {
      switch (operation) {
        case SetOperation.PowerSet:
          const set = parseSet(setInput);
          validateSet(set, "set");
          result = await handleOperation(operation, { set });
          break;
        default:
          const set1 = parseSet(set1Input);
          const set2 = parseSet(set2Input);
          validateSet(set1, "first set");
          validateSet(set2, "second set");
          result = await handleOperation(operation, { set1, set2 });
          break;
      }
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Operation failed");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Set Operations</h3>

      <OperationTabs tabs={Object.values(SetOperation)}>
        {Object.values(SetOperation).map((operation) =>
          operation === SetOperation.PowerSet ? (
            <>
              <SetInput
                label="Set"
                id="set"
                value={setInput}
                onChange={(e) => setSetInput(e.target.value)}
                placeholder="e.g., 1, 2, 3"
              />
              <button
                type="button"
                onClick={() => handleSubmit(operation)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
                disabled={loading}
              >
                {loading ? "Calculating..." : `Calculate ${operation}`}
              </button>
            </>
          ) : (
            <>
              <SetInput
                label="Set 1"
                id="set1"
                value={set1Input}
                onChange={(e) => setSet1Input(e.target.value)}
                placeholder="e.g., 1, 2, 3"
              />
              <SetInput
                label="Set 2"
                id="set2"
                value={set2Input}
                onChange={(e) => setSet2Input(e.target.value)}
                placeholder="e.g., 2, 3, 4"
              />
              <button
                type="button"
                onClick={() => handleSubmit(operation)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
                disabled={loading}
              >
                {loading ? "Calculating..." : `Calculate ${operation}`}
              </button>
            </>
          )
        )}
      </OperationTabs>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      <ResultDisplay result={result} />
    </div>
  );
}

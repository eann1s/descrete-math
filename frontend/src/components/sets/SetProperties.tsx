"use client";
import { useState } from "react";
import { SetInput } from "./SetInput";
import { ResultDisplay } from "./ResultDisplay";
import { useSetOperations } from "../../hooks/use-set-operations";
import { SetProperty } from "../../lib/enums";

export default function SetProperties() {
  const [activeTab, setActiveTab] = useState("isSubset");
  const [universalInput, setUniversalInput] = useState("");
  const [subsetInput, setSubsetInput] = useState("");
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

    try {
      let result;
      switch (operation) {
        case SetProperty.IsSubset:
          const universal = parseSet(universalInput);
          const subset = parseSet(subsetInput);
          validateSet(universal, "universal set");
          validateSet(subset, "subset");
          result = await handleOperation(operation, { subset, universal });
          break;
        case SetProperty.Cardinality:
          const set = parseSet(setInput);
          validateSet(set, "set");
          result = await handleOperation(operation, { set });
          break;
        case SetProperty.IsDisjoint:
          const set1 = parseSet(set1Input);
          const set2 = parseSet(set2Input);
          validateSet(set1, "set 1");
          validateSet(set2, "set 2");
          result = await handleOperation(operation, { set1, set2 });
          break;
        default:
          throw new Error("Invalid operation");
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
      <h3 className="text-xl font-semibold mb-4">Set Properties</h3>

      <div className="flex flex-wrap gap-2 mb-6">
        {Object.values(SetProperty).map((op) => (
          <button
            key={op}
            type="button"
            onClick={() => setActiveTab(op)}
            className={`px-4 py-2 rounded ${
              activeTab === op
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {op
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (s) => s.toUpperCase())}
          </button>
        ))}
      </div>

      {(() => {
        switch (activeTab) {
          case SetProperty.IsSubset:
            return (
              <>
                <SetInput
                  label="Universal Set"
                  id="universal"
                  value={universalInput}
                  onChange={(e) => setUniversalInput(e.target.value)}
                  placeholder="e.g., 1, 2, 3, 4"
                />
                <SetInput
                  label="Subset"
                  id="subset"
                  value={subsetInput}
                  onChange={(e) => setSubsetInput(e.target.value)}
                  placeholder="e.g., 2, 3"
                />
              </>
            );
          case SetProperty.Cardinality:
            return (
              <SetInput
                label="Set"
                id="set"
                value={setInput}
                onChange={(e) => setSetInput(e.target.value)}
                placeholder="e.g., a, b, c"
              />
            );
          case SetProperty.IsDisjoint:
            return (
              <>
                <SetInput
                  label="Set 1"
                  id="set1"
                  value={set1Input}
                  onChange={(e) => setSet1Input(e.target.value)}
                  placeholder="e.g., 1, 2, 3, 4"
                />
                <SetInput
                  label="Set 2"
                  id="set2"
                  value={set2Input}
                  onChange={(e) => setSet2Input(e.target.value)}
                  placeholder="e.g., 2, 3, 4, 5"
                />
              </>
            );
          default:
            return null;
        }
      })()}

      <button
        type="button"
        onClick={() => handleSubmit(activeTab)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
        disabled={loading}
      >
        {loading ? "Calculating..." : "Check Property"}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      <ResultDisplay result={result} />
    </div>
  );
}

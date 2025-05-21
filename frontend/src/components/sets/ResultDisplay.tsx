import { ReactNode } from "react";

interface ResultDisplayProps {
  result: any;
  type?: "boolean" | "number" | "array";
}

export const ResultDisplay = ({ result, type }: ResultDisplayProps) => {
  if (result === null || result === undefined) return null;

  const getWrapperClass = () => {
    switch (typeof result) {
      case "boolean":
        return "";
      case "number":
        return "";
      default:
        return "";
    }
  };

  return (
    <div className={`mt-4 p-4 rounded ${getWrapperClass()}`}>
      {typeof result === "boolean" || typeof result === "number" ? (
        <p className="font-semibold">
          {typeof result === "boolean" ? "Result: " : "Cardinality: "}
          <span className="font-normal">{result.toString()}</span>
        </p>
      ) : (
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Result:</h4>
          <div className="grid grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-2">
            {result.map((item: any, index: number) =>
              Array.isArray(item) ? (
                <div key={index} className="p-2 rounded border border-gray-200">
                  [{item.join(", ")}]
                </div>
              ) : (
                <div key={index} className="p-2 rounded border border-gray-200">
                  {item.toString()}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

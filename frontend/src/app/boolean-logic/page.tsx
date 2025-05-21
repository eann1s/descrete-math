import ExpressionEvaluator from "../../components/boolean-logic/ExpressionEvaluator";
import TruthTableGenerator from "../../components/boolean-logic/TruthTableGenerator";

export default function BooleanLogicPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Boolean Logic</h2>
      <p className="mb-8">
        Boolean logic is a form of algebra where all values are either True or
        False. It's fundamental to computer science and digital electronics.
      </p>

      <div className="space-y-12">
        <TruthTableGenerator />
        <ExpressionEvaluator />
      </div>
    </div>
  );
}

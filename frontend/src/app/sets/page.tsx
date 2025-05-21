import SetOperations from "../../components/sets/SetOperations";
import SetProperties from "../../components/sets/SetProperties";


export default function SetsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Set Theory</h2>
      <p className="mb-8">
        Set theory is a branch of mathematical logic that studies sets, which
        are collections of objects. It serves as a fundamental theory in
        mathematics, underlying nearly all mathematical disciplines.
      </p>

      <div className="space-y-12">
        <SetOperations />
        <SetProperties />
      </div>
    </div>
  );
}

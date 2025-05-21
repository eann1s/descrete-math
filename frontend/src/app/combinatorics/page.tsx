import CombinationCalculator from "../../components/combinatorics/CombinationCalculator";
import PermutationCalculator from "../../components/combinatorics/PermutationCalculator";

export default function CombinatoricsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Combinatorics</h2>
      <p className="mb-8">
        Combinatorics is the branch of mathematics concerned with counting,
        arrangement, and combination of objects. It's essential in probability
        theory, algorithm analysis, and cryptography.
      </p>

      <div className="space-y-12">
        <PermutationCalculator />
        <CombinationCalculator />
      </div>
    </div>
  );
}

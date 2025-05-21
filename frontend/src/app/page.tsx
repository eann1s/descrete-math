export default function Home() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold mb-4">
        Welcome to Discrete Mathematics Explorer
      </h2>
      <p className="mb-4">
        This interactive website showcases various discrete mathematics concepts
        through practical examples and visualizations.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            Boolean Logic
          </h3>
          <p>
            Explore truth tables, evaluate logical expressions, and understand
            logical operations.
          </p>
        </div>

        <div className="p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            Combinatorics
          </h3>
          <p>
            Generate permutations and combinations, and calculate combinatorial
            formulas.
          </p>
        </div>

        <div className="p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            Set Theory
          </h3>
          <p>
            Visualize set operations like union, intersection, and difference.
            Explore set properties.
          </p>
        </div>
      </div>
    </div>
  );
}

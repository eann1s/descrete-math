import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="mb-6">
      <ul className="flex flex-row justify-around p-4 rounded-lg shadow">
        <li>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/boolean-logic"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Boolean Logic
          </Link>
        </li>
        <li>
          <Link
            href="/combinatorics"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Combinatorics
          </Link>
        </li>
        <li>
          <Link
            href="/sets"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sets
          </Link>
        </li>
      </ul>
    </nav>
  );
}

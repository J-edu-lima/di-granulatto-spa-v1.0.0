import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Di Granulatto
        </Link>
        <nav className="flex gap-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Início
          </Link>
          <Link href="/faq" className="text-gray-600 hover:text-gray-900">
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  );
}

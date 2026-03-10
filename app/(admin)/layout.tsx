import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="block py-2 px-4 rounded hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            href="/products"
            className="block py-2 px-4 rounded hover:bg-gray-700"
          >
            Produtos
          </Link>
          <Link
            href="/orders"
            className="block py-2 px-4 rounded hover:bg-gray-700"
          >
            Pedidos
          </Link>
          <div className="pt-2">
            <p className="text-gray-400 text-xs uppercase mb-2 px-4">
              Conteúdo
            </p>
            <Link
              href="/content/faq"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              FAQ
            </Link>
            <Link
              href="/content/site-content"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Conteúdo do Site
            </Link>
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}

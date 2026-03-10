export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-gray-500 text-sm mb-1">Total de Produtos</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-gray-500 text-sm mb-1">Total de Pedidos</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-gray-500 text-sm mb-1">Pedidos Pendentes</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}

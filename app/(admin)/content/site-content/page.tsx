import { getSiteContents } from "@/modules/content/site-content/repository";

export default async function SiteContentPage() {
  const contents = await getSiteContents();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Conteúdo do Site</h1>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Chave
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contents.map((content) => (
              <tr key={content.id}>
                <td className="px-6 py-4 font-mono text-sm">{content.key}</td>
                <td className="px-6 py-4">{content.value}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
            {contents.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  Nenhum conteúdo cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { loadFaqs } from "@/modules/content/faq/loader";

export default async function FaqPage() {
  const faqs = await loadFaqs();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Perguntas Frequentes</h1>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
        {faqs.length === 0 && (
          <p className="text-gray-500">Nenhuma pergunta cadastrada.</p>
        )}
      </div>
    </div>
  );
}

import { ShopLayout } from "@/components/shop/shop-layout";
import { FAQPage } from "@/components/shop/faq-page";

import { getFAQs } from "@/lib/data";

export const metadata = {
  title: "Perguntas Frequentes | Di'Granulatto",
  description:
    "Encontre respostas para as dúvidas mais comuns sobre encomendas, entregas, pagamentos e nossos produtos.",
};

export default function FAQ() {
  const faqs = getFAQs();

  return (
    <ShopLayout>
      <FAQPage faqs={faqs} />
    </ShopLayout>
  );
}

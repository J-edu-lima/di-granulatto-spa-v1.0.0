import { ShopLayout } from "@/components/shop/shop-layout"
import { ContactPage } from "@/components/shop/contact-page"

export const metadata = {
  title: "Contato | Di'Granulatto",
  description: "Entre em contato conosco. Encontre nosso endereço, telefone, email e horário de funcionamento.",
}

export default function Contato() {
  return (
    <ShopLayout>
      <ContactPage />
    </ShopLayout>
  )
}

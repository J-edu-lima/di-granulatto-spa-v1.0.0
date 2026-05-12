"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MessageCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { WHATSAPP_NUMBER } from "@/lib/constants"
import { generateWhatsAppLink } from "@/lib/utils/format"
import type { FAQItem } from "@/types"

interface FAQPageProps {
  faqs: FAQItem[]
}

export function FAQPage({ faqs }: FAQPageProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFAQ = faqs.filter((item) => {
    const query = searchQuery.toLowerCase()
    return item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query)
  }).sort((a, b) => a.order - b.order)

  const handleContactClick = () => {
    const message = "Olá! Tenho uma dúvida que não encontrei no FAQ."
    const link = generateWhatsAppLink(WHATSAPP_NUMBER, message)
    window.open(link, "_blank")
  }

  return (
    <div className="bg-background py-12 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="font-script text-primary text-xl">Tire suas dúvidas</p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">Perguntas Frequentes</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Encontre respostas para as dúvidas mais comuns sobre nossos produtos, encomendas e entregas.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar nas perguntas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-12 text-base"
          />
        </div>

        {/* FAQ List */}
        {filteredFAQ.length === 0 ? (
          <div className="py-12 text-center">
            <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="font-heading text-lg font-semibold text-foreground">Nenhuma pergunta encontrada</h3>
            <p className="mt-1 text-muted-foreground">Tente buscar por outros termos.</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQ.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-border">
                <AccordionTrigger className="text-left font-heading text-base font-medium hover:text-primary hover:no-underline [&[data-state=open]]:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {/* Contact CTA */}
        <div className="mt-12 rounded-2xl bg-muted/50 p-8 text-center">
          <h3 className="font-heading text-xl font-semibold text-foreground">Não encontrou o que procurava?</h3>
          <p className="mt-2 text-muted-foreground">
            Entre em contato conosco pelo WhatsApp e teremos prazer em ajudar!
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button onClick={handleContactClick} className="gap-2 bg-green-600 text-white hover:bg-green-700">
              <MessageCircle className="h-5 w-5" />
              Falar no WhatsApp
            </Button>
            <Link href="/contato">
              <Button variant="outline" className="bg-transparent">
                Ver Informações de Contato
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

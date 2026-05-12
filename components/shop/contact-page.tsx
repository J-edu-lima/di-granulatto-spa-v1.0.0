"use client"

import { MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CONTACT_INFO, WHATSAPP_NUMBER } from "@/lib/constants"
import { generateWhatsAppLink } from "@/lib/utils/format"

export function ContactPage() {
  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de saber mais sobre os produtos da Di'Granulatto."
    const link = generateWhatsAppLink(WHATSAPP_NUMBER, message)
    window.open(link, "_blank")
  }

  return (
    <div className="bg-background py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="font-script text-xl text-primary">Fale Conosco</p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">Informações de Contato</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Estamos sempre prontos para atender você! Entre em contato pelo WhatsApp, telefone ou visite nossa loja.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {/* WhatsApp CTA */}
            <Card className="overflow-hidden border-primary bg-primary/5">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                  <MessageCircle className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold text-foreground">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">A forma mais rápida de nos contactar</p>
                </div>
                <Button onClick={handleWhatsAppClick} className="bg-green-600 text-white hover:bg-green-700">
                  Iniciar Conversa
                </Button>
              </CardContent>
            </Card>

            {/* Address */}
            <Card className="border-border">
              <CardContent className="flex gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">Endereço</h3>
                  <p className="mt-1 text-muted-foreground">
                    {CONTACT_INFO.address}
                    <br />
                    {CONTACT_INFO.city}, {CONTACT_INFO.state}
                    <br />
                    CEP: {CONTACT_INFO.zipCode}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card className="border-border">
              <CardContent className="flex gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">Telefone</h3>
                  <p className="mt-1 text-muted-foreground">{CONTACT_INFO.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="border-border">
              <CardContent className="flex gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">Email</h3>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="mt-1 text-muted-foreground transition-colors hover:text-primary"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="border-border">
              <CardContent className="flex gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold text-foreground">Horário de Funcionamento</h3>
                  <div className="mt-2 space-y-1">
                    {CONTACT_INFO.businessHours.map((schedule) => (
                      <div key={schedule.day} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{schedule.day}</span>
                        <span className="font-medium text-foreground">
                          {schedule.closed ? "Fechado" : `${schedule.open} - ${schedule.close}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground">Redes Sociais</h3>
                <p className="mt-1 text-sm text-muted-foreground">Siga-nos para novidades e promoções</p>
                <div className="mt-4 flex gap-3">
                  {CONTACT_INFO.socialMedia.instagram && (
                    <a
                      href={CONTACT_INFO.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white transition-transform hover:scale-110"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {CONTACT_INFO.socialMedia.facebook && (
                    <a
                      href={CONTACT_INFO.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-transform hover:scale-110"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted lg:aspect-auto lg:min-h-[600px]">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <MapPin className="mb-4 h-16 w-16 text-primary/30" />
              <h3 className="font-heading text-xl font-semibold text-foreground">Mapa Interativo</h3>
              <p className="mt-2 text-muted-foreground">
                Para exibir o mapa, configure a integração com Google Maps ou adicione uma imagem estática do local.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                {CONTACT_INFO.address}, {CONTACT_INFO.city} - {CONTACT_INFO.state}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

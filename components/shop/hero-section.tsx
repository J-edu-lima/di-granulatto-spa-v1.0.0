"use client"

import Link from "next/link"
import { ArrowRight, Award, Heart, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Award,
    title: "Qualidade Garantida",
    description: "Ingredientes premium selecionados para garantir o melhor sabor",
  },
  {
    icon: Heart,
    title: "Feito com Amor",
    description: "Cada produto é preparado artesanalmente com dedicação e carinho",
  },
  {
    icon: Clock,
    title: "Entrega Pontual",
    description: "Garantimos a entrega no horário combinado para seu evento especial",
  },
]

export function HeroSection() {
  return (
    <section className="relative">
      {/* Main Hero Content */}
      <div className="bg-gradient-to-b from-secondary/30 via-background to-background pb-8 pt-16 md:pb-12 md:pt-24 lg:pb-16 lg:pt-32">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          {/* Main Title */}
          <h1 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Doçura Artesanal
            <br />
            que <span className="font-script text-5xl text-primary md:text-6xl lg:text-7xl font-normal">Encanta</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Bolos, tortas e doces feitos com amor, ingredientes selecionados e o toque especial que transforma cada
            mordida em uma experiência inesquecível.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/produtos">
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Ver Produtos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#sobre">
              <Button
                size="lg"
                variant="outline"
                className="border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5"
              >
                Conheça Nossa História
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-muted/50 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-semibold text-foreground">{feature.title}</h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

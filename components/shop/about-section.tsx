import Image from "next/image"
import { Check } from "lucide-react"
import type { AboutContent } from "@/types"

interface AboutSectionProps {
  content: AboutContent
}

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="sobre" className="scroll-mt-16 bg-muted/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-script text-3xl text-primary">Nossa Essência</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">Buscando o melhor para VOCÊ!  </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[3/4]">
            <Image
              src={content.image || "/placeholder.svg?height=500&width=600&query=artisan bakery kitchen pastry chef"}
              alt="Sobre a Di'Granulatto"
              fill
              className="object-cover"
            />
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-secondary/50" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h3 className="font-heading text-2xl font-bold text-foreground md:text-3xl my-px">{content.title}</h3>
            {content.subtitle && <p className="font-script text-lg md:text-xl text-primary">{content.subtitle}</p>}
            <div className="space-y-4 text-muted-foreground">
              {content.description.split("\n\n").map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Highlights */}
            {content.highlights && content.highlights.length > 0 && (
              <ul className="mt-8 space-y-3">
                {content.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

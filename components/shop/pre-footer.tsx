import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PreFooter() {
  return (
    <section className="bg-muted/50 py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
          Pronto para Adoçar Seu Dia?
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
          Encomende agora e receba nossos produtos fresquinhos, preparados especialmente para você.
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <Link href="/produtos">
            <Button size="lg" className="bg-primary px-8 text-primary-foreground hover:bg-primary/90">
              Fazer Pedido
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

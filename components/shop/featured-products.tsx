import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "./product-card"
import type { Product } from "@/types"

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products.length) return null

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <p className="font-script text-3xl text-primary font-normal">
            Nossos Favoritos
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
            Produtos em Destaque
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Conheça os doces mais amados pelos nossos clientes.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/produtos">
            <Button variant="outline" size="lg" className="gap-2">
              Ver Todos os Produtos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ShoppingBag, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { formatCurrency } from "@/lib/utils/format"
import type { Product } from "@/types"
import { ProductModal } from "./product-modal"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product)
  }

  return (
    <>
      <Card
        className="group cursor-pointer overflow-hidden border-border bg-card transition-all hover:shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg?height=400&width=400&query=gourmet dessert sweet cake"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {hasDiscount && (
              <Badge className="bg-destructive text-destructive-foreground">-{discountPercentage}%</Badge>
            )}
            {product.featured && <Badge className="bg-primary text-primary-foreground">Destaque</Badge>}
          </div>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-foreground/0 opacity-0 transition-all group-hover:bg-foreground/20 group-hover:opacity-100">
            <Button
              size="icon"
              className="h-10 w-10 rounded-full bg-white text-foreground hover:bg-primary hover:text-primary-foreground"
              onClick={(e) => {
                e.stopPropagation()
                setIsModalOpen(true)
              }}
              aria-label="Ver detalhes"
            >
              <Eye className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleAddToCart}
              aria-label="Adicionar ao carrinho"
            >
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-heading text-lg font-semibold text-card-foreground line-clamp-1">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>

          <div className="mt-3 flex items-center gap-2">
            <span className="font-heading text-xl font-bold text-primary">{formatCurrency(product.price)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.originalPrice!)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <ProductModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

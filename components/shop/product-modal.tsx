"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Minus,
  Plus,
  ShoppingBag,
  X,
  AlertTriangle,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { useCart } from "@/contexts/cart-context"
import { formatCurrency } from "@/lib/utils/format"
import type { Product } from "@/types"

/* ============================
   Types
============================ */

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

/* ============================
   Component
============================ */

export function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  /* ---------- State & Context ---------- */

  const { addItem } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState("")

  /* ---------- Derived State ---------- */

  const hasDiscount =
    product.originalPrice &&
    product.originalPrice > product.price

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) /
          product.originalPrice!) *
          100
      )
    : 0

  /* ---------- Handlers ---------- */

  const handleAddToCart = () => {
    addItem(product, quantity, notes || undefined)
    setQuantity(1)
    setNotes("")
    onClose()
  }

  const handleClose = () => {
    setQuantity(1)
    setNotes("")
    onClose()
  }

  /* ============================
     Render
  ============================ */

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="
          !max-w-none
          bg-background
          p-0
          overflow-hidden
          flex
          flex-col

          /* MOBILE */
          h-[100dvh]
          w-full
          rounded-none

          /* TABLET */
          sm:h-[90dvh]
          sm:w-[90vw]
          sm:max-w-[600px]
          sm:rounded-2xl

          /* DESKTOP */
          lg:h-[90vh]
          lg:w-[90vw]
          lg:max-w-[1200px]
        "
      >
        {/* Acessibilidade */}
        <DialogTitle className="sr-only">
          {product.name}
        </DialogTitle>

        {/* ============================
           Close Button
        ============================ */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Fechar"
          onClick={handleClose}
          className="
            absolute
            right-3
            top-3
            z-10
            h-9
            w-9
            rounded-full
            bg-white/90
            shadow-md
            hover:bg-white

            sm:right-4
            sm:top-4
            sm:h-10
            sm:w-10
          "
        >
          <X className="h-5 w-5" />
        </Button>

        {/* ============================
           Layout Principal
        ============================ */}
        <div
          className="
            flex
            flex-col
            h-full
            min-h-0

            /* Desktop: layout em colunas */
            lg:grid
            lg:grid-cols-[1fr_2fr]
          "
        >
          {/* ============================
             Image Section
          ============================ */}
          <div
            className="
              relative
              w-full
              bg-muted
              flex-shrink-0

              /* Mobile */
              h-[30vh]
              min-h-[200px]

              /* Tablet */
              sm:h-auto
              sm:aspect-[4/3]
              sm:min-h-0

              /* Desktop */
              lg:h-full
              lg:aspect-square
            "
          >
            <Image
              fill
              alt={product.name}
              src={
                product.image ||
                '/placeholder.svg?height=500&width=500'
              }
              className="object-cover"
            />

            {/* Badges */}
            <div className="absolute left-3 top-3 flex flex-col gap-2 sm:left-4 sm:top-4">
              {hasDiscount && (
                <Badge className="bg-destructive text-destructive-foreground text-xs">
                  -{discountPercentage}%
                </Badge>
              )}

              {product.featured && (
                <Badge className="bg-primary text-primary-foreground text-xs">
                  Destaque
                </Badge>
              )}
            </div>
          </div>

          {/* ============================
             Content Section
          ============================ */}
          <div className="flex flex-col h-full min-h-0">
            {/* Scroll Area */}
            <div
              className="
                flex-1
                overflow-y-auto
                space-y-4

                [scrollbar-width:thin]
                [scrollbar-color:hsl(var(--accent))_transparent]

                p-4
                sm:p-5
                md:p-6
                lg:p-8
              "
            >
              {/* Title & Description */}
              <div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl">
                  {product.name}
                </h2>

                <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-bold text-primary text-2xl sm:text-3xl lg:text-4xl">
                  {formatCurrency(product.price)}
                </span>

                {hasDiscount && (
                  <span className="line-through text-sm sm:text-base text-muted-foreground">
                    {formatCurrency(product.originalPrice!)}
                  </span>
                )}
              </div>

              {/* Servings */}
              {product.servings && (
                <p className="text-sm text-muted-foreground">
                  <strong>Serve:</strong> {product.servings}
                </p>
              )}

              {/* Ingredients */}
              {product.ingredients?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-1">
                    Ingredientes principais
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.ingredients.join(", ")}
                  </p>
                </div>
              )}

              {/* Allergens */}
              {product.allergens?.length > 0 && (
                <div className="flex gap-2 rounded-lg bg-amber-50 p-3">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-amber-800">
                      Alérgenos
                    </h4>
                    <p className="text-sm text-amber-700">
                      {product.allergens.join(", ")}
                    </p>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm">
                  Observações (opcional)
                </Label>

                <Textarea
                  id="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Sem cebola, ponto da carne, etc."
                  className="text-sm resize-none"
                />
              </div>
            </div>

            {/* ============================
               Footer / CTA
            ============================ */}
            <div
              className="
                border-t
                space-y-3
                flex-shrink-0
                bg-background

                p-4
                sm:p-5
                md:p-6
                lg:p-8
              "
            >
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium whitespace-nowrap">
                  Quantidade:
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 bg-transparent"
                    onClick={() =>
                      setQuantity((q) => Math.max(1, q - 1))
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-12 text-center font-semibold text-base">
                    {quantity}
                  </span>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 bg-transparent"
                    onClick={() =>
                      setQuantity((q) => q + 1)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                className="w-full gap-2 h-11 sm:h-12"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="text-sm sm:text-base">
                  Adicionar ao Carrinho –{" "}
                  {formatCurrency(product.price * quantity)}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { formatCurrency, generateWhatsAppLink, generateOrderMessage } from "@/lib/utils/format"
import { WHATSAPP_NUMBER } from "@/lib/constants"

export function CartDrawer() {
  const { items, isOpen, closeCart, total, itemCount, updateQuantity, removeItem, clearCart } = useCart()
  const [customerName, setCustomerName] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleCheckout = () => {
    if (items.length === 0) return

    const orderItems = items.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      notes: item.notes,
    }))

    const message = generateOrderMessage(orderItems, total, customerName || undefined)
    const whatsappLink = generateWhatsAppLink(WHATSAPP_NUMBER, message)

    window.open(whatsappLink, "_blank")
  }

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="flex w-full flex-col bg-background px-6 py-5 sm:max-w-md">

        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-heading">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Seu Carrinho
            {itemCount > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {itemCount} {itemCount === 1 ? "item" : "itens"}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
            <div>
              <p className="font-heading text-lg text-foreground">Seu carrinho está vazio</p>
              <p className="text-sm text-muted-foreground">Adicione produtos para fazer seu pedido</p>
            </div>
            <Button onClick={closeCart} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 rounded-lg border border-border p-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium leading-tight text-foreground">{item.product.name}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.product.id)}
                          aria-label={`Remover ${item.product.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm font-semibold text-primary">{formatCurrency(item.product.price)}</p>
                      <div className="mt-auto flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 bg-transparent"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 bg-transparent"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <span className="ml-auto text-sm font-semibold text-foreground">
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Customer Info */}
            <div className="space-y-3 py-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Seu nome (opcional)</Label>
                <Input
                  id="customerName"
                  placeholder="Digite seu nome"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
            </div>

            <Separator />

            {/* Total and Checkout */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-heading text-lg text-foreground">Total</span>
                <span className="font-heading text-2xl font-bold text-primary">{formatCurrency(total)}</span>
              </div>

              <Button
                className="w-full gap-2 bg-green-600 text-white hover:bg-green-700"
                size="lg"
                onClick={handleCheckout}
              >
                <MessageCircle className="h-5 w-5" />
                Finalizar no WhatsApp
              </Button>

              <Button variant="outline" className="w-full bg-transparent" onClick={clearCart}>
                Limpar Carrinho
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

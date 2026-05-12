// Currency formatting
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

// Phone formatting
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "")
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  }
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

// WhatsApp link generator
export function generateWhatsAppLink(phone: string, message: string): string {
  const cleanedPhone = phone.replace(/\D/g, "")
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${cleanedPhone}?text=${encodedMessage}`
}

// Generate order message for WhatsApp
export function generateOrderMessage(
  items: { name: string; quantity: number; price: number; notes?: string }[],
  total: number,
  customerName?: string,
): string {
  let message = `*Novo Pedido - Di'Granulatto*\n\n`

  if (customerName) {
    message += `*Cliente:* ${customerName}\n\n`
  }

  message += `*Itens do Pedido:*\n`

  items.forEach((item, index) => {
    message += `\n${index + 1}. ${item.name}\n`
    message += `   Qtd: ${item.quantity} x ${formatCurrency(item.price)}\n`
    message += `   Subtotal: ${formatCurrency(item.quantity * item.price)}\n`
    if (item.notes) {
      message += `   Obs: ${item.notes}\n`
    }
  })

  message += `\n*Total: ${formatCurrency(total)}*\n`
  message += `\n---\nPedido feito pelo site Di'Granulatto`

  return message
}

// Slug generation
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}

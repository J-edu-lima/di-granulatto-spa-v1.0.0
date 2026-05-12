"use client"

import { useState } from "react"
import { Search, Eye, MessageCircle } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { formatCurrency } from "@/lib/utils/format"
import { useToast } from "@/hooks/use-toast"
import { MOCK_ORDERS } from "@/lib/constants"

type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"

interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_phone: string
  customer_email?: string
  customer_address?: string
  status: OrderStatus
  payment_method: string
  subtotal: number
  discount: number
  delivery_fee: number
  total: number
  customer_notes?: string
  created_at: string
}

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: "Pendente", color: "bg-gray-100 text-gray-700" },
  confirmed: { label: "Confirmado", color: "bg-blue-100 text-blue-700" },
  preparing: { label: "Preparando", color: "bg-amber-100 text-amber-700" },
  ready: { label: "Pronto", color: "bg-purple-100 text-purple-700" },
  delivered: { label: "Entregue", color: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-700" },
}

export default function AdminOrdersPage() {
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const statusCounts = {
    pending: orders.filter(o => o.status === "pending").length,
    confirmed: orders.filter(o => o.status === "confirmed").length,
    preparing: orders.filter(o => o.status === "preparing").length,
    ready: orders.filter(o => o.status === "ready").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_phone.includes(searchQuery) ||
      order.order_number.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
    toast({
      title: "Status atualizado (mock)",
      description: "O status do pedido foi atualizado com sucesso.",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">Pedidos</h1>
          <p className="mt-1 text-muted-foreground">Acompanhe e gerencie os pedidos recebidos (dados mockados)</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente ou telefone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              {Object.entries(statusConfig).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(["pending", "confirmed", "preparing", "delivered"] as OrderStatus[]).map((status) => {
            const count = statusCounts[status]
            return (
              <Card key={status} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{statusConfig[status].label}</span>
                    <Badge className={statusConfig[status].color}>{count}</Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Orders Table */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading">Lista de Pedidos</CardTitle>
            <CardDescription>{filteredOrders.length} pedidos encontrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left text-sm font-medium text-muted-foreground">
                    <th className="pb-3 pr-4">Pedido</th>
                    <th className="pb-3 pr-4">Cliente</th>
                    <th className="pb-3 pr-4">Total</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 pr-4">Data</th>
                    <th className="pb-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0">
                      <td className="py-3 pr-4 font-medium text-foreground">
                        #{order.order_number}
                      </td>
                      <td className="py-3 pr-4">
                        <div>
                          <p className="text-foreground">{order.customer_name}</p>
                          <p className="text-xs text-muted-foreground">{order.customer_phone}</p>
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-medium text-foreground">{formatCurrency(order.total)}</td>
                      <td className="py-3 pr-4">
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleUpdateStatus(order.id, value as OrderStatus)}
                        >
                          <SelectTrigger className="h-8 w-[130px]">
                            <Badge className={statusConfig[order.status].color}>
                              {statusConfig[order.status].label}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(statusConfig).map(([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">{formatDate(order.created_at)}</td>
                      <td className="py-3">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => {
                              const message = `Olá ${order.customer_name}, seu pedido #${order.order_number} está ${statusConfig[order.status].label.toLowerCase()}.`
                              window.open(
                                `https://wa.me/${order.customer_phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
                                "_blank"
                              )
                            }}
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">Nenhum pedido encontrado.</div>
            )}
          </CardContent>
        </Card>

        {/* Order Details Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-md bg-background">
            <DialogHeader>
              <DialogTitle className="font-heading">
                Pedido #{selectedOrder?.order_number}
              </DialogTitle>
              <DialogDescription>Detalhes do pedido</DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium text-foreground">{selectedOrder.customer_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer_phone}</p>
                  {selectedOrder.customer_email && (
                    <p className="text-sm text-muted-foreground">{selectedOrder.customer_email}</p>
                  )}
                </div>

                {selectedOrder.customer_address && (
                  <div>
                    <p className="text-sm text-muted-foreground">Endereço de Entrega</p>
                    <p className="text-sm text-foreground">{selectedOrder.customer_address}</p>
                  </div>
                )}

                <div>
                  <p className="mb-2 text-sm text-muted-foreground">Resumo do Pedido</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">Subtotal</span>
                      <span className="text-foreground">{formatCurrency(selectedOrder.subtotal)}</span>
                    </div>
                    {selectedOrder.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground">Desconto</span>
                        <span className="text-green-600">-{formatCurrency(selectedOrder.discount)}</span>
                      </div>
                    )}
                    {selectedOrder.delivery_fee > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground">Taxa de Entrega</span>
                        <span className="text-foreground">{formatCurrency(selectedOrder.delivery_fee)}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex justify-between border-t border-border pt-2 font-medium">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">{formatCurrency(selectedOrder.total)}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Método de Pagamento</p>
                  <p className="text-sm font-medium text-foreground">
                    {selectedOrder.payment_method === "pix"
                      ? "PIX"
                      : selectedOrder.payment_method === "card"
                        ? "Cartão"
                        : "Dinheiro"}
                  </p>
                </div>

                {selectedOrder.customer_notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Observações</p>
                    <p className="text-sm text-foreground">{selectedOrder.customer_notes}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground">Data do Pedido</p>
                  <p className="text-sm text-foreground">{formatDate(selectedOrder.created_at)}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

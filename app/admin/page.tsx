"use client"

import { useState, useEffect } from "react"
import { Package, ShoppingBag, TrendingUp, Tag, RefreshCw } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils/format"
import { MOCK_PRODUCTS, CATEGORIES, MOCK_ORDERS } from "@/lib/constants"

// Status config
const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  pending:   { label: "Pendente",    className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  confirmed: { label: "Confirmado",  className: "bg-blue-100 text-blue-800 border-blue-200" },
  preparing: { label: "Preparando",  className: "bg-orange-100 text-orange-800 border-orange-200" },
  ready:     { label: "Pronto",      className: "bg-purple-100 text-purple-800 border-purple-200" },
  delivered: { label: "Entregue",    className: "bg-green-100 text-green-800 border-green-200" },
  cancelled: { label: "Cancelado",   className: "bg-red-100 text-red-800 border-red-200" },
}

const PAYMENT_LABELS: Record<string, string> = {
  pix:  "PIX",
  cash: "Dinheiro",
  card: "Cartão",
}

const ADMIN_TIME_ZONE = "America/Sao_Paulo"

function formatAdminOrderDate(dateString: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: ADMIN_TIME_ZONE,
  }).format(new Date(dateString))
}

export default function AdminDashboard() {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setLastUpdated(new Date())
  }, [])

  // Mock stats
  const stats = {
    totalProducts: MOCK_PRODUCTS.length,
    activeProducts: MOCK_PRODUCTS.filter(p => p.available).length,
    weekOrders: MOCK_ORDERS.length,
    pendingOrders: MOCK_ORDERS.filter(o => ["pending", "confirmed", "preparing"].includes(o.status)).length,
    monthRevenue: MOCK_ORDERS.filter(o => o.status === "delivered").reduce((sum, o) => sum + o.total, 0),
    totalCategories: CATEGORIES.length,
  }

  const handleRefresh = () => {
    setLastUpdated(new Date())
  }

  const statCards = [
    {
      name:        "Produtos Ativos",
      value:       String(stats.activeProducts),
      icon:        Package,
      description: `${stats.totalProducts} produtos no total`,
    },
    {
      name:        "Pedidos esta Semana",
      value:       String(stats.weekOrders),
      icon:        ShoppingBag,
      description: `${stats.pendingOrders} pendentes / em preparo`,
    },
    {
      name:        "Faturamento do Mês",
      value:       formatCurrency(stats.monthRevenue),
      icon:        TrendingUp,
      description: "Pedidos com status entregue",
    },
    {
      name:        "Categorias",
      value:       String(stats.totalCategories),
      icon:        Tag,
      description: "Categorias cadastradas",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold lg:text-3xl">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Visão geral do seu negócio (dados mockados)</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </Button>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              Atualizado às {isClient && lastUpdated ? lastUpdated.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "—"}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pedidos Recentes</CardTitle>
                <CardDescription>
                  Pedidos dos últimos 7 dias
                  <span className="ml-2 font-medium text-foreground">
                    ({MOCK_ORDERS.length} {MOCK_ORDERS.length === 1 ? "pedido" : "pedidos"})
                  </span>
                </CardDescription>
              </div>
              {/* Demo indicator */}
              <div className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1">
                <span className="text-xs font-medium text-amber-700">Demo</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {MOCK_ORDERS.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <ShoppingBag className="mx-auto mb-3 h-10 w-10 opacity-30" />
                <p className="text-sm">Nenhum pedido nos últimos 7 dias</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b text-left text-xs font-medium text-muted-foreground">
                      <th className="pb-2 pr-4">Pedido</th>
                      <th className="pb-2 pr-4">Cliente</th>
                      <th className="pb-2 pr-4">Total</th>
                      <th className="pb-2 pr-4">Pagamento</th>
                      <th className="pb-2 pr-4">Status</th>
                      <th className="pb-2">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_ORDERS.map((order) => {
                      const statusCfg = STATUS_CONFIG[order.status] ?? {
                        label:     order.status,
                        className: "bg-gray-100 text-gray-700 border-gray-200",
                      }
                      return (
                        <tr key={order.id} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-mono text-sm font-medium text-foreground">
                            #{order.order_number}
                          </td>
                          <td className="py-3 pr-4 text-sm">{order.customer_name}</td>
                          <td className="py-3 pr-4 text-sm font-medium">
                            {formatCurrency(order.total)}
                          </td>
                          <td className="py-3 pr-4 text-sm text-muted-foreground">
                            {PAYMENT_LABELS[order.payment_method] ?? order.payment_method}
                          </td>
                          <td className="py-3 pr-4">
                            <span
                              className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusCfg.className}`}
                            >
                              {statusCfg.label}
                            </span>
                          </td>
                          <td className="py-3 text-xs text-muted-foreground">
                            {formatAdminOrderDate(order.created_at)}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  )
}

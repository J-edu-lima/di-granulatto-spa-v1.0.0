"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Package,
  FileText,
  ClipboardList,
  Menu,
  Store,
  HelpCircle,
  FolderOpen,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Produtos", href: "/admin/produtos", icon: Package },
  { name: "Categorias", href: "/admin/categorias", icon: FolderOpen },
  { name: "Sobre Nós", href: "/admin/sobre", icon: FileText },
  { name: "Contato", href: "/admin/contato", icon: Mail },
  { name: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { name: "Pedidos", href: "/admin/pedidos", icon: ClipboardList },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-border bg-background lg:block">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-script text-xl font-regular text-primary">Di&apos;Granulatto</span>
            <span className="text-xs text-muted-foreground">Admin</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Store className="h-4 w-4" />
            Ver Loja
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:px-8">
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-background p-0">
              <div className="flex h-16 items-center border-b border-border px-6">
                <span className="font-heading text-xl font-bold text-primary">Di&apos;Granulatto</span>
              </div>
              <nav className="flex flex-col gap-1 p-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="hidden lg:block" />

          {/* Demo Badge */}
          <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm text-amber-700">
            <span>Modo Demo (dados mockados)</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

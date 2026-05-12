import type { ReactNode } from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { CartDrawer } from "./cart-drawer"

interface ShopLayoutProps {
  children: ReactNode
}

export function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  )
}

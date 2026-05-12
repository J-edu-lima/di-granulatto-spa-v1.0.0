"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal, X, Grid3X3, List } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductCard } from "./product-card"
import { ProductFilters } from "./product-filters"
import { Pagination } from "./pagination"
import { ITEMS_PER_PAGE } from "@/lib/constants"
import { cn } from "@/lib/utils"
import type { Product, Category } from "@/types"

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "newest"
type ViewMode = "grid" | "list"

interface ProductsPageContentProps {
  products: Product[]
  categories: Category[]
}

export function ProductsPageContent({ products: initialProducts, categories }: ProductsPageContentProps) {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("categoria") || ""

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : [])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = initialProducts.filter((p) => p.available)

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      products = products.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query),
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      products = products.filter((p) => selectedCategories.includes(p.category))
    }

    // Price filter
    products = products.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case "name-asc":
        products.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        products.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "price-asc":
        products.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        products.sort((a, b) => b.price - a.price)
        break
      case "newest":
        products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    return products
  }, [searchQuery, selectedCategories, priceRange, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  // Reset page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories)
    handleFilterChange()
  }

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range)
    handleFilterChange()
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setPriceRange([0, 200])
    setSortBy("newest")
    setCurrentPage(1)
  }

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 200

  return (
    <div className="bg-background py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="font-script text-xl text-primary">Nosso Cardápio</p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">Produtos</h1>
          <p className="mt-2 text-muted-foreground">
            Encontre o doce perfeito para sua ocasião especial ou para adoçar seu dia.
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                handleFilterChange()
              }}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Filter Button */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                      !
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-background">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <ProductFilters
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
                    priceRange={priceRange}
                    onPriceChange={handlePriceChange}
                    maxPrice={200}
                  />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort Select */}
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mais Recentes</SelectItem>
                <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
                <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
                <SelectItem value="price-asc">Menor Preço</SelectItem>
                <SelectItem value="price-desc">Maior Preço</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="hidden items-center rounded-lg border border-border p-1 sm:flex">
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", viewMode === "grid" && "bg-muted")}
                onClick={() => setViewMode("grid")}
                aria-label="Visualização em grade"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", viewMode === "list" && "bg-muted")}
                onClick={() => setViewMode("list")}
                aria-label="Visualização em lista"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Filtros ativos:</span>
            {selectedCategories.map((cat) => {
              const category = categories.find((c) => c.slug === cat)
              return (
                <Badge key={cat} variant="secondary" className="gap-1">
                  {category?.name}
                  <button
                    onClick={() => handleCategoryChange(selectedCategories.filter((c) => c !== cat))}
                    aria-label={`Remover filtro ${category?.name}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )
            })}
            {(priceRange[0] > 0 || priceRange[1] < 200) && (
              <Badge variant="secondary" className="gap-1">
                R$ {priceRange[0]} - R$ {priceRange[1]}
                <button onClick={() => handlePriceChange([0, 200])} aria-label="Remover filtro de preço">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={clearFilters}>
              Limpar todos
            </Button>
          </div>
        )}

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24">
              <ProductFilters
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                onPriceChange={handlePriceChange}
                maxPrice={200}
              />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Results Count */}
            <p className="mb-4 text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
            </p>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="font-heading text-lg font-semibold text-foreground">Nenhum produto encontrado</h3>
                <p className="mt-1 text-muted-foreground">Tente ajustar os filtros ou buscar por outro termo.</p>
                <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <>
                <div
                  className={cn(
                    "grid gap-6",
                    viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1",
                  )}
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import { Suspense } from "react";
import { ShopLayout } from "@/components/shop/shop-layout";
import { ProductsPageContent } from "@/components/shop/products-page-content";
import { Skeleton } from "@/components/ui/skeleton";

import { getProducts, getCategories } from "@/lib/data";

export const metadata = {
  title: "Produtos | Di'Granulatto",
  description:
    "Confira nosso cardápio de doces artesanais: bolos, tortas, brigadeiros, cupcakes e muito mais.",
};

function ProductsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-5 w-96" />
      </div>
      <div className="flex flex-col gap-8 lg:flex-row">
        <Skeleton className="h-64 w-full lg:w-64" />
        <div className="flex-1">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const products = getProducts();
  const categories = getCategories();

  return (
    <ShopLayout>
      <Suspense fallback={<ProductsLoading />}>
        <ProductsPageContent
          products={products}
          categories={categories}
        />
      </Suspense>
    </ShopLayout>
  );
}

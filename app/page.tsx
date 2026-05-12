import { ShopLayout } from "@/components/shop/shop-layout";
import { HeroSection } from "@/components/shop/hero-section";
import { AboutSection } from "@/components/shop/about-section";
import { FeaturedProducts } from "@/components/shop/featured-products";
import { PreFooter } from "@/components/shop/pre-footer";

import { getFeaturedProducts, getAboutContent } from "@/lib/data";

export default function HomePage() {
  const products = getFeaturedProducts();
  const aboutContent = getAboutContent();

  return (
    <ShopLayout>
      <HeroSection />
      <FeaturedProducts products={products} />
      <AboutSection content={aboutContent} />
      <PreFooter />
    </ShopLayout>
  );
}

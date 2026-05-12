/**
 * Data fetching functions - MOCK DATA ONLY (no backend)
 */

import type { Product, Category, FAQItem, AboutContent } from "@/types";
import {
  MOCK_PRODUCTS,
  MOCK_FAQ,
  MOCK_ABOUT,
  CATEGORIES as MOCK_CATEGORIES,
} from "@/lib/constants";

// ============================================
// PRODUCTS
// ============================================

export function getProducts(): Product[] {
  return MOCK_PRODUCTS;
}

export function getFeaturedProducts(): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.featured).slice(0, 4);
}

export function getProductById(id: string): Product | null {
  return MOCK_PRODUCTS.find((p) => p.id === id) || null;
}

// ============================================
// CATEGORIES
// ============================================

export function getCategories(): Category[] {
  return MOCK_CATEGORIES;
}

// ============================================
// FAQ
// ============================================

export function getFAQs(): FAQItem[] {
  return MOCK_FAQ;
}

// ============================================
// SITE CONTENT — ABOUT
// ============================================

export function getAboutContent(): AboutContent {
  return MOCK_ABOUT;
}

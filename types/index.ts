// Product Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  image: string
  images?: string[]
  available: boolean
  featured?: boolean
  ingredients?: string[]
  allergens?: string[]
  servings?: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug?: string // Optional for backwards compatibility
  description?: string
  image?: string
}

// Cart Types
export interface CartItem {
  product: Product
  quantity: number
  notes?: string
}

export interface Cart {
  items: CartItem[]
  total: number
}

// About Section Type
export interface AboutContent {
  title: string
  subtitle?: string
  description: string
  image: string
  highlights?: string[]
}

// Contact Info Type
export interface ContactInfo {
  phone: string
  whatsapp: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  businessHours: BusinessHours[]
  socialMedia: SocialMedia
}

export interface BusinessHours {
  day: string
  open: string
  close: string
  closed?: boolean
}

export interface SocialMedia {
  instagram?: string
  facebook?: string
  tiktok?: string
}

// FAQ Type
export interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
  order: number
}

// Order Types
export interface Order {
  id: string
  items: CartItem[]
  total: number
  customerName: string
  customerPhone: string
  customerEmail?: string
  deliveryAddress?: string
  notes?: string
  status: OrderStatus
  createdAt: string
  updatedAt: string
}

export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"

// Admin Types
export interface AdminUser {
  id: string
  email: string
  name: string
  role: "admin" | "editor"
}

// API Response Types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

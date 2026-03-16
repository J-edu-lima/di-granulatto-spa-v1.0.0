import type {
  Category,
  Faq,
  Order,
  OrderItem,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Prisma,
  Product,
  SiteContent,
  SiteSection,
} from "@prisma/client";

export type CategoryEntity = Category;
export type ProductEntity = Product;
export type OrderEntity = Order;
export type OrderItemEntity = OrderItem;
export type FaqEntity = Faq;
export type SiteContentEntity = SiteContent;

export type PaymentMethodEntity = PaymentMethod;
export type PaymentStatusEntity = PaymentStatus;
export type OrderStatusEntity = OrderStatus;
export type SiteSectionEntity = SiteSection;

export type CreateCategoryInput = Prisma.CategoryCreateInput;
export type UpdateCategoryInput = Prisma.CategoryUpdateInput;

export type CreateProductInput = Prisma.ProductCreateInput;
export type UpdateProductInput = Prisma.ProductUpdateInput;

export type CreateOrderInput = Prisma.OrderCreateInput;
export type UpdateOrderInput = Prisma.OrderUpdateInput;

export type CreateOrderItemInput = Prisma.OrderItemCreateInput;
export type UpdateOrderItemInput = Prisma.OrderItemUpdateInput;

export type CreateFaqInput = Prisma.FaqCreateInput;
export type UpdateFaqInput = Prisma.FaqUpdateInput;

export type CreateSiteContentInput = Prisma.SiteContentCreateInput;
export type UpdateSiteContentInput = Prisma.SiteContentUpdateInput;

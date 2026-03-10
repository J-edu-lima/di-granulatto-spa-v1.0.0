import { prisma } from "@/lib/prisma/client";

export async function findAllProducts() {
  return prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
}

export async function findProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });
}

export async function createProduct(data: {
  name: string;
  slug: string;
  description?: string;
  price: number;
  imageUrl?: string;
  inStock?: boolean;
  categoryId?: string;
}) {
  return prisma.product.create({ data });
}

export async function updateProduct(
  id: string,
  data: Partial<{
    name: string;
    slug: string;
    description: string;
    price: number;
    imageUrl: string;
    inStock: boolean;
    categoryId: string;
  }>
) {
  return prisma.product.update({ where: { id }, data });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({ where: { id } });
}

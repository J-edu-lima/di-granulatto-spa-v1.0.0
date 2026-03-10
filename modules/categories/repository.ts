import { prisma } from "@/lib/prisma/client";

export async function findAllCategories() {
  return prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function findCategoryById(id: string) {
  return prisma.category.findUnique({
    where: { id },
    include: {
      products: true,
    },
  });
}

export async function createCategory(data: { name: string; slug: string }) {
  return prisma.category.create({ data });
}

export async function updateCategory(
  id: string,
  data: Partial<{ name: string; slug: string }>
) {
  return prisma.category.update({ where: { id }, data });
}

export async function deleteCategory(id: string) {
  return prisma.category.delete({ where: { id } });
}

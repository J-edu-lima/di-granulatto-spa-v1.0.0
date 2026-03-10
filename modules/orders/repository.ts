import { prisma } from "@/lib/prisma/client";

export async function findAllOrders() {
  return prisma.order.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function createOrder(data: {
  customerName: string;
  customerEmail: string;
  total: number;
  items: { productId: string; quantity: number; price: number }[];
}) {
  const { items, ...orderData } = data;
  return prisma.order.create({
    data: {
      ...orderData,
      items: {
        create: items,
      },
    },
    include: {
      items: true,
    },
  });
}

export async function updateOrderStatus(id: string, status: string) {
  return prisma.order.update({
    where: { id },
    data: { status },
  });
}

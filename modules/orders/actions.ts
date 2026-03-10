"use server";

import { revalidatePath } from "next/cache";
import { placeOrder, changeOrderStatus } from "./service";

export async function placeOrderAction(data: {
  customerName: string;
  customerEmail: string;
  items: { productId: string; quantity: number; price: number }[];
}) {
  const order = await placeOrder(data);
  revalidatePath("/orders");
  return order;
}

export async function updateOrderStatusAction(id: string, status: string) {
  await changeOrderStatus(id, status);
  revalidatePath("/orders");
}

import {
  findAllOrders,
  findOrderById,
  createOrder,
  updateOrderStatus,
} from "./repository";

export async function getOrders() {
  return findAllOrders();
}

export async function getOrderById(id: string) {
  return findOrderById(id);
}

export async function placeOrder(data: {
  customerName: string;
  customerEmail: string;
  items: { productId: string; quantity: number; price: number }[];
}) {
  const total = data.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return createOrder({ ...data, total });
}

export async function changeOrderStatus(id: string, status: string) {
  return updateOrderStatus(id, status);
}

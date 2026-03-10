import {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./repository";
import { generateSlug } from "@/lib/utils/slug";

export async function getProducts() {
  return findAllProducts();
}

export async function getProductById(id: string) {
  return findProductById(id);
}

export async function createNewProduct(data: {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  inStock?: boolean;
  categoryId?: string;
}) {
  const slug = generateSlug(data.name);
  return createProduct({ ...data, slug });
}

export async function editProduct(
  id: string,
  data: Partial<{
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    inStock: boolean;
    categoryId: string;
  }>
) {
  if (data.name) {
    const slug = generateSlug(data.name);
    return updateProduct(id, { ...data, slug });
  }
  return updateProduct(id, data);
}

export async function removeProduct(id: string) {
  return deleteProduct(id);
}

"use server";

import { revalidatePath } from "next/cache";
import { createNewProduct, editProduct, removeProduct } from "./service";

export async function createProductAction(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const imageUrl = formData.get("imageUrl") as string;
  const categoryId = formData.get("categoryId") as string;

  await createNewProduct({
    name,
    description,
    price,
    imageUrl: imageUrl || undefined,
    categoryId: categoryId || undefined,
  });

  revalidatePath("/products");
}

export async function updateProductAction(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const imageUrl = formData.get("imageUrl") as string;
  const inStock = formData.get("inStock") === "true";

  await editProduct(id, {
    name,
    description,
    price,
    imageUrl,
    inStock,
  });

  revalidatePath("/products");
}

export async function deleteProductAction(id: string) {
  await removeProduct(id);
  revalidatePath("/products");
}

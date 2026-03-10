import { getActiveFaqs } from "./repository";

export async function loadFaqs() {
  try {
    return await getActiveFaqs();
  } catch {
    return [];
  }
}

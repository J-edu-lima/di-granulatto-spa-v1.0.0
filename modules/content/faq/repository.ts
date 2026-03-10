import { prisma } from "@/lib/prisma/client";

export async function getFaqs() {
  return prisma.faq.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}

export async function getActiveFaqs() {
  return prisma.faq.findMany({
    where: { active: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}

export async function getFaqById(id: string) {
  return prisma.faq.findUnique({ where: { id } });
}

export async function createFaq(data: {
  question: string;
  answer: string;
  order?: number;
}) {
  return prisma.faq.create({ data });
}

export async function updateFaq(
  id: string,
  data: Partial<{
    question: string;
    answer: string;
    order: number;
    active: boolean;
  }>
) {
  return prisma.faq.update({ where: { id }, data });
}

export async function deleteFaq(id: string) {
  return prisma.faq.delete({ where: { id } });
}

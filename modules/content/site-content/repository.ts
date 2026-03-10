import { prisma } from "@/lib/prisma/client";

export async function getSiteContents() {
  return prisma.siteContent.findMany({
    orderBy: { key: "asc" },
  });
}

export async function getSiteContentByKey(key: string) {
  return prisma.siteContent.findUnique({ where: { key } });
}

export async function upsertSiteContent(key: string, value: string) {
  return prisma.siteContent.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function deleteSiteContent(id: string) {
  return prisma.siteContent.delete({ where: { id } });
}

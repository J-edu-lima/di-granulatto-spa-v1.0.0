import { getSiteContentByKey, getSiteContents } from "./repository";
import { siteContentFallback } from "./fallback";

export async function loadSiteContent(key: string): Promise<string> {
  try {
    const content = await getSiteContentByKey(key);
    return content?.value ?? siteContentFallback[key] ?? "";
  } catch {
    return siteContentFallback[key] ?? "";
  }
}

export async function loadAllSiteContent(): Promise<Record<string, string>> {
  try {
    const contents = await getSiteContents();
    return contents.reduce(
      (acc, item) => ({ ...acc, [item.key]: item.value }),
      {} as Record<string, string>
    );
  } catch {
    return siteContentFallback;
  }
}

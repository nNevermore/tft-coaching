import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_APP_URL || "https://tft-coaching.net";

  // Routes that should be in the sitemap
  const routes = ["", "/dashboard"];

  const sitemapEntries = routes.flatMap((route) => {
    return routing.locales.map((locale) => ({
      url: `${url}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }));
  });

  return sitemapEntries;
}

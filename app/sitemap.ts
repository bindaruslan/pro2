import type { MetadataRoute } from "next";
import { LANDING_PAGES, SITE_URL } from "@/content/seo-pages";
import { getAllLawArticles, getPaginationPages } from "@/utils/laws";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const lawArticles = getAllLawArticles();
  const paginationPages = getPaginationPages().filter((page) => page > 1);

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...LANDING_PAGES.map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/novyny`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/kalkulyator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/statti`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...paginationPages.map((page) => ({
      url: `${SITE_URL}/novyny/page/${page}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
    ...lawArticles.map((article) => ({
      url: `${SITE_URL}/novyny/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
  ];
}

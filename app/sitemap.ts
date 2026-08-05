import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://gigisrental.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Add more routes here as you build them, e.g.:
    // { url: "https://gigisrental.com/catalog", lastModified: new Date(), priority: 0.8 },
  ];
}
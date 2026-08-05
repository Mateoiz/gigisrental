import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://gigisrental.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://gigisrental.com/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://gigisrental.com/collections", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
{ url: "https://gigisrental.com/guidelines", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
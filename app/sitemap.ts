import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.qgigisrental.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://www.gigisrental.com/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://www.gigisrental.com/collections", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://www.gigisrental.com/guidelines", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
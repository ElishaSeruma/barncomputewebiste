import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site-config";
import { getAllRoutes } from "@/lib/site/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return getAllRoutes().map((r) => ({
    url: absoluteUrl(r.path === "/" ? "/" : r.path),
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

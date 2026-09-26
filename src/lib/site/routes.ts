import { AREAS, getAllPages } from "@/lib/docs";
import { SITE_DESCRIPTION } from "@/lib/site-config";
import {
  about,
  blogIndex,
  contact,
  developers,
  faq,
  openSource,
  posts,
  press,
  privacy,
  productIndex,
  products,
  roadmap,
  solutions,
  solutionsIndex,
  terms,
} from "./index";
import type { MarketingPage } from "./types";

export type RouteGroup = "Home" | "Product" | "Solutions" | "Developers" | "Docs" | "Blog" | "Company" | "Legal";

export interface RouteEntry {
  path: string;
  title: string;
  description: string;
  group: RouteGroup;
  /** Sitemap hints. */
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}

const fromPage = (p: MarketingPage, group: RouteGroup, priority: number, changeFrequency: RouteEntry["changeFrequency"] = "monthly"): RouteEntry => ({
  path: p.path,
  title: p.title,
  description: p.description,
  group,
  priority,
  changeFrequency,
});

/** Every public page on the site. The sitemap, llms.txt and llms-full.txt are all generated from this list. */
export function getAllRoutes(): RouteEntry[] {
  const routes: RouteEntry[] = [
    { path: "/", title: "Home", description: SITE_DESCRIPTION, group: "Home", priority: 1, changeFrequency: "weekly" },

    fromPage(productIndex, "Product", 0.9),
    ...Object.values(products).map((p) => fromPage(p, "Product", 0.8)),

    fromPage(solutionsIndex, "Solutions", 0.8),
    ...Object.values(solutions).map((p) => fromPage(p, "Solutions", 0.7)),

    fromPage(developers, "Developers", 0.8),
    fromPage(openSource, "Developers", 0.5),

    {
      path: "/docs",
      title: "Barn Docs",
      description: "Documentation for Barn Computing: create a Barn, connect your devices and share files.",
      group: "Docs",
      priority: 0.9,
      changeFrequency: "weekly",
    },
    ...AREAS.map((a): RouteEntry => ({
      path: `/docs/${a.id}`,
      title: a.title,
      description: a.tagline,
      group: "Docs",
      priority: 0.7,
      changeFrequency: "weekly",
    })),
    ...getAllPages().map((p): RouteEntry => ({
      path: `/docs/${p.path}`,
      title: p.title,
      description: p.description,
      group: "Docs",
      priority: p.areaId === "start" ? 0.7 : 0.6,
      changeFrequency: "weekly",
    })),

    fromPage(blogIndex, "Blog", 0.7, "weekly"),
    ...posts.map((p): RouteEntry => ({
      path: `/blog/${p.slug}`,
      title: p.title,
      description: p.excerpt,
      group: "Blog",
      priority: 0.6,
      changeFrequency: "monthly",
    })),

    fromPage(about, "Company", 0.7),
    fromPage(roadmap, "Company", 0.8, "weekly"),
    fromPage(faq, "Company", 0.7),
    fromPage(press, "Company", 0.5),
    fromPage(contact, "Company", 0.5, "yearly"),

    fromPage(privacy, "Legal", 0.2, "yearly"),
    fromPage(terms, "Legal", 0.2, "yearly"),
  ];

  const seen = new Set<string>();
  for (const r of routes) {
    if (seen.has(r.path)) throw new Error(`Duplicate route in registry: ${r.path}`);
    seen.add(r.path);
  }
  return routes;
}

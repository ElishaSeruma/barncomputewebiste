import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import type { MarketingPage } from "./types";

export function pageMetadata(page: MarketingPage): Metadata {
  return buildMetadata({ title: page.title, description: page.description, path: page.path });
}

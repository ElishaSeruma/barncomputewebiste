import type { Metadata } from "next";

import type { MarketingPage } from "./types";

export function pageMetadata(page: MarketingPage): Metadata {
  return { title: page.title, description: page.description };
}

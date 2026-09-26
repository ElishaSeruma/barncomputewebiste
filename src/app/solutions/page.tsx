import type { Metadata } from "next";

import { MarketingView } from "@/components/marketing/renderer";
import { solutionsIndex } from "@/lib/site";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata(solutionsIndex);

export default function Page() {
  return <MarketingView page={solutionsIndex} />;
}

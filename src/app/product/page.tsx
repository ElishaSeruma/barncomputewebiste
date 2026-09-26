import type { Metadata } from "next";

import { MarketingView } from "@/components/marketing/renderer";
import { productIndex } from "@/lib/site";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata(productIndex);

export default function Page() {
  return <MarketingView page={productIndex} />;
}

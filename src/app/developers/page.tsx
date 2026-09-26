import type { Metadata } from "next";

import { MarketingView } from "@/components/marketing/renderer";
import { developers } from "@/lib/site";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata(developers);

export default function Page() {
  return <MarketingView page={developers} />;
}

import type { Metadata } from "next";

import { MarketingView } from "@/components/marketing/renderer";
import { openSource } from "@/lib/site";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata(openSource);

export default function Page() {
  return <MarketingView page={openSource} />;
}

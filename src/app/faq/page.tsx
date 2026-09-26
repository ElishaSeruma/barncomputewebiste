import type { Metadata } from "next";

import { MarketingView } from "@/components/marketing/renderer";
import { faq } from "@/lib/site";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata(faq);

export default function Page() {
  return <MarketingView page={faq} />;
}

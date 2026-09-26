import type { Metadata } from "next";

import { MarketingView } from "@/components/marketing/renderer";
import { press } from "@/lib/site";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata(press);

export default function Page() {
  return <MarketingView page={press} />;
}

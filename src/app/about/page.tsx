import type { Metadata } from "next";

import { MarketingView } from "@/components/marketing/renderer";
import { about } from "@/lib/site";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata(about);

export default function Page() {
  return <MarketingView page={about} />;
}

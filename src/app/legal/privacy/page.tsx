import type { Metadata } from "next";

import { MarketingView } from "@/components/marketing/renderer";
import { privacy } from "@/lib/site";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata(privacy);

export default function Page() {
  return <MarketingView page={privacy} />;
}

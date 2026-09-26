import type { Metadata } from "next";

import { MarketingView } from "@/components/marketing/renderer";
import { roadmap } from "@/lib/site";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata(roadmap);

export default function Page() {
  return <MarketingView page={roadmap} />;
}

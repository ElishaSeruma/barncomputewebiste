import type { Metadata } from "next";

import { MarketingView } from "@/components/marketing/renderer";
import { blogIndex } from "@/lib/site";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata(blogIndex);

export default function Page() {
  return <MarketingView page={blogIndex} />;
}

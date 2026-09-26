import type { Metadata } from "next";

import { MarketingView } from "@/components/marketing/renderer";
import { contact } from "@/lib/site";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata(contact);

export default function Page() {
  return <MarketingView page={contact} />;
}

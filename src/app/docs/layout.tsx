import type { Metadata } from "next";

import DocsChrome from "@/components/docs/docs-chrome";
import { DocsFooter } from "@/components/docs/docs-footer";
import { buildSearchIndex, getAreaNavs } from "@/lib/docs";

export const metadata: Metadata = {
  title: { default: "Barn Docs", template: "%s | Barn Docs" },
  description: "Documentation for Barn Computing: create a Barn, connect your devices and share files.",
};

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsChrome navs={getAreaNavs()} searchIndex={buildSearchIndex()}>
      {children}
      <DocsFooter />
    </DocsChrome>
  );
}

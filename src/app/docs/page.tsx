import type { Metadata } from "next";

import { DocsLanding } from "@/components/docs/docs-landing";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
  title: "Barn Docs",
  description: "Documentation for Barn Computing: create a Barn, connect your devices and share files.",
  path: "/docs",
  socialTitle: "Barn Docs | Barn Computing",
  }),
  title: { absolute: "Barn Docs" },
};

export default function DocsHome() {
  return <DocsLanding />;
}

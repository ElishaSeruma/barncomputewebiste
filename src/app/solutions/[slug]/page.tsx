import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarketingView } from "@/components/marketing/renderer";
import { solutions } from "@/lib/site";
import { pageMetadata } from "@/lib/site/metadata";

export function generateStaticParams() {
  return Object.keys(solutions).map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const page = solutions[slug];
  return page ? pageMetadata(page) : {};
}

export default async function SolutionPage(props: PageProps<"/solutions/[slug]">) {
  const { slug } = await props.params;
  const page = solutions[slug];
  if (!page) notFound();
  return <MarketingView page={page} />;
}

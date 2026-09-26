import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarketingView } from "@/components/marketing/renderer";
import { products } from "@/lib/site";
import { pageMetadata } from "@/lib/site/metadata";

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const page = products[slug];
  return page ? pageMetadata(page) : {};
}

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const page = products[slug];
  if (!page) notFound();
  return <MarketingView page={page} />;
}

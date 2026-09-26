import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AreaOverview } from "@/components/docs/area-overview";
import { DocArticle } from "@/components/docs/doc-article";
import { getAllStaticParams, getAreaNav, getPage } from "@/lib/docs";

export function generateStaticParams() {
  return getAllStaticParams();
}

export async function generateMetadata(props: PageProps<"/docs/[...slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const path = slug.join("/");
  const page = getPage(path);
  if (page) return { title: page.title, description: page.description };
  const area = slug.length === 1 ? getAreaNav(slug[0]) : undefined;
  return area ? { title: area.title, description: area.tagline } : {};
}

export default async function DocsPage(props: PageProps<"/docs/[...slug]">) {
  const { slug } = await props.params;
  const path = slug.join("/");

  if (slug.length === 1 && getAreaNav(slug[0])) return <AreaOverview areaId={slug[0]} />;

  const page = getPage(path);
  if (!page) notFound();
  return <DocArticle page={page} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AreaOverview } from "@/components/docs/area-overview";
import { DocArticle } from "@/components/docs/doc-article";
import { buildMetadata } from "@/lib/seo";
import { getAllStaticParams, getAreaNav, getPage } from "@/lib/docs";

export function generateStaticParams() {
  return getAllStaticParams();
}

export async function generateMetadata(props: PageProps<"/docs/[...slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const path = slug.join("/");
  const page = getPage(path);
  if (page) return buildMetadata({ title: page.title, socialTitle: `${page.title} | Barn Docs`, description: page.description, path: `/docs/${page.path}` });
  const area = slug.length === 1 ? getAreaNav(slug[0]) : undefined;
  return area ? buildMetadata({ title: area.title, socialTitle: `${area.title} | Barn Docs`, description: area.tagline, path: `/docs/${area.id}` }) : {};
}

export default async function DocsPage(props: PageProps<"/docs/[...slug]">) {
  const { slug } = await props.params;
  const path = slug.join("/");

  if (slug.length === 1 && getAreaNav(slug[0])) return <AreaOverview areaId={slug[0]} />;

  const page = getPage(path);
  if (!page) notFound();
  return <DocArticle page={page} />;
}

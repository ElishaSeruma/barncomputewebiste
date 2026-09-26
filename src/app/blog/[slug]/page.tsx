import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostView } from "@/components/marketing/blog-post-view";
import { buildMetadata } from "@/lib/seo";
import { getPost, posts } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  return post ? buildMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, type: "article" }) : {};
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();
  return <BlogPostView post={post} />;
}

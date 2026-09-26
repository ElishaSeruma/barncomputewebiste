import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

import { DocBlocks } from "@/components/docs/blocks";
import { getRelatedPosts } from "@/lib/site";
import type { BlogPost } from "@/lib/site/types";
import { Aurora } from "./aurora";
import { CtaBand } from "./cta-band";
import { ICONS } from "./icons";
import { shell } from "./layout";
import { LinkCards } from "./static-sections";
import { PageShell } from "./page-shell";

export function BlogPostView({ post }: { post: BlogPost }) {
  const Icon = ICONS[post.icon];
  const related = getRelatedPosts(post.slug, 2);

  return (
    <PageShell>
      <section className="relative overflow-hidden pb-10 pt-32 sm:pt-40">
        <Aurora />
        <div className={`${shell} relative max-w-3xl`}>
          <Link href="/blog" className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> All posts
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="rounded-full border border-accent bg-accent/25 px-3 py-1 font-medium text-foreground">{post.category}</span>
            <span>{post.date}</span>
            <span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> {post.readMinutes} min read</span>
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-6xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-foreground/75">{post.excerpt}</p>
          <div className="mt-8 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Icon className="size-5" />
            </span>
            <div>
              <p className="text-sm font-bold">{post.author}</p>
              <p className="text-xs text-muted-foreground">Barn Computing</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 pt-6">
        <div className={`${shell} max-w-3xl`}>
          <DocBlocks blocks={post.blocks} />
        </div>
      </section>

      <section className="pb-12">
        <div className={shell}>
          <h2 className="text-2xl font-bold">Keep reading</h2>
          <LinkCards
            cols={2}
            items={related.map((r) => ({ icon: r.icon, title: r.title, text: r.excerpt, href: `/blog/${r.slug}`, tag: r.category }))}
          />
        </div>
      </section>

      <CtaBand
        title="Follow along"
        subtitle="as the foundation takes shape."
        text="Read the docs, follow the roadmap and tell us how you would use Barn."
        primary={{ label: "Read the docs", href: "/docs" }}
        secondary={{ label: "See the roadmap", href: "/roadmap" }}
        badges={["Private by design"]}
      />
    </PageShell>
  );
}

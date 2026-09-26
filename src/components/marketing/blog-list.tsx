"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import type { IconKey } from "./icons";
import { ICONS } from "./icons";

export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  icon: IconKey;
}

function Meta({ p }: { p: PostSummary }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
      <span className="rounded-full border border-accent bg-accent/25 px-2 py-0.5 font-medium text-foreground">{p.category}</span>
      <span>{p.date}</span>
      <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {p.readMinutes} min read</span>
    </p>
  );
}

export function BlogList({ posts }: { posts: PostSummary[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.map((p) => p.category)))], [posts]);
  const [cat, setCat] = useState("All");
  const shown = posts.filter((p) => cat === "All" || p.category === cat);
  const [featured, ...rest] = shown;

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter posts">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={c === cat}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              c === cat ? "border-foreground bg-foreground text-background" : "border-border bg-white/50 hover:border-foreground/30"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {featured && (
        <Link href={`/blog/${featured.slug}`} className="group mt-8 grid overflow-hidden rounded-xl border border-border bg-white/50 shadow-sm transition-colors hover:border-foreground/30 md:grid-cols-[1.1fr_1fr]">
          <div className="relative flex min-h-56 items-center justify-center overflow-hidden bg-accent">
            <div aria-hidden className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(rgb(33 33 33 / 0.35) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
            {(() => {
              const Icon = ICONS[featured.icon];
              return <Icon className="relative size-24 text-accent-foreground transition-transform duration-500 group-hover:scale-110" strokeWidth={1.25} />;
            })()}
          </div>
          <div className="p-6 sm:p-8">
            <Meta p={featured} />
            <h2 className="mt-4 text-3xl font-bold leading-tight">{featured.title}</h2>
            <p className="mt-3 leading-relaxed text-foreground/75">{featured.excerpt}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 font-medium">
              Read the post <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => {
          const Icon = ICONS[p.icon];
          return (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col rounded-xl border border-border bg-white/50 p-6 shadow-sm transition-colors hover:border-foreground/30 hover:bg-white/80">
              <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Icon className="size-5" />
              </span>
              <div className="mt-5"><Meta p={p} /></div>
              <h3 className="mt-3 text-xl font-bold leading-snug">{p.title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-foreground/75">{p.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                Read <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
      {shown.length === 0 && <p className="mt-10 text-muted-foreground">No posts in this category yet.</p>}
    </div>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { FeatureItem } from "@/lib/site/types";
import { ICONS } from "./icons";
import { SpotlightCard } from "./spotlight-card";

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-accent bg-accent/25 px-2 py-0.5 text-[10px] font-medium">{children}</span>
  );
}

// Bento layout: a repeating pattern of wide and narrow cards, so a set of six feels designed, not stacked.
const BENTO_SPANS = ["lg:col-span-2", "", "", "lg:col-span-2", "", "lg:col-span-2", "lg:col-span-2", "", ""];

export function FeatureGrid({
  items,
  variant = "spotlight",
  cols = 3,
}: {
  items: (FeatureItem & { href?: string })[];
  variant?: "spotlight" | "bento";
  cols?: 2 | 3 | 4;
}) {
  const gridCols = variant === "bento" ? "lg:grid-cols-3" : cols === 2 ? "sm:grid-cols-2" : cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={cn("mt-12 grid gap-4", variant === "bento" ? "sm:grid-cols-2" : "", gridCols)}>
      {items.map((it, i) => {
        const Icon = ICONS[it.icon];
        const body = (
          <SpotlightCard className={cn("h-full", variant === "bento" && BENTO_SPANS[i % BENTO_SPANS.length], variant === "bento" && "p-7")}>
            <div className="flex items-start justify-between">
              <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Icon className="size-5" />
              </span>
              {it.href ? <ArrowUpRight className="size-4 text-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" /> : it.tag ? <Tag>{it.tag}</Tag> : null}
            </div>
            <h3 className="mt-5 flex flex-wrap items-center gap-2 text-xl font-bold">
              {it.title}
              {it.href && it.tag && <Tag>{it.tag}</Tag>}
            </h3>
            <p className="mt-2 leading-relaxed text-foreground/75">{it.text}</p>
          </SpotlightCard>
        );
        return it.href ? (
          <Link key={it.title} href={it.href} className={cn("block", variant === "bento" && BENTO_SPANS[i % BENTO_SPANS.length])}>
            {/* The link owns the span, so the inner card only needs to fill it. */}
            <SpotlightCard className="h-full p-6">
              <div className="flex items-start justify-between">
                <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <ArrowUpRight className="size-4 text-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <h3 className="mt-5 flex flex-wrap items-center gap-2 text-xl font-bold">
                {it.title}
                {it.tag && <Tag>{it.tag}</Tag>}
              </h3>
              <p className="mt-2 leading-relaxed text-foreground/75">{it.text}</p>
            </SpotlightCard>
          </Link>
        ) : (
          <div key={it.title} className={cn(variant === "bento" && BENTO_SPANS[i % BENTO_SPANS.length])}>
            {body}
          </div>
        );
      })}
    </div>
  );
}

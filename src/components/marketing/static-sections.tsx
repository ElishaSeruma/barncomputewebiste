import Link from "next/link";
import { ArrowUpRight, Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Cta, FeatureItem, Section } from "@/lib/site/types";
import { ICONS } from "./icons";
import { SpotlightCard } from "./spotlight-card";
import { Visual, type VisualKey } from "./visuals";

export function SplitBlock({
  title,
  text,
  bullets,
  visual,
  reverse,
  cta,
}: {
  title: string;
  text: string;
  bullets?: string[];
  visual: VisualKey;
  reverse?: boolean;
  cta?: Cta;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={cn(reverse && "lg:order-2")}>
        <h2 className="text-3xl font-bold leading-[1.08] sm:text-4xl">{title}</h2>
        <p className="mt-5 text-lg leading-relaxed text-foreground/75">{text}</p>
        {bullets && (
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex gap-3 leading-relaxed">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Check className="size-3" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        )}
        {cta && (
          <Link href={cta.href} className="mt-7 inline-flex items-center gap-1.5 font-medium underline decoration-accent decoration-2 underline-offset-4 hover:bg-accent/30">
            {cta.label} <ArrowUpRight className="size-4" />
          </Link>
        )}
      </div>
      <div className={cn(reverse && "lg:order-1")}>
        <Visual name={visual} />
      </div>
    </div>
  );
}

export function IsIsNot({ is, isnot, isTitle = "Barn is", isNotTitle = "Barn is not" }: { is: string[]; isnot: string[]; isTitle?: string; isNotTitle?: string }) {
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border p-6 shadow-sm sm:p-8" style={{ borderColor: "color-mix(in srgb, var(--status-green) 40%, transparent)", background: "color-mix(in srgb, var(--status-green) 8%, white)" }}>
        <h3 className="text-xl font-bold">{isTitle}</h3>
        <ul className="mt-5 space-y-3">
          {is.map((t) => (
            <li key={t} className="flex gap-3 leading-relaxed">
              <Check className="mt-1 size-4 shrink-0" style={{ color: "var(--status-green)" }} />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border p-6 shadow-sm sm:p-8" style={{ borderColor: "color-mix(in srgb, var(--status-red) 35%, transparent)", background: "color-mix(in srgb, var(--status-red) 6%, white)" }}>
        <h3 className="text-xl font-bold">{isNotTitle}</h3>
        <ul className="mt-5 space-y-3">
          {isnot.map((t) => (
            <li key={t} className="flex gap-3 leading-relaxed">
              <X className="mt-1 size-4 shrink-0" style={{ color: "var(--status-red)" }} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function LinkCards({ items, cols = 3 }: { items: (FeatureItem & { href: string })[]; cols?: 2 | 3 }) {
  return (
    <div className={cn("mt-12 grid gap-4 sm:grid-cols-2", cols === 3 && "lg:grid-cols-3")}>
      {items.map((it) => {
        const Icon = ICONS[it.icon];
        return (
          <Link key={it.href} href={it.href} className="block">
            <SpotlightCard className="h-full">
              <div className="flex items-start justify-between">
                <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <ArrowUpRight className="size-4 text-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <h3 className="mt-5 flex flex-wrap items-center gap-2 text-xl font-bold">
                {it.title}
                {it.tag && <span className="rounded-full border border-accent bg-accent/25 px-2 py-0.5 text-[10px] font-medium">{it.tag}</span>}
              </h3>
              <p className="mt-2 leading-relaxed text-foreground/75">{it.text}</p>
            </SpotlightCard>
          </Link>
        );
      })}
    </div>
  );
}

export type TerminalSectionData = Extract<Section, { t: "terminal" }>;

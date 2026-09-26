import Link from "next/link";
import { ArrowUpRight, Info, Lightbulb, Sparkles, TriangleAlert } from "lucide-react";

import { slugify } from "@/lib/docs";
import type { Block, CalloutKind } from "@/lib/docs/types";
import { CodeBlock } from "./code-block";
import { CodeTabs } from "./code-tabs";
import { Inline } from "./inline";

const CALLOUT: Record<CalloutKind, { icon: typeof Info; title: string; bg: string; border: string; color: string }> = {
  note: {
    icon: Info,
    title: "Note",
    bg: "rgb(255 255 255 / 0.5)",
    border: "var(--border)",
    color: "var(--foreground)",
  },
  tip: {
    icon: Lightbulb,
    title: "Tip",
    bg: "color-mix(in srgb, var(--status-green) 12%, transparent)",
    border: "color-mix(in srgb, var(--status-green) 35%, transparent)",
    color: "var(--status-green)",
  },
  warning: {
    icon: TriangleAlert,
    title: "Warning",
    bg: "color-mix(in srgb, var(--status-red) 10%, transparent)",
    border: "color-mix(in srgb, var(--status-red) 32%, transparent)",
    color: "var(--status-red)",
  },
  future: {
    icon: Sparkles,
    title: "Future",
    bg: "color-mix(in srgb, var(--status-yellow) 20%, transparent)",
    border: "color-mix(in srgb, var(--status-yellow) 50%, transparent)",
    color: "#B57F00",
  },
};

function Callout({ kind, title, text }: { kind: CalloutKind; title?: string; text: string }) {
  const c = CALLOUT[kind];
  const Icon = c.icon;
  return (
    <aside
      className="my-5 flex gap-3 rounded-lg border p-4 text-[15px] leading-7"
      style={{ background: c.bg, borderColor: c.border }}
    >
      <Icon className="mt-1 size-4 shrink-0" style={{ color: c.color }} />
      <div className="min-w-0">
        <p className="font-semibold text-foreground">{title ?? c.title}</p>
        <p className="text-foreground/85">
          <Inline text={text} />
        </p>
      </div>
    </aside>
  );
}

export function DocBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[15px] leading-7 text-foreground/85">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h2": {
            const id = slugify(b.text);
            return (
              <h2 key={i} id={id} className="group mt-12 scroll-mt-24 border-b border-border pb-2 text-2xl font-bold text-foreground">
                <a href={`#${id}`} className="no-underline">
                  {b.text}
                  <span aria-hidden className="ml-2 text-foreground/0 transition-colors group-hover:text-foreground/40">#</span>
                </a>
              </h2>
            );
          }
          case "h3": {
            const id = slugify(b.text);
            return (
              <h3 key={i} id={id} className="group mt-8 scroll-mt-24 text-lg font-bold text-foreground">
                <a href={`#${id}`} className="no-underline">
                  {b.text}
                </a>
              </h3>
            );
          }
          case "p":
            return (
              <p key={i} className="my-4">
                <Inline text={b.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="my-4 list-disc space-y-1.5 pl-6 marker:text-foreground/40">
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="my-4 list-decimal space-y-1.5 pl-6 marker:font-medium marker:text-foreground/50">
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} />
                  </li>
                ))}
              </ol>
            );
          case "code":
            return <CodeBlock key={i} code={b.code} lang={b.lang} title={b.title} />;
          case "tabs":
            return <CodeTabs key={i} tabs={b.tabs} />;
          case "callout":
            return <Callout key={i} kind={b.kind} title={b.title} text={b.text} />;
          case "table":
            return (
              <div key={i} className="my-5 overflow-x-auto rounded-lg border border-border bg-white/40">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <thead className="bg-foreground/[0.04]">
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j} className="px-4 py-2.5 font-semibold text-foreground">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r} className="border-t border-border align-top">
                        {row.map((cell, c) => (
                          <td key={c} className={`px-4 py-2.5 ${c === 0 ? "font-medium text-foreground" : ""}`}>
                            <Inline text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "steps":
            return (
              <ol key={i} className="my-6 space-y-2">
                {b.items.map((s, j) => (
                  <li key={j} className="relative pl-11">
                    {j < b.items.length - 1 && (
                      <span aria-hidden className="absolute left-[15px] top-9 h-[calc(100%-1.25rem)] w-px bg-border" />
                    )}
                    <span className="absolute left-0 top-0.5 flex size-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                      {j + 1}
                    </span>
                    <p className="font-semibold text-foreground">{s.title}</p>
                    <p>
                      <Inline text={s.body} />
                    </p>
                    {s.code && <CodeBlock code={s.code} />}
                  </li>
                ))}
              </ol>
            );
          case "cards":
            return (
              <div key={i} className="my-6 grid gap-3 sm:grid-cols-2">
                {b.items.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="group rounded-lg border border-border bg-white/50 p-4 shadow-sm transition-colors hover:border-foreground/30 hover:bg-white/80"
                  >
                    <span className="flex items-center justify-between font-semibold text-foreground">
                      {c.title}
                      <ArrowUpRight className="size-4 text-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{c.text}</span>
                  </Link>
                ))}
              </div>
            );
        }
      })}
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Check } from "lucide-react";

import type { Section } from "@/lib/site/types";

type TimelineSection = Extract<Section, { t: "timeline" }>;

const STATUS = {
  now: { label: "In development", color: "var(--status-green)", ring: "color-mix(in srgb, var(--status-green) 30%, transparent)" },
  next: { label: "Planned", color: "var(--status-yellow)", ring: "color-mix(in srgb, var(--status-yellow) 40%, transparent)" },
  later: { label: "Future", color: "#a3a3a3", ring: "rgb(163 163 163 / 0.3)" },
} as const;

export function Timeline({ items }: { items: TimelineSection["items"] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 24 });

  return (
    <ol ref={ref} className="relative mx-auto mt-14 max-w-3xl space-y-12">
      <span aria-hidden className="absolute bottom-2 left-[15px] top-2 w-px bg-border" />
      <motion.span aria-hidden className="absolute left-[14px] top-2 w-[3px] origin-top rounded-full bg-foreground" style={{ scaleY: fill, bottom: "0.5rem" }} />
      {items.map((it) => {
        const st = STATUS[it.status];
        return (
          <motion.li
            key={it.title}
            className="relative pl-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="absolute left-0 top-1 flex size-8 items-center justify-center rounded-full border-2 bg-background" style={{ borderColor: st.color, boxShadow: `0 0 0 6px ${st.ring}` }}>
              {it.status === "now" ? <Check className="size-4" style={{ color: st.color }} /> : <span className="size-2 rounded-full" style={{ background: st.color }} />}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">{it.when}</span>
              <span className="rounded-full border px-2.5 py-0.5 text-[11px] font-medium" style={{ borderColor: st.color }}>
                {st.label}
              </span>
            </div>
            <h3 className="mt-2 text-2xl font-bold">{it.title}</h3>
            <p className="mt-2 leading-relaxed text-foreground/75">{it.text}</p>
            {it.bullets && (
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {it.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 rounded-lg border border-border bg-white/50 px-3 py-2 text-sm">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: st.color }} />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </motion.li>
        );
      })}
    </ol>
  );
}

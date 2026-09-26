"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Section } from "@/lib/site/types";
import { ICONS } from "./icons";

type ExpandableSection = Extract<Section, { t: "expandable" }>;

// Click a card and it grows to reveal detail. The neighbours reflow smoothly.
export function ExpandableCards({ items }: { items: ExpandableSection["items"] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => {
        const Icon = ICONS[it.icon];
        const isOpen = open === it.title;
        return (
          <motion.div
            layout
            key={it.title}
            transition={{ layout: { type: "spring", stiffness: 340, damping: 34 } }}
            className={cn(
              "overflow-hidden rounded-xl border bg-white/50 shadow-sm transition-colors",
              isOpen ? "border-foreground/40 bg-white/80 md:col-span-2" : "border-border hover:border-foreground/30"
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : it.title)}
              className="flex w-full items-start gap-4 p-5 text-left"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2 text-lg font-bold">
                  {it.title}
                  {it.tag && <span className="rounded-full border border-accent bg-accent/25 px-2 py-0.5 text-[10px] font-medium">{it.tag}</span>}
                </span>
                <span className="mt-1 block text-[15px] leading-relaxed text-foreground/75">{it.summary}</span>
              </span>
              <Plus className={cn("mt-1 size-5 shrink-0 text-foreground/50 transition-transform duration-300", isOpen && "rotate-45")} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <ul className="space-y-2 border-t border-border px-5 pb-5 pt-4">
                    {it.details.map((d) => (
                      <li key={d} className="flex gap-3 text-[15px] leading-relaxed text-foreground/85">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/40" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

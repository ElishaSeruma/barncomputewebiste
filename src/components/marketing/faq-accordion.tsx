"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/site/types";

// The one FAQ design used across the site: a bordered list, plus icon that turns into a cross,
// several rows can be open at once, and everything starts closed.
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number[]>([]);

  const toggle = (i: number) => setOpen((cur) => (cur.includes(i) ? cur.filter((n) => n !== i) : [...cur, i]));

  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-white/40 shadow-sm">
      {items.map((it, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={it.q} className="px-5 py-4">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between gap-4 text-left font-medium"
            >
              {it.q}
              <Plus className={cn("size-4 shrink-0 transition-transform duration-300", isOpen && "rotate-45")} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 leading-relaxed text-foreground/75">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

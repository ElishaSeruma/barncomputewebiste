"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Section } from "@/lib/site/types";
import { ICONS } from "./icons";
import { Visual } from "./visuals";

type TabsSection = Extract<Section, { t: "tabs" }>;

// Animated tabs: a pill slides between them, and the panel cross-fades.
export function FeatureTabs({ tabs }: { tabs: TabsSection["tabs"] }) {
  const [i, setI] = useState(0);
  const pillId = useId();
  const active = tabs[i];

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-10">
      <div role="tablist" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {tabs.map((t, k) => {
          const Icon = ICONS[t.icon];
          const selected = k === i;
          return (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setI(k)}
              className={cn(
                "relative flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors",
                selected ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {selected && (
                <motion.span
                  layoutId={pillId}
                  className="absolute inset-0 rounded-lg border border-border bg-white shadow-sm"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className={cn("relative flex size-8 items-center justify-center rounded-md transition-colors", selected ? "bg-accent text-accent-foreground" : "bg-foreground/[0.06]")}>
                <Icon className="size-4" />
              </span>
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[22rem] rounded-xl border border-border bg-white/40 p-6 shadow-sm sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.label}
            role="tabpanel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={cn("grid gap-8", active.visual && "md:grid-cols-2 md:items-center")}
          >
            <div>
              <h3 className="text-2xl font-bold">{active.title}</h3>
              <p className="mt-3 leading-relaxed text-foreground/75">{active.text}</p>
              <ul className="mt-5 space-y-2.5">
                {active.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[15px] leading-relaxed">
                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent">
                      <Check className="size-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            {active.visual && <Visual name={active.visual} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

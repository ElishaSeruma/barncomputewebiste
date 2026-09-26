"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FileCode2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/docs/copy-button";
import { HighlightedLine } from "@/components/docs/highlight";
import type { HeroCode } from "@/lib/site/types";

/**
 * Interactive code hero: a window of commands with a walkthrough beside it. Hovering (or tapping) a
 * walkthrough step highlights its line and dims the rest. The parent owns `active` so both halves stay in sync.
 */
export function CodeWalkthrough({
  code,
  active,
  onActive,
}: {
  code: HeroCode;
  active: number | null;
  onActive: (line: number | null) => void;
}) {
  return (
    <div className="mt-10">
      <p className="mb-3 text-xs font-medium uppercase text-muted-foreground">Walkthrough</p>
      <div className="space-y-2">
        {code.steps.map((s) => {
          const on = active === s.line;
          return (
            <button
              key={s.line}
              type="button"
              aria-pressed={on}
              onMouseEnter={() => onActive(s.line)}
              onMouseLeave={() => onActive(null)}
              onFocus={() => onActive(s.line)}
              onBlur={() => onActive(null)}
              onClick={() => onActive(on ? null : s.line)}
              className={cn(
                "group w-full rounded-xl border p-4 text-left transition-all duration-300",
                on ? "border-foreground/30 bg-white/70 shadow-sm" : "border-transparent hover:border-border hover:bg-white/40"
              )}
            >
              <span className="flex w-full items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-medium transition-colors",
                    on ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted-foreground"
                  )}
                >
                  {s.line}
                </span>
                <span className={cn("min-w-0 flex-1 text-sm leading-relaxed transition-colors", on ? "text-foreground" : "text-muted-foreground")}>
                  {s.text}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CodeWindow({ code, active }: { code: HeroCode; active: number | null }) {
  const raw = code.lines.join("\n");

  return (
    <div className="group relative">
      <div
        aria-hidden
        className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-accent/70 to-accent/10 opacity-40 blur transition duration-1000 group-hover:opacity-70"
      />
      <div className="relative overflow-hidden rounded-xl border border-foreground/20 bg-foreground text-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-background/10 bg-background/[0.05] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-background/20" />
              <span className="size-2.5 rounded-full bg-background/20" />
              <span className="size-2.5 rounded-full bg-background/20" />
            </div>
            <span className="flex items-center gap-2 rounded-md border border-background/10 bg-background/[0.06] px-2 py-1 font-mono text-xs text-background/70">
              <FileCode2 className="size-3.5 text-background/50" />
              {code.file}
            </span>
          </div>
          <CopyButton text={raw} />
        </div>

        <div className="relative overflow-x-auto p-4 font-mono text-[13px] leading-[2]">
          {code.lines.map((line, i) => {
            const n = i + 1;
            const isActive = active === n;
            const dim = active !== null && !isActive;
            return (
              <motion.div key={n} animate={{ opacity: dim ? 0.3 : 1 }} transition={{ duration: 0.2 }} className="relative flex">
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="hero-active-line"
                      className="pointer-events-none absolute inset-y-0 -inset-x-4 border-l-2 border-accent bg-background/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10 w-8 shrink-0 select-none pr-4 text-right text-background/35">{n}</span>
                <span className="relative z-10 whitespace-pre">
                  <HighlightedLine line={line} />
                  {line === "" && " "}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

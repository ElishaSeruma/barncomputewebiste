"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import type { Hero } from "@/lib/site/types";
import { Aurora } from "./aurora";
import { CodeWalkthrough, CodeWindow } from "./hero-code";
import { shell } from "./layout";
import { Visual } from "./visuals";

// Title markup: {text} is highlighted with a yellow marker. Words reveal one after another.
function WaveTitle({ text, compact = false }: { text: string; compact?: boolean }) {
  const parts = text.split(/(\{[^}]+\})/g).filter(Boolean);
  let n = 0;
  return (
    <h1 className={compact ? "text-5xl font-bold leading-[1.03] sm:text-6xl" : "text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl"}>
      {parts.map((part, pi) => {
        const highlight = part.startsWith("{");
        const words = (highlight ? part.slice(1, -1) : part).split(" ").filter(Boolean);
        return (
          <span key={pi} className={highlight ? "rounded-md bg-accent px-2 [box-decoration-break:clone]" : undefined}>
            {words.map((w, wi) => {
              const delay = 0.05 * n++;
              return (
                <motion.span
                  key={`${pi}-${wi}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                  {wi < words.length - 1 || !highlight ? " " : ""}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

function ShineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-md bg-foreground px-6 font-medium text-background shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight className="relative z-10 size-4" />
      <span className="absolute inset-0 -translate-x-[200%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
    </Link>
  );
}

export function PageHero({ hero }: { hero: Hero }) {
  const hasCode = !!hero.code;
  const hasVisual = !!hero.visual && !hasCode;
  const [activeLine, setActiveLine] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
      <Aurora />
      <div className={`${shell} relative`}>
        <div className={hasCode ? "grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12" : hasVisual ? "grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]" : "mx-auto max-w-4xl text-center"}>
          <div className={hasCode ? "min-w-0 lg:col-span-5" : undefined}>
            <WaveTitle text={hero.title} compact={hasCode} />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className={`mt-6 text-lg leading-relaxed text-foreground/75 sm:text-xl ${hasVisual || hasCode ? "max-w-xl" : "mx-auto max-w-2xl"}`}
            >
              {hero.description}
            </motion.p>

            {(hero.primary || hero.secondary) && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className={`mt-8 flex flex-wrap gap-3 ${hasVisual || hasCode ? "" : "justify-center"}`}
              >
                {hero.primary && <ShineLink href={hero.primary.href}>{hero.primary.label}</ShineLink>}
                {hero.secondary && (
                  <Link
                    href={hero.secondary.href}
                    className="inline-flex h-12 items-center rounded-md border border-foreground/30 bg-white/40 px-6 font-medium transition-colors hover:bg-foreground/5"
                  >
                    {hero.secondary.label}
                  </Link>
                )}
              </motion.div>
            )}
            {hero.code && <CodeWalkthrough code={hero.code} active={activeLine} onActive={setActiveLine} />}
          </div>

          {hero.code && (
            <motion.div className="min-w-0 lg:col-span-7" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <CodeWindow code={hero.code} active={activeLine} />
            </motion.div>
          )}

          {hasVisual && hero.visual && (
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <Visual name={hero.visual} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

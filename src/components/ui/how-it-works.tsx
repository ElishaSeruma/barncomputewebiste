"use client";

import React, { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { SpotlightCard } from "@/components/marketing/spotlight-card";

type ColorTheme = "yellow" | "green" | "red";

// Barn's three-tier palette (also the three Barn states), as tints for the note bodies.
const THEMES: Record<ColorTheme, { bg: string; border: string; text: string }> = {
  yellow: {
    bg: "color-mix(in srgb, var(--status-yellow) 18%, transparent)",
    border: "color-mix(in srgb, var(--status-yellow) 40%, transparent)",
    text: "#B57F00", // darkened yellow so the number stays legible on the tint
  },
  green: {
    bg: "color-mix(in srgb, var(--status-green) 14%, transparent)",
    border: "color-mix(in srgb, var(--status-green) 35%, transparent)",
    text: "var(--status-green)",
  },
  red: {
    bg: "color-mix(in srgb, var(--status-red) 12%, transparent)",
    border: "color-mix(in srgb, var(--status-red) 32%, transparent)",
    text: "var(--status-red)",
  },
};

const Pin = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
    aria-hidden
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

interface CardProps {
  number: string;
  title: string;
  description: string;
  colorTheme: ColorTheme;
  className?: string;
  rotate?: string;
  style?: React.CSSProperties;
}

const Card = ({ number, title, description, colorTheme, className, rotate, style }: CardProps) => {
  const theme = THEMES[colorTheme];

  return (
    <div
      className={cn(
        "relative w-full transition-transform duration-300 hover:z-30 hover:scale-105",
        rotate,
        className
      )}
      style={style}
    >
      <SpotlightCard className="rounded-[25px] bg-white p-2 shadow-[0px_10px_20px_0px_rgb(33_33_33/0.12)] hover:bg-white">
        <Pin className="z-20 mx-auto mb-6 h-8 w-8" style={{ color: theme.text }} />
        <div
          className="relative flex h-full flex-col overflow-hidden rounded-[15px] border p-[15px]"
          style={{ background: theme.bg, borderColor: theme.border }}
        >
          <span className="mb-5 text-4xl font-bold" style={{ color: theme.text }}>
            {number}
          </span>
          <h3 className="mb-[10px] text-xl font-bold leading-tight text-foreground">{title}</h3>
          <p className="text-sm/5 text-muted-foreground">{description}</p>
        </div>
      </SpotlightCard>
    </div>
  );
};

export interface Step {
  title: string;
  description: string;
  colorTheme?: ColorTheme;
}

export interface HowItWorksProps {
  features: Step[];
  className?: string;
}

// Horizontal board: notes run left to right, alternating high and low, joined by a dashed line.
const CARD_W = 190;
const PITCH = 205;
const LOW = 110;
const BOARD_H = 400;
const PIN_Y = 24;
const ROTATIONS = ["rotate-3", "-rotate-3"];
const THEME_CYCLE: ColorTheme[] = ["green", "yellow", "red"];

export default function HowItWorks({ features, className }: HowItWorksProps) {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const n = features.length;
  const boardW = (n - 1) * PITCH + CARD_W;
  const tops = features.map((_, i) => (i % 2 === 0 ? 0 : LOW));

  // Scale the whole board down so the row always fits its container.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / boardW));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [boardW]);

  const points = tops.map((top, i) => ({ x: i * PITCH + CARD_W / 2, y: top + PIN_Y }));
  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const dx = (p.x - prev.x) / 2;
    return `${acc} C ${prev.x + dx} ${prev.y}, ${p.x - dx} ${p.y}, ${p.x} ${p.y}`;
  }, "");

  return (
    <LazyMotion features={domAnimation}>
      <div className={`relative overflow-hidden rounded-xl border border-border px-6 py-10 ${className ?? ""}`}>
        {/* Ruled-paper lines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: "linear-gradient(#212121 1px, transparent 1px)",
            backgroundSize: "100% 32px",
            marginTop: "4px",
          }}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent" />

        {/* Mobile: stacked notes */}
        <div className="relative z-10 flex flex-col gap-8 md:hidden">
          {features.map((step, i) => (
            <Card
              key={step.title}
              number={`0${i + 1}`}
              title={step.title}
              description={step.description}
              colorTheme={step.colorTheme ?? THEME_CYCLE[i % THEME_CYCLE.length]}
              rotate={ROTATIONS[i % 2]}
            />
          ))}
        </div>

        {/* Tablet and up: horizontal board */}
        <div
          ref={wrapRef}
          className="relative z-10 mx-auto hidden w-full md:block"
          style={{ height: BOARD_H * scale }}
        >
          <div
            className="absolute left-1/2 top-0"
            style={{
              width: boardW,
              height: BOARD_H,
              transform: `translateX(-50%) scale(${scale})`,
              transformOrigin: "top center",
            }}
          >
            {n > 1 && (
              <svg
                className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full"
                viewBox={`0 0 ${boardW} ${BOARD_H}`}
                aria-hidden
              >
                <m.path
                  d={pathD}
                  stroke="currentColor"
                  className="text-foreground/30"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 0 }}
                  animate={reduceMotion ? undefined : { strokeDashoffset: -140 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            )}

            {features.map((step, i) => (
              <Card
                key={step.title}
                number={`0${i + 1}`}
                title={step.title}
                description={step.description}
                colorTheme={step.colorTheme ?? THEME_CYCLE[i % THEME_CYCLE.length]}
                rotate={ROTATIONS[i % 2]}
                className="absolute"
                style={{ width: CARD_W, left: i * PITCH, top: tops[i] }}
              />
            ))}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}

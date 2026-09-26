"use client";

import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/** A card with a soft glow that follows the pointer. The glow position is set with CSS variables, not state. */
export function SpotlightCard({
  children,
  className,
  contentClassName,
}: {
  children: ReactNode;
  className?: string;
  /** Layout classes for the inner wrapper, for cards that need flex or a full height body. */
  contentClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--sx", `${e.clientX - r.left}px`);
        el.style.setProperty("--sy", `${e.clientY - r.top}px`);
      }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-white/50 p-6 shadow-sm transition-colors hover:border-foreground/30",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(260px circle at var(--sx, 50%) var(--sy, 50%), rgb(253 188 48 / 0.30), transparent 70%)" }}
      />
      <div className={cn("relative", contentClassName)}>{children}</div>
    </div>
  );
}

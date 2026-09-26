"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.4, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {prefix}
      {v.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatTicker({ items }: { items: { value: number; prefix?: string; suffix?: string; label: string; note?: string }[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="bg-background p-6 sm:p-8">
          <p className="text-5xl font-bold leading-none sm:text-6xl">
            <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
          </p>
          <p className="mt-3 font-medium">{s.label}</p>
          {s.note && <p className="mt-1 text-sm text-muted-foreground">{s.note}</p>}
        </div>
      ))}
    </div>
  );
}

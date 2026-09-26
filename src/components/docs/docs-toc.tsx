"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

// "On this page": highlights the heading currently in view.
export function DocsToc({ headings }: { headings: TocHeading[] }) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) return;
    const els = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="sticky top-24 text-sm">
      <p className="mb-3 text-[11px] font-semibold uppercase text-muted-foreground">On this page</p>
      <ul className="space-y-1.5 border-l border-border">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l py-0.5 transition-colors",
                h.level === 3 ? "pl-6" : "pl-3",
                active === h.id
                  ? "border-foreground font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

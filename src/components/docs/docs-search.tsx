"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, FileText, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import type { SearchEntry } from "@/lib/docs/types";

export const OPEN_SEARCH_EVENT = "docs:open-search";

/** Lets any component (for example the landing hero) open the palette. */
export function openDocsSearch() {
  window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));
}

const SUGGESTED = [
  "start/quickstart",
  "start/install/requirements",
  "build/networking/diagnostics",
  "cli/overview",
  "reference/errors",
  "roadmap/overview",
];

function runSearch(index: SearchEntry[], query: string): SearchEntry[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) {
    return SUGGESTED.map((p) => index.find((e) => e.path === p)).filter((e): e is SearchEntry => !!e);
  }

  const scored: { entry: SearchEntry; score: number }[] = [];
  for (const entry of index) {
    const title = entry.title.toLowerCase();
    const desc = entry.description.toLowerCase();
    const heads = entry.headings.map((h) => h.toLowerCase());
    const where = `${entry.area} ${entry.section}`.toLowerCase();

    let total = 0;
    let matchedAll = true;
    for (const term of terms) {
      let s = 0;
      if (title.includes(term)) s += title.startsWith(term) ? 12 : 8;
      if (heads.some((h) => h.includes(term))) s += 4;
      if (desc.includes(term)) s += 2;
      if (where.includes(term)) s += 1;
      if (s === 0) {
        matchedAll = false;
        break;
      }
      total += s;
    }
    if (matchedAll) scored.push({ entry, score: total });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, 10).map((s) => s.entry);
}

// Mounted only while open, so its state resets every time it opens.
export function DocsSearch({ index, onClose }: { index: SearchEntry[]; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => runSearch(index, query), [index, query]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  const go = (entry: SearchEntry | undefined) => {
    if (!entry) return;
    onClose();
    router.push(`/docs/${entry.path}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search docs">
      <button type="button" aria-label="Close search" className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
              else if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                go(results[active]);
              }
            }}
            placeholder="Search the docs"
            aria-label="Search the docs"
            className="h-12 w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:block">Esc</kbd>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          {!query && <p className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase text-muted-foreground">Suggested</p>}
          {results.length === 0 ? (
            <p className="px-3 py-10 text-center text-sm text-muted-foreground">No results for &ldquo;{query}&rdquo;</p>
          ) : (
            <ul ref={listRef} role="listbox">
              {results.map((r, i) => (
                <li key={r.path} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                      i === active ? "bg-accent/30" : "hover:bg-accent/15"
                    )}
                  >
                    <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">{r.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">{r.description}</span>
                    </span>
                    <span className="mt-0.5 shrink-0 text-[10px] font-medium uppercase text-muted-foreground">{r.area}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><kbd className="rounded border border-border px-1">↑</kbd><kbd className="rounded border border-border px-1">↓</kbd> to navigate</span>
          <span className="flex items-center gap-1"><CornerDownLeft className="size-3" /> to open</span>
        </div>
      </div>
    </div>
  );
}

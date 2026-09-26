"use client";

import { Search } from "lucide-react";

import { openDocsSearch } from "./docs-search";

export function DocsSearchButton() {
  return (
    <button
      type="button"
      onClick={openDocsSearch}
      className="mx-auto flex h-12 w-full max-w-xl items-center gap-3 rounded-lg border border-border bg-white/60 px-4 text-left text-[15px] text-muted-foreground shadow-sm transition-colors hover:border-foreground/30"
    >
      <Search className="size-4" />
      <span className="flex-1">Search the docs</span>
      <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px]">Ctrl K</kbd>
    </button>
  );
}

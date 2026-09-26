"use client";

import { useSyncExternalStore, useState } from "react";

import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";
import { HighlightedCode } from "./highlight";
import { getTabServerSnapshot, getTabSnapshot, setTabPreference, subscribeTab } from "./tab-preference";

interface Tab {
  label: string;
  lang?: string;
  code: string;
}

export function CodeTabs({ tabs }: { tabs: Tab[] }) {
  const preferred = useSyncExternalStore(subscribeTab, getTabSnapshot, getTabServerSnapshot);
  const [local, setLocal] = useState<string | null>(null);

  // A stored preference wins if this group has that tab. Otherwise use the local pick, then the first tab.
  const labels = tabs.map((t) => t.label);
  const activeLabel =
    preferred && labels.includes(preferred) ? preferred : local && labels.includes(local) ? local : labels[0];
  const active = tabs.find((t) => t.label === activeLabel) ?? tabs[0];

  return (
    <div className="group relative my-5 overflow-hidden rounded-lg border border-foreground/20 bg-foreground text-background shadow-sm">
      <div role="tablist" className="flex items-center gap-1 border-b border-background/10 px-2 pt-2">
        {tabs.map((t) => {
          const selected = t.label === activeLabel;
          return (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => {
                setLocal(t.label);
                setTabPreference(t.label);
              }}
              className={cn(
                "rounded-t-md px-3 py-1.5 text-xs font-medium transition-colors",
                selected ? "bg-background/10 text-background" : "text-background/55 hover:text-background"
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6">
        <code>
          <HighlightedCode code={active.code} lang={active.lang ?? "bash"} />
        </code>
      </pre>
      <CopyButton text={active.code} className="absolute right-2 top-11 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100" />
    </div>
  );
}

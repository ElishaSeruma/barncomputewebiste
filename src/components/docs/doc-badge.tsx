import type { Badge } from "@/lib/docs/types";

const STYLES: Record<Badge, string> = {
  Draft: "border-border bg-white/50 text-muted-foreground",
  "Pre-alpha": "border-accent bg-accent/25 text-foreground",
  Alpha: "border-accent bg-accent/25 text-foreground",
  New: "border-foreground/30 bg-foreground text-background",
  Planned: "border-accent bg-accent/25 text-foreground",
  Future: "border-accent bg-accent/25 text-foreground",
  "Closure gate": "border-[color:var(--status-yellow)] bg-[color:var(--status-yellow)]/15 text-foreground",
};

export function DocBadge({ badge }: { badge: Badge }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STYLES[badge]}`}>
      {badge}
    </span>
  );
}

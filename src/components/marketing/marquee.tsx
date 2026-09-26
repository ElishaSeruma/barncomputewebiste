import { ICONS, type IconKey } from "./icons";

// Two copies of the row scroll by half their width, so the loop is seamless.
export function Marquee({ items, label }: { items: { label: string; icon?: IconKey }[]; label?: string }) {
  const row = [...items, ...items];
  return (
    <div>
      {label && <p className="mb-5 text-center text-sm font-medium text-muted-foreground">{label}</p>}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="animate-marquee-x flex w-max gap-3" style={{ ["--marquee-duration" as string]: "38s" }}>
          {row.map((it, i) => {
            const Icon = it.icon ? ICONS[it.icon] : null;
            return (
              <span key={i} className="inline-flex items-center gap-2.5 rounded-full border border-border bg-white/60 px-5 py-2.5 text-sm font-medium shadow-sm" aria-hidden={i >= items.length}>
                {Icon && <Icon className="size-4" />}
                {it.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

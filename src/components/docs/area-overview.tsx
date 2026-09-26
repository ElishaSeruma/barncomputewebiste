import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getAreaOverview } from "@/lib/docs";
import { AREA_ICONS } from "./docs-icons";

export function AreaOverview({ areaId }: { areaId: string }) {
  const overview = getAreaOverview(areaId);
  if (!overview) return null;
  const { nav, sections } = overview;
  const Icon = AREA_ICONS[nav.icon];

  return (
    <div className="px-5 py-10 sm:px-8 lg:px-12">
      <div className="max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground">Docs</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{nav.title}</span>
        </nav>
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            {Icon && <Icon className="size-6" />}
          </span>
          <h1 className="text-4xl font-bold">{nav.title}</h1>
        </div>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{nav.tagline}</p>

        {sections.map((s) => (
          <section key={s.title} className="mt-12">
            <h2 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">{s.title}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {s.pages.map((p) => (
                <Link
                  key={p.path}
                  href={`/docs/${p.path}`}
                  className="group rounded-lg border border-border bg-white/50 p-4 shadow-sm transition-colors hover:border-foreground/30 hover:bg-white/80"
                >
                  <span className="flex items-center justify-between font-semibold text-foreground">
                    {p.title}
                    <ArrowUpRight className="size-4 text-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{p.description}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

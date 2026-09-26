import Link from "next/link";
import { ArrowLeft, ArrowRight, Pencil } from "lucide-react";

import { getHeadings, getPrevNext } from "@/lib/docs";
import type { ResolvedPage } from "@/lib/docs/types";
import { DocBadge } from "./doc-badge";
import { DocBlocks } from "./blocks";
import { DocsToc } from "./docs-toc";
import { Feedback } from "./feedback";

export function DocArticle({ page }: { page: ResolvedPage }) {
  const headings = getHeadings(page.blocks);
  const { prev, next } = getPrevNext(page.path);

  return (
    <div className="flex gap-12 px-5 py-10 sm:px-8 lg:px-12">
      <article className="min-w-0 max-w-3xl flex-1">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground">Docs</Link>
          <span>/</span>
          <Link href={`/docs/${page.areaId}`} className="hover:text-foreground">{page.areaTitle}</Link>
          {page.trail.map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span>/</span>
              <span>{t}</span>
            </span>
          ))}
        </nav>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold leading-[1.1]">{page.title}</h1>
            {page.badge && <DocBadge badge={page.badge} />}
          </div>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{page.description}</p>
        </header>

        <DocBlocks blocks={page.blocks} />

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <Feedback />
          <a href="#" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <Pencil className="size-3.5" /> Edit this page
          </a>
        </div>

        <nav aria-label="Previous and next pages" className="mt-8 grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link href={`/docs/${prev.path}`} className="group rounded-lg border border-border bg-white/50 p-4 transition-colors hover:border-foreground/30">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><ArrowLeft className="size-3.5" /> Previous</span>
              <span className="mt-1 block font-semibold text-foreground">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/docs/${next.path}`} className="group rounded-lg border border-border bg-white/50 p-4 text-right transition-colors hover:border-foreground/30 sm:col-start-2">
              <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">Next <ArrowRight className="size-3.5" /></span>
              <span className="mt-1 block font-semibold text-foreground">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>

      <aside className="hidden w-56 shrink-0 xl:block">
        <DocsToc headings={headings} />
      </aside>
    </div>
  );
}

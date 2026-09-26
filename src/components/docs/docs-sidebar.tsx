"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { TreeFolder, TreeItem, TreeSection, TreeView } from "@/components/ui/animated-file-tree";
import type { AreaNav, NavNode } from "@/lib/docs/types";
import { AREA_ICONS } from "./docs-icons";

function containsSlug(nodes: NavNode[], slug: string): boolean {
  return nodes.some((n) => (n.type === "item" ? n.slug === slug : containsSlug(n.children, slug)));
}

function renderNodes(nodes: NavNode[], slug: string) {
  return nodes.map((n) => {
    if (n.type === "item") {
      return <TreeItem key={n.slug} id={n.slug} label={n.label} badge={n.badge} />;
    }
    const open = containsSlug(n.children, slug);
    // The key changes when a folder starts or stops containing the page, so it reopens or closes to match.
    return (
      <TreeFolder key={`${n.id}:${open ? 1 : 0}`} id={n.id} label={n.label} defaultExpanded={open}>
        {renderNodes(n.children, slug)}
      </TreeFolder>
    );
  });
}

/** The file tree for one docs area. Sections and folders open around the current page. */
export function DocsSidebar({
  nav,
  currentPath,
  onNavigate,
}: {
  nav: AreaNav;
  currentPath: string;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const Icon = AREA_ICONS[nav.icon];
  const hasCurrent = nav.sections.some((s) => containsSlug(s.children, currentPath));

  return (
    <div className="flex flex-col gap-5">
      <Link href={`/docs/${nav.id}`} onClick={onNavigate} className="group flex items-start gap-3 px-2">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
          {Icon && <Icon className="size-[18px]" />}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-bold text-foreground group-hover:underline">{nav.title}</span>
          <span className="block text-xs leading-snug text-muted-foreground">{nav.tagline}</span>
        </span>
      </Link>

      <TreeView
        variant="line"
        activeColor="text-[#B57F00]"
        selectedId={currentPath}
        onSelect={(id) => {
          router.push(`/docs/${id}`);
          onNavigate?.();
        }}
        aria-label={`${nav.title} documentation`}
      >
        {nav.sections.map((s, i) => {
          const open = containsSlug(s.children, currentPath) || (!hasCurrent && i === 0);
          return (
            <TreeSection key={`${s.id}:${open ? 1 : 0}`} title={s.title} defaultExpanded={open}>
              {renderNodes(s.children, currentPath)}
            </TreeSection>
          );
        })}
      </TreeView>
    </div>
  );
}

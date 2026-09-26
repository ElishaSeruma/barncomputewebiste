import type {
  AreaDef,
  AreaNav,
  Block,
  FolderDef,
  NavNode,
  NavSection,
  PageDef,
  ResolvedPage,
  SearchEntry,
} from "./types";
import { start } from "./areas/start";
import { build } from "./areas/build";
import { guides } from "./areas/guides";
import { cli } from "./areas/cli";
import { reference } from "./areas/reference";
import { roadmap } from "./areas/roadmap";

export const AREAS: AreaDef[] = [start, build, guides, cli, reference, roadmap];

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[`*]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ---- Resolve the authored tree into flat maps and serialisable nav trees ---------------------------

const pages = new Map<string, ResolvedPage>();
const order = new Map<string, string[]>();
const navs = new Map<string, AreaNav>();

function resolveNodes(
  area: AreaDef,
  sectionSlug: string,
  sectionTitle: string,
  prefix: string[],
  trail: string[],
  defs: (PageDef | FolderDef)[]
): NavNode[] {
  return defs.map((d): NavNode => {
    if (d.kind === "page") {
      const path = [area.id, ...(sectionSlug ? [sectionSlug] : []), ...prefix, d.slug].join("/");
      if (pages.has(path)) throw new Error(`Duplicate docs path: ${path}`);
      pages.set(path, { ...d, path, areaId: area.id, areaTitle: area.title, sectionTitle, trail });
      order.get(area.id)!.push(path);
      return {
        type: "item",
        slug: path,
        label: d.navLabel ?? d.title,
        badge: d.badge && d.badge !== "Draft" ? d.badge : undefined,
      };
    }
    const nextPrefix = [...prefix, d.slug];
    return {
      type: "folder",
      id: `${area.id}/${sectionSlug || "_"}/${nextPrefix.join("/")}`,
      label: d.label,
      children: resolveNodes(area, sectionSlug, sectionTitle, nextPrefix, [...trail, d.label], d.children),
    };
  });
}

for (const area of AREAS) {
  order.set(area.id, []);
  const sections: NavSection[] = area.sections.map((s) => ({
    id: `${area.id}/${s.slug || "_"}`,
    title: s.title,
    children: resolveNodes(area, s.slug, s.title, [], [s.title], s.children),
  }));
  navs.set(area.id, {
    id: area.id,
    title: area.title,
    tagline: area.tagline,
    icon: area.icon,
    first: order.get(area.id)![0],
    sections,
  });
}

// ---- Public API -------------------------------------------------------------------------------

export function getAreaNavs(): AreaNav[] {
  return AREAS.map((a) => navs.get(a.id)!);
}

export function getAreaNav(id: string): AreaNav | undefined {
  return navs.get(id);
}

export function getPage(path: string): ResolvedPage | undefined {
  return pages.get(path);
}

export function getPrevNext(path: string): { prev?: ResolvedPage; next?: ResolvedPage } {
  const page = pages.get(path);
  if (!page) return {};
  const list = order.get(page.areaId)!;
  const i = list.indexOf(path);
  return {
    prev: i > 0 ? pages.get(list[i - 1]) : undefined,
    next: i < list.length - 1 ? pages.get(list[i + 1]) : undefined,
  };
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function getHeadings(blocks: Block[]): Heading[] {
  const out: Heading[] = [];
  for (const b of blocks) {
    if (b.t === "h2") out.push({ id: slugify(b.text), text: b.text, level: 2 });
    if (b.t === "h3") out.push({ id: slugify(b.text), text: b.text, level: 3 });
  }
  return out;
}

export function getAreaOverview(id: string) {
  const nav = navs.get(id);
  if (!nav) return undefined;
  const collect = (nodes: NavNode[]): ResolvedPage[] =>
    nodes.flatMap((n) => (n.type === "item" ? [pages.get(n.slug)!] : collect(n.children)));
  return {
    nav,
    sections: nav.sections.map((s) => ({ title: s.title, pages: collect(s.children) })),
  };
}

export function getAllPages(): ResolvedPage[] {
  return [...pages.values()];
}

export function getAllStaticParams(): { slug: string[] }[] {
  assertLinks();
  return [...AREAS.map((a) => ({ slug: [a.id] })), ...[...pages.keys()].map((p) => ({ slug: p.split("/") }))];
}

// ---- Search -----------------------------------------------------------------------------------

export function buildSearchIndex(): SearchEntry[] {
  return [...pages.values()].map((p) => ({
    title: p.title,
    description: p.description,
    path: p.path,
    area: p.areaTitle,
    section: p.sectionTitle,
    headings: getHeadings(p.blocks).map((h) => h.text),
  }));
}

// ---- Link validation (runs at build via getAllStaticParams) ---------------------------------------

function collectLinks(blocks: Block[]): string[] {
  const links: string[] = [];
  const scan = (text: string) => {
    for (const m of text.matchAll(/\]\((\/docs[^)]*)\)/g)) links.push(m[1]);
  };
  for (const b of blocks) {
    if (b.t === "p" || b.t === "callout") scan(b.text);
    if (b.t === "ul" || b.t === "ol") b.items.forEach(scan);
    if (b.t === "cards") b.items.forEach((i) => links.push(i.href));
    if (b.t === "steps") b.items.forEach((i) => scan(i.body));
    if (b.t === "table") b.rows.forEach((r) => r.forEach(scan));
  }
  return links;
}

function assertLinks() {
  const valid = (href: string) => {
    const path = href.replace(/^\/docs\/?/, "").replace(/[#?].*$/, "").replace(/\/$/, "");
    return path === "" || pages.has(path) || AREAS.some((a) => a.id === path);
  };
  const broken: string[] = [];
  for (const p of pages.values()) {
    for (const href of collectLinks(p.blocks)) {
      if (!valid(href)) broken.push(`${p.path} -> ${href}`);
    }
  }
  if (broken.length) throw new Error(`Broken docs links:\n${broken.join("\n")}`);
}

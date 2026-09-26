// Content model for the docs. Pages are plain data so they can be swapped for real content later.

export type CalloutKind = "note" | "tip" | "warning" | "future";
export type Badge = "Draft" | "New" | "Future" | "Planned" | "Alpha";

export type Block =
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "code"; code: string; lang?: string; title?: string }
  | { t: "tabs"; tabs: { label: string; lang?: string; code: string }[] }
  | { t: "callout"; kind: CalloutKind; title?: string; text: string }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "steps"; items: { title: string; body: string; code?: string }[] }
  | { t: "cards"; items: { title: string; text: string; href: string }[] };

export interface PageDef {
  kind: "page";
  slug: string;
  title: string;
  description: string;
  blocks: Block[];
  badge?: Badge;
  navLabel?: string;
}

export interface FolderDef {
  kind: "folder";
  slug: string;
  label: string;
  children: (PageDef | FolderDef)[];
}

export interface SectionDef {
  /** URL segment for this section. An empty string means pages sit directly under the area. */
  slug: string;
  title: string;
  children: (PageDef | FolderDef)[];
}

export interface AreaDef {
  id: string;
  title: string;
  tagline: string;
  /** Key into the icon map used by the landing page and header. */
  icon: string;
  sections: SectionDef[];
}

// Serialisable navigation tree (what the client sidebar receives). Slugs are full paths under /docs.
export interface NavItem {
  type: "item";
  slug: string;
  label: string;
  badge?: string;
}
export interface NavFolder {
  type: "folder";
  id: string;
  label: string;
  children: NavNode[];
}
export type NavNode = NavItem | NavFolder;
export interface NavSection {
  id: string;
  title: string;
  children: NavNode[];
}
export interface AreaNav {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  first: string;
  sections: NavSection[];
}

export interface SearchEntry {
  title: string;
  description: string;
  path: string;
  area: string;
  section: string;
  headings: string[];
}

export interface ResolvedPage extends PageDef {
  /** Full path under /docs, e.g. build/nodes/enrol-a-node */
  path: string;
  areaId: string;
  areaTitle: string;
  sectionTitle: string;
  trail: string[];
}

// ---- Authoring helpers -------------------------------------------------------------------------

export const h2 = (text: string): Block => ({ t: "h2", text });
export const h3 = (text: string): Block => ({ t: "h3", text });
export const p = (text: string): Block => ({ t: "p", text });
export const ul = (...items: string[]): Block => ({ t: "ul", items });
export const ol = (...items: string[]): Block => ({ t: "ol", items });
export const code = (codeText: string, lang = "bash", title?: string): Block => ({
  t: "code",
  code: codeText.replace(/^\n/, "").replace(/\s+$/, ""),
  lang,
  title,
});
export const tabs = (...items: { label: string; lang?: string; code: string }[]): Block => ({
  t: "tabs",
  tabs: items.map((i) => ({ ...i, code: i.code.replace(/^\n/, "").replace(/\s+$/, "") })),
});
export const note = (text: string, title?: string): Block => ({ t: "callout", kind: "note", title, text });
export const tip = (text: string, title?: string): Block => ({ t: "callout", kind: "tip", title, text });
export const warn = (text: string, title?: string): Block => ({ t: "callout", kind: "warning", title, text });
export const future = (text: string, title = "Future"): Block => ({ t: "callout", kind: "future", title, text });
export const table = (head: string[], ...rows: string[][]): Block => ({ t: "table", head, rows });
export const steps = (...items: { title: string; body: string; code?: string }[]): Block => ({ t: "steps", items });
export const cards = (...items: { title: string; text: string; href: string }[]): Block => ({ t: "cards", items });

export function page(
  slug: string,
  title: string,
  description: string,
  blocks: Block[],
  opts: { badge?: Badge; navLabel?: string } = {}
): PageDef {
  return { kind: "page", slug, title, description, blocks, ...opts };
}

export function folder(slug: string, label: string, children: (PageDef | FolderDef)[]): FolderDef {
  return { kind: "folder", slug, label, children };
}

export function section(slug: string, title: string, children: (PageDef | FolderDef)[]): SectionDef {
  return { slug, title, children };
}

// OS-specific command tabs are used a lot; keep the labels consistent so the choice syncs across a page.
export const OS_MAC = "macOS";
export const OS_WIN = "Windows";
export const os = (mac: string, win: string) =>
  tabs({ label: OS_MAC, lang: "bash", code: mac }, { label: OS_WIN, lang: "powershell", code: win });

import type { TermTab } from "@/components/barn-terminal";
import type { IconKey } from "@/components/marketing/icons";
import type { VisualKey } from "@/components/marketing/visuals";
import type { Block } from "@/lib/docs/types";

export interface Cta {
  label: string;
  href: string;
}

export interface HeroCode {
  /** File name shown in the window tab. */
  file: string;
  /** Shell lines. Lines starting with # are comments. Empty strings are blank lines. */
  lines: string[];
  /** Walkthrough items. `line` is the 1-based line each one explains. */
  steps: { line: number; text: string }[];
}

export interface Hero {
  eyebrow: string;
  badge?: string;
  /** {text} is highlighted with a yellow marker. */
  title: string;
  description: string;
  primary?: Cta;
  secondary?: Cta;
  visual?: VisualKey;
  /** When set, the hero shows an interactive code window with a walkthrough instead of the visual. */
  code?: HeroCode;
}

export interface FeatureItem {
  icon: IconKey;
  title: string;
  text: string;
  tag?: string;
  href?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export type Section =
  | { t: "features"; eyebrow?: string; title: string; text?: string; variant?: "spotlight" | "bento"; cols?: 2 | 3 | 4; items: FeatureItem[] }
  | {
      t: "tabs";
      eyebrow?: string;
      title: string;
      text?: string;
      tabs: { label: string; icon: IconKey; title: string; text: string; bullets: string[]; visual?: VisualKey }[];
    }
  | { t: "steps"; eyebrow?: string; title: string; text?: string; steps: { title: string; text: string; code?: string }[] }
  | { t: "stats"; eyebrow?: string; title?: string; items: { value: number; prefix?: string; suffix?: string; label: string; note?: string }[] }
  | { t: "split"; eyebrow?: string; title: string; text: string; bullets?: string[]; visual: VisualKey; reverse?: boolean; cta?: Cta }
  | { t: "isnot"; eyebrow?: string; title: string; text?: string; isTitle?: string; isNotTitle?: string; is: string[]; isnot: string[] }
  | { t: "terminal"; eyebrow?: string; title: string; text: string; bullets?: string[]; tabs: TermTab[] }
  | { t: "marquee"; label?: string; items: { label: string; icon?: IconKey }[] }
  | { t: "faq"; eyebrow?: string; title: string; text?: string; items: FaqItem[] }
  | { t: "faqgroups"; groups: { title: string; items: FaqItem[] }[] }
  | { t: "cards"; eyebrow?: string; title: string; text?: string; cols?: 2 | 3; items: (FeatureItem & { href: string })[] }
  | {
      t: "timeline";
      eyebrow?: string;
      title: string;
      text?: string;
      items: { when: string; title: string; text: string; status: "now" | "next" | "later"; bullets?: string[] }[];
    }
  | { t: "expandable"; eyebrow?: string; title: string; text?: string; items: { icon: IconKey; title: string; summary: string; details: string[]; tag?: string }[] }
  | { t: "cta"; title: string; subtitle: string; text: string; primary: Cta; secondary?: Cta; badges?: string[] }
  | { t: "prose"; blocks: Block[] }
  | { t: "contact" }
  | { t: "press" }
  | { t: "blog" };

export interface MarketingPage {
  path: string;
  title: string;
  description: string;
  hero: Hero;
  sections: Section[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  author: string;
  icon: IconKey;
  blocks: Block[];
}

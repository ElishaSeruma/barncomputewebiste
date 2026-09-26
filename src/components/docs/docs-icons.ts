import { BookOpen, Layers, Map, Milestone, Rocket, SquareTerminal, type LucideIcon } from "lucide-react";

// Area icons are referenced by key so the content data stays plain and serialisable.
export const AREA_ICONS: Record<string, LucideIcon> = {
  rocket: Rocket,
  layers: Layers,
  map: Map,
  terminal: SquareTerminal,
  book: BookOpen,
  milestone: Milestone,
};

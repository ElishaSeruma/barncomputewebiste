"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  TerminalAnimationBlinkingCursor,
  TerminalAnimationCommandBar,
  TerminalAnimationContainer,
  TerminalAnimationContent,
  TerminalAnimationOutput,
  TerminalAnimationRoot,
  TerminalAnimationTabList,
  TerminalAnimationTabTrigger,
  TerminalAnimationTrailingPrompt,
  TerminalAnimationWindow,
  type TabContent,
  type TerminalLine,
} from "@/components/ui/terminal-animation";

// Barn states: green / yellow / red. Output mirrors the current pre-alpha CLI flows.
export type TerminalTone = "green" | "yellow" | "red" | "muted" | "note";
export interface TermLine {
  text: string;
  tone?: TerminalTone;
  delay?: number;
}
export interface TermTab {
  label: string;
  command: string;
  lines: TermLine[];
}

const TONE_CLASS: Record<TerminalTone, string> = {
  green: "text-[color:var(--status-green)]",
  yellow: "text-[color:var(--status-yellow)]",
  red: "text-[color:var(--status-red)]",
  muted: "text-background/60",
  note: "text-background/40",
};
const MUTED = TONE_CLASS.muted;

function toTabs(tabs: TermTab[]): TabContent[] {
  return tabs.map((t) => ({
    label: t.label,
    command: t.command,
    lines: t.lines.map((l) => ({ text: l.text, delay: l.delay ?? 200, color: l.tone ? TONE_CLASS[l.tone] : undefined })),
  }));
}

export const DEFAULT_TERM_TABS: TermTab[] = [
  {
    label: "nodes",
    command: "barn nodes",
    lines: [
      { text: "", delay: 60 },
      { text: "  NODE ID   NAME          STATE    PEER", tone: "muted", delay: 180 },
      { text: "  4f91     MacNode       ONLINE   https://192.168.1.10:8445", tone: "green", delay: 260 },
      { text: "  7a3d     WindowsNode   ONLINE   https://192.168.1.20:8445", tone: "green", delay: 260 },
      { text: "  b812     StudyPC       SUSPECT  last heartbeat 18s ago", tone: "yellow", delay: 260 },
      { text: "", delay: 60 },
      { text: "  barnCompute 0.1.0a1 pre-alpha", tone: "note", delay: 100 },
    ],
  },
  {
    label: "share",
    command: "barn share create 91c4 --to 7a3d --ttl 30m",
    lines: [
      { text: "", delay: 60 },
      { text: "  share_id     c0de", tone: "green", delay: 300 },
      { text: "  file_id      91c4", tone: "muted", delay: 160 },
      { text: "  recipient    7a3d", tone: "muted", delay: 160 },
      { text: "  expires_in   30m", tone: "yellow", delay: 260 },
      { text: "", delay: 60 },
      { text: "  read-only grant; fetch requires recipient authentication", tone: "note", delay: 100 },
    ],
  },
  {
    label: "transfer",
    command: "barn transfer status 5e1a",
    lines: [
      { text: "", delay: 60 },
      { text: "  transfer_id  5e1a", tone: "muted", delay: 180 },
      { text: "  source       4f91 MacNode", tone: "muted", delay: 220 },
      { text: "  path         direct HTTPS", tone: "green", delay: 220 },
      { text: "  chunks       17/24 verified", tone: "yellow", delay: 300 },
      { text: "  resume       verified chunks retained in journal", tone: "muted", delay: 360 },
      { text: "  sha256       verified after assembly", tone: "green", delay: 240 },
      { text: "", delay: 60 },
      { text: "  1 MiB chunks; final output uses no-clobber export", tone: "note", delay: 100 },
    ],
  },
];

export function TerminalDemo({ tabs: termTabs }: { tabs: TermTab[] }) {
  const tabs = useMemo(() => toTabs(termTabs), [termTabs]);
  return (
    <TerminalAnimationRoot tabs={tabs} defaultActiveTab={0} alwaysDark className="flex justify-center">
      <TerminalAnimationContainer className="max-w-md">
        <TerminalAnimationWindow minHeight="0">
          <TerminalAnimationContent className="min-h-[13.5rem]">
            <div className="flex items-center gap-2 font-mono text-[11px] leading-relaxed sm:text-xs">
              <span className="select-none text-background/50">$</span>
              <TerminalAnimationCommandBar className="text-background" cursor={<TerminalAnimationBlinkingCursor />} />
            </div>
            <TerminalAnimationOutput
              className="mt-1 font-mono text-[11px] sm:text-xs"
              renderLine={(line: TerminalLine, _i: number, visible: boolean) => {
                if (!visible) return null;
                return (
                  <div className="whitespace-pre leading-relaxed">
                    <span className={cn(line.color ?? MUTED)}>{line.text || " "}</span>
                  </div>
                );
              }}
            />
            <TerminalAnimationTrailingPrompt className="mt-1 flex items-center gap-2 font-mono text-[11px] leading-relaxed sm:text-xs">
              <span className="select-none text-background/50">$</span>
              <TerminalAnimationBlinkingCursor />
            </TerminalAnimationTrailingPrompt>
          </TerminalAnimationContent>
          <div className="flex justify-center pb-4">
            <TerminalAnimationTabList className="inline-flex items-center gap-0 rounded-lg border border-background/15 bg-background/10 p-1">
              {tabs.map((tab, i) => (
                <TerminalAnimationTabTrigger
                  key={tab.label}
                  index={i}
                  className={cn(
                    "cursor-pointer rounded-md px-3 py-1 font-mono text-xs transition-all duration-150",
                    "data-[state=active]:bg-accent data-[state=active]:font-medium data-[state=active]:text-accent-foreground",
                    "data-[state=inactive]:text-background/60 data-[state=inactive]:hover:text-background"
                  )}
                >
                  {tab.label}
                </TerminalAnimationTabTrigger>
              ))}
            </TerminalAnimationTabList>
          </div>
        </TerminalAnimationWindow>
      </TerminalAnimationContainer>
    </TerminalAnimationRoot>
  );
}

export default function BarnTerminal() {
  return <TerminalDemo tabs={DEFAULT_TERM_TABS} />;
}

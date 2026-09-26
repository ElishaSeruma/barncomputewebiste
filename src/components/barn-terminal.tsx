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

// Barn states: green / yellow / red. All output is illustrative, not real Barn output.
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
      { text: "  ● MacNode        ONLINE", tone: "green", delay: 260 },
      { text: "  ● WindowsNode    ONLINE", tone: "green", delay: 260 },
      { text: "  ● StudyPC        SUSPECT", tone: "yellow", delay: 260 },
      { text: "  ● OldLaptop      OFFLINE", tone: "red", delay: 260 },
      { text: "", delay: 60 },
      { text: "  Illustrative output", tone: "note", delay: 100 },
    ],
  },
  {
    label: "share",
    command: "barn share create sample.bin --to WindowsNode --ttl 30m",
    lines: [
      { text: "", delay: 60 },
      { text: "  ✓ Share created", tone: "green", delay: 300 },
      { text: "    file       sample.bin", tone: "muted", delay: 160 },
      { text: "    recipient  WindowsNode", tone: "muted", delay: 160 },
      { text: "    access     read-only, expires in 30m", tone: "yellow", delay: 260 },
      { text: "", delay: 60 },
      { text: "  Illustrative output", tone: "note", delay: 100 },
    ],
  },
  {
    label: "transfer",
    command: "barn transfer status",
    lines: [
      { text: "", delay: 60 },
      { text: "  sample.bin  ←  MacNode", tone: "muted", delay: 260 },
      { text: "  ■■■■■■■■■■■■■■■■■□□□□□□□  17/24 chunks", tone: "yellow", delay: 360 },
      { text: "  interrupted · resuming from verified chunks", tone: "muted", delay: 420 },
      { text: "  ■■■■■■■■■■■■■■■■■■■■■■■■  24/24 chunks", tone: "green", delay: 300 },
      { text: "  ✓ checksum verified", tone: "green", delay: 200 },
      { text: "", delay: 60 },
      { text: "  Illustrative output", tone: "note", delay: 100 },
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

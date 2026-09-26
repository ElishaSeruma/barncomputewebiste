"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Check, Laptop, Share2, ShieldCheck } from "lucide-react";

import {
  DynamicContainer,
  DynamicDescription,
  DynamicDiv,
  DynamicIsland,
  DynamicIslandProvider,
  DynamicTitle,
  useDynamicIslandSize,
  type AnimationStep,
} from "@/components/ui/dynamic-island";

// One story, told in island sizes: a device asks to join, it is approved, a file is shared,
// the transfer completes and verifies, then the Barn returns to idle. All content is illustrative.
const SEQUENCE: AnimationStep[] = [
  { size: "compact", delay: 700 }, // pending request
  { size: "medium", delay: 1700 }, // approval prompt
  { size: "compactMedium", delay: 2300 }, // approved
  { size: "long", delay: 1600 }, // share created
  { size: "tall", delay: 1700 }, // transfer running
  { size: "large", delay: 3000 }, // verified
  { size: "default", delay: 2400 }, // idle
];
const LOOP_PAUSE_MS = 2600;

const GREEN = "var(--status-green)";
const YELLOW = "var(--status-yellow)";

function TransferView() {
  const [chunks, setChunks] = useState(8);

  useEffect(() => {
    const id = window.setInterval(() => setChunks((c) => Math.min(c + 1, 24)), 85);
    return () => window.clearInterval(id);
  }, []);

  return (
    <DynamicContainer className="flex h-full w-full flex-col justify-center gap-3 px-5">
      <DynamicTitle className="flex items-center gap-2 text-sm font-semibold">
        <ArrowLeftRight className="size-4" style={{ color: YELLOW }} />
        sample.bin → WindowsNode
      </DynamicTitle>
      <div className="grid grid-cols-12 gap-1">
        {Array.from({ length: 24 }, (_, i) => (
          <div
            key={i}
            className="aspect-square rounded-[3px] transition-colors duration-200"
            style={{ background: i < chunks ? (i === chunks - 1 && chunks < 24 ? YELLOW : GREEN) : "rgb(249 241 224 / 0.15)" }}
          />
        ))}
      </div>
      <DynamicDescription className="text-xs text-background/70">
        {chunks} / 24 chunks verified
      </DynamicDescription>
    </DynamicContainer>
  );
}

function IslandContent() {
  const { state, scheduleAnimation } = useDynamicIslandSize();
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const startedRef = useRef(false);

  // Only run while on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Start the sequence, and restart it a moment after it finishes.
  useEffect(() => {
    if (!inView) {
      startedRef.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (state.isAnimating) return;
    const id = window.setTimeout(
      () => {
        startedRef.current = true;
        scheduleAnimation(SEQUENCE);
      },
      startedRef.current ? LOOP_PAUSE_MS : 400
    );
    return () => window.clearTimeout(id);
  }, [inView, state.isAnimating, scheduleAnimation]);

  const renderState = () => {
    switch (state.size) {
      case "compact":
        return (
          <DynamicContainer className="flex h-full w-full items-center gap-3 px-4">
            <Laptop className="size-4 shrink-0" style={{ color: YELLOW }} />
            <DynamicDescription className="truncate text-sm font-medium">StudyPC wants to join</DynamicDescription>
            <span className="ml-auto size-2 shrink-0 animate-pulse rounded-full" style={{ background: YELLOW }} />
          </DynamicContainer>
        );
      case "medium":
        return (
          <DynamicContainer className="flex h-full w-full flex-col justify-center gap-3 px-5">
            <div>
              <DynamicTitle className="text-sm font-semibold">Approve StudyPC?</DynamicTitle>
              <DynamicDescription className="text-xs text-background/70">
                Waiting for your approval to join this Barn.
              </DynamicDescription>
            </div>
            <DynamicDiv className="flex gap-2">
              <span className="flex-1 rounded-full bg-background/15 py-1.5 text-center text-xs font-medium">Deny</span>
              <motion.span
                animate={{ scale: [1, 0.92, 1] }}
                transition={{ delay: 1, duration: 0.3 }}
                className="flex-1 rounded-full py-1.5 text-center text-xs font-semibold text-accent-foreground"
                style={{ background: YELLOW }}
              >
                Approve
              </motion.span>
            </DynamicDiv>
          </DynamicContainer>
        );
      case "compactMedium":
        return (
          <DynamicContainer className="flex h-full w-full items-center gap-3 px-4">
            <ShieldCheck className="size-4 shrink-0" style={{ color: GREEN }} />
            <DynamicDescription className="truncate text-sm font-medium">StudyPC approved</DynamicDescription>
            <Check className="ml-auto size-4 shrink-0" style={{ color: GREEN }} />
          </DynamicContainer>
        );
      case "long":
        return (
          <DynamicContainer className="flex h-full w-full items-center gap-3 px-5">
            <Share2 className="size-5 shrink-0" style={{ color: YELLOW }} />
            <div className="min-w-0">
              <DynamicTitle className="truncate text-sm font-semibold">sample.bin shared</DynamicTitle>
              <DynamicDescription className="truncate text-xs text-background/70">
                With WindowsNode · read-only · 30m
              </DynamicDescription>
            </div>
          </DynamicContainer>
        );
      case "tall":
        return <TransferView />;
      case "large":
        return (
          <DynamicContainer className="flex h-full w-full items-center gap-3 px-5">
            <span
              className="flex size-9 shrink-0 items-center justify-center rounded-full"
              style={{ background: GREEN }}
            >
              <Check className="size-5 text-background" />
            </span>
            <div className="min-w-0">
              <DynamicTitle className="text-sm font-semibold">Checksum verified</DynamicTitle>
              <DynamicDescription className="truncate text-xs text-background/70">
                The copy matches the original.
              </DynamicDescription>
            </div>
          </DynamicContainer>
        );
      default:
        return (
          <DynamicContainer className="flex h-full w-full items-center justify-center gap-2.5 px-4">
            {[GREEN, GREEN, GREEN].map((c, i) => (
              <span key={i} className="size-2 rounded-full" style={{ background: c }} />
            ))}
            <DynamicDiv className="text-sm font-medium">Your Barn</DynamicDiv>
          </DynamicContainer>
        );
    }
  };

  return (
    <div ref={rootRef} className="flex flex-col items-center">
      <DynamicIsland id="barn-island">{renderState()}</DynamicIsland>
    </div>
  );
}

export default function BarnIsland() {
  return (
    <div className="relative flex min-h-[360px] flex-col items-center justify-between overflow-hidden rounded-xl border border-border bg-white/40 px-6 pb-5 pt-10 shadow-sm">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 0%, rgb(253 188 48 / 0.28), transparent 60%)" }}
      />
      <div className="relative w-full">
        <DynamicIslandProvider initialSize="default">
          <IslandContent />
        </DynamicIslandProvider>
      </div>
      <p className="relative mt-8 text-xs text-muted-foreground">Illustrative sequence</p>
    </div>
  );
}

"use client";

/**
 * Dynamic Island: composable, animated island primitives.
 * API follows the Cult UI dynamic-island docs (DynamicIslandProvider / DynamicIsland /
 * DynamicContainer / DynamicTitle / DynamicDescription / DynamicDiv / useDynamicIslandSize).
 * Implemented locally with framer-motion because the registry source could not be fetched.
 */
import * as React from "react";
import { AnimatePresence, motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

export type SizePresets =
  | "default"
  | "compact"
  | "compactLong"
  | "compactMedium"
  | "large"
  | "long"
  | "medium"
  | "tall"
  | "ultra"
  | "massive"
  | "minimalLeading"
  | "minimalTrailing"
  | "reset"
  | "empty";

export interface Preset {
  width: number;
  height: number;
  borderRadius: number;
}

// Widths stay <= 280 so the island fits inside narrow cards on phones.
export const SIZE_PRESETS: Record<SizePresets, Preset> = {
  default: { width: 150, height: 44, borderRadius: 22 },
  compact: { width: 220, height: 44, borderRadius: 22 },
  compactLong: { width: 260, height: 44, borderRadius: 22 },
  compactMedium: { width: 210, height: 44, borderRadius: 22 },
  large: { width: 280, height: 76, borderRadius: 34 },
  long: { width: 280, height: 64, borderRadius: 32 },
  medium: { width: 280, height: 132, borderRadius: 32 },
  tall: { width: 280, height: 172, borderRadius: 32 },
  ultra: { width: 280, height: 240, borderRadius: 36 },
  massive: { width: 280, height: 320, borderRadius: 36 },
  minimalLeading: { width: 52, height: 36, borderRadius: 18 },
  minimalTrailing: { width: 52, height: 36, borderRadius: 18 },
  reset: { width: 150, height: 44, borderRadius: 22 },
  empty: { width: 0, height: 0, borderRadius: 0 },
};

export interface AnimationStep {
  size: SizePresets;
  /** Wait (ms) before switching to this size. */
  delay: number;
}

interface IslandState {
  size: SizePresets;
  previousSize?: SizePresets;
  animationQueue: AnimationStep[];
  isAnimating: boolean;
}

type IslandAction =
  | { type: "SET_SIZE"; size: SizePresets }
  | { type: "SCHEDULE"; steps: AnimationStep[] }
  | { type: "ADVANCE" };

function reducer(state: IslandState, action: IslandAction): IslandState {
  switch (action.type) {
    case "SET_SIZE":
      return { ...state, size: action.size, previousSize: state.size, animationQueue: [], isAnimating: false };
    case "SCHEDULE":
      return { ...state, animationQueue: action.steps, isAnimating: action.steps.length > 0 };
    case "ADVANCE": {
      const [step, ...rest] = state.animationQueue;
      if (!step) return { ...state, isAnimating: false };
      return {
        ...state,
        size: step.size,
        previousSize: state.size,
        animationQueue: rest,
        isAnimating: rest.length > 0,
      };
    }
  }
}

interface DynamicIslandContextValue {
  state: IslandState;
  setSize: (size: SizePresets) => void;
  scheduleAnimation: (steps: AnimationStep[]) => void;
  presets: Record<SizePresets, Preset>;
}

const DynamicIslandContext = React.createContext<DynamicIslandContextValue | null>(null);

export function useDynamicIslandSize() {
  const ctx = React.useContext(DynamicIslandContext);
  if (!ctx) throw new Error("useDynamicIslandSize must be used within DynamicIslandProvider");
  return ctx;
}

export function DynamicIslandProvider({
  children,
  initialSize = "default",
  initialAnimation = [],
}: {
  children: React.ReactNode;
  initialSize?: SizePresets;
  initialAnimation?: AnimationStep[];
}) {
  const [state, dispatch] = React.useReducer(reducer, {
    size: initialSize,
    previousSize: undefined,
    animationQueue: initialAnimation,
    isAnimating: initialAnimation.length > 0,
  });

  // Each queued step waits for its own delay, then advances.
  React.useEffect(() => {
    const step = state.animationQueue[0];
    if (!step) return;
    const id = window.setTimeout(() => dispatch({ type: "ADVANCE" }), step.delay);
    return () => window.clearTimeout(id);
  }, [state.animationQueue]);

  const setSize = React.useCallback((size: SizePresets) => dispatch({ type: "SET_SIZE", size }), []);
  const scheduleAnimation = React.useCallback(
    (steps: AnimationStep[]) => dispatch({ type: "SCHEDULE", steps }),
    []
  );

  const value = React.useMemo(
    () => ({ state, setSize, scheduleAnimation, presets: SIZE_PRESETS }),
    [state, setSize, scheduleAnimation]
  );

  return <DynamicIslandContext.Provider value={value}>{children}</DynamicIslandContext.Provider>;
}

/** Queue a sequence of size transitions once, on mount. */
export function useScheduledAnimations(steps: AnimationStep[]) {
  const { scheduleAnimation } = useDynamicIslandSize();
  const stepsRef = React.useRef(steps);
  React.useEffect(() => {
    const id = window.setTimeout(() => scheduleAnimation(stepsRef.current), 0);
    return () => window.clearTimeout(id);
  }, [scheduleAnimation]);
}

// Keeps a stable element per size so AnimatePresence can play the old view's exit.
function Keyed({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export interface DynamicIslandProps extends Omit<HTMLMotionProps<"div">, "children" | "id"> {
  id: string;
  children?: React.ReactNode;
}

export function DynamicIsland({ id, children, className, ...props }: DynamicIslandProps) {
  const { state, presets } = useDynamicIslandSize();
  const preset = presets[state.size];

  return (
    <motion.div
      id={id}
      initial={false}
      animate={{ width: preset.width, height: preset.height, borderRadius: preset.borderRadius }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={cn("relative mx-auto overflow-hidden bg-foreground text-background shadow-lg", className)}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        <Keyed key={state.size}>{children}</Keyed>
      </AnimatePresence>
    </motion.div>
  );
}

export function DynamicContainer({ className, children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
      transition={{ duration: 0.18 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const reveal = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay: 0.08 },
};

export function DynamicTitle({ className, children, ...props }: HTMLMotionProps<"h3">) {
  return (
    <motion.h3 {...reveal} className={className} {...props}>
      {children}
    </motion.h3>
  );
}

export function DynamicDescription({ className, children, ...props }: HTMLMotionProps<"p">) {
  return (
    <motion.p {...reveal} className={className} {...props}>
      {children}
    </motion.p>
  );
}

export function DynamicDiv({ className, children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div {...reveal} className={className} {...props}>
      {children}
    </motion.div>
  );
}

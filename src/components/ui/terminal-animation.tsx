"use client";

/**
 * Terminal Animation: primitives for a typed-command terminal with tabbed output.
 * API follows the Cult UI terminal-animation docs (Root / Container / Window / Content /
 * CommandBar / Output / TabList / TabTrigger …). Implemented locally because the registry
 * source could not be fetched.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export interface TerminalLine {
  /** Text content for an output line. */
  text: string;
  /** Optional utility class for the line colour. */
  color?: string;
  /** Delay (ms) before revealing the next line. */
  delay?: number;
}

export interface TabContent {
  label: string;
  /** Command text animated in the prompt. */
  command: string;
  /** Output lines revealed after the command has been typed. */
  lines: TerminalLine[];
}

export const defaultTerminalTabs: TabContent[] = [
  {
    label: "dev",
    command: "npm run dev",
    lines: [
      { text: "  ▲ Next.js", delay: 300 },
      { text: "  - Local: http://localhost:3000", delay: 200 },
    ],
  },
];

const TYPE_INTERVAL_MS = 42;
const AFTER_TYPING_MS = 280;

interface TerminalAnimationContextValue {
  tabs: TabContent[];
  activeTab: number;
  setActiveTab: (index: number) => void;
  typedCommand: string;
  isTyping: boolean;
  visibleLines: number;
  isComplete: boolean;
  hasStarted: boolean;
  hideCursorOnComplete: boolean;
  alwaysDark: boolean;
  backgroundImage?: string;
}

const TerminalAnimationContext = React.createContext<TerminalAnimationContextValue | null>(null);

export function useTerminalAnimation() {
  const ctx = React.useContext(TerminalAnimationContext);
  if (!ctx) throw new Error("Terminal animation components must be used within TerminalAnimationRoot");
  return ctx;
}

export interface TerminalAnimationRootProps extends React.ComponentPropsWithoutRef<"div"> {
  tabs?: TabContent[];
  /** Initial tab index (uncontrolled). */
  defaultActiveTab?: number;
  /** Controlled active tab index. */
  activeTab?: number;
  onActiveTabChange?: (index: number) => void;
  backgroundImage?: string;
  /** Forces the dark terminal theme regardless of page theme. */
  alwaysDark?: boolean;
  /** Hide the trailing cursor once the output has finished. */
  hideCursorOnComplete?: boolean;
}

export const TerminalAnimationRoot = React.forwardRef<HTMLDivElement, TerminalAnimationRootProps>(
  (
    {
      tabs = defaultTerminalTabs,
      defaultActiveTab = 0,
      activeTab: controlledTab,
      onActiveTabChange,
      backgroundImage,
      alwaysDark = false,
      hideCursorOnComplete = false,
      className,
      style,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef]
    );

    const [uncontrolledTab, setUncontrolledTab] = React.useState(defaultActiveTab);
    const isControlled = controlledTab !== undefined;
    const activeTab = Math.min(Math.max(isControlled ? controlledTab : uncontrolledTab, 0), tabs.length - 1);

    const setActiveTab = React.useCallback(
      (index: number) => {
        if (!isControlled) setUncontrolledTab(index);
        onActiveTabChange?.(index);
      },
      [isControlled, onActiveTabChange]
    );

    // Start when scrolled into view so the typing is actually seen.
    const [hasStarted, setHasStarted] = React.useState(false);
    React.useEffect(() => {
      const el = innerRef.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    // Animation state is tagged with the run it belongs to (active tab). State from a previous
    // run is treated as "reset", so no synchronous setState is needed when the tab changes.
    type Run = { key: number; typed: string; typing: boolean; lines: number; done: boolean };
    const [run, setRun] = React.useState<Run>({ key: -1, typed: "", typing: false, lines: 0, done: false });
    const current: Run =
      run.key === activeTab ? run : { key: activeTab, typed: "", typing: false, lines: 0, done: false };
    const { typed: typedCommand, typing: isTyping, lines: visibleLines, done: isComplete } = current;

    React.useEffect(() => {
      if (!hasStarted) return;
      const tab = tabs[activeTab];
      if (!tab) return;

      const key = activeTab;
      const timers: number[] = [];
      const at = (ms: number, patch: Partial<Run>) => {
        timers.push(
          window.setTimeout(
            () =>
              setRun((prev) => ({
                ...(prev.key === key ? prev : { key, typed: "", typing: false, lines: 0, done: false }),
                ...patch,
              })),
            ms
          )
        );
      };

      // Reduced motion: show the final state immediately.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        at(0, { typed: tab.command, typing: false, lines: tab.lines.length, done: true });
        return () => timers.forEach((id) => window.clearTimeout(id));
      }

      at(0, { typed: "", typing: true });
      const chars = Array.from(tab.command);
      chars.forEach((_, i) => {
        at((i + 1) * TYPE_INTERVAL_MS, { typed: chars.slice(0, i + 1).join("") });
      });

      let t = chars.length * TYPE_INTERVAL_MS + AFTER_TYPING_MS;
      at(t, { typing: false });

      tab.lines.forEach((line, i) => {
        at(t, { lines: i + 1 });
        // `delay` is the pause before the *next* line is revealed.
        t += line.delay ?? 120;
      });
      at(t, { done: true });

      return () => timers.forEach((id) => window.clearTimeout(id));
    }, [activeTab, tabs, hasStarted]);

    const value = React.useMemo<TerminalAnimationContextValue>(
      () => ({
        tabs,
        activeTab,
        setActiveTab,
        typedCommand,
        isTyping,
        visibleLines,
        isComplete,
        hasStarted,
        hideCursorOnComplete,
        alwaysDark,
        backgroundImage,
      }),
      [
        tabs,
        activeTab,
        setActiveTab,
        typedCommand,
        isTyping,
        visibleLines,
        isComplete,
        hasStarted,
        hideCursorOnComplete,
        alwaysDark,
        backgroundImage,
      ]
    );

    return (
      <TerminalAnimationContext.Provider value={value}>
        <div
          ref={setRefs}
          data-slot="terminal-animation-root"
          data-always-dark={alwaysDark || undefined}
          className={cn("relative w-full", className)}
          style={
            backgroundImage
              ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", ...style }
              : style
          }
          {...props}
        >
          {children}
        </div>
      </TerminalAnimationContext.Provider>
    );
  }
);
TerminalAnimationRoot.displayName = "TerminalAnimationRoot";

/** Soft accent glow used when no background image is supplied. */
export function TerminalAnimationBackgroundGradient({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      aria-hidden
      data-slot="terminal-animation-bg-gradient"
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      style={{
        background:
          "radial-gradient(circle at 50% 30%, rgb(253 188 48 / 0.35), transparent 65%)",
      }}
      {...props}
    />
  );
}

export function TerminalAnimationContainer({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="terminal-animation-container"
      className={cn("relative z-10 w-full max-w-2xl", className)}
      {...props}
    />
  );
}

export interface TerminalAnimationWindowProps extends React.ComponentPropsWithoutRef<"div"> {
  backgroundColor?: string;
  /** Minimum height of the terminal area. */
  minHeight?: string;
  /** Plays a slide-up transition when entering the viewport. */
  animateOnVisible?: boolean;
}

export function TerminalAnimationWindow({
  className,
  style,
  backgroundColor,
  minHeight = "28rem",
  animateOnVisible = true,
  children,
  ...props
}: TerminalAnimationWindowProps) {
  const { hasStarted } = useTerminalAnimation();
  const shown = !animateOnVisible || hasStarted;

  return (
    <div
      data-slot="terminal-animation-window"
      className={cn(
        "overflow-hidden rounded-lg border border-foreground/20 bg-foreground text-background transition-all duration-700 ease-out motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className
      )}
      style={{ minHeight, backgroundColor, ...style }}
      {...props}
    >
      <div className="flex border-b border-background/10 px-4 py-2" aria-hidden>
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-background/20" />
          <div className="h-2 w-2 rounded-full bg-background/20" />
          <div className="h-2 w-2 rounded-full bg-background/20" />
        </div>
      </div>
      {children}
    </div>
  );
}

export function TerminalAnimationContent({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div data-slot="terminal-animation-content" className={cn("p-4", className)} {...props} />;
}

export function TerminalAnimationBlinkingCursor({ className, ...props }: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      aria-hidden
      data-slot="terminal-animation-cursor"
      className={cn("inline-block h-[1.1em] w-[0.55em] animate-pulse bg-accent align-middle", className)}
      {...props}
    />
  );
}

export interface TerminalAnimationCommandBarProps extends React.ComponentPropsWithoutRef<"span"> {
  /** Custom cursor while the command is typing. */
  cursor?: React.ReactNode;
}

export function TerminalAnimationCommandBar({ className, cursor, ...props }: TerminalAnimationCommandBarProps) {
  const { typedCommand, isTyping } = useTerminalAnimation();
  return (
    <span data-slot="terminal-animation-command" className={cn("inline-flex items-center", className)} {...props}>
      <span>{typedCommand}</span>
      {isTyping && (cursor ?? <TerminalAnimationBlinkingCursor />)}
    </span>
  );
}

export interface TerminalAnimationOutputLineProps extends React.ComponentPropsWithoutRef<"div"> {
  line: TerminalLine;
  visible: boolean;
}

export function TerminalAnimationOutputLine({ line, visible, className, ...props }: TerminalAnimationOutputLineProps) {
  if (!visible) return null;
  return (
    <div data-slot="terminal-animation-line" className={cn("whitespace-pre leading-relaxed", className)} {...props}>
      <span className={line.color ?? "text-background/60"}>{line.text || " "}</span>
    </div>
  );
}

export interface TerminalAnimationOutputProps extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  renderLine?: (line: TerminalLine, index: number, visible: boolean) => React.ReactNode;
}

export function TerminalAnimationOutput({ className, renderLine, ...props }: TerminalAnimationOutputProps) {
  const { tabs, activeTab, visibleLines } = useTerminalAnimation();
  const lines = tabs[activeTab]?.lines ?? [];
  return (
    <div data-slot="terminal-animation-output" className={className} {...props}>
      {lines.map((line, i) => {
        const visible = i < visibleLines;
        return (
          <React.Fragment key={`${activeTab}-${i}`}>
            {renderLine ? renderLine(line, i, visible) : <TerminalAnimationOutputLine line={line} visible={visible} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/** Prompt shown after the output has finished. */
export function TerminalAnimationTrailingPrompt({ className, children, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const { isComplete, hideCursorOnComplete } = useTerminalAnimation();
  if (!isComplete || hideCursorOnComplete) return null;
  return (
    <div data-slot="terminal-animation-trailing" className={className} {...props}>
      {children}
    </div>
  );
}

export function TerminalAnimationTabList({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div role="tablist" data-slot="terminal-animation-tablist" className={className} {...props} />;
}

export interface TerminalAnimationTabTriggerProps extends React.ComponentPropsWithoutRef<"button"> {
  /** Target tab index. */
  index: number;
  asChild?: boolean;
}

export function TerminalAnimationTabTrigger({
  index,
  asChild = false,
  className,
  onClick,
  ...props
}: TerminalAnimationTabTriggerProps) {
  const { activeTab, setActiveTab } = useTerminalAnimation();
  const Comp = asChild ? Slot : "button";
  const active = activeTab === index;
  return (
    <Comp
      role="tab"
      type={asChild ? undefined : "button"}
      aria-selected={active}
      data-state={active ? "active" : "inactive"}
      data-slot="terminal-animation-tab"
      className={className}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
        setActiveTab(index);
      }}
      {...props}
    />
  );
}

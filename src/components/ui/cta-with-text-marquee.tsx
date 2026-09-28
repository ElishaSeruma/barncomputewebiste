"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef } from "react";
import { Starfield, type StarfieldProps } from "@/components/ui/starfield";

interface VerticalMarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
  onItemsRef?: (items: HTMLElement[]) => void;
}

export function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
  onItemsRef,
}: VerticalMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onItemsRef && containerRef.current) {
      const items = Array.from(containerRef.current.querySelectorAll(".marquee-item")) as HTMLElement[];
      onItemsRef(items);
    }
  }, [onItemsRef]);

  return (
    <div
      ref={containerRef}
      className={cn("group flex flex-col overflow-hidden", className)}
      style={
        {
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

export interface MarqueeItem {
  title: string;
  /** A short line of detail shown under the title. */
  detail: string;
}

export interface CTAWithVerticalMarqueeProps {
  title: ReactNode;
  description: ReactNode;
  /** Buttons / links rendered under the description. */
  actions?: ReactNode;
  items: MarqueeItem[];
  className?: string;
  /** Shows a drifting particle field behind the marquee column only. Off by default. */
  particles?: boolean;
  particleProps?: StarfieldProps;
}

export default function CTAWithVerticalMarquee({
  title,
  description,
  actions,
  items,
  className,
  particles = false,
  particleProps,
}: CTAWithVerticalMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Items fade towards the top and bottom edges. Only runs while the marquee is on screen.
  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    const updateOpacity = () => {
      const nodes = marqueeContainer.querySelectorAll(".marquee-item");
      const containerRect = marqueeContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      // The item closest to the vertical centre is the "active" one and is set in bold.
      let active: HTMLElement | null = null;
      let closest = Infinity;

      nodes.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const maxDistance = containerRect.height / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const opacity = 1 - normalizedDistance * 0.75;
        (item as HTMLElement).style.opacity = opacity.toString();
        if (distance < closest) {
          closest = distance;
          active = item as HTMLElement;
        }
      });

      nodes.forEach((item) => {
        const titleEl = item.querySelector<HTMLElement>(".marquee-item-title");
        if (titleEl) titleEl.style.fontWeight = item === active ? "700" : "300";
      });
    };

    let raf = 0;
    let visible = false;
    const tick = () => {
      updateOpacity();
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    observer.observe(marqueeContainer);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={cn("relative w-full max-w-7xl", className)}>
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-24">
        {/* Left content */}
        <div className="max-w-xl space-y-6 lg:space-y-8">
          <h2 className="text-5xl font-bold leading-[1.05] text-foreground md:text-6xl lg:text-7xl">{title}</h2>
          <p className="text-lg leading-relaxed text-foreground/80 md:text-xl">{description}</p>
          {actions && <div className="flex flex-wrap gap-4">{actions}</div>}
        </div>

        {/* Right marquee */}
        <div ref={marqueeRef} className="relative flex h-[38svh] items-center justify-center lg:h-[62svh]">
          {/* `isolate` pins a stacking context here so the particle layer's negative z-index always
              stays scoped to this box. Without it, the layer only stays behind while this section's
              opacity is mid-transition (opacity < 1 incidentally creates a stacking context); once
              the reveal finishes at opacity: 1, that context disappears and -z-10 escapes upward,
              painting the particles behind unrelated ancestors instead — i.e. invisible. */}
          <div className="isolate relative h-full w-full">
            {particles && (
              <Starfield
                className="pointer-events-none absolute inset-0 -z-10"
                starColor={{ r: 33, g: 33, b: 33 }}
                starCount={1500}
                waveFrequency={10}
                starEscapeWidth={340}
                maxOpacity={190}
                rotationSpeed={0.00015}
                waveSpeed={0.003}
                particleSize={3}
                {...particleProps}
              />
            )}

            <VerticalMarquee speed={26} className="h-full">
              {items.map((item, idx) => (
                <div key={idx} className="marquee-item py-4 lg:py-6">
                  <div className="marquee-item-title text-3xl font-light leading-tight text-foreground md:text-4xl lg:text-5xl xl:text-6xl">
                    {item.title}
                  </div>
                  <div className="mt-1.5 text-sm text-foreground/60 md:text-base lg:mt-2">{item.detail}</div>
                </div>
              ))}
            </VerticalMarquee>

            {/* Top and bottom vignettes fade into the yellow field */}
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-1/3 bg-gradient-to-b from-accent via-accent/50 to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-1/3 bg-gradient-to-t from-accent via-accent/50 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

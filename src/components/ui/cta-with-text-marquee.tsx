"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef } from "react";

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

export interface CTAWithVerticalMarqueeProps {
  title: ReactNode;
  description: ReactNode;
  /** Buttons / links rendered under the description. */
  actions?: ReactNode;
  items: string[];
  className?: string;
}

export default function CTAWithVerticalMarquee({
  title,
  description,
  actions,
  items,
  className,
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
        (item as HTMLElement).style.fontWeight = item === active ? "700" : "300";
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
    <div className={cn("w-full max-w-7xl", className)}>
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-24">
        {/* Left content */}
        <div className="max-w-xl space-y-6 lg:space-y-8">
          <h2 className="text-5xl font-bold leading-[1.05] text-foreground md:text-6xl lg:text-7xl">{title}</h2>
          <p className="text-lg leading-relaxed text-foreground/80 md:text-xl">{description}</p>
          {actions && <div className="flex flex-wrap gap-4">{actions}</div>}
        </div>

        {/* Right marquee */}
        <div ref={marqueeRef} className="relative flex h-[32svh] items-center justify-center lg:h-[62svh]">
          <div className="relative h-full w-full">
            <VerticalMarquee speed={20} className="h-full">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="marquee-item py-5 text-3xl font-light text-foreground md:text-4xl lg:py-8 lg:text-5xl xl:text-6xl"
                >
                  {item}
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

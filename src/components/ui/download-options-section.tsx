import * as React from "react";
import { SpotlightCard } from "@/components/marketing/spotlight-card";
import { Button } from "@/components/ui/button";

// A single button within a card.
export interface CardButton {
  text: string;
  icon?: React.ReactNode;
  href?: string;
  variant?: "default" | "secondary" | "ghost" | "outline" | "link";
}

export interface DownloadCardProps {
  title: string;
  description: string;
  /** Illustration shown in the floating slot. */
  mockup: React.ReactNode;
  buttons: CardButton[];
  badge?: string;
}

export const DownloadCard: React.FC<DownloadCardProps> = ({
  title,
  description,
  mockup,
  buttons,
  badge,
}) => {
  return (
    <SpotlightCard className="w-full p-0" contentClassName="flex h-full flex-col justify-between gap-4 p-6">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="h-full w-full opacity-50 transition-all duration-300 group-hover:scale-105"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgb(253 188 48 / 0.55), transparent 65%)",
          }}
        />
      </div>

      {/* Card content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {badge && (
          <span className="mb-3 inline-flex rounded-full border border-accent bg-accent/25 px-2.5 py-0.5 text-xs font-medium">
            {badge}
          </span>
        )}
        <h3 className="mb-1 text-lg font-medium text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Floating mockup */}
      <div className="animate-float relative z-10 mx-auto aspect-square w-full max-w-[200px] transition-transform duration-300 group-hover:scale-105">
        {mockup}
      </div>

      {/* Action buttons */}
      <div className="relative z-10 flex w-full flex-col gap-2">
        {buttons.map((button, index) => (
          <Button
            key={index}
            variant={button.variant || "secondary"}
            className="w-full"
            asChild
          >
            <a href={button.href ?? "#"}>
              {button.icon && <span className="mr-2 h-4 w-4">{button.icon}</span>}
              {button.text}
            </a>
          </Button>
        ))}
      </div>
    </SpotlightCard>
  );
};

export const DownloadShowcase = ({
  title,
  cards,
}: {
  title: string;
  cards: DownloadCardProps[];
}) => {
  return (
    <div className="relative p-6 lg:p-8">
      <div className="flex flex-col items-center gap-8">
        <h2 className="max-w-lg text-balance text-center text-3xl font-semibold text-foreground sm:text-4xl">
          {title}
        </h2>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <DownloadCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

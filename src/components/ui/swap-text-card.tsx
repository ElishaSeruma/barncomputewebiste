"use client";

import type { ReactNode } from "react";

import { SpotlightCard } from "@/components/marketing/spotlight-card";
import SwapText from "@/components/ui/swap-text";

interface SwapTextCardProps {
  /** Small heading at the top of the card (was the "Animata" label). */
  label: string;
  initialText: string;
  finalText: string;
  /** Optional accent icon shown top-right. Pass a rendered element, not a component. */
  icon?: ReactNode;
}

export default function SwapTextCard({ label, initialText, finalText, icon }: SwapTextCardProps) {
  return (
    <SpotlightCard className="group/swap min-h-64 w-full md:max-w-[500px]" contentClassName="flex h-full min-h-[13rem] flex-col justify-between">
      <div className="flex items-start justify-between gap-3">
        <h5 className="mb-2 text-sm font-medium uppercase text-muted-foreground">{label}</h5>
        {icon && (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
            {icon}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between">
        <div className="md:hidden">
          <div className="text-lg font-semibold text-foreground">{initialText}</div>
          <div className="text-sm font-medium text-muted-foreground">{finalText}</div>
        </div>
        <SwapText
          initialText={initialText}
          finalText={finalText}
          disableClick
          // Set min height so that all the text content fits
          // use -mb-7 to hide the extra space when not active
          className="-mb-7 hidden min-h-28 w-4/5 transition-all duration-200 group-hover/swap:mb-0 md:flex md:flex-col"
          initialTextClassName="text-lg group-hover/swap:opacity-0 h-full duration-200 font-semibold text-foreground"
          finalTextClassName="text-sm h-full duration-200 font-medium text-muted-foreground"
        />
      </div>
    </SpotlightCard>
  );
}

"use client";

import Link from "next/link";

import HeroDithering from "@/components/ui/hero-dithering";
import { Button } from "@/components/ui/button";
import type { Cta } from "@/lib/site/types";

export function CtaBand({
  title,
  subtitle,
  text,
  primary,
  secondary,
  badges = [],
}: {
  title: string;
  subtitle: string;
  text: string;
  primary: Cta;
  secondary?: Cta;
  badges?: string[];
}) {
  return (
    <div className="pb-8 pt-12 sm:pt-20">
      <HeroDithering
        srTitle={title}
        title={title}
        subtitle={subtitle}
        description={text}
        ctaProps={{ label: primary.label, href: primary.href }}
        techStack={badges.map((name) => ({ name }))}
        showBadges={badges.length > 0}
        renderCta={(defaultCta) => (
          <div className="flex flex-wrap items-center justify-center gap-3 pb-4 md:pb-0 lg:justify-start">
            {defaultCta}
            {secondary && (
              <Button asChild variant="outline" size="lg">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            )}
          </div>
        )}
        visualClassName="aspect-square h-auto w-full max-w-[460px] justify-self-center lg:h-auto xl:h-auto"
      />
    </div>
  );
}

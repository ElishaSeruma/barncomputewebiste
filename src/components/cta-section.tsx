"use client";

import Link from "next/link";

import HeroDithering from "@/components/ui/hero-dithering";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export default function CtaSection() {
  return (
    <section id="contact" className="pb-8 pt-12 sm:pt-20">
      <Reveal>
        <HeroDithering
          visualClassName="aspect-square h-auto w-full max-w-[460px] justify-self-center lg:h-auto xl:h-auto"
          renderCta={(defaultCta) => (
            <div className="flex flex-wrap items-center justify-center gap-3 pb-4 md:pb-0 lg:justify-start">
              {defaultCta}
              <Button asChild variant="outline" size="lg">
                <Link href="/roadmap">View the roadmap</Link>
              </Button>
            </div>
          )}
        />
      </Reveal>
    </section>
  );
}

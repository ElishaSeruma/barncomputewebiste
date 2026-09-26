"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlyphPortal from "@/components/ui/glyph-portal";
import CTAWithVerticalMarquee from "@/components/ui/cta-with-text-marquee";
import GatewayFlow from "@/components/ui/gateway-flow";

const MARQUEE_ITEMS = [
  "Private Barns",
  "Trusted Nodes",
  "Live availability",
  "Authorised sharing",
  "Verified transfers",
];

const FONT = '"Satoshi", Arial, sans-serif';

export default function Hero() {
  const [ready, setReady] = useState(false);

  // The portal measures glyph ink once on mount, so Satoshi must be loaded first.
  useEffect(() => {
    let settled = false;
    const finish = () => {
      if (!settled) {
        settled = true;
        setReady(true);
      }
    };
    const timeout = window.setTimeout(finish, 2000);
    document.fonts.load('900 100px "Satoshi"', "BARN").then(finish, finish);
    return () => {
      settled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  if (!ready) return <div className="min-h-svh" aria-hidden="true" />;

  return (
    <GlyphPortal
      word="BARN"
      fontFamily={FONT}
      fontWeight={900}
      scrollLength={2.4}
      interactive
      underlay={<GatewayFlow mode="light" className="h-full w-full" density={0.8} />}
      strokeColor="#212121"
      strokeWidth={1}
      background={
        <div
          className="absolute inset-0"
          style={{
            transform: "scale(var(--gp-field-scale,1))",
            background:
              "#FDBC30",
          }}
        />
      }
      enterLabel="Step inside"
      style={{
        "--gp-paper": "#F9F1E0",
        "--gp-ink": "#212121",
        "--gp-field": "#FDBC30",
        "--gp-foreground": "#212121",
        fontFamily: FONT,
        letterSpacing: "-0.05em",
      }}
      front={
        <>
          <p
            data-hero-eyebrow
            className="absolute inset-x-6 text-center text-sm font-medium text-muted-foreground"
          >
            Barn Computing
          </p>
          <p
            data-hero-support
            className="absolute inset-x-6 mx-auto max-w-xl text-center text-base font-normal text-muted-foreground"
          >
            Your devices. One Barn.
          </p>
          <span
            data-hero-scroll
            className="absolute inset-x-6 bottom-[7%] text-center text-xs text-muted-foreground"
          >
            Scroll for a closer look ↓
          </span>
        </>
      }
    >
      <CTAWithVerticalMarquee
        title="Your devices. One Barn."
        description="Barn Computing connects the computers you trust into one private network, giving them a foundation to communicate, share data, and eventually combine storage and computing power."
        items={MARQUEE_ITEMS}
        className="mx-auto"
        actions={
          <>
            <Link
              href="/product"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-foreground px-6 py-3 font-medium text-background transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <span className="relative z-10">Explore Barn</span>
              <ArrowRight className="relative z-10 size-4" />
              <div className="absolute inset-0 -translate-x-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
            </Link>
            <a
              href="#how-it-works"
              className="group relative inline-flex items-center overflow-hidden rounded-md border border-border bg-secondary px-6 py-3 font-medium text-secondary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <span className="relative z-10">See How It Works</span>
              <div className="absolute inset-0 -translate-x-[200%] bg-gradient-to-r from-transparent via-foreground/10 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
            </a>
          </>
        }
      />
    </GlyphPortal>
  );
}

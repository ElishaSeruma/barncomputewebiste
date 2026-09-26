"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";

const BOILERPLATE =
  "Barn Computing is a private distributed computing platform that connects trusted, user-controlled devices into a coordinated network called a Barn. Each approved device becomes a Node. The first Barn foundation focuses on trusted device membership, connectivity, availability, and authorised file exchange between supported computers. Over time, Barn is intended to build on that foundation with distributed storage and compute capabilities, allowing the hardware users already control to operate more like shared private infrastructure.";

const SWATCHES = [
  { name: "Cream", hex: "#F9F1E0", use: "Backgrounds" },
  { name: "Charcoal", hex: "#212121", use: "Text and strokes" },
  { name: "Barn yellow", hex: "#FDBC30", use: "Brand accent" },
  { name: "Status green", hex: "#3F8F5F", use: "Online" },
  { name: "Status red", hex: "#D64545", use: "Offline" },
];

function CopyChip({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          window.setTimeout(() => setDone(false), 1500);
        } catch {
          // Clipboard unavailable; ignore.
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white/60 px-3 py-1.5 text-xs font-medium transition-colors hover:border-foreground/30"
    >
      {done ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {done ? "Copied" : label}
    </button>
  );
}

export function PressKit() {
  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="space-y-6">
        <div className="rounded-xl border border-border bg-white/50 p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-bold">About Barn Computing</h3>
            <CopyChip text={BOILERPLATE} label="Copy boilerplate" />
          </div>
          <p className="mt-4 leading-relaxed text-foreground/80">{BOILERPLATE}</p>
        </div>

        <div className="rounded-xl border border-border bg-white/50 p-6 shadow-sm sm:p-8">
          <h3 className="text-xl font-bold">Key facts</h3>
          <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {[
              ["Product", "Barn Computing"],
              ["Package name", "barnCompute"],
              ["Command", "barn"],
              ["First release", "0.1.0 alpha"],
              ["First platforms", "macOS and Windows"],
              ["Status", "M1 foundation in development"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs font-medium uppercase text-muted-foreground">{k}</dt>
                <dd className="mt-0.5 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-border bg-white/50 p-6 shadow-sm sm:p-8">
          <h3 className="text-xl font-bold">Logo</h3>
          <div className="mt-5 flex items-center justify-center rounded-lg border border-border bg-background p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/barnLogo.svg" alt="Barn Computing logo" width={112} height={112} className="size-28 rounded-xl" />
          </div>
          <a
            href="/barnLogo.svg"
            download
            className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <Download className="size-4" /> Download logo (SVG)
          </a>
        </div>

        <div className="rounded-xl border border-border bg-white/50 p-6 shadow-sm sm:p-8">
          <h3 className="text-xl font-bold">Colour</h3>
          <ul className="mt-5 space-y-3">
            {SWATCHES.map((s) => (
              <li key={s.hex} className="flex items-center gap-3">
                <span className="size-10 shrink-0 rounded-lg border border-border" style={{ background: s.hex }} />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{s.name}</span>
                  <span className="block text-xs text-muted-foreground">{s.use}</span>
                </span>
                <CopyChip text={s.hex} label={s.hex} />
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted-foreground">Typeface: Satoshi.</p>
        </div>
      </div>
    </div>
  );
}

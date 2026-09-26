import { SpotlightCard } from "@/components/marketing/spotlight-card";
import BarnTerminal from "@/components/barn-terminal";
import { Activity, ArrowLeftRight, Share2, ShieldCheck } from "lucide-react";

const STATUS = {
  green: "var(--status-green)",
  yellow: "var(--status-yellow)",
  red: "var(--status-red)",
};

// 24 one-MiB chunks: verified, in flight, waiting.
const chunks = Array.from({ length: 24 }, (_, i) => (i < 17 ? "done" : i === 17 ? "active" : "todo"));

const footer = "border-t border-border bg-white/30 p-6";

export const Component = () => {
  return (
    <section id="foundation" className="relative w-full py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-white/40 px-3 py-1 text-xs font-medium uppercase text-muted-foreground">
            M1 · In development
          </div>
          <h2 className="mb-4 max-w-3xl text-balance text-4xl font-bold sm:text-5xl md:text-6xl">
            Starting with the foundation. <br className="hidden sm:block" />
            <span className="text-foreground/40">Built in layers.</span>
          </h2>
          <p className="max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
            The first milestone establishes the core network: Barn creation, trusted device enrolment,
            device availability, communication, and authorised file exchange. Distributed storage and
            compute only become useful once the devices underneath can identify, trust, reach and
            coordinate with one another.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          {/* Availability: terminal mock */}
          <SpotlightCard className="min-h-[320px] p-0 md:col-span-2" contentClassName="flex h-full min-h-[320px] flex-col">
            <div className="relative flex flex-1 items-center justify-center p-8">
              <BarnTerminal />
            </div>
            <div className={footer}>
              <div className="mb-2 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <h3 className="text-sm font-medium">Device availability</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Know which Nodes are online, which have gone quiet, and which are offline, so the Barn
                understands what can take part right now.
              </p>
            </div>
          </SpotlightCard>

          {/* Enrolment */}
          <SpotlightCard className="min-h-[320px] p-0" contentClassName="flex h-full min-h-[320px] flex-col">
            <div className="flex flex-1 items-center justify-center p-8">
              <div className="flex w-full flex-col gap-2">
                {[
                  { w: "w-16", pending: false },
                  { w: "w-20", pending: false },
                  { w: "w-14", pending: true },
                ].map((r, i) => (
                  <div
                    key={i}
                    className="flex h-9 w-full items-center justify-between rounded-md border border-border bg-white/60 px-3"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: r.pending ? STATUS.yellow : STATUS.green }}
                      />
                      <div className={`h-1.5 ${r.w} rounded bg-foreground/20`} />
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {r.pending ? "Awaiting approval" : "Approved"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className={footer}>
              <div className="mb-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <h3 className="text-sm font-medium">Trusted Node enrolment</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Every device is approved before it joins. Nearby is not the same as trusted.
              </p>
            </div>
          </SpotlightCard>

          {/* Sharing */}
          <SpotlightCard className="min-h-[320px] p-0" contentClassName="flex h-full min-h-[320px] flex-col">
            <div className="flex flex-1 items-center justify-center p-8">
              <div className="w-full max-w-[240px] space-y-3 text-xs">
                <div className="rounded-md border border-border bg-white/60 px-3 py-2 font-mono">
                  sample.bin
                </div>
                <div className="flex justify-center">
                  <div className="h-6 border-l border-foreground/30" />
                </div>
                <div className="flex items-center justify-between rounded-md border border-border bg-white/60 px-3 py-2">
                  <span className="font-mono">WindowsNode</span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{ background: "var(--status-yellow)", color: "var(--accent-foreground)" }}
                  >
                    Shared
                  </span>
                </div>
                <p className="text-center text-[10px] text-muted-foreground">
                  One file · one Node · expires
                </p>
              </div>
            </div>
            <div className={footer}>
              <div className="mb-2 flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                <h3 className="text-sm font-medium">Authorised file sharing</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Files are shared on purpose, with a chosen Node, and never exposed to the whole Barn by default.
              </p>
            </div>
          </SpotlightCard>

          {/* Transfers: chunk grid */}
          <SpotlightCard className="min-h-[320px] p-0 md:col-span-2" contentClassName="flex h-full min-h-[320px] flex-col">
            <div className="relative flex flex-1 items-center justify-center p-8">
              <div className="flex w-full max-w-sm flex-col gap-4">
                <div className="grid grid-cols-12 gap-1.5">
                  {chunks.map((c, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-[3px] border ${
                        c === "todo" ? "border-border bg-white/40" : "border-transparent"
                      } ${c === "active" ? "animate-pulse" : ""}`}
                      style={
                        c === "done"
                          ? { background: "var(--status-green)" }
                          : c === "active"
                            ? { background: "var(--status-yellow)" }
                            : undefined
                      }
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between rounded-md border border-border bg-white/60 p-3 font-mono text-xs text-muted-foreground">
                  <span>17 / 24 chunks verified</span>
                  <span className="text-foreground">Resumable</span>
                </div>
              </div>
            </div>
            <div className={footer}>
              <div className="mb-2 flex items-center gap-2">
                <ArrowLeftRight className="h-4 w-4" />
                <h3 className="text-sm font-medium">Transfer verification and recovery</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Transfers are checked for integrity as they arrive, and supported interrupted transfers
                pick up from what was already verified instead of starting over.
              </p>
            </div>
          </SpotlightCard>
        </div>

        {/* Remaining foundation capabilities */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
          {["Private Barn creation", "Cross-device communication", "macOS + Windows foundation"].map((c) => (
            <span key={c} className="rounded-full border border-border bg-white/40 px-3 py-1 text-muted-foreground">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

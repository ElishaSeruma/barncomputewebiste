import {
  Plus,
  Layers,
  Laptop,
  Database,
  Cpu,
  Sparkles,
  Map,
  Apple,
  Grid2x2,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import BarnIsland from "@/components/barn-island";
import { Component as FeaturesGrid } from "@/components/ui/featuresgrid";
import HowItWorksBoard from "@/components/ui/how-it-works";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import SwapTextCard from "@/components/ui/swap-text-card";
import CtaSection from "@/components/cta-section";
import { DownloadShowcase } from "@/components/ui/download-options-section";

const shell = "mx-auto w-full max-w-6xl px-5 sm:px-8";

function Heading({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <p className="mb-3 text-sm font-medium text-muted-foreground">{eyebrow}</p>}
      <h2 className="text-4xl font-bold leading-[1.05] sm:text-5xl">{title}</h2>
      {children && <p className="mt-5 text-lg leading-relaxed text-foreground/75">{children}</p>}
    </div>
  );
}

export function Problem() {
  return (
    <section id="product" className="py-24 sm:py-32">
      <div className={`${shell} grid items-center gap-12 lg:grid-cols-2`}>
        <Reveal>
          <Heading eyebrow="The problem" title="Your computers have more to give.">
            A desktop here. A laptop there. A spare machine sitting idle. Storage on one device,
            processing power on another. Most of the time, those machines operate as separate islands
            while online services become the default middleman between them.
          </Heading>
          <p className="mt-6 max-w-xl text-lg font-medium leading-snug">
            What if the devices you already trust could operate as one private computing environment?
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <BarnIsland />
        </Reveal>
      </div>
    </section>
  );
}

const steps = [
  { icon: Plus, n: "01", title: "Create your private Barn", body: "Start a trusted environment for your devices." },
  { icon: Laptop, n: "02", title: "Add the devices you trust", body: "Approve supported computers and bring them into the Barn as Nodes." },
  { icon: Layers, n: "03", title: "Let your devices work together", body: "Share supported data today and build toward a future where storage and compute can be coordinated across the Barn." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className={shell}>
        <Reveal>
          <Heading eyebrow="How it works" title="Build your Barn in three steps." />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <SwapTextCard
                label={`Step ${s.n}`}
                initialText={s.title}
                finalText={s.body}
                icon={<s.icon className="size-5" />}
              />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-foreground/75">
            Devices do not become members simply because they are nearby or on the same Wi-Fi.
            Membership is deliberate and controlled.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Foundation() {
  return <FeaturesGrid />;
}

const vision = [
  { icon: Database, title: "Storage", body: "Coordinate capacity across trusted devices and build toward resilient distributed storage." },
  { icon: Cpu, title: "Compute", body: "Use suitable processing resources across the Barn for workloads that can benefit from distributed execution." },
  { icon: Sparkles, title: "AI", body: "Build toward private AI infrastructure powered by compatible hardware across trusted Nodes." },
];

export function Vision() {
  return (
    <section id="vision" className="py-24 sm:py-32">
      <div className={shell}>
        <Reveal>
          <Heading eyebrow="The direction" title="From connected devices to private infrastructure.">
            File sharing is the beginning, not the destination. Barn&apos;s long-term direction is to make
            the storage and computing capacity spread across trusted devices usable as one coordinated
            resource, without assuming that every task must begin in somebody else&apos;s cloud.
          </Heading>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {vision.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <SwapTextCard
                label="Future"
                initialText={v.title}
                finalText={v.body}
                icon={<v.icon className="size-5" />}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const values = [
  { title: "Control", description: "Build around devices you approve." },
  { title: "Coordination", description: "Make separate machines part of one environment." },
  { title: "Utilisation", description: "Put otherwise idle hardware to useful work." },
  { title: "Flexibility", description: "A foundation that can grow from file exchange into storage and compute." },
  { title: "Privacy by architecture", description: "Centred on explicitly trusted participants rather than public access by default." },
];

export function Why() {
  return (
    <section id="solutions" className="py-24 sm:py-32">
      <div className={shell}>
        <Reveal>
          <Heading eyebrow="Why Barn" title="Computing should not stop at the edge of one device.">
            Modern users often own several capable machines, yet the software connecting them remains
            fragmented. Barn is designed around the idea that hardware becomes more useful when it
            belongs to a trusted, coordinated network. The goal is not to hide where computing
            happens. It is to give you a clearer relationship with the machines doing the work.
          </Heading>
        </Reveal>
        <Reveal delay={0.1} className="mt-14">
          <HowItWorksBoard features={values} />
        </Reveal>
      </div>
    </section>
  );
}


function DeviceMockup({ src, alt, dot }: { src: string; alt: string; dot: string }) {
  // Every platform image is a 512x512 canvas, so all three render at exactly the same size.
  return (
    <div className="relative flex size-full items-center justify-center rounded-lg border border-border bg-white/70 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={512} height={512} className="size-full object-contain p-6" />
      <span
        className="absolute right-3 top-3 size-2.5 rounded-full"
        style={{ background: dot }}
      />
    </div>
  );
}

export function Platforms() {
  return (
    <section id="platforms" className="py-24 sm:py-32">
      <div className={shell}>
        <Reveal>
          <DownloadShowcase
            title="Start with the devices you already own."
            cards={[
              {
                title: "macOS",
                description: "MacBooks and desktops join your Barn as Nodes.",
                badge: "M1 · In development",
                mockup: <DeviceMockup src="/platforms/mac.png" alt="Apple logo" dot="var(--status-green)" />,
                buttons: [{ text: "Read the Mac guide", icon: <Apple className="h-4 w-4" />, href: "/docs/start/install/platform/macos" }],
              },
              {
                title: "Windows",
                description: "Windows desktops and laptops sit alongside them.",
                badge: "M1 · In development",
                mockup: <DeviceMockup src="/platforms/windows.png" alt="Windows logo" dot="var(--status-green)" />,
                buttons: [{ text: "Read the Windows guide", icon: <Grid2x2 className="h-4 w-4" />, href: "/docs/start/install/platform/windows" }],
              },
              {
                title: "More devices",
                description: "Home servers, workstations and other supported hardware.",
                badge: "Future",
                mockup: <DeviceMockup src="/platforms/home.png" alt="A home server, a phone and a compact desktop" dot="var(--status-yellow)" />,
                buttons: [{ text: "See the roadmap", icon: <Map className="h-4 w-4" />, href: "/roadmap" }],
              },
            ]}
          />
        </Reveal>
      </div>
    </section>
  );
}

const roadmap = [
  { tag: "M1 · In development", tone: "now" as const, title: "Foundation", theme: "Connect the Barn.", items: ["Barn creation", "Node enrolment", "Trusted membership", "Device availability", "Communication", "Authorised file exchange", "macOS and Windows"] },
  { tag: "Planned", tone: "future" as const, title: "M2 · Distributed Storage", theme: "Make storage collaborative.", items: ["Distribute and recover data across trusted Nodes", "Interact with the Barn, not every physical location"] },
  { tag: "Future", tone: "future" as const, title: "Compute", theme: "Put the Barn to work.", items: ["Explore scheduling suitable workloads across a Barn's available resources"] },
  { tag: "Future", tone: "future" as const, title: "AI Infrastructure", theme: "Private hardware, coordinated intelligence.", items: ["Explore compatible Nodes contributing to private AI workloads"] },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="py-24 sm:py-32">
      <div className={shell}>
        <Reveal>
          <Heading eyebrow="Roadmap" title="Built in layers, in the open." />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {roadmap.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <SwapTextCard
                label={r.tag}
                initialText={r.title}
                finalText={`${r.theme} ${r.items.join(" · ")}`}
              />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
            Anything beyond the current milestone is planned or exploratory. No dates are promised.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const faqs = [
  ["Is Barn cloud storage?", "Not in the traditional sense. Barn is being built as a private distributed computing layer for trusted devices. Storage is one part of the larger direction, alongside communication and compute."],
  ["Do all my devices automatically join?", "No. Devices must be deliberately added and approved before becoming Nodes in a Barn."],
  ["Does joining a Barn automatically share every file on my computer?", "No. Barn's model is based on explicit actions. Files must be deliberately brought into Barn's managed environment before supported sharing operations can occur."],
  ["Does Barn require every device to be on the same Wi-Fi?", "Not as a permanent product principle. Barn is being designed to cope with different networking conditions, although connectivity depends on the capabilities available in a given release and the restrictions of the network being used."],
  ["What platforms does Barn target first?", "The initial desktop foundation targets macOS and Windows."],
  ["Is distributed storage available now?", "No. The initial milestone focuses on the networking and file-exchange foundation. More advanced distributed storage belongs to later milestones and is described as planned until released and verified."],
  ["Can Barn combine the computing power of my devices?", "That is part of the longer-term compute direction. It is not a current capability."],
  ["Is Barn a blockchain or cryptocurrency project?", "No. Barn does not need blockchain or cryptocurrency to explain its core product model."],
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className={`${shell} grid gap-12 lg:grid-cols-[1fr_1.6fr]`}>
        <Reveal>
          <Heading eyebrow="FAQ" title="Questions, answered." />
        </Reveal>
        <Reveal delay={0.1}>
          <FaqAccordion items={faqs.map(([q, a]) => ({ q, a }))} />
        </Reveal>
      </div>
    </section>
  );
}

export function CTA() {
  return <CtaSection />;
}

// Home page content lists, exported so llms-full.txt is generated from the same source.
export { steps as homeSteps, vision as homeVision, values as homeValues, roadmap as homeRoadmap, faqs as homeFaqs };

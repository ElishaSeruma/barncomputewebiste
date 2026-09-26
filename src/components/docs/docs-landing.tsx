import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Bug,
  Cpu,
  Database,
  HardDrive,
  Laptop,
  ListChecks,
  Network,
  Radio,
  Share2,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  Wifi,
} from "lucide-react";

import { DocsSearchButton } from "./docs-search-button";

const card =
  "group rounded-lg border border-border bg-white/50 p-4 shadow-sm transition-colors hover:border-foreground/30 hover:bg-white/80";
const tile = "flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground";

function Arrow() {
  return (
    <ArrowUpRight className="size-4 shrink-0 text-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
  );
}

function SectionHeading({ title, text }: { title: string; text?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      {text && <p className="mt-1.5 text-muted-foreground">{text}</p>}
    </div>
  );
}

const quickstarts = [
  { n: "01", title: "Install Barn", text: "Set up Python and the barn command.", href: "/docs/start/install/platform/macos" },
  { n: "02", title: "Create a Barn", text: "Initialise the coordinator.", href: "/docs/build/barns/create-a-barn" },
  { n: "03", title: "Enrol a Node", text: "Add a second device and approve it.", href: "/docs/build/nodes/enrol-a-node" },
  { n: "04", title: "Share a file", text: "Send a verified file between Nodes.", href: "/docs/start/tutorials/share-your-first-file" },
];

const buildCards = [
  { icon: Network, title: "Barns", text: "Create a private network of trusted devices.", href: "/docs/build/barns/overview" },
  { icon: Laptop, title: "Nodes", text: "Enrol, approve and monitor devices.", href: "/docs/build/nodes/overview" },
  { icon: HardDrive, title: "Files and sharing", text: "Import files and share them explicitly.", href: "/docs/build/files/overview" },
  { icon: Wifi, title: "Networking", text: "Addresses, ports and firewalls.", href: "/docs/build/networking/overview" },
  { icon: ShieldCheck, title: "Security and trust", text: "How membership and access are protected.", href: "/docs/build/security/overview" },
];

const platforms = [
  { title: "macOS", text: "MacBooks and desktops.", href: "/docs/start/install/platform/macos", image: "/platforms/mac.png", status: "M1 target" },
  { title: "Windows", text: "Windows desktops and laptops.", href: "/docs/start/install/platform/windows", image: "/platforms/windows.png", status: "M1 target" },
  { title: "More devices", text: "Servers, workstations and more.", href: "/docs/roadmap/overview", image: "/platforms/home.png", status: "Future" },
];

const next = [
  { icon: Database, title: "Distributed storage", text: "Spread data across trusted Nodes.", href: "/docs/roadmap/m2-distributed-storage", tag: "Planned" },
  { icon: Cpu, title: "Compute", text: "Use processing power across a Barn.", href: "/docs/roadmap/compute", tag: "Future" },
  { icon: Sparkles, title: "AI infrastructure", text: "Private AI on hardware you trust.", href: "/docs/roadmap/ai", tag: "Future" },
  { icon: Radio, title: "Relay for restricted networks", text: "Connect where devices cannot reach each other.", href: "/docs/build/networking/public-wifi", tag: "Planned" },
];

const reference = [
  { icon: SquareTerminal, title: "CLI reference", href: "/docs/cli/overview" },
  { icon: Bug, title: "Error codes", href: "/docs/reference/errors" },
  { icon: BookOpen, title: "Glossary", href: "/docs/reference/glossary" },
  { icon: ListChecks, title: "Limits", href: "/docs/reference/limits" },
  { icon: Share2, title: "Changelog", href: "/docs/reference/changelog" },
  { icon: ShieldCheck, title: "Troubleshooting", href: "/docs/reference/troubleshooting/cannot-connect" },
];

const guides = [
  { title: "Set up a home lab Barn", href: "/docs/guides/setup/home-lab" },
  { title: "Connect two laptops", href: "/docs/guides/setup/two-laptops" },
  { title: "Share a large file", href: "/docs/guides/files/share-a-large-file" },
  { title: "Recover an interrupted transfer", href: "/docs/guides/files/recover-an-interrupted-transfer" },
  { title: "Change the coordinator address", href: "/docs/guides/operate/change-the-coordinator-address" },
  { title: "Retire a device", href: "/docs/guides/operate/retire-a-device" },
];

export function DocsLanding() {
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      {/* Hero */}
      <section className="py-16 text-center sm:py-20">
        <span className="inline-flex items-center rounded-full border border-border bg-white/50 px-3 py-1 text-xs font-medium uppercase text-muted-foreground">
          Documentation
        </span>
        <h1 className="mt-5 text-5xl font-bold leading-[1.05] sm:text-6xl">Barn Documentation</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Learn how to build a private network from the devices you trust, connect them, and share files securely.
        </p>
        <div className="mt-8">
          <DocsSearchButton />
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/docs/start/quickstart" className="inline-flex h-10 items-center rounded-md bg-foreground px-5 text-sm font-medium text-background shadow-sm transition-opacity hover:opacity-90">
            Quickstart
          </Link>
          <Link href="/docs/cli/overview" className="inline-flex h-10 items-center rounded-md border border-foreground/30 px-5 text-sm font-medium transition-colors hover:bg-foreground/5">
            CLI reference
          </Link>
        </div>
      </section>

      {/* Quickstart */}
      <section className="py-8">
        <SectionHeading title="Get started in minutes" text="From install to your first shared file." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickstarts.map((q) => (
            <Link key={q.n} href={q.href} className={card}>
              <span className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">{q.n}</span>
                <Arrow />
              </span>
              <span className="mt-4 block font-semibold text-foreground">{q.title}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{q.text}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Build */}
      <section className="py-8">
        <SectionHeading title="Build your Barn" text="The core pieces of the M1 foundation." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {buildCards.map((c) => (
            <Link key={c.title} href={c.href} className={card}>
              <span className="flex items-start justify-between">
                <span className={tile}>
                  <c.icon className="size-5" />
                </span>
                <Arrow />
              </span>
              <span className="mt-4 block font-semibold text-foreground">{c.title}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{c.text}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Platforms */}
      <section className="py-8">
        <SectionHeading title="Connect a platform" text="Where Barn runs today, and where it is headed." />
        <div className="grid gap-3 sm:grid-cols-3">
          {platforms.map((pl) => (
            <Link key={pl.title} href={pl.href} className={`${card} flex items-center gap-4`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pl.image} alt="" width={64} height={64} className="size-16 shrink-0 rounded-md border border-border bg-white/70 object-contain p-1.5" />
              <span className="min-w-0">
                <span className="flex items-center gap-2 font-semibold text-foreground">
                  {pl.title}
                  <span className="rounded-full border border-accent bg-accent/25 px-2 py-0.5 text-[10px] font-medium">{pl.status}</span>
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{pl.text}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming next */}
      <section className="py-8">
        <SectionHeading title="What is coming next" text="Planned and future directions. None of this is available yet." />
        <div className="grid gap-3 sm:grid-cols-2">
          {next.map((c) => (
            <Link key={c.title} href={c.href} className={`${card} flex items-start gap-4`}>
              <span className={`${tile} shrink-0`}>
                <c.icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 font-semibold text-foreground">
                  {c.title}
                  <span className="rounded-full border border-accent bg-accent/25 px-2 py-0.5 text-[10px] font-medium">{c.tag}</span>
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{c.text}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Guides + reference */}
      <section className="grid gap-10 py-8 lg:grid-cols-2">
        <div>
          <SectionHeading title="Popular guides" />
          <ul className="divide-y divide-border rounded-lg border border-border bg-white/40">
            {guides.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-accent/15">
                  {g.title}
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading title="Tools and reference" />
          <div className="grid gap-3 sm:grid-cols-2">
            {reference.map((r) => (
              <Link key={r.title} href={r.href} className={`${card} flex items-center gap-3 !p-3`}>
                <span className="flex size-8 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  <r.icon className="size-4" />
                </span>
                <span className="text-sm font-medium text-foreground">{r.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help */}
      <section className="py-8">
        <div className="rounded-lg border border-border bg-accent/25 p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Need a hand?</h2>
          <p className="mt-2 max-w-2xl text-foreground/80">
            Start with troubleshooting and the FAQ. Community and support channels will be listed here before launch.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/docs/reference/troubleshooting/cannot-connect" className="inline-flex h-10 items-center rounded-md bg-foreground px-5 text-sm font-medium text-background shadow-sm transition-opacity hover:opacity-90">
              Troubleshooting
            </Link>
            <Link href="/docs/reference/faq" className="inline-flex h-10 items-center rounded-md border border-foreground/30 px-5 text-sm font-medium transition-colors hover:bg-foreground/5">
              FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

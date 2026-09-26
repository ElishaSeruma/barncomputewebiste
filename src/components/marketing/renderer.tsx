import { DocBlocks } from "@/components/docs/blocks";
import { TerminalDemo } from "@/components/barn-terminal";
import { getAllPostSummaries } from "@/lib/site/blog";
import type { MarketingPage, Section } from "@/lib/site/types";
import { BlogList } from "./blog-list";
import { ContactForm } from "./contact-form";
import { CtaBand } from "./cta-band";
import { ExpandableCards } from "./expandable-cards";
import { FaqAccordion } from "./faq-accordion";
import { FeatureGrid } from "./feature-grid";
import { FeatureTabs } from "./feature-tabs";
import { ICONS } from "./icons";
import { shell, sectionPad } from "./layout";
import { Marquee } from "./marquee";
import { PageHero } from "./page-hero";
import { PressKit } from "./press-kit";
import { SectionHeader } from "./section-header";
import { StatTicker } from "./stat-ticker";
import { StepsTimeline } from "./steps-timeline";
import { IsIsNot, LinkCards, SplitBlock } from "./static-sections";
import { Timeline } from "./timeline";
import { PageShell } from "./page-shell";

function Block({ s }: { s: Section }) {
  switch (s.t) {
    case "features":
      return (
        <section className={sectionPad}>
          <div className={shell}>
            <SectionHeader eyebrow={s.eyebrow} title={s.title} text={s.text} />
            <FeatureGrid items={s.items} variant={s.variant} cols={s.cols} />
          </div>
        </section>
      );
    case "tabs":
      return (
        <section className={sectionPad}>
          <div className={shell}>
            <SectionHeader eyebrow={s.eyebrow} title={s.title} text={s.text} />
            <FeatureTabs tabs={s.tabs} />
          </div>
        </section>
      );
    case "steps":
      return (
        <section className={sectionPad}>
          <div className={shell}>
            <SectionHeader eyebrow={s.eyebrow} title={s.title} text={s.text} align="center" />
            <StepsTimeline steps={s.steps} />
          </div>
        </section>
      );
    case "stats":
      return (
        <section className="py-12 sm:py-16">
          <div className={shell}>
            {s.title && <SectionHeader eyebrow={s.eyebrow} title={s.title} className="mb-10" />}
            <StatTicker items={s.items} />
          </div>
        </section>
      );
    case "split":
      return (
        <section className={sectionPad}>
          <div className={shell}>
            <SplitBlock title={s.title} text={s.text} bullets={s.bullets} visual={s.visual} reverse={s.reverse} cta={s.cta} />
          </div>
        </section>
      );
    case "isnot":
      return (
        <section className={sectionPad}>
          <div className={shell}>
            <SectionHeader eyebrow={s.eyebrow} title={s.title} text={s.text} />
            <IsIsNot is={s.is} isnot={s.isnot} isTitle={s.isTitle} isNotTitle={s.isNotTitle} />
          </div>
        </section>
      );
    case "terminal":
      return (
        <section className={sectionPad}>
          <div className={`${shell} grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16`}>
            <div>
              {s.eyebrow && <p className="mb-3 text-sm font-medium text-muted-foreground">{s.eyebrow}</p>}
              <h2 className="text-3xl font-bold leading-[1.08] sm:text-4xl">{s.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-foreground/75">{s.text}</p>
              {s.bullets && (
                <ul className="mt-6 space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-foreground" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="rounded-xl border border-border bg-white/40 p-4 shadow-sm sm:p-6">
              <TerminalDemo tabs={s.tabs} />
            </div>
          </div>
        </section>
      );
    case "marquee":
      return (
        <section className="py-10 sm:py-14">
          <div className={shell}>
            <Marquee items={s.items} label={s.label} />
          </div>
        </section>
      );
    case "faq":
      return (
        <section className={sectionPad}>
          <div className={`${shell} grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16`}>
            <SectionHeader eyebrow={s.eyebrow ?? "FAQ"} title={s.title} text={s.text} />
            <FaqAccordion items={s.items} />
          </div>
        </section>
      );
    case "faqgroups":
      return (
        <section className="pb-20 sm:pb-28">
          <div className={`${shell} max-w-4xl space-y-12`}>
            {s.groups.map((g) => (
              <div key={g.title}>
                <h2 className="mb-5 text-2xl font-bold">{g.title}</h2>
                <FaqAccordion items={g.items} />
              </div>
            ))}
          </div>
        </section>
      );
    case "cards":
      return (
        <section className={sectionPad}>
          <div className={shell}>
            <SectionHeader eyebrow={s.eyebrow} title={s.title} text={s.text} />
            <LinkCards items={s.items} cols={s.cols} />
          </div>
        </section>
      );
    case "timeline":
      return (
        <section className={sectionPad}>
          <div className={shell}>
            <SectionHeader eyebrow={s.eyebrow} title={s.title} text={s.text} align="center" />
            <Timeline items={s.items} />
          </div>
        </section>
      );
    case "expandable":
      return (
        <section className={sectionPad}>
          <div className={shell}>
            <SectionHeader eyebrow={s.eyebrow} title={s.title} text={s.text} />
            <ExpandableCards items={s.items} />
          </div>
        </section>
      );
    case "cta":
      return (
        <section>
          <CtaBand title={s.title} subtitle={s.subtitle} text={s.text} primary={s.primary} secondary={s.secondary} badges={s.badges} />
        </section>
      );
    case "prose":
      return (
        <section className="pb-20 sm:pb-28">
          <div className={`${shell} max-w-3xl`}>
            <DocBlocks blocks={s.blocks} />
          </div>
        </section>
      );
    case "contact":
      return (
        <section className="pb-20 sm:pb-28">
          <div className={`${shell} grid gap-8 lg:grid-cols-[1.4fr_1fr]`}>
            <ContactForm />
            <div className="space-y-4">
              {[
                { icon: "message" as const, title: "General", text: "Questions about what Barn is and where it is going." },
                { icon: "rocket" as const, title: "Early access", text: "Tell us about your setup and what you would like to try." },
                { icon: "shield" as const, title: "Security", text: "A dedicated disclosure address will be published before launch." },
                { icon: "news" as const, title: "Press", text: "See the press kit for the logo, colours and a boilerplate." },
              ].map((c) => {
                const Icon = ICONS[c.icon];
                return (
                  <div key={c.title} className="flex gap-4 rounded-xl border border-border bg-white/50 p-5 shadow-sm">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-bold">{c.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/75">{c.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );
    case "press":
      return (
        <section className="pb-20 sm:pb-28">
          <div className={shell}>
            <PressKit />
          </div>
        </section>
      );
    case "blog":
      return (
        <section className="pb-20 sm:pb-28">
          <div className={shell}>
            <BlogList posts={getAllPostSummaries()} />
          </div>
        </section>
      );
  }
}

export function MarketingView({ page }: { page: MarketingPage }) {
  return (
    <PageShell>
      <PageHero hero={page.hero} />
      {page.sections.map((s, i) => (
        <Block key={i} s={s} />
      ))}
    </PageShell>
  );
}

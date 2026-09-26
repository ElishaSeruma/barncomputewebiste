import type { Block } from "@/lib/docs/types";
import { SITE_URL } from "@/lib/site-config";
import type { Hero, MarketingPage, Section } from "./types";

// Plain markdown renderers for the site's page data. Used by llms-full.txt.

const abs = (s: string) => s.replace(/\]\(\//g, `](${SITE_URL}/`);
const bullets = (items: string[]) => items.map((i) => `- ${i}`).join("\n");
const stripMarkers = (t: string) => t.replace(/[{}]/g, "");

export function blocksToMarkdown(blocks: Block[]): string {
  return blocks
    .map((b): string => {
      switch (b.t) {
        case "h2":
          return `## ${b.text}`;
        case "h3":
          return `### ${b.text}`;
        case "p":
          return b.text;
        case "ul":
          return bullets(b.items);
        case "ol":
          return b.items.map((i, n) => `${n + 1}. ${i}`).join("\n");
        case "code":
          return `\`\`\`${b.lang ?? ""}\n${b.code}\n\`\`\``;
        case "tabs":
          return b.tabs.map((t) => `${t.label}:\n\`\`\`${t.lang ?? ""}\n${t.code}\n\`\`\``).join("\n\n");
        case "callout":
          return `> **${b.title ?? b.kind}:** ${b.text}`;
        case "table":
          return [
            `| ${b.head.join(" | ")} |`,
            `| ${b.head.map(() => "---").join(" | ")} |`,
            ...b.rows.map((r) => `| ${r.join(" | ")} |`),
          ].join("\n");
        case "steps":
          return b.items
            .map((s, n) => `${n + 1}. **${s.title}**: ${s.body}${s.code ? `\n\n\`\`\`bash\n${s.code}\n\`\`\`` : ""}`)
            .join("\n\n");
        case "cards":
          return bullets(b.items.map((c) => `[${c.title}](${c.href}): ${c.text}`));
      }
    })
    .join("\n\n");
}

function heroToMarkdown(h: Hero): string {
  const parts = [`${stripMarkers(h.title)}`, h.description];
  if (h.code) {
    parts.push(`Example (${h.code.file}):\n\n\`\`\`bash\n${h.code.lines.join("\n")}\n\`\`\``);
    parts.push(bullets(h.code.steps.map((s) => `Line ${s.line}: ${s.text}`)));
  }
  return parts.join("\n\n");
}

function sectionToMarkdown(s: Section): string {
  const head = (title?: string, text?: string) => [title ? `## ${title}` : "", text ?? ""].filter(Boolean).join("\n\n");

  switch (s.t) {
    case "features":
    case "cards":
      return [head(s.title, s.text), bullets(s.items.map((i) => `**${i.title}**${i.tag ? ` (${i.tag})` : ""}: ${i.text}${"href" in i && i.href ? ` [${i.href}]` : ""}`))].join("\n\n");
    case "tabs":
      return [head(s.title, s.text), ...s.tabs.map((t) => `### ${t.title}\n\n${t.text}\n\n${bullets(t.bullets)}`)].join("\n\n");
    case "steps":
      return [head(s.title, s.text), s.steps.map((st, n) => `${n + 1}. **${st.title}**: ${st.text}${st.code ? `\n\n\`\`\`bash\n${st.code}\n\`\`\`` : ""}`).join("\n\n")].join("\n\n");
    case "stats":
      return [head(s.title), bullets(s.items.map((i) => `**${i.prefix ?? ""}${i.value}${i.suffix ?? ""}** ${i.label}${i.note ? `: ${i.note}` : ""}`))].filter(Boolean).join("\n\n");
    case "split":
      return [head(s.title, s.text), s.bullets ? bullets(s.bullets) : ""].filter(Boolean).join("\n\n");
    case "isnot":
      return [head(s.title, s.text), `### ${s.isTitle ?? "Barn is"}\n\n${bullets(s.is)}`, `### ${s.isNotTitle ?? "Barn is not"}\n\n${bullets(s.isnot)}`].join("\n\n");
    case "terminal":
      return [
        head(s.title, s.text),
        s.bullets ? bullets(s.bullets) : "",
        ...s.tabs.map((t) => `\`\`\`bash\n${t.command}\n\`\`\``),
      ].filter(Boolean).join("\n\n");
    case "marquee":
      return s.label ? `${s.label}: ${s.items.map((i) => i.label).join(", ")}.` : "";
    case "faq":
      return [head(s.title, s.text), s.items.map((i) => `**${i.q}**\n${i.a}`).join("\n\n")].join("\n\n");
    case "faqgroups":
      return s.groups.map((g) => `## ${g.title}\n\n${g.items.map((i) => `**${i.q}**\n${i.a}`).join("\n\n")}`).join("\n\n");
    case "timeline":
      return [head(s.title, s.text), s.items.map((i) => `### ${i.when}: ${i.title} (${i.status === "now" ? "in development" : i.status === "next" ? "planned" : "future"})\n\n${i.text}${i.bullets ? `\n\n${bullets(i.bullets)}` : ""}`).join("\n\n")].join("\n\n");
    case "expandable":
      return [head(s.title, s.text), s.items.map((i) => `### ${i.title}\n\n${i.summary}\n\n${bullets(i.details)}`).join("\n\n")].join("\n\n");
    case "cta":
      return `## ${s.title} ${s.subtitle}\n\n${s.text}`;
    case "prose":
      return blocksToMarkdown(s.blocks);
    case "contact":
      return "## Contact\n\nA contact form is available. It is a preview and does not send messages yet. Topics: general questions, early access, partnerships, press and security.";
    case "press":
      return "## Press kit\n\nA boilerplate description, the logo (SVG), the colour palette and key facts are available on the page.";
    case "blog":
      return "## Posts\n\nSee the blog index for all posts.";
  }
}

export function marketingToMarkdown(page: MarketingPage): string {
  const body = page.sections.map(sectionToMarkdown).filter(Boolean).join("\n\n");
  return abs(`# ${page.title}\n\nURL: ${SITE_URL}${page.path}\n\n> ${page.description}\n\n${heroToMarkdown(page.hero)}\n\n${body}`);
}

export function docToMarkdown(title: string, description: string, path: string, blocks: Block[]): string {
  return abs(`# ${title}\n\nURL: ${SITE_URL}${path}\n\n> ${description}\n\n${blocksToMarkdown(blocks)}`);
}

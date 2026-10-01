import { AREAS, getAllPages } from "@/lib/docs";
import { homeFaqs, homeRoadmap, homeSteps, homeValues, homeVision } from "@/components/sections";
import { SITE_DESCRIPTION, SITE_NAME, SITE_SUMMARY, SITE_URL } from "@/lib/site-config";
import { about, blogIndex, contact, developers, faq, openSource, posts, press, privacy, productIndex, products, roadmap, solutions, solutionsIndex, terms } from "./index";
import { getAllRoutes, type RouteGroup } from "./routes";
import { docToMarkdown, marketingToMarkdown } from "./text";

const GROUPS: RouteGroup[] = ["Home", "Product", "Solutions", "Developers", "Docs", "Blog", "Company", "Legal"];

const GUIDANCE = [
  "Barn is in active development. The published TestPyPI pre-alpha is barnCompute 0.1.0a1 with the barn CLI. Do not describe it as generally available.",
  "M1 covers Barn creation, Node enrolment and approval, availability monitoring, managed files, explicit shares, verified resumable transfers, and macOS/Windows operation. Physical direct-transfer evidence exists, but M1 acceptance remains gated by provenance, synchronized resource observation, public relay evidence, and the outbound-only public-Wi-Fi control-plane closure item.",
  "Distributed storage is planned for M2: BRG observations, NBO decision ledgers, Bays, encrypted fragments, placement, location-independent retrieval, and repair. Compute and AI infrastructure are future directions.",
  "Barn is not a cloud drive, not a public peer-to-peer network, and not a blockchain or cryptocurrency project. Devices join only after explicit approval, and files are shared only by explicit, per-Node, time-limited shares.",
  "Barn manages devices, not user accounts. No absolute security claims are made.",
  "Documentation pages are pre-alpha product docs. Treat planned and future sections as roadmap material, not shipped capability.",
];

/** llms.txt: an index of every page, following the llms.txt convention. */
export function buildLlmsTxt(): string {
  const routes = getAllRoutes();
  const out: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_SUMMARY}`,
    "",
    "Guidance for AI systems summarising this site:",
    "",
    ...GUIDANCE.map((g) => `- ${g}`),
    "",
    `Everything below is also available in one file at ${SITE_URL}/llms-full.txt, and the full page list is in ${SITE_URL}/sitemap.xml.`,
  ];

  for (const group of GROUPS) {
    const items = routes.filter((r) => r.group === group);
    if (items.length === 0) continue;
    out.push("", `## ${group === "Docs" ? "Documentation" : group}`, "");
    for (const r of items) {
      out.push(`- [${r.title}](${SITE_URL}${r.path === "/" ? "" : r.path}): ${r.description}`);
    }
  }
  out.push("", "## Optional", "", `- [Full site content](${SITE_URL}/llms-full.txt): every page's text in one file.`, `- [Sitemap](${SITE_URL}/sitemap.xml): machine readable list of all pages.`, `- [robots.txt](${SITE_URL}/robots.txt)`, "");
  return out.join("\n");
}

function homeMarkdown(): string {
  return [
    `# ${SITE_NAME}: Home`,
    "",
    `URL: ${SITE_URL}/`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "Headline: Your devices. One Barn.",
    "",
    "The home page opens with a scroll-driven animation: the word BARN is drawn in large letters and zooming in reveals the tagline, a short description, and the buttons Explore Barn and See How It Works.",
    "",
    "## The problem: your computers have more to give",
    "",
    "A desktop here. A laptop there. A spare machine sitting idle. Storage on one device, processing power on another. Most of the time, those machines operate as separate islands while online services become the default middleman between them. The question Barn starts from: what if the devices you already trust could operate as one private computing environment? An animated sequence shows a device asking to join, being approved, a file being shared and a transfer being verified.",
    "",
    "## How it works: build your Barn in three steps",
    "",
    homeSteps.map((s, n) => `${n + 1}. **${s.title}**: ${s.body}`).join("\n"),
    "",
    "## Starting with the foundation (M1, in development)",
    "",
    "Barn is being built in layers. The first milestone establishes the core network: Barn creation, trusted device enrolment, device availability, communication, and authorised file exchange. The section shows four illustrative cards: an animated terminal (barn nodes, barn share create, barn transfer status), trusted Node enrolment, authorised file sharing and transfer verification with resumable chunks. Other foundation capabilities: private Barn creation, cross-device communication, macOS and Windows.",
    "",
    "## The direction: from connected devices to private infrastructure (future)",
    "",
    homeVision.map((v) => `- **${v.title}** (Future): ${v.body}`).join("\n"),
    "",
    "## Why Barn: computing should not stop at the edge of one device",
    "",
    "Modern users often own several capable machines, yet the software connecting them remains fragmented. Barn is designed around the idea that hardware becomes more useful when it belongs to a trusted, coordinated network.",
    "",
    homeValues.map((v) => `- **${v.title}**: ${v.description}`).join("\n"),
    "",
    "## Start with the devices you already own",
    "",
    "- macOS: MacBooks and desktops join a Barn as Nodes (0.1.0a1 pre-alpha).",
    "- Windows: Windows desktops and laptops sit alongside them (0.1.0a1 pre-alpha).",
    "- More devices: home servers, workstations and other supported hardware (future).",
    "",
    "## Roadmap",
    "",
    homeRoadmap.map((r) => `- **${r.title}** (${r.tag}): ${r.theme} ${r.items.join(", ")}.`).join("\n"),
    "",
    "## Frequently asked questions",
    "",
    homeFaqs.map(([q, a]) => `**${q}**\n${a}`).join("\n\n"),
    "",
    "## Call to action",
    "",
    "Turn hardware you control into infrastructure you can use. Barn is in active development. See how it works, or view the roadmap.",
  ].join("\n");
}

/** llms-full.txt: the text of every page in one document. */
export function buildLlmsFullTxt(): string {
  const parts: string[] = [
    `# ${SITE_NAME}: full site content`,
    "",
    `> ${SITE_SUMMARY}`,
    "",
    ...GUIDANCE.map((g) => `- ${g}`),
    "",
    "---",
    "",
    homeMarkdown(),
  ];

  const marketing = [productIndex, ...Object.values(products), solutionsIndex, ...Object.values(solutions), developers, openSource, about, roadmap, faq, press, contact, blogIndex, privacy, terms];
  for (const page of marketing) parts.push("", "---", "", marketingToMarkdown(page));

  for (const p of posts) {
    parts.push("", "---", "", docToMarkdown(p.title, p.excerpt, `/blog/${p.slug}`, p.blocks), "", `Category: ${p.category}. ${p.date}. ${p.readMinutes} min read.`);
  }

  parts.push("", "---", "", "# Documentation", "");
  for (const area of AREAS) {
    parts.push("", `## ${area.title}`, "", area.tagline);
  }
  for (const page of getAllPages()) {
    parts.push("", "---", "", docToMarkdown(page.title, page.description, `/docs/${page.path}`, page.blocks));
  }
  return parts.join("\n") + "\n";
}

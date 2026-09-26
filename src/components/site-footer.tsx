import Link from "next/link";
import { RuixenGradientFooter } from "@/components/ui/ruixen-gradient-footer";

const columns: { title: string; links: [string, string][] }[] = [
  {
    title: "Product",
    links: [
      ["Overview", "/product"],
      ["Barns", "/product/barns"],
      ["Nodes", "/product/nodes"],
      ["Availability", "/product/availability"],
      ["Managed files", "/product/managed-files"],
      ["Sharing", "/product/sharing"],
      ["Transfers", "/product/transfers"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Home labs", "/solutions/home-labs"],
      ["Creative studios", "/solutions/creative-studios"],
      ["Small teams", "/solutions/small-teams"],
      ["Individuals", "/solutions/individuals"],
      ["Developers", "/solutions/developers"],
    ],
  },
  {
    title: "Developers",
    links: [
      ["Developer hub", "/developers"],
      ["Quickstart", "/docs/start/quickstart"],
      ["Installation", "/docs/start/install/requirements"],
      ["CLI reference", "/docs/cli/overview"],
      ["Changelog", "/docs/reference/changelog"],
      ["Open source", "/developers/open-source"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Docs", "/docs"],
      ["Blog", "/blog"],
      ["Roadmap", "/roadmap"],
      ["FAQ", "/faq"],
      ["Distributed storage", "/product/distributed-storage"],
      ["Compute", "/product/compute"],
      ["AI infrastructure", "/product/ai"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Press", "/press"],
      ["Contact", "/contact"],
      ["Privacy", "/legal/privacy"],
      ["Terms", "/legal/terms"],
    ],
  },
];

export default function SiteFooter() {
  return (
    <RuixenGradientFooter gradientHeight="45vh" minReveal={0}>
      <div id="about" className="mx-auto w-full max-w-6xl px-5 pt-16 sm:px-8">
        <div className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-foreground">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/barnLogo.svg" alt="" width={24} height={24} className="size-6 rounded" />
              <span className="text-base font-bold">Barn Computing</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Build a private computing network from the devices you already own and trust.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-10 text-sm sm:col-span-2 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-5">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-medium text-foreground">{col.title}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pb-2 pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© 2026 Barn Computing</span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent" />
            M1 foundation in development
          </span>
          <span className="flex items-center gap-4"><Link href="/legal/privacy" className="hover:text-foreground">Privacy</Link><Link href="/legal/terms" className="hover:text-foreground">Terms</Link></span>
        </div>
      </div>
    </RuixenGradientFooter>
  );
}

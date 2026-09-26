import Link from "next/link";

const COLUMNS = [
  {
    title: "Start",
    links: [
      ["Introduction", "/docs/start/introduction"],
      ["Quickstart", "/docs/start/quickstart"],
      ["Installation", "/docs/start/install/requirements"],
    ],
  },
  {
    title: "Build",
    links: [
      ["Barns", "/docs/build/barns/overview"],
      ["Nodes", "/docs/build/nodes/overview"],
      ["Files and sharing", "/docs/build/files/overview"],
    ],
  },
  {
    title: "Reference",
    links: [
      ["CLI reference", "/docs/cli/overview"],
      ["Error codes", "/docs/reference/errors"],
      ["Changelog", "/docs/reference/changelog"],
    ],
  },
  {
    title: "Barn Computing",
    links: [
      ["Back to site", "/"],
      ["Product", "/product"],
      ["Solutions", "/solutions"],
      ["Roadmap", "/roadmap"],
      ["Blog", "/blog"],
      ["FAQ", "/faq"],
    ],
  },
];

export function DocsFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {COLUMNS.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-medium text-foreground">{c.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {c.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-foreground">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mx-auto max-w-5xl px-5 pb-8 text-xs text-muted-foreground sm:px-8">
        © 2026 Barn Computing. Documentation is a draft. Features marked Planned or Future are not available yet.
      </p>
    </footer>
  );
}

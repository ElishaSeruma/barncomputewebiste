import Link from "next/link";

// Minimal inline markup for doc text: `code`, **bold** and [label](href).
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (part.startsWith("`")) {
          return (
            <code key={i} className="rounded bg-foreground/[0.07] px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          const cls = "font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:bg-accent/30";
          return href.startsWith("/") ? (
            <Link key={i} href={href} className={cls}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} className={cls} target="_blank" rel="noreferrer">
              {label}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

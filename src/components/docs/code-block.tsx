import { CopyButton } from "./copy-button";
import { HighlightedCode } from "./highlight";

export function CodeBlock({ code, lang = "bash", title }: { code: string; lang?: string; title?: string }) {
  return (
    <div className="group relative my-5 overflow-hidden rounded-lg border border-foreground/20 bg-foreground text-background shadow-sm">
      {title && (
        <div className="flex items-center gap-2 border-b border-background/10 px-4 py-2 text-xs text-background/60">
          <span className="size-2 rounded-full bg-background/20" />
          {title}
        </div>
      )}
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6">
        <code>
          <HighlightedCode code={code} lang={lang} />
        </code>
      </pre>
      <CopyButton text={code} className={`absolute right-2 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 ${title ? "top-11" : "top-2"}`} />
    </div>
  );
}

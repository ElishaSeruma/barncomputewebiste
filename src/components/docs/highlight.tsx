// Tiny syntax colouring for shell style snippets. Other languages render plain.
const SHELL = new Set(["bash", "sh", "shell", "zsh", "powershell", "ps1"]);
const TOKEN = /("[^"]*"|'[^']*'|<[A-Z0-9_]+>|(?<![\w-])--?[A-Za-z][\w-]*|\$[A-Za-z_]\w*)/g;

export function HighlightedLine({ line, lang = "bash" }: { line: string; lang?: string }) {
  if (!SHELL.has(lang)) return <>{line || " "}</>;
  if (line.trim().startsWith("#")) return <span className="italic text-background/45">{line}</span>;

  const parts = line.split(TOKEN);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (part.startsWith('"') || part.startsWith("'") || part.startsWith("$")) {
          return (
            <span key={i} className="text-[#8FD3A9]">
              {part}
            </span>
          );
        }
        if (part.startsWith("<")) {
          return (
            <span key={i} className="text-[#F2B8B5]">
              {part}
            </span>
          );
        }
        if (part.startsWith("-")) {
          return (
            <span key={i} className="text-accent">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function HighlightedCode({ code, lang = "bash" }: { code: string; lang?: string }) {
  return (
    <>
      {code.split("\n").map((line, i) => (
        <div key={i} className="min-h-6">
          <HighlightedLine line={line} lang={lang} />
        </div>
      ))}
    </>
  );
}

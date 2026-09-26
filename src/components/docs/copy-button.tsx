"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be unavailable (insecure context); fail quietly.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy code"}
      className={`inline-flex size-7 items-center justify-center rounded-md border border-background/15 bg-background/10 text-background/70 transition-colors hover:bg-background/20 hover:text-background ${className}`}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </button>
  );
}

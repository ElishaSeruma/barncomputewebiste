"use client";

import { useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export function Feedback() {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <span className="font-medium text-foreground">Was this page helpful?</span>
      {answer ? (
        <span className="text-muted-foreground">Thanks. Feedback is not stored in this preview.</span>
      ) : (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setAnswer("yes")}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white/50 px-3 py-1.5 transition-colors hover:border-foreground/30"
          >
            <ThumbsUp className="size-3.5" /> Yes
          </button>
          <button
            type="button"
            onClick={() => setAnswer("no")}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white/50 px-3 py-1.5 transition-colors hover:border-foreground/30"
          >
            <ThumbsDown className="size-3.5" /> No
          </button>
        </div>
      )}
    </div>
  );
}

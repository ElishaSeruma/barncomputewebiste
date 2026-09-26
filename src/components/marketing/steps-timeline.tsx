"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { CodeBlock } from "@/components/docs/code-block";

// Numbered steps joined by a line that fills in as you scroll.
export function StepsTimeline({ steps }: { steps: { title: string; text: string; code?: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <ol ref={ref} className="relative mx-auto mt-12 max-w-3xl space-y-10">
      <span aria-hidden className="absolute bottom-3 left-[19px] top-3 w-px bg-border" />
      <motion.span aria-hidden className="absolute left-[18px] top-3 w-[3px] origin-top rounded-full bg-accent" style={{ scaleY: fill, bottom: "0.75rem" }} />
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          className="relative pl-16"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full border border-border bg-accent text-base font-bold text-accent-foreground shadow-sm">
            {i + 1}
          </span>
          <h3 className="text-xl font-bold">{s.title}</h3>
          <p className="mt-1.5 leading-relaxed text-foreground/75">{s.text}</p>
          {s.code && <CodeBlock code={s.code} />}
        </motion.li>
      ))}
    </ol>
  );
}

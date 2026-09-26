import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="mb-3 text-sm font-medium text-muted-foreground">{eyebrow}</p>}
      <h2 className="text-4xl font-bold leading-[1.05] sm:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-lg leading-relaxed text-foreground/75">{text}</p>}
    </div>
  );
}

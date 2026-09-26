// Soft drifting colour blobs over a faded dot grid. Decorative only.
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(rgb(33 33 33 / 0.16) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)",
        }}
      />
      <div className="animate-blob absolute -left-24 top-[-6rem] size-[26rem] rounded-full bg-accent/50 blur-3xl" />
      <div className="animate-blob absolute right-[-6rem] top-24 size-[22rem] rounded-full blur-3xl [animation-delay:-6s]" style={{ background: "color-mix(in srgb, var(--status-green) 28%, transparent)" }} />
      <div className="animate-blob absolute bottom-[-8rem] left-1/3 size-[20rem] rounded-full blur-3xl [animation-delay:-11s]" style={{ background: "color-mix(in srgb, var(--status-red) 16%, transparent)" }} />
    </div>
  );
}

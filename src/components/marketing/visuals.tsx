"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, Laptop, Lock, Monitor, Server, X } from "lucide-react";

import { cn } from "@/lib/utils";
import BarnTerminal from "@/components/barn-terminal";

/**
 * Small animated scenes, one per product idea. All content is illustrative.
 * They use the site palette: charcoal, cream, accent yellow and the green / yellow / red status colours.
 */

const GREEN = "var(--status-green)";
const YELLOW = "var(--status-yellow)";
const RED = "var(--status-red)";
const INK = "#212121";

function Frame({ children, caption = "Illustrative", className }: { children: ReactNode; caption?: string | null; className?: string }) {
  return (
    <div className={cn("relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-white/40 shadow-sm", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 0%, rgb(253 188 48 / 0.22), transparent 62%)" }}
      />
      <div className="absolute inset-0">{children}</div>
      {caption && <span className="absolute bottom-2.5 left-3 text-[11px] text-muted-foreground">{caption}</span>}
    </div>
  );
}

function useTick(ms: number, modulo: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % modulo), ms);
    return () => window.clearInterval(id);
  }, [ms, modulo]);
  return i;
}

// ---------------------------------------------------------------------------------------------
// Network: a Barn hub with devices joining and packets moving. Reused for several pages.
// ---------------------------------------------------------------------------------------------
export function NetworkVisual({
  labels = ["MacBook", "Desktop", "Home server", "Laptop", "Spare PC", "Workstation"],
  center = "Barn",
  caption = "Illustrative",
}: {
  labels?: string[];
  center?: string;
  caption?: string | null;
}) {
  const cx = 200;
  const cy = 145;
  const nodes = labels.map((label, i) => {
    const a = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
    return { label, x: cx + Math.cos(a) * 138, y: cy + Math.sin(a) * 88 };
  });

  return (
    <Frame caption={caption}>
      <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Devices connected into one Barn">
        {nodes.map((n, i) => (
          <motion.line
            key={`l${i}`}
            x1={n.x}
            y1={n.y}
            x2={cx}
            y2={cy}
            stroke={INK}
            strokeOpacity={0.3}
            strokeWidth={1.5}
            strokeDasharray="4 5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.12 }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={`p${i}`}
            cx={0}
            cy={0}
            r={3.5}
            fill={YELLOW}
            initial={{ x: n.x, y: n.y, opacity: 0 }}
            animate={{ x: [n.x, cx], y: [n.y, cy], opacity: [0, 1, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: 1 + i * 0.45, ease: "easeInOut" }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.g
            key={n.label}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 + i * 0.12 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <rect x={n.x - 25} y={n.y - 16} width={50} height={32} rx={7} fill="#F9F1E0" stroke={INK} strokeWidth={1.5} />
            <rect x={n.x - 12} y={n.y + 8} width={24} height={2.5} rx={1.2} fill={INK} opacity={0.6} />
            <circle cx={n.x + 17} cy={n.y - 9} r={3} fill={GREEN} />
            <text x={n.x} y={n.y + 30} textAnchor="middle" fontSize={9.5} fill={INK} opacity={0.75}>
              {n.label}
            </text>
          </motion.g>
        ))}
        <motion.circle cx={cx} cy={cy} r={34} fill={YELLOW} stroke={INK} strokeWidth={1.5} animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} style={{ transformOrigin: `${cx}px ${cy}px` }} />
        <text x={cx} y={cy + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>
          {center}
        </text>
      </svg>
    </Frame>
  );
}

// ---------------------------------------------------------------------------------------------
// Nodes: a stack of identity cards, the front one moving through its states.
// ---------------------------------------------------------------------------------------------
const NODE_STATES = [
  { label: "PENDING", color: YELLOW, note: "Waiting for approval" },
  { label: "ONLINE", color: GREEN, note: "Heartbeat 3s ago" },
  { label: "SUSPECT", color: YELLOW, note: "Heartbeat 18s ago" },
  { label: "ONLINE", color: GREEN, note: "Heartbeat 2s ago" },
];

type NodeStateInfo = { label: string; color: string; note: string };

function NodeCard({
  name,
  rotate,
  x,
  y,
  z,
  dim,
  state,
}: {
  name: string;
  rotate: number;
  x: number;
  y: number;
  z: number;
  dim?: boolean;
  state: NodeStateInfo;
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[68%] rounded-xl border border-border bg-white p-4 shadow-[0_10px_24px_rgba(33,33,33,0.12)]"
      style={{ zIndex: z, translateX: "-50%", translateY: "-50%" }}
      animate={{ rotate, x, y }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
    >
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
          <Laptop className="size-[18px]" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{name}</p>
          <p className="text-[11px] text-muted-foreground">{dim ? "Approved" : state.note}</p>
        </div>
        <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: dim ? GREEN : state.color === YELLOW ? "#B57F00" : state.color }}>
          {dim ? "ONLINE" : state.label}
        </span>
      </div>
      {!dim && (
        <dl className="mt-3 space-y-1.5 text-[11px]">
          <div className="flex justify-between"><dt className="text-muted-foreground">Node ID</dt><dd className="font-mono">n_7a3d91c4</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Endpoint</dt><dd className="font-mono">192.168.1.20:8445</dd></div>
          <div className="flex items-center justify-between"><dt className="text-muted-foreground">Fingerprint</dt>
            <dd className="flex gap-0.5">{["#212121", "#FDBC30", "#3F8F5F", "#212121", "#D64545", "#FDBC30"].map((c, k) => <span key={k} className="size-2.5 rounded-[2px]" style={{ background: c }} />)}</dd>
          </div>
        </dl>
      )}
    </motion.div>
  );
}

export function NodeVisual() {
  const i = useTick(2600, NODE_STATES.length);
  const s = NODE_STATES[i];

  return (
    <Frame>
      <NodeCard name="MacNode" rotate={-8} x={-46} y={-18} z={1} dim state={s} />
      <NodeCard name="WindowsNode" rotate={7} x={44} y={14} z={2} dim state={s} />
      <NodeCard name="StudyPC" rotate={0} x={0} y={4} z={3} state={s} />
    </Frame>
  );
}

// ---------------------------------------------------------------------------------------------
// Availability: a heartbeat line that goes healthy, uneven, then flat.
// ---------------------------------------------------------------------------------------------
const AVAIL = [
  { label: "ONLINE", sub: "Heartbeat every 5s", color: GREEN },
  { label: "SUSPECT", sub: "No heartbeat for 15s", color: YELLOW },
  { label: "OFFLINE", sub: "No heartbeat for 30s", color: RED },
];
const ECG = "M0 70 H60 L70 70 L78 30 L88 110 L98 50 L104 70 H170 L180 70 L188 30 L198 110 L208 50 L214 70 H280 L290 70 L298 30 L308 110 L318 50 L324 70 H400";
const ECG_SLOW = "M0 70 H90 L100 70 L108 46 L118 92 L128 60 L134 70 H260 L270 70 L278 50 L288 88 L298 62 L304 70 H400";
const FLAT = "M0 70 H400";

export function AvailabilityVisual() {
  const i = useTick(3600, 3);
  const s = AVAIL[i];
  const path = i === 0 ? ECG : i === 1 ? ECG_SLOW : FLAT;

  return (
    <Frame>
      <div className="flex h-full flex-col justify-center gap-5 px-6">
        <div className="grid grid-cols-3 gap-2">
          {AVAIL.map((a, k) => (
            <div
              key={a.label}
              className="rounded-lg border p-2.5 transition-all duration-500"
              style={{ borderColor: k === i ? a.color : "var(--border)", background: k === i ? `color-mix(in srgb, ${a.color} 14%, white)` : "rgb(255 255 255 / 0.5)" }}
            >
              <span className="flex items-center gap-1.5 text-[11px] font-bold">
                <span className="size-2 rounded-full" style={{ background: a.color }} />
                {a.label}
              </span>
              <span className="mt-1 block text-[10px] leading-tight text-muted-foreground">{a.sub}</span>
            </div>
          ))}
        </div>

        <div className="relative rounded-lg border border-border bg-white/70 p-3">
          <svg viewBox="0 0 400 140" className="h-24 w-full" preserveAspectRatio="none" aria-hidden>
            <line x1="0" y1="70" x2="400" y2="70" stroke={INK} strokeOpacity={0.1} strokeDasharray="3 5" />
            <motion.path
              key={i}
              d={path}
              fill="none"
              stroke={s.color}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, ease: "linear" }}
            />
          </svg>
          <p className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>StudyPC</span>
            <span className="font-bold" style={{ color: s.color === YELLOW ? "#B57F00" : s.color }}>{s.label}</span>
          </p>
        </div>
      </div>
    </Frame>
  );
}

// ---------------------------------------------------------------------------------------------
// Managed files: a file becomes verified one-megabyte chunks.
// ---------------------------------------------------------------------------------------------
export function FilesVisual() {
  const step = useTick(230, 34);
  const filled = Math.min(step, 24);
  const done = step >= 26;

  return (
    <Frame>
      <div className="flex h-full items-center gap-5 px-6">
        <div className="w-[38%] shrink-0 rounded-lg border border-border bg-white p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-accent text-[10px] font-bold text-accent-foreground">BIN</span>
            <div>
              <p className="text-xs font-bold">sample.bin</p>
              <p className="text-[10px] text-muted-foreground">24 MiB</p>
            </div>
          </div>
          <p className="mt-3 text-[10px] text-muted-foreground">SHA-256</p>
          <p className="font-mono text-[10px]">{done ? "9f2c…b71e" : "computing…"}</p>
        </div>

        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-8 gap-1">
            {Array.from({ length: 24 }, (_, k) => (
              <motion.div
                key={k}
                className="aspect-square rounded-[3px] border"
                animate={{ background: k < filled ? (done ? GREEN : YELLOW) : "rgba(255,255,255,0.5)", borderColor: k < filled ? "rgba(0,0,0,0)" : "rgba(33,33,33,0.14)" }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
          <p className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>24 chunks of 1 MiB</span>
            <span className="font-medium" style={{ color: done ? GREEN : "#B57F00" }}>{done ? "All verified" : `${filled} hashed`}</span>
          </p>
        </div>
      </div>
    </Frame>
  );
}

// ---------------------------------------------------------------------------------------------
// Sharing: one file, one recipient, a countdown.
// ---------------------------------------------------------------------------------------------
export function ShareVisual() {
  const t = useTick(1000, 1800); // seconds elapsed in a 30 minute window
  const remaining = 1800 - t;
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <Frame>
      <div className="flex h-full items-center justify-between gap-2 px-5">
        <div className="w-[27%] rounded-lg border border-border bg-white p-2.5 shadow-sm">
          <span className="flex size-7 items-center justify-center rounded-md bg-accent text-[9px] font-bold text-accent-foreground">PDF</span>
          <p className="mt-2 truncate text-[11px] font-bold">report.pdf</p>
          <p className="text-[10px] text-muted-foreground">Managed file</p>
        </div>

        <div className="relative flex flex-1 flex-col items-center">
          <div className="h-px w-full border-t border-dashed border-foreground/30" />
          <motion.span
            className="absolute -top-[5px] size-2.5 rounded-full"
            style={{ background: YELLOW }}
            animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="mt-2 flex size-8 items-center justify-center rounded-full border border-border bg-white shadow-sm"><Lock className="size-4" /></span>
          <span className="mt-1.5 rounded-full bg-foreground px-2 py-0.5 font-mono text-[10px] text-background">{mm}:{ss}</span>
          <span className="mt-1 text-[10px] text-muted-foreground">Read only</span>
        </div>

        <div className="flex w-[30%] flex-col gap-1.5">
          <div className="rounded-lg border-2 bg-white p-2 shadow-sm" style={{ borderColor: GREEN }}>
            <p className="flex items-center gap-1 text-[11px] font-bold"><Check className="size-3" style={{ color: GREEN }} /> WindowsNode</p>
            <p className="text-[10px] text-muted-foreground">Can fetch</p>
          </div>
          {["MacNode", "StudyPC"].map((n) => (
            <div key={n} className="rounded-lg border border-border bg-white/50 p-2 opacity-70">
              <p className="flex items-center gap-1 text-[11px] font-medium"><X className="size-3" style={{ color: RED }} /> {n}</p>
              <p className="text-[10px] text-muted-foreground">No access</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// ---------------------------------------------------------------------------------------------
// Transfers: chunks flow, get interrupted, resume and verify.
// ---------------------------------------------------------------------------------------------
const TRANSFER_PHASES = [
  { label: "Transferring", color: YELLOW, progress: 46 },
  { label: "Interrupted", color: RED, progress: 46 },
  { label: "Resuming from verified chunks", color: YELLOW, progress: 78 },
  { label: "Checksum verified", color: GREEN, progress: 100 },
];

export function TransferVisual() {
  const phase = useTick(2400, TRANSFER_PHASES.length);
  const p = TRANSFER_PHASES[phase];
  const flowing = phase !== 1 && phase !== 3;

  return (
    <Frame>
      <div className="flex h-full flex-col justify-center gap-5 px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex w-20 flex-col items-center gap-1.5 rounded-lg border border-border bg-white p-2 shadow-sm">
            <Monitor className="size-6" />
            <span className="text-[10px] font-bold">MacNode</span>
          </div>
          <div className="relative h-8 flex-1 overflow-hidden">
            <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-foreground/30" />
            {flowing &&
              [0, 1, 2, 3].map((k) => (
                <motion.span
                  key={`${phase}-${k}`}
                  className="absolute top-1/2 size-3 -translate-y-1/2 rounded-[3px]"
                  style={{ background: YELLOW }}
                  initial={{ left: "-6%", opacity: 0 }}
                  animate={{ left: "104%", opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: k * 0.45, ease: "linear" }}
                />
              ))}
          </div>
          <div className="flex w-20 flex-col items-center gap-1.5 rounded-lg border border-border bg-white p-2 shadow-sm">
            <Laptop className="size-6" />
            <span className="text-[10px] font-bold">WindowsNode</span>
          </div>
        </div>

        <div>
          <div className="h-2.5 overflow-hidden rounded-full bg-foreground/10">
            <motion.div className="h-full rounded-full" style={{ background: p.color }} animate={{ width: `${p.progress}%` }} transition={{ duration: 0.9, ease: "easeOut" }} />
          </div>
          <p className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">sample.bin</span>
            <span className="font-bold" style={{ color: p.color === YELLOW ? "#B57F00" : p.color }}>{p.label}</span>
          </p>
        </div>
      </div>
    </Frame>
  );
}

// ---------------------------------------------------------------------------------------------
// Storage (future): data placed on more than one Node. Drawn dashed because it is planned.
// ---------------------------------------------------------------------------------------------
export function StorageVisual() {
  const step = useTick(1500, 4);
  const spots = [
    { x: 70, y: 70 },
    { x: 330, y: 70 },
    { x: 70, y: 210 },
    { x: 330, y: 210 },
  ];
  const holders = step === 0 ? [0] : step === 1 ? [0, 1] : step === 2 ? [0, 1, 3] : [1, 3];

  return (
    <Frame caption="Planned, not available yet">
      <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
        {spots.map((s, i) => (
          <line key={i} x1={s.x} y1={s.y} x2={200} y2={140} stroke={INK} strokeOpacity={0.18} strokeDasharray="4 5" />
        ))}
        <circle cx={200} cy={140} r={26} fill={YELLOW} stroke={INK} strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={200} y={144} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK}>Barn</text>
        {spots.map((s, i) => {
          const has = holders.includes(i);
          return (
            <g key={i}>
              <rect x={s.x - 38} y={s.y - 26} width={76} height={52} rx={10} fill="#F9F1E0" stroke={INK} strokeWidth={1.5} strokeDasharray="5 4" />
              <text x={s.x} y={s.y - 8} textAnchor="middle" fontSize={9.5} fill={INK} opacity={0.7}>Node {i + 1}</text>
              <motion.rect
                x={s.x - 11}
                y={s.y - 1}
                width={22}
                height={16}
                rx={3}
                initial={false}
                animate={{ opacity: has ? 1 : 0, scale: has ? 1 : 0.4 }}
                fill={YELLOW}
                stroke={INK}
                strokeWidth={1}
                style={{ transformOrigin: `${s.x}px ${s.y + 7}px` }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

// ---------------------------------------------------------------------------------------------
// Compute (future): a workload split into tasks across Nodes.
// ---------------------------------------------------------------------------------------------
export function ComputeVisual() {
  const step = useTick(900, 7);
  const tasks = [
    { x: 60, y: 150 },
    { x: 150, y: 75 },
    { x: 150, y: 225 },
    { x: 250, y: 75 },
    { x: 250, y: 225 },
    { x: 340, y: 150 },
  ];
  const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5]];
  const order = [0, 1, 2, 3, 4, 5];

  return (
    <Frame caption="Future direction">
      <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
        {edges.map(([a, b], i) => {
          const lit = step > b;
          return <line key={i} x1={tasks[a].x} y1={tasks[a].y} x2={tasks[b].x} y2={tasks[b].y} stroke={lit ? YELLOW : INK} strokeOpacity={lit ? 1 : 0.2} strokeWidth={lit ? 2.5 : 1.5} strokeDasharray={lit ? undefined : "4 5"} />;
        })}
        {order.map((k) => {
          const on = step > k;
          return (
            <g key={k}>
              <motion.circle cx={tasks[k].x} cy={tasks[k].y} r={20} fill={on ? YELLOW : "#F9F1E0"} stroke={INK} strokeWidth={1.5} animate={{ scale: step === k + 1 ? 1.15 : 1 }} style={{ transformOrigin: `${tasks[k].x}px ${tasks[k].y}px` }} />
              <text x={tasks[k].x} y={tasks[k].y + 4} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>{k === 0 ? "in" : k === 5 ? "out" : `t${k}`}</text>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

// ---------------------------------------------------------------------------------------------
// AI (future): activations moving through a layered network.
// ---------------------------------------------------------------------------------------------
export function AiVisual() {
  const layer = useTick(700, 5);
  const layers = [3, 4, 4, 2];
  const xs = [70, 155, 245, 330];
  const pos = layers.map((n, li) => Array.from({ length: n }, (_, k) => ({ x: xs[li], y: 150 + (k - (n - 1) / 2) * 52 })));

  return (
    <Frame caption="Future direction">
      <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
        {pos.slice(0, -1).flatMap((from, li) =>
          from.flatMap((a, ai) =>
            pos[li + 1].map((b, bi) => (
              <line key={`${li}-${ai}-${bi}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={layer > li ? YELLOW : INK} strokeOpacity={layer > li ? 0.7 : 0.12} strokeWidth={1.2} />
            ))
          )
        )}
        {pos.map((col, li) =>
          col.map((n, ni) => (
            <motion.circle key={`${li}-${ni}`} cx={n.x} cy={n.y} r={11} fill={layer === li ? YELLOW : "#F9F1E0"} stroke={INK} strokeWidth={1.5} animate={{ scale: layer === li ? 1.2 : 1 }} style={{ transformOrigin: `${n.x}px ${n.y}px` }} />
          ))
        )}
      </svg>
    </Frame>
  );
}

// ---------------------------------------------------------------------------------------------
// Rack: a home lab of devices with tri-colour status lights.
// ---------------------------------------------------------------------------------------------
export function RackVisual() {
  const t = useTick(2200, 6);
  const devices = [
    { name: "Mini PC", role: "Coordinator" },
    { name: "Desktop", role: "Node" },
    { name: "Laptop", role: "Node" },
    { name: "Home server", role: "Node" },
  ];
  const colors = [GREEN, GREEN, YELLOW, GREEN, RED, GREEN];

  return (
    <Frame>
      <div className="flex h-full flex-col justify-center gap-2.5 px-7">
        {devices.map((d, i) => (
          <div key={d.name} className="flex items-center gap-3 rounded-lg border border-border bg-white px-3 py-2.5 shadow-sm">
            {d.name === "Home server" ? <Server className="size-5" /> : d.name === "Desktop" ? <Monitor className="size-5" /> : <Laptop className="size-5" />}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold">{d.name}</p>
              <p className="text-[10px] text-muted-foreground">{d.role}</p>
            </div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((l) => (
                <motion.span
                  key={l}
                  className="size-2 rounded-full"
                  animate={{ background: l === 0 ? colors[(t + i) % 6] : GREEN, opacity: l === 2 ? [0.3, 1, 0.3] : 1 }}
                  transition={{ duration: l === 2 ? 1.6 : 0.6, repeat: l === 2 ? Infinity : 0, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ---------------------------------------------------------------------------------------------
// Studio: big files between two workstations.
// ---------------------------------------------------------------------------------------------
export function StudioVisual() {
  const t = useTick(140, 60);
  const files = [
    { name: "footage_day1.mov", size: "480 MiB", speed: 1 },
    { name: "project_assets.zip", size: "212 MiB", speed: 1.6 },
    { name: "mix_final.wav", size: "96 MiB", speed: 2.4 },
  ];

  return (
    <Frame>
      <div className="flex h-full flex-col justify-center gap-3 px-6">
        <div className="flex items-center justify-between text-[10px] font-medium text-muted-foreground">
          <span className="flex items-center gap-1.5"><Monitor className="size-4 text-foreground" /> Edit bay</span>
          <span className="flex items-center gap-1.5">Render box <Server className="size-4 text-foreground" /></span>
        </div>
        {files.map((f) => {
          const pct = Math.min(100, Math.round(((t * f.speed) / 60) * 100));
          const done = pct >= 100;
          return (
            <div key={f.name} className="rounded-lg border border-border bg-white p-2.5 shadow-sm">
              <p className="flex items-center justify-between text-[11px]">
                <span className="font-bold">{f.name}</span>
                <span className="text-muted-foreground">{f.size}</span>
              </p>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-foreground/10">
                <div className="h-full rounded-full transition-[width] duration-150" style={{ width: `${pct}%`, background: done ? GREEN : YELLOW }} />
              </div>
              <p className="mt-1 text-right text-[10px]" style={{ color: done ? GREEN : "#B57F00" }}>{done ? "Verified" : `${pct}%`}</p>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

// ---------------------------------------------------------------------------------------------
// Registry used by the page renderer.
// ---------------------------------------------------------------------------------------------
export type VisualKey =
  | "network"
  | "homelab"
  | "team"
  | "individual"
  | "nodes"
  | "availability"
  | "files"
  | "share"
  | "transfer"
  | "storage"
  | "compute"
  | "ai"
  | "rack"
  | "studio"
  | "terminal";

export function Visual({ name }: { name: VisualKey }) {
  switch (name) {
    case "network":
      return <NetworkVisual />;
    case "homelab":
      return <NetworkVisual labels={["Mini PC", "Desktop", "Laptop", "Home server"]} />;
    case "team":
      return <NetworkVisual labels={["Design Mac", "Dev laptop", "Render box", "Office PC", "Ops laptop"]} />;
    case "individual":
      return <NetworkVisual labels={["Laptop", "Desktop", "Spare PC"]} />;
    case "nodes":
      return <NodeVisual />;
    case "availability":
      return <AvailabilityVisual />;
    case "files":
      return <FilesVisual />;
    case "share":
      return <ShareVisual />;
    case "transfer":
      return <TransferVisual />;
    case "storage":
      return <StorageVisual />;
    case "compute":
      return <ComputeVisual />;
    case "ai":
      return <AiVisual />;
    case "rack":
      return <RackVisual />;
    case "studio":
      return <StudioVisual />;
    case "terminal":
      return (
        <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg border border-border bg-white/40 p-4 shadow-sm">
          <BarnTerminal />
        </div>
      );
  }
}

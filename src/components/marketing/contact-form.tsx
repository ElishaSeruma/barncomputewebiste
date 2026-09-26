"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

const TOPICS = ["General question", "Early access", "Partnership", "Press", "Security"];
const field =
  "w-full rounded-md border border-border bg-white/70 px-3.5 py-2.5 text-[15px] outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/50";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email") ?? ""))) next.email = "Enter a valid email address.";
    if (String(data.get("message") ?? "").trim().length < 10) next.message = "A few more words would help.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-xl border border-border bg-white/60 p-8 text-center shadow-sm" role="status">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full" style={{ background: "var(--status-green)" }}>
          <Check className="size-6 text-background" />
        </span>
        <h3 className="mt-5 text-2xl font-bold">Thanks, we have your note.</h3>
        <p className="mt-2 text-foreground/75">This preview form does not send messages yet. Real contact details will be added before launch.</p>
        <button type="button" onClick={() => setSent(false)} className="mt-6 text-sm font-medium underline decoration-accent decoration-2 underline-offset-4">
          Write another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5 rounded-xl border border-border bg-white/50 p-6 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Name
          <input name="name" className={`${field} mt-1.5`} placeholder="Ada Lovelace" aria-invalid={!!errors.name} />
          {errors.name && <span className="mt-1 block text-xs" style={{ color: "var(--status-red)" }}>{errors.name}</span>}
        </label>
        <label className="block text-sm font-medium">
          Email
          <input name="email" type="email" className={`${field} mt-1.5`} placeholder="you@example.com" aria-invalid={!!errors.email} />
          {errors.email && <span className="mt-1 block text-xs" style={{ color: "var(--status-red)" }}>{errors.email}</span>}
        </label>
      </div>
      <label className="block text-sm font-medium">
        Topic
        <select name="topic" className={`${field} mt-1.5`} defaultValue={TOPICS[0]}>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-medium">
        Message
        <textarea name="message" rows={5} className={`${field} mt-1.5 resize-y`} placeholder="What are you hoping to do with Barn?" aria-invalid={!!errors.message} />
        {errors.message && <span className="mt-1 block text-xs" style={{ color: "var(--status-red)" }}>{errors.message}</span>}
      </label>
      <button type="submit" className="inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-6 text-sm font-medium text-background shadow-sm transition-opacity hover:opacity-90">
        Send message <Send className="size-4" />
      </button>
      <p className="text-xs text-muted-foreground">Preview form. Nothing is sent or stored yet.</p>
    </form>
  );
}

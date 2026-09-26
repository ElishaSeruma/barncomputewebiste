"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AreaNav, SearchEntry } from "@/lib/docs/types";
import { AREA_ICONS } from "./docs-icons";
import { DocsSearch, OPEN_SEARCH_EVENT } from "./docs-search";
import { DocsSidebar } from "./docs-sidebar";

export default function DocsChrome({
  navs,
  searchIndex,
  children,
}: {
  navs: AreaNav[];
  searchIndex: SearchEntry[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); // ["docs", "build", "nodes", ...]
  const areaId = segments[1];
  const currentPath = segments.slice(1).join("/");
  const nav = navs.find((a) => a.id === areaId);

  const [drawer, setDrawer] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    const onOpen = () => setSearchOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
    };
  }, []);

  return (
    <div className="flex min-h-svh flex-col">
      <div className="bg-accent/25 px-4 py-1.5 text-center text-xs text-foreground/80">
        Draft documentation. Content is placeholder and will change before launch.
      </div>

      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1500px] items-center gap-3 px-4 lg:px-6">
          <button
            type="button"
            onClick={() => setDrawer(true)}
            aria-label="Open navigation"
            className="inline-flex size-9 items-center justify-center rounded-md hover:bg-accent/30 lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <Link href="/" className="flex items-center gap-2" aria-label="Barn Computing home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/barnLogo.svg" alt="" width={28} height={28} className="size-7 rounded-md" />
              <span className="hidden text-sm font-medium sm:inline">Barn Computing</span>
            </Link>
            <span aria-hidden className="hidden h-5 w-px bg-border sm:block" />
            <Link href="/docs" className="text-sm font-bold uppercase text-foreground">
              DOCS
            </Link>
          </div>

          <nav aria-label="Docs sections" className="ml-4 hidden items-center gap-0.5 lg:flex">
            {navs.map((a) => (
              <Link
                key={a.id}
                href={`/docs/${a.id}`}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  a.id === areaId ? "bg-accent/40 text-foreground" : "text-muted-foreground hover:bg-accent/20 hover:text-foreground"
                )}
              >
                {a.title === "Getting started" ? "Start" : a.title === "CLI reference" ? "CLI" : a.title}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden h-9 w-64 items-center gap-2 rounded-md border border-border bg-white/50 px-3 text-sm text-muted-foreground transition-colors hover:border-foreground/30 md:flex"
            >
              <Search className="size-4" />
              <span className="flex-1 text-left">Search docs</span>
              <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px]">Ctrl K</kbd>
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search docs"
              className="inline-flex size-9 items-center justify-center rounded-md hover:bg-accent/30 md:hidden"
            >
              <Search className="size-5" />
            </button>
            <Link
              href="/"
              className="hidden items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground xl:flex"
            >
              Back to site <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1500px] flex-1 items-start">
        {nav && (
          <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-72 shrink-0 self-start overflow-y-auto border-r border-border py-6 pl-4 pr-3 lg:block">
            <DocsSidebar nav={nav} currentPath={currentPath} />
          </aside>
        )}
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <AnimatePresence>
        {drawer && (
          <div className="fixed inset-0 z-[70] lg:hidden">
            <motion.button
              type="button"
              aria-label="Close navigation"
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
            />
            <motion.div
              className="absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto border-r border-border bg-background p-4 shadow-xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-bold uppercase">DOCS</span>
                <button
                  type="button"
                  onClick={() => setDrawer(false)}
                  aria-label="Close navigation"
                  className="inline-flex size-9 items-center justify-center rounded-md hover:bg-accent/30"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mb-5 grid grid-cols-2 gap-2">
                {navs.map((a) => {
                  const Icon = AREA_ICONS[a.icon];
                  return (
                    <Link
                      key={a.id}
                      href={`/docs/${a.id}`}
                      onClick={() => setDrawer(false)}
                      className={cn(
                        "flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium",
                        a.id === areaId ? "border-foreground/40 bg-accent/30" : "border-border bg-white/50"
                      )}
                    >
                      {Icon && <Icon className="size-4" />}
                      {a.title === "Getting started" ? "Start" : a.title === "CLI reference" ? "CLI" : a.title}
                    </Link>
                  );
                })}
              </div>

              {nav && <DocsSidebar nav={nav} currentPath={currentPath} onNavigate={() => setDrawer(false)} />}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {searchOpen && <DocsSearch index={searchIndex} onClose={() => setSearchOpen(false)} />}
    </div>
  );
}

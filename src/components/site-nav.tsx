"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { DropdownNavigation } from "@/components/ui/dorpdown-navigation";
import { NAV_ITEMS } from "@/components/nav-data";

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  // Stay transparent over the hero; gain a backdrop once the page moves past it.
  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector("main > section");
      const end = hero ? hero.getBoundingClientRect().bottom + window.scrollY : 0;
      setSolid(window.scrollY > end - 64);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        solid ? "border-b border-border bg-background/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Link href="/" className="flex items-center gap-2 text-base font-medium" aria-label="Barn Computing home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/barnLogo.svg" alt="" width={32} height={32} className="size-8 rounded-md" />
          <span>Barn Computing</span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <DropdownNavigation navItems={NAV_ITEMS} />
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md hover:bg-accent/40 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="mx-5 max-h-[calc(100svh-5rem)] overflow-y-auto rounded-lg border border-background/10 bg-foreground p-3 text-background shadow-sm lg:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="py-1">
              {item.subMenus ? (
                <>
                  <p className="px-3 pb-1 pt-2 text-xs font-medium uppercase text-background/60">
                    {item.label}
                  </p>
                  {item.subMenus.flatMap((s) => s.items).map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href ?? "#"}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-background/10"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </>
              ) : (
                <a
                  href={item.link ?? "#"}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-background/10"
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}

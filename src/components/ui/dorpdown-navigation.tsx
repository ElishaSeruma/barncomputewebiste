"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type NavItem = {
  id: number;
  label: string;
  subMenus?: {
    title: string;
    items: {
      label: string;
      description: string;
      icon: React.ElementType;
      href?: string;
    }[];
  }[];
  link?: string;
  /** Anchor the dropdown to the item's right edge so wide menus stay on screen. */
  alignRight?: boolean;
};

// Three-tier status palette (red / green / yellow), matching the three Barn states.
const STATUS_COLORS = ["var(--status-red)", "var(--status-green)", "var(--status-yellow)"];
const STATUS_INTERVAL_MS = 6000;

// Small deterministic hash so the first render is identical on server and client.
function pickStatus(label: string, seed: number) {
  let h = 2166136261 ^ seed;
  for (let i = 0; i < label.length; i++) {
    h = Math.imul(h ^ label.charCodeAt(i), 16777619);
  }
  h ^= h >>> 15;
  h = Math.imul(h, 2246822519);
  h ^= h >>> 13;
  return STATUS_COLORS[(h >>> 0) % STATUS_COLORS.length];
}

export function DropdownNavigation({ navItems }: { navItems: NavItem[] }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isHover, setIsHover] = useState<number | null>(null);
  const [seed, setSeed] = useState(0);

  // Every 6 seconds each icon is re-assigned a random status colour.
  useEffect(() => {
    const id = window.setInterval(() => setSeed((Math.random() * 0x7fffffff) | 0), STATUS_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  const triggerClass =
    "text-sm py-1.5 px-4 flex cursor-pointer group transition-colors duration-300 items-center justify-center gap-1 text-muted-foreground hover:text-foreground relative";

  const hoverPill = (
    <motion.div
      layoutId="hover-bg"
      className="absolute inset-0 size-full bg-primary/10"
      style={{ borderRadius: 99 }}
    />
  );

  return (
    <ul className="relative flex items-center space-x-0">
      {navItems.map((navItem) => (
        <li
          key={navItem.label}
          className="relative"
          onMouseEnter={() => setOpenMenu(navItem.label)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          {navItem.subMenus ? (
            <button
              type="button"
              className={triggerClass}
              aria-haspopup="true"
              aria-expanded={openMenu === navItem.label}
              onMouseEnter={() => setIsHover(navItem.id)}
              onMouseLeave={() => setIsHover(null)}
              onFocus={() => setOpenMenu(navItem.label)}
            >
              <span>{navItem.label}</span>
              <ChevronDown
                className={`h-4 w-4 group-hover:rotate-180 duration-300 transition-transform ${
                  openMenu === navItem.label ? "rotate-180" : ""
                }`}
              />
              {(isHover === navItem.id || openMenu === navItem.label) && hoverPill}
            </button>
          ) : (
            <a
              href={navItem.link ?? "#"}
              className={triggerClass}
              onMouseEnter={() => setIsHover(navItem.id)}
              onMouseLeave={() => setIsHover(null)}
            >
              <span>{navItem.label}</span>
              {isHover === navItem.id && hoverPill}
            </a>
          )}

          <AnimatePresence>
            {openMenu === navItem.label && navItem.subMenus && (
              <div
                className={`w-auto absolute top-full pt-2 ${
                  navItem.alignRight ? "right-0" : "left-0"
                }`}
              >
                <motion.div
                  className="bg-foreground text-background border border-background/10 p-4 w-max shadow-sm"
                  style={{ borderRadius: 16 }}
                  layoutId="menu"
                >
                  <div className="w-fit shrink-0 flex space-x-9 overflow-hidden">
                    {navItem.subMenus.map((sub) => (
                      <motion.div layout className="w-full" key={sub.title}>
                        <h3 className="mb-4 text-sm font-medium capitalize text-background/60">
                          {sub.title}
                        </h3>
                        <ul className="space-y-6">
                          {sub.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <li key={item.label}>
                                <Link href={item.href ?? "#"} className="flex items-start space-x-3 group">
                                  <div
                                    className="border border-background/20 bg-white rounded-md flex items-center justify-center size-9 shrink-0 group-hover:border-background/60 transition-colors duration-700"
                                    style={{ color: pickStatus(item.label, seed) }}
                                  >
                                    <Icon className="h-5 w-5 flex-none" />
                                  </div>
                                  <div className="leading-5 w-max">
                                    <p className="text-sm font-medium text-background shrink-0">
                                      {item.label}
                                    </p>
                                    <p className="text-xs text-background/60 shrink-0 group-hover:text-background transition-colors duration-300">
                                      {item.description}
                                    </p>
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
}

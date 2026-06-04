"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

// 7 rows (days) x 16 cols (weeks). Deterministic pseudo-random pattern so SSR/CSR match.
const WEEKS = 16;
const DAYS = 7;

function intensity(d: number, w: number) {
  const v = Math.sin(d * 1.7 + w * 0.9) + Math.cos((d + w) * 0.5);
  const n = (v + 2) / 4; // 0..1
  if (n < 0.2) return 0;
  if (n < 0.45) return 1;
  if (n < 0.7) return 2;
  if (n < 0.88) return 3;
  return 4;
}

const LEVELS = [
  "color-mix(in oklab, var(--foreground) 6%, transparent)",
  "color-mix(in oklab, var(--neon-emerald) 25%, transparent)",
  "color-mix(in oklab, var(--neon-emerald) 50%, transparent)",
  "color-mix(in oklab, var(--neon-emerald) 75%, transparent)",
  "var(--neon-emerald)",
];

export function ActivityTile() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-labelledby="activity-heading"
      className="relative overflow-hidden rounded-2xl glass-panel p-5 will-change-transform"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[var(--neon-emerald)]/25 blur-3xl" />
      <header className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--neon-emerald)]/15 text-[var(--neon-emerald)]">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <h3 id="activity-heading" className="text-sm font-semibold tracking-tight">
              Learning Activity
            </h3>
            <p className="text-[11px] text-muted-foreground">Last 16 weeks · daily focus</p>
          </div>
        </div>
        <span className="rounded-full bg-[var(--neon-emerald)]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--neon-emerald)]">
          +28% MoM
        </span>
      </header>

      <div
        className="relative mt-5 grid gap-[5px]"
        style={{ gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: WEEKS }).map((_, w) => (
          <div key={w} className="grid gap-[5px]" style={{ gridTemplateRows: `repeat(${DAYS}, 1fr)` }}>
            {Array.from({ length: DAYS }).map((__, d) => {
              const lvl = intensity(d, w);
              return (
                <motion.span
                  key={d}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.02 * (w + d * 0.4),
                  }}
                  className="aspect-square rounded-[3px]"
                  style={{ background: LEVELS[lvl] }}
                />
              );
            })}
          </div>
        ))}
      </div>

      <footer className="relative mt-4 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Less</span>
        <div className="flex items-center gap-1">
          {LEVELS.map((bg, i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-[2px]" style={{ background: bg }} />
          ))}
        </div>
        <span>More</span>
      </footer>
    </motion.section>
  );
}

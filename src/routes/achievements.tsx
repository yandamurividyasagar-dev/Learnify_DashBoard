import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trophy, Lock, Star } from "lucide-react";

import { Sidebar } from "@/components/learnify/Sidebar";

export const Route = createFileRoute("/achievements")({
  head: () => ({ meta: [{ title: "Achievements — Learnify" }] }),
  component: AchievementsPage,
});

const BADGES = [
  { title: "First Spark",      desc: "Complete your first lesson",        xp: 50,   earned: true,  accent: "amber"   },
  { title: "Week Warrior",     desc: "7-day learning streak",             xp: 200,  earned: true,  accent: "cyan"    },
  { title: "Deep Diver",       desc: "Spend 10h in a single course",      xp: 350,  earned: true,  accent: "violet"  },
  { title: "Code Whisperer",   desc: "Complete an advanced coding module", xp: 500,  earned: true,  accent: "emerald" },
  { title: "Mentor's Favorite",desc: "Get 5 stars from a mentor session", xp: 600,  earned: false, accent: "pink"    },
  { title: "Streak Legend",    desc: "21-day consecutive streak",         xp: 800,  earned: false, accent: "amber"   },
  { title: "Path Master",      desc: "Complete a full learning path",     xp: 1000, earned: false, accent: "cyan"    },
  { title: "Neural Architect", desc: "Master 5 system design concepts",   xp: 1500, earned: false, accent: "violet"  },
];

function AchievementsPage() {
  const earned = BADGES.filter((b) => b.earned).length;

  return (
    <div className="relative min-h-screen text-foreground">
      <Sidebar />
      <div className="lg:pl-72">
        <main className="mx-auto max-w-7xl px-5 pb-16 pt-10 lg:px-8">
          <header className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--neon-amber)]/15 text-[var(--neon-amber)]">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Achievements</h1>
              <p className="text-sm text-muted-foreground">
                {earned} of {BADGES.length} badges earned
              </p>
            </div>
          </header>

          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-foreground/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(earned / BADGES.length) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="h-full rounded-full bg-gradient-to-r from-[var(--neon-amber)] to-[var(--neon-violet)]"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {BADGES.map((badge, i) => (
              <motion.article
                key={badge.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={badge.earned ? { scale: 1.02 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 22, delay: i * 0.06 }}
                className={`relative overflow-hidden rounded-2xl glass-panel p-5 will-change-transform ${
                  !badge.earned ? "opacity-50" : ""
                }`}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-20 blur-2xl"
                  style={{ background: badge.earned ? `var(--neon-${badge.accent})` : "transparent" }}
                />
                <div className="flex items-start justify-between">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-xl text-2xl"
                    style={{
                      background: badge.earned
                        ? `color-mix(in oklab, var(--neon-${badge.accent}) 20%, transparent)`
                        : "color-mix(in oklab, var(--foreground) 8%, transparent)",
                    }}
                  >
                    {badge.earned ? <Star className="h-6 w-6" style={{ color: `var(--neon-${badge.accent})` }} /> : <Lock className="h-5 w-5 text-muted-foreground" />}
                  </div>
                  {badge.earned && (
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
                      style={{
                        background: `color-mix(in oklab, var(--neon-${badge.accent}) 15%, transparent)`,
                        color: `var(--neon-${badge.accent})`,
                      }}
                    >
                      +{badge.xp} XP
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-sm font-semibold">{badge.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{badge.desc}</p>
              </motion.article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

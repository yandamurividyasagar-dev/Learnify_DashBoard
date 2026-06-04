import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, TrendingUp, Zap } from "lucide-react";

import { Sidebar } from "@/components/learnify/Sidebar";
import { ActivityTile } from "@/components/learnify/ActivityTile";

export const Route = createFileRoute("/activity")({
  head: () => ({ meta: [{ title: "Activity — Learnify" }] }),
  component: ActivityPage,
});

const STATS = [
  { label: "Sessions this week", value: "12", delta: "+4 vs last week", accent: "cyan" },
  { label: "Avg. session length", value: "38m", delta: "Best: 1h 24m", accent: "violet" },
  { label: "Focus score", value: "84", delta: "+6 this month", accent: "emerald" },
  { label: "Streak record", value: "21d", delta: "Current: 14 days", accent: "amber" },
];

function ActivityPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Sidebar />
      <div className="lg:pl-72">
        <main className="mx-auto max-w-7xl px-5 pb-16 pt-10 lg:px-8">
          <header className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--neon-emerald)]/15 text-[var(--neon-emerald)]">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Learning Activity</h1>
              <p className="text-sm text-muted-foreground">Your focus patterns over time</p>
            </div>
          </header>

          <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22, delay: i * 0.07 }}
                className="relative overflow-hidden rounded-2xl glass-panel p-5"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-20 blur-2xl"
                  style={{ background: `var(--neon-${s.accent})` }}
                />
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{s.label}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">{s.value}</p>
                <p className="mt-1 text-xs" style={{ color: `var(--neon-${s.accent})` }}>{s.delta}</p>
              </motion.div>
            ))}
          </section>

          <section className="mt-8">
            <ActivityTile />
          </section>

          <section className="mt-8">
            <h2 className="mb-4 text-lg font-semibold tracking-tight">Recent sessions</h2>
            <div className="flex flex-col gap-3">
              {SESSIONS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="flex items-center justify-between rounded-xl glass-panel px-5 py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)]">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{s.course}</p>
                      <p className="text-xs text-muted-foreground">{s.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{s.duration}</p>
                    <div className="mt-1 flex items-center justify-end gap-1 text-[var(--neon-emerald)]">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-[11px]">{s.xp} XP</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const SESSIONS = [
  { course: "Advanced React Patterns", date: "Today · 9:14 AM", duration: "52m", xp: "+240" },
  { course: "TypeScript Deep Dive",    date: "Yesterday · 7:30 PM", duration: "1h 08m", xp: "+310" },
  { course: "System Design Fundamentals", date: "Jun 2 · 3:45 PM", duration: "34m", xp: "+150" },
  { course: "Node.js Internals",       date: "Jun 1 · 10:00 AM", duration: "45m", xp: "+200" },
  { course: "Advanced React Patterns", date: "May 31 · 6:20 PM", duration: "1h 22m", xp: "+380" },
];

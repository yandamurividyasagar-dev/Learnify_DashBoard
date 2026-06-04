import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";

import { Sidebar } from "@/components/learnify/Sidebar";

export const Route = createFileRoute("/schedule")({
  head: () => ({ meta: [{ title: "Schedule — Learnify" }] }),
  component: SchedulePage,
});

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TODAY_IDX = 3; // Thursday

const SESSIONS = [
  { day: 0, title: "React Patterns: Compound Components", time: "9:00 AM", dur: "45m", accent: "cyan",    done: true  },
  { day: 1, title: "TypeScript: Mapped Types",            time: "7:30 PM", dur: "30m", accent: "violet",  done: true  },
  { day: 2, title: "System Design: Caching strategies",   time: "6:00 PM", dur: "1h",  accent: "emerald", done: true  },
  { day: 3, title: "Node.js: Event Loop deep dive",       time: "8:00 PM", dur: "50m", accent: "amber",   done: false },
  { day: 4, title: "TypeScript: Conditional types",       time: "7:00 PM", dur: "40m", accent: "violet",  done: false },
  { day: 6, title: "Weekend review + quiz",               time: "10:00 AM", dur: "1h", accent: "pink",    done: false },
];

function SchedulePage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Sidebar />
      <div className="lg:pl-72">
        <main className="mx-auto max-w-7xl px-5 pb-16 pt-10 lg:px-8">
          <header className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--neon-violet)]/15 text-[var(--neon-violet)]">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Schedule</h1>
              <p className="text-sm text-muted-foreground">Week of June 2 – 8, 2026</p>
            </div>
          </header>

          <div className="mt-8 grid grid-cols-7 gap-2">
            {DAYS.map((day, i) => (
              <div
                key={day}
                className={`rounded-xl p-3 text-center transition-colors ${
                  i === TODAY_IDX
                    ? "bg-gradient-to-b from-[var(--neon-cyan)]/20 to-[var(--neon-violet)]/10 ring-1 ring-[var(--neon-cyan)]/40"
                    : "glass-panel"
                }`}
              >
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {day}
                </p>
                <p className={`mt-1 text-lg font-semibold ${i === TODAY_IDX ? "text-[var(--neon-cyan)]" : ""}`}>
                  {i + 2}
                </p>
                {SESSIONS.filter((s) => s.day === i).length > 0 && (
                  <div className="mt-2 flex justify-center">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: `var(--neon-${SESSIONS.find((s) => s.day === i)?.accent ?? "cyan"})`,
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="mb-4 text-lg font-semibold tracking-tight">This week's sessions</h2>
            <div className="flex flex-col gap-3">
              {SESSIONS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i }}
                  className="flex items-center gap-5 rounded-xl glass-panel px-5 py-4"
                >
                  <div className="w-10 shrink-0 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {DAYS[s.day]}
                    </p>
                    <p className="text-sm font-semibold">{s.day + 2}</p>
                  </div>
                  <div
                    className="h-10 w-1 shrink-0 rounded-full"
                    style={{ background: `var(--neon-${s.accent})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{s.title}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {s.time}
                      </span>
                      <span>{s.dur}</span>
                    </div>
                  </div>
                  {s.done ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--neon-emerald)]" />
                  ) : (
                    <span
                      className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                      style={{
                        background: `color-mix(in oklab, var(--neon-${s.accent}) 15%, transparent)`,
                        color: `var(--neon-${s.accent})`,
                      }}
                    >
                      Upcoming
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

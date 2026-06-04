import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MessageSquare, Star, Clock, ArrowUpRight } from "lucide-react";

import { Sidebar } from "@/components/learnify/Sidebar";

export const Route = createFileRoute("/mentors")({
  head: () => ({ meta: [{ title: "Mentors — Learnify" }] }),
  component: MentorsPage,
});

const MENTORS = [
  {
    name: "Aisha Patel",       initials: "AP", role: "React & TypeScript",
    rating: 4.9, sessions: 128, available: true,  accent: "cyan",
    bio: "Senior engineer at a top-tier fintech. Specialises in React architecture, performance, and TypeScript patterns.",
  },
  {
    name: "Marcus Lee",        initials: "ML", role: "System Design",
    rating: 4.8, sessions: 94,  available: true,  accent: "violet",
    bio: "Staff engineer with 10+ years designing distributed systems at scale.",
  },
  {
    name: "Priya Sharma",      initials: "PS", role: "Node.js & APIs",
    rating: 4.7, sessions: 76,  available: false, accent: "emerald",
    bio: "Backend specialist focused on Node.js, REST/GraphQL API design, and database optimisation.",
  },
  {
    name: "Jordan Wu",         initials: "JW", role: "Frontend Architecture",
    rating: 5.0, sessions: 211, available: false, accent: "amber",
    bio: "Engineering manager and frontend architect. Passionate about design systems and developer experience.",
  },
];

function MentorsPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Sidebar />
      <div className="lg:pl-72">
        <main className="mx-auto max-w-7xl px-5 pb-16 pt-10 lg:px-8">
          <header className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--neon-pink)]/15 text-[var(--neon-pink)]">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Mentors</h1>
              <p className="text-sm text-muted-foreground">Book a 1-on-1 session with an expert</p>
            </div>
          </header>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {MENTORS.map((m, i) => (
              <motion.article
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.07 }}
                className="relative overflow-hidden rounded-2xl glass-panel p-6 will-change-transform"
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 blur-3xl"
                  style={{ background: `var(--neon-${m.accent})` }}
                />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="grid h-12 w-12 place-items-center rounded-2xl text-sm font-bold text-background"
                      style={{
                        background: `linear-gradient(135deg, var(--neon-${m.accent}), color-mix(in oklab, var(--neon-${m.accent}) 60%, var(--neon-violet)))`,
                      }}
                    >
                      {m.initials}
                    </div>
                    <div>
                      <p className="font-semibold">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.role}</p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                      m.available
                        ? "bg-[var(--neon-emerald)]/15 text-[var(--neon-emerald)]"
                        : "bg-foreground/5 text-muted-foreground"
                    }`}
                  >
                    {m.available ? "Available" : "Busy"}
                  </span>
                </div>

                <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>

                <div className="relative mt-5 flex items-center gap-5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-[var(--neon-amber)]" fill="currentColor" />
                    <span className="font-medium text-foreground">{m.rating}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {m.sessions} sessions
                  </span>
                </div>

                <button
                  type="button"
                  disabled={!m.available}
                  className="relative mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40"
                  style={{
                    background: m.available
                      ? `color-mix(in oklab, var(--neon-${m.accent}) 20%, transparent)`
                      : "color-mix(in oklab, var(--foreground) 6%, transparent)",
                    color: m.available ? `var(--neon-${m.accent})` : "inherit",
                    boxShadow: m.available
                      ? `inset 0 0 0 1px color-mix(in oklab, var(--neon-${m.accent}) 35%, transparent)`
                      : "inset 0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent)",
                  }}
                >
                  Book a session <ArrowUpRight className="h-4 w-4" />
                </button>
              </motion.article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

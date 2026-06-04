import { Suspense } from "react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Trophy, Brain, Clock, Search, Bell } from "lucide-react";

import { Sidebar } from "@/components/learnify/Sidebar";
import { CourseCard } from "@/components/learnify/CourseCard";
import { CourseCardSkeleton } from "@/components/learnify/CourseCardSkeleton";
import { StatCard } from "@/components/learnify/StatCard";
import { ActivityTile } from "@/components/learnify/ActivityTile";
import { getCourses } from "@/lib/courses.functions";

const coursesQuery = queryOptions({
  queryKey: ["courses"],
  queryFn: () => getCourses(),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Learnify — Neural Campus Dashboard" },
      { name: "description", content: "Futuristic dark-mode student learning dashboard." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(coursesQuery),
  component: DashboardPage,
  errorComponent: ({ error }) => (
    <div className="grid min-h-screen place-items-center p-8 text-center">
      <div>
        <h1 className="text-xl font-semibold">Couldn't load your dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
});

function DashboardPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Sidebar />
      <div className="lg:pl-72">
        <Header />
        <main className="mx-auto max-w-7xl px-5 pb-16 pt-6 lg:px-8">
          <Hero />
          <StatsGrid />
          <section aria-labelledby="courses-heading" className="mt-10">
            <div className="flex items-end justify-between">
              <div>
                <h2 id="courses-heading" className="text-xl font-semibold tracking-tight">
                  Continue learning
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your in-progress signal across the neural campus.
                </p>
              </div>
              <Link
                to="/courses"
                className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground transition-colors sm:inline-flex"
              >
                View all
              </Link>
            </div>
            <Suspense fallback={<CourseGridSkeleton />}>
              <CoursesGrid />
            </Suspense>
          </section>
          <section aria-labelledby="activity-section" className="mt-10">
            <h2 id="activity-section" className="sr-only">Activity</h2>
            <ActivityTile />
          </section>
        </main>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 glass-panel">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 lg:px-8">
        <div className="ml-12 flex-1 lg:ml-0">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search courses, mentors, paths…"
              className="w-full rounded-lg border border-border/60 bg-background/40 py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--neon-cyan)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--neon-cyan)]/20"
            />
          </div>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid h-10 w-10 place-items-center rounded-lg border border-border/60 text-muted-foreground hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--neon-pink)]" />
        </button>
        <Link
          to="/settings"
          className="flex items-center gap-3 rounded-lg border border-border/60 py-1.5 pl-1.5 pr-3 hover:border-border transition-colors"
        >
          <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-violet)] text-[10px] font-bold text-background">
            NK
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold leading-tight">Nova Kim</p>
            <p className="text-[10px] text-muted-foreground">Tier · Pro</p>
          </div>
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative mt-2 overflow-hidden rounded-3xl glass-panel p-7 lg:p-10">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[var(--neon-violet)]/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-60 w-60 rounded-full bg-[var(--neon-cyan)]/30 blur-3xl" />
      <div className="relative max-w-2xl">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Thursday · Cycle 04
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl">
          Welcome back, <span className="text-gradient">Nova</span>.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          You're 2 lessons from your weekly target. Your neural feed has surfaced 3 new modules
          aligned with your Cryptography path.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/courses"
            className="rounded-lg bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-violet)] px-4 py-2 text-sm font-semibold text-background shadow-[0_0_30px_-8px_var(--neon-violet)] hover:opacity-95 transition-opacity"
          >
            Resume last lesson
          </Link>
          <Link
            to="/schedule"
            className="rounded-lg border border-border/70 px-4 py-2 text-sm font-medium text-foreground hover:bg-foreground/5 transition-colors"
          >
            Open daily plan
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatsGrid() {
  return (
    <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Link to="/activity">
        <StatCard label="Streak" value="14 days" delta="+3 this week" icon={Flame} accent="amber" />
      </Link>
      <Link to="/achievements">
        <StatCard label="XP earned" value="8,420" delta="+612 today" icon={Trophy} accent="violet" />
      </Link>
      <Link to="/activity">
        <StatCard label="Focus time" value="6h 42m" delta="On pace · weekly" icon={Clock} accent="cyan" />
      </Link>
      <Link to="/courses">
        <StatCard label="Concepts mastered" value="127" delta="+9 this cycle" icon={Brain} accent="emerald" />
      </Link>
    </section>
  );
}

function CoursesGrid() {
  const { data } = useSuspenseQuery(coursesQuery);
  return (
    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {data.map((course, i) => (
        <CourseCard key={course.id} course={course} index={i} />
      ))}
    </div>
  );
}

function CourseGridSkeleton() {
  return (
    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}

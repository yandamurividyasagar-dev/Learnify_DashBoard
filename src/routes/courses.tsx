import { Suspense } from "react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Filter, Search } from "lucide-react";

import { Sidebar } from "@/components/learnify/Sidebar";
import { CourseCard } from "@/components/learnify/CourseCard";
import { CourseCardSkeleton } from "@/components/learnify/CourseCardSkeleton";
import { getCourses } from "@/lib/courses.functions";

const coursesQuery = queryOptions({
  queryKey: ["courses"],
  queryFn: () => getCourses(),
});

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [{ title: "My Courses — Learnify" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(coursesQuery),
  component: CoursesPage,
  errorComponent: ({ error }) => (
    <div className="grid min-h-screen place-items-center p-8 text-center">
      <div>
        <h1 className="text-xl font-semibold">Couldn't load courses</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
});

function CoursesPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Sidebar />
      <div className="lg:pl-72">
        <main className="mx-auto max-w-7xl px-5 pb-16 pt-10 lg:px-8">
          <header className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)]">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">My Courses</h1>
                <p className="text-sm text-muted-foreground">All your active learning paths</p>
              </div>
            </div>
          </header>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search your courses…"
                className="w-full rounded-lg border border-border/60 bg-background/40 py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--neon-cyan)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--neon-cyan)]/20"
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-border/60 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>

          <Suspense fallback={<SkeletonGrid />}>
            <AllCourses />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

function AllCourses() {
  const { data } = useSuspenseQuery(coursesQuery);
  return (
    <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {data.map((course, i) => (
        <CourseCard key={course.id} course={course} index={i} />
      ))}
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}

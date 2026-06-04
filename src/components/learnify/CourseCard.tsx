"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Clock, BookOpen, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Course } from "@/lib/courses.functions";

const ACCENT: Record<string, string> = {
  cyan: "var(--neon-cyan)",
  violet: "var(--neon-violet)",
  emerald: "var(--neon-emerald)",
  pink: "var(--neon-pink)",
  amber: "var(--neon-amber)",
  sky: "var(--neon-sky)",
};

function resolveIcon(name: string): LucideIcon {
  const lib = Icons as unknown as Record<string, LucideIcon>;
  return lib[name] ?? BookOpen;
}

export function CourseCard({ course, index }: { course: Course; index: number }) {
  const accent = ACCENT[course.color_accent] ?? ACCENT.cyan;
  const hours = Math.round(course.duration_minutes / 60);
  const Icon = resolveIcon(course.icon_name);

  return (
    <Link to="/courses" className="block">
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.06 }}
        style={{ transformOrigin: "center" }}
        className="group relative overflow-hidden rounded-2xl glass-panel p-5 will-change-transform hover:ring-1 hover:ring-[color:var(--neon-cyan)]/40 cursor-pointer"
      >
      {/* Abstract gradient mesh + subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl transition-opacity duration-300 group-hover:opacity-60"
        style={{ background: accent }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      <header className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="grid h-10 w-10 place-items-center rounded-xl"
            style={{
              background: `color-mix(in oklab, ${accent} 16%, transparent)`,
              color: accent,
              boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${accent} 30%, transparent)`,
            }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: accent }}
            >
              {course.category}
            </span>
            <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {course.difficulty}
            </span>
          </div>
        </div>
        <button
          type="button"
          className="grid h-8 w-8 place-items-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Open course"
        >
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </header>

      <h3 className="relative mt-4 text-lg font-semibold leading-tight tracking-tight">
        {course.title}
      </h3>
      <p className="relative mt-1.5 line-clamp-2 text-sm text-muted-foreground">
        {course.description}
      </p>

      <div className="relative mt-5 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" /> {hours}h
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5" />
          {course.lessons_completed}/{course.lessons_total} lessons
        </span>
      </div>

      <div className="relative mt-4">
        <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
          <span>Progress</span>
          <span style={{ color: accent }}>{course.progress}%</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-foreground/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ duration: 0.9, delay: 0.2 + index * 0.05, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${accent}, color-mix(in oklab, ${accent} 50%, white))` }}
          />
        </div>
      </div>

      <footer className="relative mt-5 flex items-center justify-between border-t border-border/50 pt-4">
        <div className="flex items-center gap-2">
          <div
            className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold text-background"
            style={{ background: accent }}
          >
            {course.instructor
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")}
          </div>
          <span className="text-xs text-muted-foreground">{course.instructor}</span>
        </div>
      </footer>
    </motion.article>
    </Link>
  );
}

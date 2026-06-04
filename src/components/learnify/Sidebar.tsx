import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  Activity,
  Trophy,
  Calendar,
  MessageSquare,
  Settings,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard",   icon: LayoutDashboard, to: "/"            },
  { label: "My Courses",  icon: BookOpen,        to: "/courses"     },
  { label: "Activity",    icon: Activity,        to: "/activity"    },
  { label: "Achievements",icon: Trophy,          to: "/achievements"},
  { label: "Schedule",    icon: Calendar,        to: "/schedule"    },
  { label: "Mentors",     icon: MessageSquare,   to: "/mentors"     },
  { label: "Settings",    icon: Settings,        to: "/settings"    },
] as const;

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg glass-panel text-foreground lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col gap-2 p-5 glass-panel border-r transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-[var(--neon-violet)] blur-md opacity-60" />
              <div className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-violet)] text-background">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">Learnify</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Neural Campus
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-[var(--neon-cyan)]/15 to-[var(--neon-violet)]/15 ring-1 ring-[var(--neon-cyan)]/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="relative h-4 w-4" />
                <span className="relative font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-xl border border-[var(--neon-violet)]/30 bg-gradient-to-br from-[var(--neon-violet)]/15 to-[var(--neon-cyan)]/10 p-4">
          <p className="text-xs font-semibold text-foreground">Pro Tier</p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Unlock AI tutors, unlimited paths, and synthwave certificates.
          </p>
          <Link
            to="/settings"
            onClick={() => setOpen(false)}
            className="mt-3 block w-full rounded-md bg-foreground/90 px-3 py-1.5 text-center text-xs font-semibold text-background hover:bg-foreground transition-colors"
          >
            Upgrade
          </Link>
        </div>
      </motion.aside>
    </>
  );
}

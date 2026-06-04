import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
  accent: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl glass-panel p-5">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-2xl"
        style={{ background: `var(--neon-${accent})` }}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
          <p className="mt-1 text-xs" style={{ color: `var(--neon-${accent})` }}>
            {delta}
          </p>
        </div>
        <div
          className="grid h-10 w-10 place-items-center rounded-xl"
          style={{
            background: `color-mix(in oklab, var(--neon-${accent}) 18%, transparent)`,
            color: `var(--neon-${accent})`,
          }}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

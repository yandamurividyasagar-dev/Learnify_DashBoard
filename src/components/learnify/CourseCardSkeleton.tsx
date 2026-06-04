export function CourseCardSkeleton() {
  return (
    <div className="rounded-2xl glass-panel p-5">
      <div className="flex items-center gap-2">
        <div className="h-4 w-16 animate-pulse rounded-full bg-foreground/10" />
        <div className="h-3 w-14 animate-pulse rounded-full bg-foreground/5" />
      </div>
      <div className="mt-4 h-5 w-3/4 animate-pulse rounded-md bg-foreground/10" />
      <div className="mt-2 h-3 w-full animate-pulse rounded-md bg-foreground/5" />
      <div className="mt-1.5 h-3 w-2/3 animate-pulse rounded-md bg-foreground/5" />
      <div className="mt-6 h-1.5 w-full animate-pulse rounded-full bg-foreground/5" />
      <div className="mt-5 h-7 w-32 animate-pulse rounded-full bg-foreground/5" />
    </div>
  );
}

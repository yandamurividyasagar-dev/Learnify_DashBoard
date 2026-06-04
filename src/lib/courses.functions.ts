import { createServerFn } from "@tanstack/react-start";

export type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration_minutes: number;
  progress: number;
  lessons_total: number;
  lessons_completed: number;
  instructor: string;
  color_accent: string;
  icon_name: string;
};

export const getCourses = createServerFn({ method: "GET" }).handler(async (): Promise<Course[]> => {
  const { createClient } = await import("@supabase/supabase-js");
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL!;
  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY!;
  // DEBUG: log server-side resolved values to troubleshoot invalid supabaseUrl
  try {
    // eslint-disable-next-line no-console
    console.debug('[Server][getCourses] SUPABASE_URL=', url);
    // eslint-disable-next-line no-console
    console.debug('[Server][getCourses] SUPABASE_PUBLISHABLE_KEY=', key ? '(present)' : '(missing)');
  } catch (e) {
    // ignore
  }
  const supabase = createClient(url, key);
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      // Log full error for debugging
      // eslint-disable-next-line no-console
      console.error('[Server][getCourses] Supabase error:', error);
      throw new Error(error.message);
    }
    return (data ?? []) as Course[];
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error('[Server][getCourses] Unexpected error:', err && err.stack ? err.stack : err);
    // In development, return mock data so the UI still renders even when Supabase is unreachable.
    const isDev = (process.env.NODE_ENV || 'development') !== 'production';
    if (isDev) {
      // eslint-disable-next-line no-console
      console.warn('[Server][getCourses] Returning mock courses because Supabase is unavailable (dev fallback).');
      const mock: Course[] = [
        {
          id: 'mock-1',
          title: 'Intro to Cryptography',
          description: 'Fundamentals of modern cryptography',
          category: 'Security',
          difficulty: 'Beginner',
          duration_minutes: 45,
          progress: 0.25,
          lessons_total: 8,
          lessons_completed: 2,
          instructor: 'Dr. Alice',
          color_accent: '#7c3aed',
          icon_name: 'shield',
        },
        {
          id: 'mock-2',
          title: 'Applied Machine Learning',
          description: 'Practical ML projects and pipelines',
          category: 'AI',
          difficulty: 'Intermediate',
          duration_minutes: 120,
          progress: 0.6,
          lessons_total: 12,
          lessons_completed: 7,
          instructor: 'Prof. Bob',
          color_accent: '#06b6d4',
          icon_name: 'cpu',
        },
      ];
      return mock;
    }
    throw new Error('[Server][getCourses] ' + (err && err.message ? err.message : String(err)));
  }
});

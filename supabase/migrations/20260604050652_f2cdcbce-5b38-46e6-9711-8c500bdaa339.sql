ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS icon_name TEXT NOT NULL DEFAULT 'BookOpen';
UPDATE public.courses SET icon_name = 'Atom' WHERE title = 'Quantum Computing Fundamentals';
UPDATE public.courses SET icon_name = 'Brain' WHERE title = 'Neural Networks & Deep Learning';
UPDATE public.courses SET icon_name = 'Code2' WHERE title = 'Modern Web Architecture';
UPDATE public.courses SET icon_name = 'ShieldCheck' WHERE title = 'Cryptography & Zero-Knowledge';
UPDATE public.courses SET icon_name = 'BarChart3' WHERE title = 'Data Visualization Studio';
UPDATE public.courses SET icon_name = 'Network' WHERE title = 'Distributed Systems';
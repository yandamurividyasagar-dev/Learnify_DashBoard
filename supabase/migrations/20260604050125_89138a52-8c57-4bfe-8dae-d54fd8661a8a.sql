CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 0,
  progress INTEGER NOT NULL DEFAULT 0,
  lessons_total INTEGER NOT NULL DEFAULT 0,
  lessons_completed INTEGER NOT NULL DEFAULT 0,
  instructor TEXT NOT NULL,
  color_accent TEXT NOT NULL DEFAULT 'cyan',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.courses TO anon, authenticated;
GRANT ALL ON public.courses TO service_role;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Courses are publicly viewable" ON public.courses FOR SELECT USING (true);

INSERT INTO public.courses (title, description, category, difficulty, duration_minutes, progress, lessons_total, lessons_completed, instructor, color_accent) VALUES
('Quantum Computing Fundamentals', 'Explore the fundamentals of quantum mechanics applied to computation.', 'Physics', 'Advanced', 720, 68, 24, 16, 'Dr. Aria Chen', 'cyan'),
('Neural Networks & Deep Learning', 'Build and train deep neural networks from scratch in modern frameworks.', 'AI/ML', 'Intermediate', 540, 42, 18, 8, 'Prof. Marcus Vega', 'violet'),
('Modern Web Architecture', 'Design scalable, type-safe full-stack applications with edge runtimes.', 'Engineering', 'Intermediate', 420, 91, 14, 13, 'Lena Park', 'emerald'),
('Cryptography & Zero-Knowledge', 'From classic ciphers to zk-SNARKs and modern proof systems.', 'Security', 'Advanced', 660, 25, 22, 6, 'Dr. Idris Khan', 'amber'),
('Data Visualization Studio', 'Tell stories with data using D3, Observable, and motion design.', 'Design', 'Beginner', 300, 100, 10, 10, 'Sora Nakamura', 'pink'),
('Distributed Systems', 'Consensus, replication, and the trade-offs of building at scale.', 'Engineering', 'Advanced', 600, 14, 20, 3, 'Prof. Elena Rossi', 'sky');
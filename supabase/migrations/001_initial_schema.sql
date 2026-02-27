-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'user'
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE LOG 'Error in handle_new_user: %', SQLERRM;
  RETURN NEW;
END;
$$;

-- Drop existing trigger if any, then recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Heroes table
CREATE TABLE IF NOT EXISTS heroes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  birth_year INTEGER,
  death_year INTEGER,
  birth_place TEXT,
  era TEXT NOT NULL DEFAULT 'chong-my',
  rank TEXT,
  unit TEXT,
  achievements TEXT,
  biography TEXT,
  portrait_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  search_vector TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('simple',
      COALESCE(full_name, '') || ' ' ||
      COALESCE(birth_place, '') || ' ' ||
      COALESCE(rank, '') || ' ' ||
      COALESCE(unit, '') || ' ' ||
      COALESCE(achievements, '')
    )
  ) STORED,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_heroes_search_vector ON heroes USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS idx_heroes_full_name_trgm ON heroes USING GIN(full_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_heroes_era ON heroes(era);
CREATE INDEX IF NOT EXISTS idx_heroes_status ON heroes(status);

-- Battlefields table
CREATE TABLE IF NOT EXISTS battlefields (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  era TEXT NOT NULL DEFAULT 'chong-my',
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  panorama_url TEXT,
  thumbnail_url TEXT,
  markers JSONB DEFAULT '[]',
  category TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_battlefields_category ON battlefields(category);
CREATE INDEX IF NOT EXISTS idx_battlefields_status ON battlefields(status);

-- Stories table
CREATE TABLE IF NOT EXISTS stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image_url TEXT,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  era TEXT,
  location TEXT,
  characters TEXT[] DEFAULT '{}',
  audio_url TEXT,
  entities JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'published', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_stories_author ON stories(author_id);
CREATE INDEX IF NOT EXISTS idx_stories_status ON stories(status);
CREATE INDEX IF NOT EXISTS idx_stories_created_at ON stories(created_at DESC);

-- AI matches table
CREATE TABLE IF NOT EXISTS ai_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_type TEXT NOT NULL CHECK (source_type IN ('story', 'hero')),
  source_id UUID NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('story', 'hero')),
  target_id UUID NOT NULL,
  similarity_score DOUBLE PRECISION NOT NULL DEFAULT 0,
  matched_entities TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_matches_source ON ai_matches(source_type, source_id);
CREATE INDEX IF NOT EXISTS idx_ai_matches_target ON ai_matches(target_type, target_id);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE heroes ENABLE ROW LEVEL SECURITY;
ALTER TABLE battlefields ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_matches ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all, update own
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Heroes: public can read published, admins can CRUD
CREATE POLICY "Published heroes are viewable" ON heroes FOR SELECT USING (status = 'published' OR EXISTS(SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can insert heroes" ON heroes FOR INSERT WITH CHECK (EXISTS(SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update heroes" ON heroes FOR UPDATE USING (EXISTS(SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can delete heroes" ON heroes FOR DELETE USING (EXISTS(SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Battlefields: same as heroes
CREATE POLICY "Published battlefields are viewable" ON battlefields FOR SELECT USING (status = 'published' OR EXISTS(SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can insert battlefields" ON battlefields FOR INSERT WITH CHECK (EXISTS(SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update battlefields" ON battlefields FOR UPDATE USING (EXISTS(SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Stories: public read published, authors read own, admins all
CREATE POLICY "Published stories are viewable" ON stories FOR SELECT USING (
  status = 'published'
  OR author_id = auth.uid()
  OR EXISTS(SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Authenticated users can insert stories" ON stories FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND author_id = auth.uid());
CREATE POLICY "Authors can update own stories" ON stories FOR UPDATE USING (
  author_id = auth.uid()
  OR EXISTS(SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- AI matches: public read
CREATE POLICY "AI matches are viewable" ON ai_matches FOR SELECT USING (true);
CREATE POLICY "Admins can manage matches" ON ai_matches FOR ALL USING (EXISTS(SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can read uploads" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'uploads' AND auth.uid() IS NOT NULL);

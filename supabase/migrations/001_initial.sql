-- ============================================================
-- Bem Viver Ecoterapia — Supabase Database Schema
-- Execute este script no SQL Editor do painel Supabase
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- site_config: Stores all configurable text content
-- ============================================================
CREATE TABLE IF NOT EXISTS site_config (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- Singleton row
  hero_title TEXT DEFAULT 'Pequenos passos.' || E'\n' || 'Grandes transformações.',
  hero_subtitle TEXT DEFAULT 'Acreditamos no poder da conexão entre pessoas, cavalos e natureza para transformar vidas.',
  historia_title TEXT DEFAULT 'Uma história construída com amor, cuidado e propósito.',
  historia_text TEXT DEFAULT 'O Bem Viver Ecoterapia nasceu do desejo de promover mais qualidade de vida, acolhimento e desenvolvimento por meio da conexão entre pessoas, cavalos e natureza.',
  missao TEXT DEFAULT 'Promover experiências de cuidado, desenvolvimento e inclusão por meio da conexão entre pessoas, cavalos e natureza.',
  visao TEXT DEFAULT 'Construir um espaço cada vez mais acolhedor, acessível e preparado para ampliar as oportunidades de desenvolvimento e bem-estar.',
  valores TEXT[] DEFAULT ARRAY['Amor e respeito', 'Inclusão', 'Acolhimento', 'Responsabilidade', 'Compromisso com as pessoas e os animais'],
  pix_key TEXT DEFAULT '',
  pix_key_type TEXT DEFAULT 'cpf',
  pix_name TEXT DEFAULT 'Bem Viver Ecoterapia',
  pix_city TEXT DEFAULT 'Brasil',
  donation_values INTEGER[] DEFAULT ARRAY[10, 25, 50, 100],
  whatsapp TEXT DEFAULT '',
  instagram TEXT DEFAULT '',
  email TEXT DEFAULT '',
  address TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default row
INSERT INTO site_config (id) VALUES (1) ON CONFLICT DO NOTHING;

-- ============================================================
-- gallery_images: Images for the gallery section
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  url TEXT NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- transparency_categories: How donations are used
-- ============================================================
CREATE TABLE IF NOT EXISTS transparency_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  label TEXT NOT NULL,
  icon TEXT DEFAULT '🌿',
  sort_order INTEGER DEFAULT 0
);

-- Insert defaults
INSERT INTO transparency_categories (label, icon, sort_order) VALUES
  ('Cuidados e alimentação dos cavalos', '🐴', 1),
  ('Manutenção dos espaços', '🌿', 2),
  ('Materiais e equipamentos', '🔧', 3),
  ('Atividades e ações do projeto', '❤️', 4)
ON CONFLICT DO NOTHING;

-- ============================================================
-- reports: Accountability documents
-- ============================================================
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  file_url TEXT NOT NULL,
  published_at DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
-- site_config: public read, authenticated write
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_config" ON site_config FOR SELECT USING (true);
CREATE POLICY "Authenticated write site_config" ON site_config FOR ALL USING (auth.role() = 'authenticated');

-- gallery_images: public read, authenticated write
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gallery_images" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Authenticated write gallery_images" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');

-- transparency_categories: public read, authenticated write
ALTER TABLE transparency_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read transparency_categories" ON transparency_categories FOR SELECT USING (true);
CREATE POLICY "Authenticated write transparency_categories" ON transparency_categories FOR ALL USING (auth.role() = 'authenticated');

-- reports: public read, authenticated write
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read reports" ON reports FOR SELECT USING (true);
CREATE POLICY "Authenticated write reports" ON reports FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- Storage bucket for images and files
-- ============================================================
-- Run this in Supabase Dashboard > Storage > New bucket
-- Name: "bemviver-media"
-- Public: true
-- File size limit: 10MB
-- Allowed MIME types: image/jpeg, image/png, image/webp, video/mp4, video/webm, application/pdf

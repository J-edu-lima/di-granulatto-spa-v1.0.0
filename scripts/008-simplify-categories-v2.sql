-- Simplificar tabela de categorias removendo colunas desnecessárias
-- Primeiro, precisamos remover as políticas RLS que dependem dessas colunas

-- Remover políticas existentes de categories
DROP POLICY IF EXISTS "Public can read active categories" ON categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "Anyone can read categories" ON categories;

-- Agora podemos remover as colunas
ALTER TABLE categories DROP COLUMN IF EXISTS slug;
ALTER TABLE categories DROP COLUMN IF EXISTS description;
ALTER TABLE categories DROP COLUMN IF EXISTS is_active;
ALTER TABLE categories DROP COLUMN IF EXISTS sort_order;

-- Recriar políticas RLS simplificadas
CREATE POLICY "Anyone can read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" ON categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

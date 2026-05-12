-- Migration: Simplificar tabela de categorias
-- Remove colunas desnecessárias: slug, description, is_active, sort_order

-- Remover colunas não utilizadas
ALTER TABLE categories DROP COLUMN IF EXISTS slug;
ALTER TABLE categories DROP COLUMN IF EXISTS description;
ALTER TABLE categories DROP COLUMN IF EXISTS is_active;
ALTER TABLE categories DROP COLUMN IF EXISTS sort_order;

-- Garantir que a coluna image_url existe
ALTER TABLE categories ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Atualizar dados existentes para garantir consistência
UPDATE categories SET updated_at = NOW() WHERE updated_at IS NULL;

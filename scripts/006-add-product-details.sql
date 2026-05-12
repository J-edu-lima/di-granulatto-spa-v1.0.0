-- =============================================
-- Migration: Add product details fields
-- Adds: ingredients, allergens, servings
-- =============================================

-- Add new columns to products table
ALTER TABLE products
ADD COLUMN IF NOT EXISTS ingredients TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS allergens TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS servings TEXT DEFAULT NULL;

-- Update existing products with sample data (optional)
UPDATE products
SET 
  ingredients = ARRAY['Aveia', 'Mel', 'Castanhas', 'Frutas secas'],
  allergens = ARRAY['Glúten', 'Castanhas'],
  servings = '250g'
WHERE ingredients IS NULL OR ingredients = '{}';

-- Verify the changes
SELECT name, ingredients, allergens, servings FROM products LIMIT 5;

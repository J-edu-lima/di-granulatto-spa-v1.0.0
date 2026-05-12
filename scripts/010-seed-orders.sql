-- ========================================
-- SEED: Orders with Order Items
-- ========================================
-- Popula o banco com pedidos de exemplo

-- Limpar dados existentes
DELETE FROM order_items;
DELETE FROM orders;

-- Inserir pedidos de exemplo
INSERT INTO orders (
  id,
  order_number,
  customer_name,
  customer_email,
  customer_phone,
  customer_address,
  status,
  payment_method,
  payment_status,
  subtotal,
  delivery_fee,
  discount,
  total,
  customer_notes,
  created_at,
  updated_at
) VALUES
  (
    gen_random_uuid(),
    'PED-001',
    'Maria Silva',
    'maria.silva@email.com',
    '(11) 99999-1234',
    'Rua das Flores, 123 - São Paulo, SP',
    'confirmed',
    'pix',
    'paid',
    179.90,
    0.00,
    0.00,
    179.90,
    NULL,
    NOW() - INTERVAL '2 hours',
    NOW() - INTERVAL '2 hours'
  ),
  (
    gen_random_uuid(),
    'PED-002',
    'João Santos',
    'joao.santos@email.com',
    '(11) 98888-5678',
    'Av. Paulista, 456 - São Paulo, SP',
    'preparing',
    'credit_card',
    'paid',
    75.00,
    15.00,
    0.00,
    90.00,
    'Sem cobertura de merengue',
    NOW() - INTERVAL '4 hours',
    NOW() - INTERVAL '1 hour'
  ),
  (
    gen_random_uuid(),
    'PED-003',
    'Ana Costa',
    'ana.costa@email.com',
    '(11) 97777-9012',
    'Rua Augusta, 789 - São Paulo, SP',
    'delivered',
    'pix',
    'paid',
    305.00,
    20.00,
    10.00,
    315.00,
    'Entregar até às 18h',
    NOW() - INTERVAL '1 day',
    NOW() - INTERVAL '6 hours'
  ),
  (
    gen_random_uuid(),
    'PED-004',
    'Pedro Lima',
    'pedro.lima@email.com',
    '(11) 96666-3456',
    'Rua Oscar Freire, 321 - São Paulo, SP',
    'pending',
    'money',
    'pending',
    84.00,
    10.00,
    0.00,
    94.00,
    NULL,
    NOW() - INTERVAL '30 minutes',
    NOW() - INTERVAL '30 minutes'
  ),
  (
    gen_random_uuid(),
    'PED-005',
    'Carla Mendes',
    'carla.mendes@email.com',
    '(11) 95555-7890',
    'Rua Haddock Lobo, 567 - São Paulo, SP',
    'ready',
    'pix',
    'paid',
    156.00,
    12.00,
    0.00,
    168.00,
    'Embalagem para presente',
    NOW() - INTERVAL '5 hours',
    NOW() - INTERVAL '1 hour'
  );

-- Buscar IDs dos produtos para relacionar com os pedidos
DO $$
DECLARE
  order_001_id uuid;
  order_002_id uuid;
  order_003_id uuid;
  order_004_id uuid;
  order_005_id uuid;
  product_1_id uuid;
  product_2_id uuid;
  product_3_id uuid;
BEGIN
  -- Buscar IDs dos pedidos
  SELECT id INTO order_001_id FROM orders WHERE order_number = 'PED-001';
  SELECT id INTO order_002_id FROM orders WHERE order_number = 'PED-002';
  SELECT id INTO order_003_id FROM orders WHERE order_number = 'PED-003';
  SELECT id INTO order_004_id FROM orders WHERE order_number = 'PED-004';
  SELECT id INTO order_005_id FROM orders WHERE order_number = 'PED-005';

  -- Buscar alguns produtos para usar nos pedidos
  SELECT id INTO product_1_id FROM products LIMIT 1 OFFSET 0;
  SELECT id INTO product_2_id FROM products LIMIT 1 OFFSET 1;
  SELECT id INTO product_3_id FROM products LIMIT 1 OFFSET 2;

  -- Inserir itens do pedido 001
  INSERT INTO order_items (order_id, product_id, product_name, quantity, product_price, subtotal)
  VALUES 
    (order_001_id, product_1_id, 'Granola Artesanal 250g', 2, 24.90, 49.80),
    (order_001_id, product_2_id, 'Mix de Castanhas Premium 200g', 3, 43.30, 129.90);

  -- Inserir itens do pedido 002
  INSERT INTO order_items (order_id, product_id, product_name, quantity, product_price, subtotal, notes)
  VALUES 
    (order_002_id, product_3_id, 'Cranberries Desidratadas 150g', 1, 75.00, 75.00, 'Sem cobertura de merengue');

  -- Inserir itens do pedido 003
  INSERT INTO order_items (order_id, product_id, product_name, quantity, product_price, subtotal)
  VALUES 
    (order_003_id, product_1_id, 'Granola Artesanal 250g', 5, 24.90, 124.50),
    (order_003_id, product_2_id, 'Mix de Castanhas Premium 200g', 3, 43.30, 129.90),
    (order_003_id, product_3_id, 'Cranberries Desidratadas 150g', 2, 25.30, 50.60);

  -- Inserir itens do pedido 004
  INSERT INTO order_items (order_id, product_id, product_name, quantity, product_price, subtotal)
  VALUES 
    (order_004_id, product_2_id, 'Mix de Castanhas Premium 200g', 2, 42.00, 84.00);

  -- Inserir itens do pedido 005
  INSERT INTO order_items (order_id, product_id, product_name, quantity, product_price, subtotal)
  VALUES 
    (order_005_id, product_1_id, 'Granola Artesanal 250g', 4, 24.90, 99.60),
    (order_005_id, product_3_id, 'Cranberries Desidratadas 150g', 2, 28.20, 56.40);
END $$;

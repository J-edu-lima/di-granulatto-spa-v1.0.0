-- ============================================
-- SEED: Pedidos de Exemplo
-- ============================================
-- Popula a tabela de pedidos com dados de exemplo

-- Limpar dados existentes
DELETE FROM order_items;
DELETE FROM orders;

-- Inserir pedidos de exemplo
-- Pedido 1: Pendente
INSERT INTO orders (
  id,
  customer_name,
  customer_email,
  customer_phone,
  customer_address,
  status,
  payment_method,
  payment_status,
  total_amount,
  notes,
  created_at
) VALUES (
  gen_random_uuid(),
  'Maria Silva',
  'maria.silva@email.com',
  '(11) 98765-4321',
  'Rua das Flores, 123 - São Paulo, SP',
  'pending',
  'pix',
  'pending',
  145.50,
  'Pedido para festa de aniversário',
  NOW() - INTERVAL '2 hours'
);

-- Pedido 2: Confirmado
INSERT INTO orders (
  id,
  customer_name,
  customer_email,
  customer_phone,
  customer_address,
  status,
  payment_method,
  payment_status,
  total_amount,
  notes,
  created_at
) VALUES (
  gen_random_uuid(),
  'João Santos',
  'joao.santos@email.com',
  '(21) 91234-5678',
  'Av. Paulista, 456 - São Paulo, SP',
  'confirmed',
  'card',
  'paid',
  89.90,
  'Retirada no local',
  NOW() - INTERVAL '1 day'
);

-- Pedido 3: Em preparo
INSERT INTO orders (
  id,
  customer_name,
  customer_email,
  customer_phone,
  customer_address,
  status,
  payment_method,
  payment_status,
  total_amount,
  created_at
) VALUES (
  gen_random_uuid(),
  'Ana Costa',
  'ana.costa@email.com',
  '(11) 99876-5432',
  'Rua Augusta, 789 - São Paulo, SP',
  'preparing',
  'cash',
  'pending',
  234.00,
  NOW() - INTERVAL '3 hours'
);

-- Pedido 4: Pronto para entrega
INSERT INTO orders (
  id,
  customer_name,
  customer_email,
  customer_phone,
  customer_address,
  status,
  payment_method,
  payment_status,
  total_amount,
  notes,
  created_at
) VALUES (
  gen_random_uuid(),
  'Carlos Oliveira',
  'carlos.oliveira@email.com',
  '(11) 93456-7890',
  'Rua Oscar Freire, 321 - São Paulo, SP',
  'ready',
  'pix',
  'paid',
  178.50,
  'Entregar após 18h',
  NOW() - INTERVAL '5 hours'
);

-- Pedido 5: Entregue
INSERT INTO orders (
  id,
  customer_name,
  customer_email,
  customer_phone,
  customer_address,
  status,
  payment_method,
  payment_status,
  total_amount,
  notes,
  created_at,
  delivered_at
) VALUES (
  gen_random_uuid(),
  'Patricia Mendes',
  'patricia.mendes@email.com',
  '(11) 98123-4567',
  'Av. Faria Lima, 654 - São Paulo, SP',
  'delivered',
  'card',
  'paid',
  312.00,
  'Pedido entregue com sucesso',
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '1 day'
);

-- Inserir itens dos pedidos (relacionados aos produtos existentes)
-- Precisamos buscar IDs de produtos existentes primeiro
DO $$
DECLARE
  order_id_1 uuid;
  order_id_2 uuid;
  order_id_3 uuid;
  order_id_4 uuid;
  order_id_5 uuid;
  product_ids uuid[];
BEGIN
  -- Buscar os IDs dos pedidos criados
  SELECT id INTO order_id_1 FROM orders WHERE customer_email = 'maria.silva@email.com';
  SELECT id INTO order_id_2 FROM orders WHERE customer_email = 'joao.santos@email.com';
  SELECT id INTO order_id_3 FROM orders WHERE customer_email = 'ana.costa@email.com';
  SELECT id INTO order_id_4 FROM orders WHERE customer_email = 'carlos.oliveira@email.com';
  SELECT id INTO order_id_5 FROM orders WHERE customer_email = 'patricia.mendes@email.com';
  
  -- Buscar alguns IDs de produtos
  SELECT ARRAY_AGG(id) INTO product_ids FROM products LIMIT 10;
  
  -- Itens do Pedido 1
  IF array_length(product_ids, 1) >= 1 THEN
    INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
    VALUES (order_id_1, product_ids[1], 2, 45.00, 90.00);
    
    INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
    VALUES (order_id_1, product_ids[2], 1, 55.50, 55.50);
  END IF;
  
  -- Itens do Pedido 2
  IF array_length(product_ids, 1) >= 3 THEN
    INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
    VALUES (order_id_2, product_ids[3], 3, 29.90, 89.70);
  END IF;
  
  -- Itens do Pedido 3
  IF array_length(product_ids, 1) >= 5 THEN
    INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
    VALUES (order_id_3, product_ids[4], 1, 120.00, 120.00);
    
    INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
    VALUES (order_id_3, product_ids[5], 2, 57.00, 114.00);
  END IF;
  
  -- Itens do Pedido 4
  IF array_length(product_ids, 1) >= 7 THEN
    INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
    VALUES (order_id_4, product_ids[6], 1, 89.00, 89.00);
    
    INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
    VALUES (order_id_4, product_ids[7], 1, 89.50, 89.50);
  END IF;
  
  -- Itens do Pedido 5
  IF array_length(product_ids, 1) >= 10 THEN
    INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
    VALUES (order_id_5, product_ids[8], 2, 78.00, 156.00);
    
    INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
    VALUES (order_id_5, product_ids[9], 1, 78.00, 78.00);
    
    INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
    VALUES (order_id_5, product_ids[10], 1, 78.00, 78.00);
  END IF;
END $$;

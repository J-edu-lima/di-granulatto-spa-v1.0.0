-- Seed Orders Data (v3 - with correct column names)
-- Populates orders and order_items tables with example data

-- Clear existing data
DELETE FROM order_items;
DELETE FROM orders;

-- Get some product IDs to use in orders
DO $$
DECLARE
  prod1_id uuid;
  prod2_id uuid;
  prod3_id uuid;
  prod4_id uuid;
  order1_id uuid;
  order2_id uuid;
  order3_id uuid;
  order4_id uuid;
  order5_id uuid;
BEGIN
  -- Get product IDs (first 4 products)
  SELECT id INTO prod1_id FROM products LIMIT 1 OFFSET 0;
  SELECT id INTO prod2_id FROM products LIMIT 1 OFFSET 1;
  SELECT id INTO prod3_id FROM products LIMIT 1 OFFSET 2;
  SELECT id INTO prod4_id FROM products LIMIT 1 OFFSET 3;

  -- Generate order IDs
  order1_id := gen_random_uuid();
  order2_id := gen_random_uuid();
  order3_id := gen_random_uuid();
  order4_id := gen_random_uuid();
  order5_id := gen_random_uuid();

  -- Order 1: Pending (recent order)
  INSERT INTO orders (
    id, order_number, customer_name, customer_email, customer_phone,
    customer_address, subtotal, delivery_fee, discount, total,
    status, payment_status, payment_method, customer_notes,
    created_at, updated_at
  ) VALUES (
    order1_id, 'PED-001', 'Maria Silva', 'maria.silva@email.com', '(11) 98765-4321',
    'Rua das Flores, 123 - Jardim Paulista, São Paulo - SP, 01452-000',
    125.80, 15.00, 0.00, 140.80,
    'pending', 'pending', 'pix', 'Entregar após 18h, por favor',
    NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours'
  );

  -- Order 1 Items
  INSERT INTO order_items (order_id, product_id, product_name, quantity, product_price, subtotal, created_at)
  VALUES 
    (order1_id, prod1_id, 'Granola Tradicional 500g', 2, 32.90, 65.80, NOW() - INTERVAL '2 hours'),
    (order1_id, prod2_id, 'Mix de Castanhas Premium 300g', 1, 45.00, 45.00, NOW() - INTERVAL '2 hours'),
    (order1_id, prod3_id, 'Damasco Seco 200g', 1, 15.00, 15.00, NOW() - INTERVAL '2 hours');

  -- Order 2: Confirmed (processing)
  INSERT INTO orders (
    id, order_number, customer_name, customer_email, customer_phone,
    customer_address, subtotal, delivery_fee, discount, total,
    status, payment_status, payment_method, customer_notes,
    created_at, updated_at
  ) VALUES (
    order2_id, 'PED-002', 'João Santos', 'joao.santos@email.com', '(11) 97654-3210',
    'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
    198.50, 12.00, 20.00, 190.50,
    'confirmed', 'paid', 'card', NULL,
    NOW() - INTERVAL '1 day', NOW() - INTERVAL '23 hours'
  );

  -- Order 2 Items
  INSERT INTO order_items (order_id, product_id, product_name, quantity, product_price, subtotal, created_at)
  VALUES 
    (order2_id, prod1_id, 'Granola Tradicional 500g', 3, 32.90, 98.70, NOW() - INTERVAL '1 day'),
    (order2_id, prod2_id, 'Mix de Castanhas Premium 300g', 2, 45.00, 90.00, NOW() - INTERVAL '1 day'),
    (order2_id, prod4_id, 'Tâmaras Secas 250g', 1, 9.80, 9.80, NOW() - INTERVAL '1 day');

  -- Order 3: Preparing (being prepared)
  INSERT INTO orders (
    id, order_number, customer_name, customer_email, customer_phone,
    customer_address, subtotal, delivery_fee, discount, total,
    status, payment_status, payment_method, customer_notes,
    created_at, updated_at
  ) VALUES (
    order3_id, 'PED-003', 'Ana Costa', 'ana.costa@email.com', '(11) 96543-2109',
    'Rua Augusta, 2690 - Cerqueira César, São Paulo - SP, 01412-100',
    87.90, 10.00, 0.00, 97.90,
    'preparing', 'paid', 'pix', 'Sem cebola, por favor',
    NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day 12 hours'
  );

  -- Order 3 Items
  INSERT INTO order_items (order_id, product_id, product_name, quantity, product_price, subtotal, created_at)
  VALUES 
    (order3_id, prod2_id, 'Mix de Castanhas Premium 300g', 1, 45.00, 45.00, NOW() - INTERVAL '2 days'),
    (order3_id, prod3_id, 'Damasco Seco 200g', 2, 15.00, 30.00, NOW() - INTERVAL '2 days'),
    (order3_id, prod4_id, 'Tâmaras Secas 250g', 1, 9.80, 9.80, NOW() - INTERVAL '2 days'),
    (order3_id, prod1_id, 'Granola Tradicional 500g', 1, 32.90, 32.90, NOW() - INTERVAL '2 days');

  -- Order 4: Ready (ready for delivery)
  INSERT INTO orders (
    id, order_number, customer_name, customer_email, customer_phone,
    customer_address, subtotal, delivery_fee, discount, total,
    status, payment_status, payment_method,
    created_at, updated_at
  ) VALUES (
    order4_id, 'PED-004', 'Pedro Oliveira', 'pedro.oliveira@email.com', '(11) 95432-1098',
    'Rua Oscar Freire, 379 - Jardim Paulista, São Paulo - SP, 01426-001',
    156.70, 15.00, 15.00, 156.70,
    'ready', 'paid', 'cash',
    NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days' + INTERVAL '6 hours'
  );

  -- Order 4 Items
  INSERT INTO order_items (order_id, product_id, product_name, quantity, product_price, subtotal, created_at)
  VALUES 
    (order4_id, prod1_id, 'Granola Tradicional 500g', 2, 32.90, 65.80, NOW() - INTERVAL '3 days'),
    (order4_id, prod2_id, 'Mix de Castanhas Premium 300g', 2, 45.00, 90.00, NOW() - INTERVAL '3 days');

  -- Order 5: Delivered (completed)
  INSERT INTO orders (
    id, order_number, customer_name, customer_email, customer_phone,
    customer_address, subtotal, delivery_fee, discount, total,
    status, payment_status, payment_method, customer_notes,
    created_at, updated_at
  ) VALUES (
    order5_id, 'PED-005', 'Carla Mendes', 'carla.mendes@email.com', '(11) 94321-0987',
    'Alameda Santos, 2441 - Cerqueira César, São Paulo - SP, 01419-002',
    234.50, 18.00, 25.00, 227.50,
    'delivered', 'paid', 'pix', 'Produto de excelente qualidade! Obrigada!',
    NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days'
  );

  -- Order 5 Items
  INSERT INTO order_items (order_id, product_id, product_name, quantity, product_price, subtotal, created_at)
  VALUES 
    (order5_id, prod1_id, 'Granola Tradicional 500g', 4, 32.90, 131.60, NOW() - INTERVAL '5 days'),
    (order5_id, prod2_id, 'Mix de Castanhas Premium 300g', 2, 45.00, 90.00, NOW() - INTERVAL '5 days'),
    (order5_id, prod3_id, 'Damasco Seco 200g', 1, 15.00, 15.00, NOW() - INTERVAL '5 days');

END $$;

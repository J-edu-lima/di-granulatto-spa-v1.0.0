-- 013: Seed de pedidos mockados para exemplo
-- Limpa dados anteriores
DELETE FROM order_items;
DELETE FROM orders;

-- ============================================================
-- Pedido 1 — Entregue, pagamento Pix
-- ============================================================
INSERT INTO orders (
  id, order_number, customer_name, customer_email, customer_phone,
  customer_address, customer_notes, status, payment_method, payment_status,
  subtotal, discount, delivery_fee, total, created_at, updated_at
) VALUES (
  '11111111-0000-0000-0000-000000000001',
  'PED-001',
  'Ana Souza',
  'ana.souza@email.com',
  '11999990001',
  'Rua das Flores, 123 - Jardim Primavera, São Paulo - SP',
  'Sem cebola, por favor.',
  'delivered',
  'pix',
  'paid',
  58.00, 0.00, 5.00, 63.00,
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '3 days'
);

INSERT INTO order_items (id, order_id, product_id, product_name, product_price, quantity, subtotal, notes)
VALUES
  (gen_random_uuid(), '11111111-0000-0000-0000-000000000001', NULL, 'Pão de Mel Tradicional', 12.00, 2, 24.00, NULL),
  (gen_random_uuid(), '11111111-0000-0000-0000-000000000001', NULL, 'Brigadeiro Gourmet (cx 9un)', 22.00, 1, 22.00, NULL),
  (gen_random_uuid(), '11111111-0000-0000-0000-000000000001', NULL, 'Palha Italiana', 12.00, 1, 12.00, NULL);

-- ============================================================
-- Pedido 2 — Em preparo, pagamento Dinheiro
-- ============================================================
INSERT INTO orders (
  id, order_number, customer_name, customer_email, customer_phone,
  customer_address, customer_notes, status, payment_method, payment_status,
  subtotal, discount, delivery_fee, total, created_at, updated_at
) VALUES (
  '22222222-0000-0000-0000-000000000002',
  'PED-002',
  'Carlos Mendes',
  'carlos.mendes@email.com',
  '11999990002',
  'Av. Paulista, 1500 - Bela Vista, São Paulo - SP',
  NULL,
  'preparing',
  'cash',
  'pending',
  45.00, 5.00, 0.00, 40.00,
  NOW() - INTERVAL '2 hours',
  NOW() - INTERVAL '1 hour'
);

INSERT INTO order_items (id, order_id, product_id, product_name, product_price, quantity, subtotal, notes)
VALUES
  (gen_random_uuid(), '22222222-0000-0000-0000-000000000002', NULL, 'Bolo de Cenoura com Brigadeiro', 45.00, 1, 45.00, 'Para aniversário - escrever "Feliz Aniversário Carlos"');

-- ============================================================
-- Pedido 3 — Confirmado, pagamento Cartão
-- ============================================================
INSERT INTO orders (
  id, order_number, customer_name, customer_email, customer_phone,
  customer_address, customer_notes, status, payment_method, payment_status,
  subtotal, discount, delivery_fee, total, created_at, updated_at
) VALUES (
  '33333333-0000-0000-0000-000000000003',
  'PED-003',
  'Fernanda Lima',
  'fernanda.lima@email.com',
  '11999990003',
  'Rua Augusta, 200 - Consolação, São Paulo - SP',
  'Entregar no portão lateral.',
  'confirmed',
  'card',
  'paid',
  96.00, 0.00, 8.00, 104.00,
  NOW() - INTERVAL '5 hours',
  NOW() - INTERVAL '4 hours'
);

INSERT INTO order_items (id, order_id, product_id, product_name, product_price, quantity, subtotal, notes)
VALUES
  (gen_random_uuid(), '33333333-0000-0000-0000-000000000003', NULL, 'Brownie de Chocolate com Nozes', 8.00, 6, 48.00, NULL),
  (gen_random_uuid(), '33333333-0000-0000-0000-000000000003', NULL, 'Trufa de Maracujá (cx 6un)', 24.00, 2, 48.00, NULL);

-- ============================================================
-- Pedido 4 — Pronto para retirada, pagamento Pix
-- ============================================================
INSERT INTO orders (
  id, order_number, customer_name, customer_email, customer_phone,
  customer_address, customer_notes, status, payment_method, payment_status,
  subtotal, discount, delivery_fee, total, created_at, updated_at
) VALUES (
  '44444444-0000-0000-0000-000000000004',
  'PED-004',
  'Roberto Alves',
  'roberto.alves@email.com',
  '11999990004',
  NULL,
  'Vou retirar pessoalmente.',
  'ready',
  'pix',
  'paid',
  36.00, 0.00, 0.00, 36.00,
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '6 hours'
);

INSERT INTO order_items (id, order_id, product_id, product_name, product_price, quantity, subtotal, notes)
VALUES
  (gen_random_uuid(), '44444444-0000-0000-0000-000000000004', NULL, 'Beijinho de Coco (cx 12un)', 18.00, 2, 36.00, NULL);

-- ============================================================
-- Pedido 5 — Pendente, pagamento Cartão
-- ============================================================
INSERT INTO orders (
  id, order_number, customer_name, customer_email, customer_phone,
  customer_address, customer_notes, status, payment_method, payment_status,
  subtotal, discount, delivery_fee, total, created_at, updated_at
) VALUES (
  '55555555-0000-0000-0000-000000000005',
  'PED-005',
  'Juliana Costa',
  'juliana.costa@email.com',
  '11999990005',
  'Rua Oscar Freire, 88 - Jardins, São Paulo - SP',
  NULL,
  'pending',
  'card',
  'pending',
  130.00, 10.00, 10.00, 130.00,
  NOW() - INTERVAL '30 minutes',
  NOW() - INTERVAL '30 minutes'
);

INSERT INTO order_items (id, order_id, product_id, product_name, product_price, quantity, subtotal, notes)
VALUES
  (gen_random_uuid(), '55555555-0000-0000-0000-000000000005', NULL, 'Cesta de Doces Sortidos', 90.00, 1, 90.00, NULL),
  (gen_random_uuid(), '55555555-0000-0000-0000-000000000005', NULL, 'Pão de Mel Tradicional', 12.00, 2, 24.00, NULL),
  (gen_random_uuid(), '55555555-0000-0000-0000-000000000005', NULL, 'Brigadeiro Gourmet (cx 9un)', 22.00, 1, 16.00, NULL);

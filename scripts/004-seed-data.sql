-- ===========================================
-- SEED DATA - Di'Granulatto SPA
-- ===========================================
-- Dados iniciais para popular o banco de dados.
-- Execute este script após criar as tabelas.

-- ============================================
-- CATEGORIAS
-- ============================================

INSERT INTO categories (name, slug, description, display_order, is_active) VALUES
('Granolas', 'granolas', 'Granolas artesanais feitas com ingredientes selecionados', 1, true),
('Castanhas e Nozes', 'castanhas-nozes', 'Mix de castanhas e nozes premium', 2, true),
('Frutas Secas', 'frutas-secas', 'Frutas desidratadas naturalmente', 3, true),
('Cereais', 'cereais', 'Cereais integrais e naturais', 4, true),
('Sementes', 'sementes', 'Sementes nutritivas para sua alimentação', 5, true),
('Farinhas', 'farinhas', 'Farinhas especiais e integrais', 6, true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- PRODUTOS
-- ============================================

-- Granolas
INSERT INTO products (category_id, name, slug, description, short_description, price, original_price, is_featured, is_active, stock_quantity, unit, tags) 
SELECT 
  c.id,
  'Granola Tradicional',
  'granola-tradicional',
  'Nossa granola tradicional é preparada com aveia, mel, castanhas e frutas secas selecionadas. Uma opção nutritiva e deliciosa para começar o dia.',
  'Granola artesanal com mel e castanhas',
  24.90,
  29.90,
  true,
  true,
  100,
  'kg',
  ARRAY['sem conservantes', 'artesanal', 'integral']
FROM categories c WHERE c.slug = 'granolas'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name, slug, description, short_description, price, is_featured, is_active, stock_quantity, unit, tags) 
SELECT 
  c.id,
  'Granola Light',
  'granola-light',
  'Granola com baixo teor de açúcar, ideal para quem busca uma alimentação mais leve sem abrir mão do sabor.',
  'Granola com baixo teor de açúcar',
  27.90,
  true,
  true,
  80,
  'kg',
  ARRAY['light', 'baixo açúcar', 'integral']
FROM categories c WHERE c.slug = 'granolas'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name, slug, description, short_description, price, is_featured, is_active, stock_quantity, unit, tags) 
SELECT 
  c.id,
  'Granola com Cacau',
  'granola-cacau',
  'Granola especial com cacau 100% natural, perfeita para os amantes de chocolate.',
  'Granola com cacau natural',
  29.90,
  false,
  true,
  60,
  'kg',
  ARRAY['cacau', 'chocolate', 'artesanal']
FROM categories c WHERE c.slug = 'granolas'
ON CONFLICT (slug) DO NOTHING;

-- Castanhas e Nozes
INSERT INTO products (category_id, name, slug, description, short_description, price, is_featured, is_active, stock_quantity, unit, tags) 
SELECT 
  c.id,
  'Castanha de Caju',
  'castanha-caju',
  'Castanhas de caju selecionadas, torradas e levemente salgadas. Ricas em gorduras boas e minerais.',
  'Castanhas de caju torradas',
  89.90,
  true,
  true,
  50,
  'kg',
  ARRAY['torrada', 'premium', 'proteína']
FROM categories c WHERE c.slug = 'castanhas-nozes'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name, slug, description, short_description, price, is_featured, is_active, stock_quantity, unit, tags) 
SELECT 
  c.id,
  'Castanha do Pará',
  'castanha-para',
  'Castanhas do Pará da Amazônia, fonte natural de selênio e nutrientes essenciais.',
  'Castanhas do Pará naturais',
  79.90,
  true,
  true,
  40,
  'kg',
  ARRAY['amazônia', 'selênio', 'natural']
FROM categories c WHERE c.slug = 'castanhas-nozes'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name, slug, description, short_description, price, is_featured, is_active, stock_quantity, unit, tags) 
SELECT 
  c.id,
  'Mix de Nozes',
  'mix-nozes',
  'Mix especial com nozes, amêndoas, castanhas e avelãs. Perfeito para lanches saudáveis.',
  'Mix premium de nozes variadas',
  99.90,
  false,
  true,
  30,
  'kg',
  ARRAY['mix', 'premium', 'variado']
FROM categories c WHERE c.slug = 'castanhas-nozes'
ON CONFLICT (slug) DO NOTHING;

-- Frutas Secas
INSERT INTO products (category_id, name, slug, description, short_description, price, is_featured, is_active, stock_quantity, unit, tags) 
SELECT 
  c.id,
  'Damasco Seco',
  'damasco-seco',
  'Damascos turcos desidratados naturalmente, macios e saborosos. Ricos em fibras e vitaminas.',
  'Damascos desidratados naturais',
  59.90,
  false,
  true,
  45,
  'kg',
  ARRAY['natural', 'fibras', 'vitaminas']
FROM categories c WHERE c.slug = 'frutas-secas'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name, slug, description, short_description, price, is_featured, is_active, stock_quantity, unit, tags) 
SELECT 
  c.id,
  'Uva Passa',
  'uva-passa',
  'Uvas passas escuras sem sementes, ideais para receitas e consumo direto.',
  'Uvas passas escuras selecionadas',
  34.90,
  false,
  true,
  70,
  'kg',
  ARRAY['sem sementes', 'natural', 'versátil']
FROM categories c WHERE c.slug = 'frutas-secas'
ON CONFLICT (slug) DO NOTHING;

-- Sementes
INSERT INTO products (category_id, name, slug, description, short_description, price, is_featured, is_active, stock_quantity, unit, tags) 
SELECT 
  c.id,
  'Chia',
  'chia',
  'Sementes de chia ricas em ômega-3, fibras e proteínas. Versáteis para diversas receitas.',
  'Sementes de chia premium',
  39.90,
  true,
  true,
  90,
  'kg',
  ARRAY['ômega-3', 'fibras', 'superalimento']
FROM categories c WHERE c.slug = 'sementes'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name, slug, description, short_description, price, is_featured, is_active, stock_quantity, unit, tags) 
SELECT 
  c.id,
  'Linhaça Dourada',
  'linhaca-dourada',
  'Sementes de linhaça dourada, fonte de fibras e ácidos graxos essenciais.',
  'Linhaça dourada natural',
  29.90,
  false,
  true,
  85,
  'kg',
  ARRAY['fibras', 'ômega-3', 'natural']
FROM categories c WHERE c.slug = 'sementes'
ON CONFLICT (slug) DO NOTHING;

-- Farinhas
INSERT INTO products (category_id, name, slug, description, short_description, price, is_featured, is_active, stock_quantity, unit, tags) 
SELECT 
  c.id,
  'Farinha de Amêndoas',
  'farinha-amendoas',
  'Farinha de amêndoas fina, ideal para receitas low carb e sem glúten.',
  'Farinha de amêndoas premium',
  69.90,
  false,
  true,
  35,
  'kg',
  ARRAY['sem glúten', 'low carb', 'premium']
FROM categories c WHERE c.slug = 'farinhas'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name, slug, description, short_description, price, is_featured, is_active, stock_quantity, unit, tags) 
SELECT 
  c.id,
  'Farinha de Aveia',
  'farinha-aveia',
  'Farinha de aveia integral, versátil para diversas preparações saudáveis.',
  'Farinha de aveia integral',
  19.90,
  false,
  true,
  100,
  'kg',
  ARRAY['integral', 'fibras', 'versátil']
FROM categories c WHERE c.slug = 'farinhas'
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- FAQs
-- ============================================

INSERT INTO faqs (question, answer, category, display_order, is_active) VALUES
('Como faço um pedido?', 'Você pode fazer seu pedido diretamente pelo nosso site, adicionando os produtos ao carrinho e finalizando pelo WhatsApp. Nossa equipe entrará em contato para confirmar o pedido e combinar a entrega.', 'Pedidos', 1, true),
('Qual o prazo de entrega?', 'O prazo de entrega varia de acordo com a sua localização. Para a região metropolitana, entregamos em até 3 dias úteis. Para outras regiões, o prazo pode ser de 5 a 10 dias úteis.', 'Pedidos', 2, true),
('Vocês fazem entregas para todo o Brasil?', 'Sim! Realizamos entregas para todo o território nacional através dos Correios ou transportadoras parceiras.', 'Entregas', 3, true),
('Qual o valor mínimo para pedido?', 'O valor mínimo para pedidos com entrega é de R$ 50,00. Para retirada na loja, não há valor mínimo.', 'Pedidos', 4, true),
('Os produtos são naturais?', 'Sim! Todos os nossos produtos são 100% naturais, sem conservantes artificiais ou aditivos químicos. Trabalhamos apenas com ingredientes de qualidade.', 'Produtos', 5, true),
('Como armazenar os produtos?', 'Recomendamos armazenar em local fresco e seco, longe da luz solar direta. Após aberto, mantenha em recipiente fechado para preservar a qualidade.', 'Produtos', 6, true),
('Vocês têm produtos sem glúten?', 'Sim! Temos diversas opções sem glúten como farinhas de amêndoas, castanhas e sementes. Verifique a descrição de cada produto para mais informações.', 'Produtos', 7, true),
('Quais as formas de pagamento?', 'Aceitamos PIX, cartões de crédito e débito, e transferência bancária. O pagamento é realizado no momento da confirmação do pedido.', 'Pagamentos', 8, true)
ON CONFLICT DO NOTHING;

-- ============================================
-- CONTEÚDO DO SITE
-- ============================================

INSERT INTO site_content (key, title, content, metadata) VALUES
('about', 'Sobre a Di''Granulatto', 'A Di''Granulatto nasceu da paixão por alimentação saudável e natural. Há mais de 10 anos, oferecemos produtos de qualidade, selecionados com carinho para você e sua família. Nossa missão é proporcionar sabor e saúde em cada grão.', '{"founded": "2014", "location": "São Paulo, SP"}'),
('contact', 'Entre em Contato', 'Estamos sempre prontos para atender você! Entre em contato conosco através do WhatsApp ou visite nossa loja física.', '{"phone": "(11) 99999-9999", "email": "contato@digranulatto.com.br", "address": "Rua das Granolas, 123 - São Paulo, SP"}'),
('delivery', 'Informações de Entrega', 'Realizamos entregas para todo o Brasil. Consulte prazos e valores no momento da finalização do pedido.', '{"freeShippingMinimum": 150}')
ON CONFLICT (key) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

-- =====================================================
-- SCRIPT DE SEED - Di'Granulatto SPA
-- Versão: 2.0 (Corrigido para schema atual)
-- =====================================================

-- Limpar dados existentes (na ordem correta por causa das FKs)
TRUNCATE TABLE order_items CASCADE;
TRUNCATE TABLE orders CASCADE;
TRUNCATE TABLE products CASCADE;
TRUNCATE TABLE categories CASCADE;
TRUNCATE TABLE faqs CASCADE;
TRUNCATE TABLE site_content CASCADE;

-- =====================================================
-- CATEGORIAS
-- =====================================================
INSERT INTO categories (id, name, slug, description, image_url, sort_order, is_active) VALUES
  (gen_random_uuid(), 'Granolas', 'granolas', 'Granolas artesanais feitas com ingredientes selecionados', '/images/categories/granolas.jpg', 1, true),
  (gen_random_uuid(), 'Castanhas', 'castanhas', 'Castanhas premium torradas e naturais', '/images/categories/castanhas.jpg', 2, true),
  (gen_random_uuid(), 'Frutas Secas', 'frutas-secas', 'Frutas desidratadas naturalmente', '/images/categories/frutas-secas.jpg', 3, true),
  (gen_random_uuid(), 'Mix de Nuts', 'mix-de-nuts', 'Combinações especiais de castanhas e frutas', '/images/categories/mix-nuts.jpg', 4, true),
  (gen_random_uuid(), 'Sementes', 'sementes', 'Sementes nutritivas para sua alimentação', '/images/categories/sementes.jpg', 5, true),
  (gen_random_uuid(), 'Snacks Saudáveis', 'snacks-saudaveis', 'Lanches práticos e nutritivos', '/images/categories/snacks.jpg', 6, true);

-- =====================================================
-- PRODUTOS
-- =====================================================
-- Granolas
INSERT INTO products (id, name, slug, description, short_description, price, original_price, image_url, images, category_id, stock_quantity, is_active, is_featured, sku, tags) VALUES
  (
    gen_random_uuid(),
    'Granola Tradicional',
    'granola-tradicional',
    'Nossa granola tradicional é feita com aveia, mel puro, castanhas selecionadas e frutas secas. Perfeita para o café da manhã ou como lanche.',
    'Granola artesanal com mel e castanhas',
    29.90,
    NULL,
    '/images/products/granola-tradicional.jpg',
    ARRAY['/images/products/granola-tradicional.jpg', '/images/products/granola-tradicional-2.jpg'],
    (SELECT id FROM categories WHERE slug = 'granolas'),
    100,
    true,
    true,
    'GRN-001',
    ARRAY['sem conservantes', 'artesanal', 'café da manhã']
  ),
  (
    gen_random_uuid(),
    'Granola com Cacau',
    'granola-com-cacau',
    'Granola especial com cacau 100% natural, aveia integral e pedaços de chocolate meio amargo. Uma delícia para os amantes de chocolate.',
    'Granola com cacau e chocolate meio amargo',
    34.90,
    39.90,
    '/images/products/granola-cacau.jpg',
    ARRAY['/images/products/granola-cacau.jpg'],
    (SELECT id FROM categories WHERE slug = 'granolas'),
    80,
    true,
    true,
    'GRN-002',
    ARRAY['chocolate', 'cacau', 'sem glúten']
  ),
  (
    gen_random_uuid(),
    'Granola Low Carb',
    'granola-low-carb',
    'Granola especialmente desenvolvida para dietas low carb, com sementes, coco e adoçante natural.',
    'Granola sem açúcar para dietas low carb',
    39.90,
    NULL,
    '/images/products/granola-lowcarb.jpg',
    ARRAY['/images/products/granola-lowcarb.jpg'],
    (SELECT id FROM categories WHERE slug = 'granolas'),
    60,
    true,
    false,
    'GRN-003',
    ARRAY['low carb', 'sem açúcar', 'diet']
  );

-- Castanhas
INSERT INTO products (id, name, slug, description, short_description, price, original_price, image_url, images, category_id, stock_quantity, is_active, is_featured, sku, tags) VALUES
  (
    gen_random_uuid(),
    'Castanha do Pará Premium',
    'castanha-do-para-premium',
    'Castanhas do Pará selecionadas, colhidas na Amazônia. Ricas em selênio e ômega 3.',
    'Castanhas da Amazônia ricas em selênio',
    45.90,
    NULL,
    '/images/products/castanha-para.jpg',
    ARRAY['/images/products/castanha-para.jpg'],
    (SELECT id FROM categories WHERE slug = 'castanhas'),
    50,
    true,
    true,
    'CST-001',
    ARRAY['amazônia', 'selênio', 'premium']
  ),
  (
    gen_random_uuid(),
    'Castanha de Caju Torrada',
    'castanha-de-caju-torrada',
    'Castanhas de caju crocantes, levemente torradas com sal rosa do Himalaia.',
    'Caju torrado com sal rosa',
    38.90,
    42.90,
    '/images/products/castanha-caju.jpg',
    ARRAY['/images/products/castanha-caju.jpg'],
    (SELECT id FROM categories WHERE slug = 'castanhas'),
    70,
    true,
    false,
    'CST-002',
    ARRAY['torrada', 'sal rosa', 'crocante']
  ),
  (
    gen_random_uuid(),
    'Amêndoas Californianas',
    'amendoas-californianas',
    'Amêndoas importadas da Califórnia, naturais e sem sal. Excelente fonte de vitamina E.',
    'Amêndoas naturais importadas',
    42.90,
    NULL,
    '/images/products/amendoas.jpg',
    ARRAY['/images/products/amendoas.jpg'],
    (SELECT id FROM categories WHERE slug = 'castanhas'),
    65,
    true,
    false,
    'CST-003',
    ARRAY['importada', 'vitamina E', 'natural']
  );

-- Frutas Secas
INSERT INTO products (id, name, slug, description, short_description, price, original_price, image_url, images, category_id, stock_quantity, is_active, is_featured, sku, tags) VALUES
  (
    gen_random_uuid(),
    'Damasco Turco',
    'damasco-turco',
    'Damascos importados da Turquia, sem adição de açúcar. Macios e naturalmente doces.',
    'Damascos turcos naturais e macios',
    32.90,
    NULL,
    '/images/products/damasco.jpg',
    ARRAY['/images/products/damasco.jpg'],
    (SELECT id FROM categories WHERE slug = 'frutas-secas'),
    40,
    true,
    true,
    'FRT-001',
    ARRAY['importado', 'sem açúcar', 'turquia']
  ),
  (
    gen_random_uuid(),
    'Cranberry Desidratado',
    'cranberry-desidratado',
    'Cranberries desidratadas, ricas em antioxidantes. Perfeitas para saladas e lanches.',
    'Cranberries ricas em antioxidantes',
    36.90,
    NULL,
    '/images/products/cranberry.jpg',
    ARRAY['/images/products/cranberry.jpg'],
    (SELECT id FROM categories WHERE slug = 'frutas-secas'),
    55,
    true,
    false,
    'FRT-002',
    ARRAY['antioxidante', 'salada', 'lanche']
  ),
  (
    gen_random_uuid(),
    'Uva Passa Preta',
    'uva-passa-preta',
    'Uvas passas pretas sem sementes, naturalmente doces e macias.',
    'Uvas passas sem sementes',
    18.90,
    NULL,
    '/images/products/uva-passa.jpg',
    ARRAY['/images/products/uva-passa.jpg'],
    (SELECT id FROM categories WHERE slug = 'frutas-secas'),
    90,
    true,
    false,
    'FRT-003',
    ARRAY['sem sementes', 'doce natural', 'versátil']
  );

-- Mix de Nuts
INSERT INTO products (id, name, slug, description, short_description, price, original_price, image_url, images, category_id, stock_quantity, is_active, is_featured, sku, tags) VALUES
  (
    gen_random_uuid(),
    'Mix Energia',
    'mix-energia',
    'Combinação perfeita de castanhas, frutas secas e sementes para dar energia ao seu dia.',
    'Mix energético de castanhas e frutas',
    48.90,
    54.90,
    '/images/products/mix-energia.jpg',
    ARRAY['/images/products/mix-energia.jpg'],
    (SELECT id FROM categories WHERE slug = 'mix-de-nuts'),
    45,
    true,
    true,
    'MIX-001',
    ARRAY['energia', 'pré-treino', 'nutritivo']
  ),
  (
    gen_random_uuid(),
    'Mix Tropical',
    'mix-tropical',
    'Mistura tropical com coco, castanha de caju, macadâmia e frutas exóticas desidratadas.',
    'Mix com sabores tropicais brasileiros',
    52.90,
    NULL,
    '/images/products/mix-tropical.jpg',
    ARRAY['/images/products/mix-tropical.jpg'],
    (SELECT id FROM categories WHERE slug = 'mix-de-nuts'),
    35,
    true,
    false,
    'MIX-002',
    ARRAY['tropical', 'coco', 'brasileiro']
  );

-- Sementes
INSERT INTO products (id, name, slug, description, short_description, price, original_price, image_url, images, category_id, stock_quantity, is_active, is_featured, sku, tags) VALUES
  (
    gen_random_uuid(),
    'Semente de Chia',
    'semente-de-chia',
    'Sementes de chia orgânicas, ricas em ômega 3 e fibras. Perfeitas para smoothies e receitas.',
    'Chia orgânica rica em ômega 3',
    24.90,
    NULL,
    '/images/products/chia.jpg',
    ARRAY['/images/products/chia.jpg'],
    (SELECT id FROM categories WHERE slug = 'sementes'),
    80,
    true,
    false,
    'SEM-001',
    ARRAY['orgânico', 'ômega 3', 'fibras']
  ),
  (
    gen_random_uuid(),
    'Linhaça Dourada',
    'linhaca-dourada',
    'Linhaça dourada moída na hora, preservando todos os nutrientes. Fonte de lignanas.',
    'Linhaça dourada fonte de lignanas',
    19.90,
    NULL,
    '/images/products/linhaca.jpg',
    ARRAY['/images/products/linhaca.jpg'],
    (SELECT id FROM categories WHERE slug = 'sementes'),
    70,
    true,
    false,
    'SEM-002',
    ARRAY['lignanas', 'moída', 'dourada']
  );

-- =====================================================
-- FAQs
-- =====================================================
INSERT INTO faqs (id, question, answer, category, sort_order, is_active) VALUES
  (gen_random_uuid(), 'Qual o prazo de validade dos produtos?', 'Nossos produtos têm validade média de 6 meses quando armazenados corretamente em local fresco e seco, longe da luz solar direta.', 'Produtos', 1, true),
  (gen_random_uuid(), 'Os produtos contêm glúten?', 'Trabalhamos com produtos com e sem glúten. Cada produto tem sua informação nutricional detalhada na embalagem. Consulte a descrição de cada item.', 'Produtos', 2, true),
  (gen_random_uuid(), 'Como funciona a entrega?', 'Realizamos entregas em toda a região. O prazo varia de 1 a 5 dias úteis dependendo da localização. Frete grátis para compras acima de R$ 150,00.', 'Entregas', 3, true),
  (gen_random_uuid(), 'Posso retirar meu pedido na loja?', 'Sim! Oferecemos a opção de retirada em nossa loja física. Após a confirmação do pedido, seu produto estará disponível em até 2 horas.', 'Entregas', 4, true),
  (gen_random_uuid(), 'Quais formas de pagamento são aceitas?', 'Aceitamos PIX, cartões de crédito e débito de todas as bandeiras, e boleto bancário. Parcelamos em até 3x sem juros.', 'Pagamentos', 5, true),
  (gen_random_uuid(), 'Os produtos são orgânicos?', 'Parte de nossa linha é certificada como orgânica. Os produtos orgânicos são identificados com selo específico na embalagem e na descrição do site.', 'Produtos', 6, true),
  (gen_random_uuid(), 'Como armazenar os produtos corretamente?', 'Recomendamos armazenar em local fresco e seco, preferencialmente em recipientes herméticos após abertos. Evite exposição ao sol e umidade.', 'Produtos', 7, true),
  (gen_random_uuid(), 'Vocês fazem entregas para todo o Brasil?', 'Atualmente realizamos entregas apenas na região metropolitana. Estamos trabalhando para expandir nossa área de cobertura em breve.', 'Entregas', 8, true);

-- =====================================================
-- CONTEÚDO DO SITE
-- =====================================================
INSERT INTO site_content (id, key, title, content, image_url, is_active, metadata) VALUES
  (
    gen_random_uuid(),
    'about_main',
    'Sobre a Di''Granulatto',
    'A Di''Granulatto nasceu do amor pela alimentação saudável e natural. Desde 2015, selecionamos os melhores ingredientes para levar até você produtos de qualidade premium, feitos com carinho e dedicação.',
    '/images/about/store.jpg',
    true,
    '{"founded": "2015", "location": "São Paulo, SP"}'
  ),
  (
    gen_random_uuid(),
    'about_mission',
    'Nossa Missão',
    'Proporcionar uma alimentação mais saudável e saborosa, oferecendo produtos naturais de alta qualidade que contribuam para o bem-estar de nossos clientes.',
    NULL,
    true,
    '{}'
  ),
  (
    gen_random_uuid(),
    'about_values',
    'Nossos Valores',
    'Qualidade, transparência, sustentabilidade e compromisso com a saúde são os pilares que guiam todas as nossas decisões.',
    NULL,
    true,
    '{}'
  ),
  (
    gen_random_uuid(),
    'contact_info',
    'Informações de Contato',
    'Entre em contato conosco através de nossos canais de atendimento. Estamos sempre prontos para ajudar!',
    NULL,
    true,
    '{"phone": "(11) 99999-9999", "email": "contato@digranulatto.com.br", "address": "Rua das Granolas, 123 - São Paulo, SP"}'
  ),
  (
    gen_random_uuid(),
    'delivery_info',
    'Informações de Entrega',
    'Entregamos em toda a região metropolitana de São Paulo. Frete grátis para compras acima de R$ 150,00.',
    NULL,
    true,
    '{"free_shipping_min": 150, "delivery_days": "1-5 dias úteis"}'
  );

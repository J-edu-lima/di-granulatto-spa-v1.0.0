import type { Category, ContactInfo, FAQItem, AboutContent, Product } from "@/types"

// WhatsApp number placeholder - configure via environment variable
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999"

// Categories
export const CATEGORIES: Category[] = [
  { id: "1", name: "Bolos", slug: "bolos", description: "Bolos decorados e tradicionais" },
  { id: "2", name: "Tortas", slug: "tortas", description: "Tortas doces e salgadas" },
  { id: "3", name: "Brigadeiros", slug: "brigadeiros", description: "Brigadeiros gourmet" },
  { id: "4", name: "Doces Finos", slug: "doces-finos", description: "Doces para festas" },
  { id: "5", name: "Cupcakes", slug: "cupcakes", description: "Cupcakes decorados" },
  { id: "6", name: "Sobremesas", slug: "sobremesas", description: "Sobremesas especiais" },
]

// Mock Products
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Bolo de Chocolate Belga",
    description:
      "Delicioso bolo de chocolate belga com cobertura de ganache e morangos frescos. Perfeito para comemorações especiais.",
    price: 89.9,
    originalPrice: 109.9,
    category: "bolos",
    image: "/placeholder.svg?height=400&width=400",
    available: true,
    featured: true,
    ingredients: ["Chocolate belga", "Ovos", "Farinha", "Açúcar", "Morangos"],
    allergens: ["Glúten", "Ovos", "Leite"],
    servings: "10-12 fatias",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Torta de Limão Siciliano",
    description: "Torta cremosa de limão siciliano com merengue italiano maçaricado. Refrescante e deliciosa.",
    price: 75.0,
    category: "tortas",
    image: "/placeholder.svg?height=400&width=400",
    available: true,
    featured: true,
    ingredients: ["Limão siciliano", "Leite condensado", "Creme de leite", "Biscoito"],
    allergens: ["Glúten", "Leite"],
    servings: "8-10 fatias",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "3",
    name: "Brigadeiros Gourmet (25 un)",
    description: "Caixa com 25 brigadeiros gourmet sortidos: tradicional, ninho, pistache, maracujá e café.",
    price: 45.0,
    category: "brigadeiros",
    image: "/placeholder.svg?height=400&width=400",
    available: true,
    featured: true,
    ingredients: ["Chocolate", "Leite condensado", "Manteiga"],
    allergens: ["Leite"],
    servings: "25 unidades",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "4",
    name: "Kit Doces Finos (50 un)",
    description: "Kit com 50 doces finos variados para festas. Inclui beijinho, brigadeiro, cajuzinho e muito mais.",
    price: 120.0,
    category: "doces-finos",
    image: "/placeholder.svg?height=400&width=400",
    available: true,
    featured: true,
    ingredients: ["Chocolate", "Leite condensado", "Coco", "Amendoim"],
    allergens: ["Leite", "Amendoim"],
    servings: "50 unidades",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "5",
    name: "Cupcake Red Velvet (6 un)",
    description: "Caixa com 6 cupcakes red velvet com cobertura de cream cheese.",
    price: 42.0,
    category: "cupcakes",
    image: "/placeholder.svg?height=400&width=400",
    available: true,
    ingredients: ["Farinha", "Cacau", "Cream cheese", "Açúcar"],
    allergens: ["Glúten", "Leite", "Ovos"],
    servings: "6 unidades",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "6",
    name: "Pavê de Chocolate",
    description: "Pavê tradicional de chocolate com biscoito champagne e creme. Serve até 8 pessoas.",
    price: 55.0,
    category: "sobremesas",
    image: "/placeholder.svg?height=400&width=400",
    available: true,
    ingredients: ["Chocolate", "Biscoito champagne", "Creme de leite", "Leite condensado"],
    allergens: ["Glúten", "Leite"],
    servings: "6-8 porções",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "7",
    name: "Bolo de Cenoura com Chocolate",
    description: "Bolo de cenoura fofinho com generosa cobertura de chocolate. Um clássico irresistível.",
    price: 65.0,
    category: "bolos",
    image: "/placeholder.svg?height=400&width=400",
    available: true,
    ingredients: ["Cenoura", "Farinha", "Ovos", "Chocolate"],
    allergens: ["Glúten", "Ovos", "Leite"],
    servings: "10-12 fatias",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "8",
    name: "Torta Holandesa",
    description: "Torta holandesa cremosa com biscoito, chocolate branco e raspas de chocolate ao leite.",
    price: 78.0,
    category: "tortas",
    image: "/placeholder.svg?height=400&width=400",
    available: true,
    ingredients: ["Biscoito", "Chocolate branco", "Creme de leite", "Leite condensado"],
    allergens: ["Glúten", "Leite"],
    servings: "8-10 fatias",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
]

// About Content
export const MOCK_ABOUT: AboutContent = {
  title: "Nossa História",
  subtitle: "Tradição e Sabor desde 2015",
  description: `A Di'Granulatto nasceu do amor pela confeitaria artesanal e do desejo de criar doces que despertam memórias afetivas. Há mais de 8 anos, preparamos cada receita com ingredientes selecionados e o carinho de quem faz para a própria família.

Nossa missão é transformar momentos simples em celebrações doces, levando sabor e qualidade para sua mesa. Cada bolo, cada brigadeiro, cada torta carrega nossa dedicação em fazer o melhor.`,
  image: "/placeholder.svg?height=500&width=600",
  highlights: [
    "Ingredientes selecionados e de alta qualidade",
    "Receitas artesanais com toque caseiro",
    "Encomendas personalizadas para sua festa",
    "Entrega cuidadosa em toda a região",
  ],
}

// Contact Info
export const CONTACT_INFO: ContactInfo = {
  phone: "(11) 3456-7890",
  whatsapp: WHATSAPP_NUMBER,
  email: "contato@digranulatto.com.br",
  address: "Rua das Flores, 123",
  city: "São Paulo",
  state: "SP",
  zipCode: "01234-567",
  businessHours: [
    { day: "Segunda a Sexta", open: "09:00", close: "18:00" },
    { day: "Sábado", open: "09:00", close: "14:00" },
    { day: "Domingo", open: "", close: "", closed: true },
  ],
  socialMedia: {
    instagram: "https://instagram.com/digranulatto",
    facebook: "https://facebook.com/digranulatto",
  },
}

// FAQ Items
export const MOCK_FAQ: FAQItem[] = [
  {
    id: "1",
    question: "Qual a antecedência para fazer uma encomenda?",
    answer:
      "Para bolos decorados e encomendas maiores, recomendamos um prazo mínimo de 3 dias úteis. Para produtos do cardápio padrão, geralmente conseguimos atender em 24-48 horas, sujeito à disponibilidade.",
    category: "encomendas",
    order: 1,
  },
  {
    id: "2",
    question: "Vocês fazem entregas?",
    answer:
      "Sim! Realizamos entregas em toda a cidade de São Paulo e região metropolitana. O valor da entrega é calculado de acordo com a distância. Para encomendas acima de R$ 150, a entrega é grátis dentro de um raio de 10km.",
    category: "entregas",
    order: 2,
  },
  {
    id: "3",
    question: "Quais formas de pagamento vocês aceitam?",
    answer:
      "Aceitamos PIX, cartões de crédito e débito, e dinheiro. Para encomendas, solicitamos 50% do valor como sinal no momento do pedido.",
    category: "pagamento",
    order: 3,
  },
  {
    id: "4",
    question: "Vocês trabalham com opções sem glúten ou sem lactose?",
    answer:
      "Sim! Temos opções sem glúten e sem lactose disponíveis. Por favor, informe suas restrições alimentares no momento da encomenda para que possamos preparar seu pedido com todo cuidado.",
    category: "produtos",
    order: 4,
  },
  {
    id: "5",
    question: "Como devo armazenar os produtos?",
    answer:
      "A maioria dos nossos produtos deve ser mantida refrigerada. Bolos e tortas devem ser consumidos em até 5 dias. Brigadeiros podem ser conservados por até 7 dias na geladeira. Sempre fornecemos instruções específicas junto com o pedido.",
    category: "produtos",
    order: 5,
  },
  {
    id: "6",
    question: "Posso personalizar o design do meu bolo?",
    answer:
      "Com certeza! Adoramos criar bolos personalizados. Entre em contato conosco com suas ideias, referências de imagens e informações sobre a ocasião. Faremos o possível para transformar sua visão em realidade!",
    category: "encomendas",
    order: 6,
  },
]

const MOCK_REFERENCE_DATE = new Date("2026-06-01T12:00:00.000Z")

// Mock Orders for Admin
export const MOCK_ORDERS = [
  {
    id: "order-1",
    order_number: "1001",
    customer_name: "Maria Silva",
    customer_phone: "11999998888",
    customer_email: "maria@email.com",
    customer_address: "Rua das Flores, 123 - São Paulo, SP",
    status: "pending" as const,
    payment_method: "pix",
    subtotal: 89.90,
    discount: 0,
    delivery_fee: 10,
    total: 99.90,
    customer_notes: "Entregar após às 14h",
    created_at: new Date(MOCK_REFERENCE_DATE.getTime() - 1000 * 60 * 30).toISOString(), // 30 min atrás
  },
  {
    id: "order-2",
    order_number: "1002",
    customer_name: "João Santos",
    customer_phone: "11988887777",
    customer_email: "joao@email.com",
    customer_address: "Av. Paulista, 500 - São Paulo, SP",
    status: "confirmed" as const,
    payment_method: "card",
    subtotal: 165.00,
    discount: 15,
    delivery_fee: 0,
    total: 150.00,
    customer_notes: "",
    created_at: new Date(MOCK_REFERENCE_DATE.getTime() - 1000 * 60 * 60 * 2).toISOString(), // 2 horas atrás
  },
  {
    id: "order-3",
    order_number: "1003",
    customer_name: "Ana Costa",
    customer_phone: "11977776666",
    customer_email: "ana@email.com",
    customer_address: "Rua Augusta, 789 - São Paulo, SP",
    status: "preparing" as const,
    payment_method: "pix",
    subtotal: 210.00,
    discount: 0,
    delivery_fee: 15,
    total: 225.00,
    customer_notes: "Bolo é para aniversário",
    created_at: new Date(MOCK_REFERENCE_DATE.getTime() - 1000 * 60 * 60 * 5).toISOString(), // 5 horas atrás
  },
  {
    id: "order-4",
    order_number: "1004",
    customer_name: "Pedro Oliveira",
    customer_phone: "11966665555",
    customer_email: "pedro@email.com",
    customer_address: "Rua Oscar Freire, 321 - São Paulo, SP",
    status: "delivered" as const,
    payment_method: "cash",
    subtotal: 75.00,
    discount: 0,
    delivery_fee: 10,
    total: 85.00,
    customer_notes: "",
    created_at: new Date(MOCK_REFERENCE_DATE.getTime() - 1000 * 60 * 60 * 24).toISOString(), // 1 dia atrás
  },
  {
    id: "order-5",
    order_number: "1005",
    customer_name: "Carla Mendes",
    customer_phone: "11955554444",
    customer_email: "carla@email.com",
    customer_address: "Alameda Santos, 456 - São Paulo, SP",
    status: "ready" as const,
    payment_method: "pix",
    subtotal: 120.00,
    discount: 10,
    delivery_fee: 0,
    total: 110.00,
    customer_notes: "Retirar na loja",
    created_at: new Date(MOCK_REFERENCE_DATE.getTime() - 1000 * 60 * 60 * 3).toISOString(), // 3 horas atrás
  },
]

// Pagination defaults
export const ITEMS_PER_PAGE = 10

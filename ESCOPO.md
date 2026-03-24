# Sistema de Catálogo de Produtos e Registro de Pedidos

---

## 1. Visão Geral

O sistema consiste em uma aplicação web full-stack construída com **Next.js** utilizando **App Router** e integrada à plataforma **Supabase** como Backend as a Service (BaaS).

O Supabase será responsável por fornecer os principais serviços de backend da aplicação, incluindo:

- Banco de dados PostgreSQL
- Sistema de autenticação (Supabase Auth)
- APIs REST automáticas geradas a partir das tabelas do banco
- Armazenamento de arquivos (quando necessário)
- Controle de acesso aos dados por meio de políticas de segurança (Row Level Security - RLS)

A aplicação Next.js será responsável pela interface do usuário, pela experiência de navegação e pela integração com os serviços disponibilizados pelo Supabase.

O sistema tem como objetivo catalogar os produtos (criando uma loja virtual para o vendedor) e permitir a realização de pedidos (feitos por clientes) e controle dos pedidos (feitos pelo administrador).

---

## Estrutura de Identidade e Autenticação

A autenticação do sistema será realizada utilizando o **Supabase Auth**.

Os dados de identidade dos usuários serão armazenados automaticamente na tabela interna:

auth.users

Essa tabela é gerenciada pelo próprio Supabase e contém informações de autenticação como:

- id do usuário
- email
- senha criptografada
- metadados de autenticação
- datas de criação e acesso

Para armazenar informações adicionais de perfil será utilizada uma tabela pública chamada:

profiles

Essa tabela terá relação direta com auth.users através do identificador do usuário.

Exemplo conceitual:

profiles

- id (UUID, referência para auth.users.id)
- role
- created_at

Essa abordagem permite separar:

Identidade e autenticação → auth.users  
Dados de perfil da aplicação → profiles

---

## Entidades Principais do Sistema

Esta seção representa o detalhamento da etapa **1.3.1 Definição das entidades do sistema**, com foco em entidade de negócio e sua representação no banco Supabase.

Como o Supabase atua como BaaS, as entidades são modeladas no próprio banco (schema/tabelas/relacionamentos) e consumidas pela aplicação através do cliente Supabase e dos tipos TypeScript gerados.

| Entidade de Negócio | Objetivo no Sistema | Representação no Supabase | Campos e Regras Principais |
| --- | --- | --- | --- |
| Perfil de usuário administrativo | Identificar e autorizar o administrador do painel | `auth.users` + tabela pública `profiles` | `profiles.id` referencia `auth.users.id`; `profiles.role` define permissões de administração |
| Categoria | Organizar produtos por grupos | tabela `categories` | `name`, `slug` único, auditoria (`created_at`, `updated_at`) |
| Produto | Disponibilizar itens para venda no catálogo | tabela `products` | vínculo opcional com categoria (`category_id`), preço, estoque, flags (`is_active`, `is_featured`) |
| Pedido | Registrar intenção de compra do cliente | tabela `orders` | identificação (`order_number`), dados do cliente, totais, status de pedido e pagamento |
| Item do pedido | Registrar composição de cada pedido | tabela `order_items` | referência para `orders`, produto no momento da compra (`product_name`, `product_price`), `quantity > 0` |
| Moderação de pedido | Permitir triagem anti-spam e decisão do ADM | representada em `orders` por status e metadados de análise | fluxo: em análise -> aceito, revisar (com mensagem e edição) ou cancelado |
| FAQ | Disponibilizar perguntas e respostas públicas | tabela `faqs` | `question`, `answer`, ordenação e ativação (`sort_order`, `is_active`) |
| Conteúdo institucional | Gerenciar textos e blocos editáveis do site | tabela `site_content` | conteúdo por seção (`section`), com controle de ativação e metadados |
| Operação da loja | Controlar loja aberta/fechada no painel | tabela de configuração global (ex.: `store_settings`) | registro único com `is_open`, mensagem de indisponibilidade e `updated_at` |

Diretriz de implementação para 1.3.1:

- Entidade de negócio = regra e significado funcional no domínio.
- Representação no banco = tabela, enum, relacionamento e restrições.
- Representação na aplicação = tipos gerados do Supabase + validação de entrada com Zod.

---

## Estrutura da Aplicação

A aplicação possui duas áreas principais:

Área pública:

- Página inicial (sobre nós e produtos em destaque)
- Catálogo de produtos
- FAQ
- Informações institucionais (Contato)

Área administrativa:

- Gestão de produtos e categorias
- Gestão de pedidos (incluindo fila de pedidos em análise)
- Gestão de FAQ
- Gestão de conteúdo institucional (Sobre nós e Contato)
- Controle de operação da loja (aberta/fechada)
- Dashboard administrativo

---

## Controle de Acesso

O acesso à área administrativa será protegido utilizando autenticação do Supabase.

Nesta versão inicial do sistema haverá apenas **um usuário administrador**, responsável por toda a gestão da plataforma.

Não haverá fluxo público de registro de usuários nesta fase do projeto. O administrador será criado diretamente no sistema de autenticação do Supabase.

As permissões de acesso aos dados serão controladas utilizando **Row Level Security (RLS)** no banco de dados.

---

## 2. Estrutura de Pastas

A organização segue uma arquitetura modular baseada em domínio, separando rotas, interface e integração com os serviços do Supabase.

Como o sistema utiliza o Supabase como Backend as a Service (BaaS), não existe uma camada tradicional de acesso ao banco com ORM (como Prisma).  
As operações de leitura e escrita são realizadas diretamente através do cliente do Supabase ou por meio das APIs REST automáticas fornecidas pela plataforma.

src/
├── app/ # Rotas do Next.js (App Router)
│ ├── (auth)/ # Grupo de rotas de autenticação
│ │ └── login/
│ │
│ ├── (store)/ # Área pública da loja
│ │ ├── page.tsx # Página inicial da loja
│ │ └── faq/ # Página pública de FAQ
│ │
│ └── (admin)/ # Área administrativa
│ ├── layout.tsx # Layout do painel administrativo
│ ├── dashboard/ # Dashboard principal
│ ├── products/ # Gestão de produtos
│ ├── orders/ # Gestão de pedidos
│ └── content/ # Gestão de conteúdo do site
│ ├── faq/ # CRUD de FAQ
│ └── site-content/ # Conteúdo institucional do site

├── components/ # Componentes reutilizáveis
│ ├── ui/ # Componentes básicos do design system
│ │ ├── button/
│ │ ├── input/
│ │ └── modal/
│ │
│ ├── forms/ # Componentes de formulários
│ │
│ └── shared/ # Componentes compartilhados (header, footer, etc)

├── modules/ # Domínios de negócio da aplicação
│ ├── products/
│ │ ├── queries.ts # Consultas ao Supabase
│ │ ├── mutations.ts # Inserção, atualização e remoção de dados
│ │ └── actions.ts # Server Actions utilizadas pela interface
│ │
│ ├── categories/
│ │ ├── queries.ts
│ │ └── mutations.ts
│ │
│ ├── orders/
│ │ ├── queries.ts
│ │ ├── mutations.ts
│ │ └── actions.ts
│ │
│ └── content/
│ ├── faq/
│ │ ├── queries.ts
│ │ └── mutations.ts
│ │
│ └── site-content/
│ ├── queries.ts
│ └── mutations.ts

├── lib/ # Integrações e utilitários do projeto
│ ├── supabase/
│ │ ├── client.ts # Cliente Supabase para uso no navegador
│ │ ├── server.ts # Cliente Supabase para Server Components
│ │ └── middleware.ts # Middleware de autenticação
│ │
│ └── utils/
│ ├── format.ts # Funções de formatação (preço, datas, etc)
│ └── slug.ts # Gerador de slugs

├── hooks/ # Hooks reutilizáveis da aplicação

└── types/ # Tipos globais (quando necessário)

---

## 3. Organização por Domínio

Cada módulo representa um domínio funcional do sistema.

Os módulos concentram as operações de leitura e escrita de dados utilizando o cliente do Supabase e suas APIs automáticas, além de organizar as ações utilizadas pela interface da aplicação.

Essa organização permite manter a lógica da aplicação agrupada por contexto de negócio, facilitando manutenção, escalabilidade e evolução do sistema.

| Módulo     | Responsabilidade                                                      |
| ---------- | --------------------------------------------------------------------- |
| products   | Gestão de produtos do catálogo (CRUD, listagem e exibição pública)    |
| orders     | Criação, consulta e gestão de pedidos                                 |
| categories | Categorização dos produtos                                            |
| content    | Conteúdo editável da interface, incluindo FAQ e textos institucionais |

Cada módulo poderá conter:

- queries: consultas realizadas no banco de dados através do Supabase
- mutations: operações de inserção, atualização ou remoção de dados
- actions: Server Actions utilizadas pela interface do Next.js

A comunicação com o banco de dados é realizada utilizando o cliente oficial do Supabase, que interage com o banco PostgreSQL e com as APIs REST automáticas geradas pela plataforma.

## 4. Camadas Internas de um Módulo

Cada módulo pode possuir até três camadas principais, responsáveis por organizar as operações de leitura, escrita e integração com a interface da aplicação.

Essa divisão substitui a arquitetura tradicional de Repository e Service, uma vez que o acesso aos dados é realizado diretamente através do cliente do Supabase.

### Queries

Responsável pelas operações de leitura de dados no banco.

As consultas são realizadas utilizando o cliente do Supabase, que acessa o banco PostgreSQL através das APIs automáticas geradas pela plataforma.

Funções típicas:

- Buscar registros
- Buscar registros por id
- Listagens paginadas
- Consultas filtradas

Exemplo de responsabilidades em `modules/products/queries.ts`:

- Buscar produtos
- Buscar produto por id
- Buscar produtos em destaque
- Listar produtos por categoria

### Mutations

Responsável pelas operações de modificação de dados.

Inclui inserções, atualizações e exclusões realizadas no banco de dados através do cliente do Supabase.

Funções típicas:

- Inserção de registros
- Atualização de registros
- Exclusão de registros

Exemplo de responsabilidades em `modules/products/mutations.ts`:

- Criar produto
- Atualizar produto
- Remover produto

### Actions

Responsável pelas Server Actions do Next.js que integram a interface com as operações de dados.

As actions podem chamar queries ou mutations e são utilizadas principalmente para lidar com formulários e eventos da interface.

As Server Actions também podem executar validações simples antes de enviar dados ao banco.

Responsabilidades típicas:

- Executar operações iniciadas pela interface
- Processar dados de formulários
- Chamar queries e mutations
- Retornar resultados para os componentes da aplicação

## 5. Tipagem do Banco de Dados

O banco de dados PostgreSQL hospedado no Supabase é a **fonte de verdade** para as entidades do sistema.

A partir do schema do banco, o Supabase permite gerar automaticamente tipos TypeScript que representam as tabelas da aplicação.

Esses tipos são utilizados diretamente no código da aplicação, evitando duplicação de modelos e inconsistências entre banco e código.

Os tipos gerados incluem todas as entidades do sistema, como:

- products
- categories
- orders
- order_items
- faqs
- site_content
- profiles

A geração dos tipos é feita através da ferramenta de CLI do Supabase, que analisa o schema do banco e cria um arquivo de definição de tipos para uso na aplicação.

Exemplo de geração de tipos:

supabase gen types typescript --project-id <project-id> > types/database.ts

Após a geração, os tipos podem ser utilizados diretamente na aplicação.

Exemplo de uso:

import { Database } from "@/types/database"

type Product = Database["public"]["Tables"]["products"]["Row"]

Para operações de inserção ou atualização também existem tipos específicos derivados do schema:

type ProductInsert = Database["public"]["Tables"]["products"]["Insert"]

type ProductUpdate = Database["public"]["Tables"]["products"]["Update"]

Essa abordagem garante que os tipos da aplicação estejam sempre sincronizados com a estrutura real do banco de dados.

## 6. Regra de Acesso ao Banco

O acesso ao banco de dados deve ocorrer exclusivamente através do cliente do Supabase.

Para manter organização e evitar consultas espalhadas pelo sistema, todas as operações de leitura e escrita devem ser implementadas dentro das camadas de queries e mutations dos módulos de domínio.

Nenhuma outra parte da aplicação deve executar consultas diretamente ao banco.

Fluxo recomendado:

Interface
↓
Server Action
↓
Queries / Mutations (módulo de domínio)
↓
Supabase Client
↓
Banco de dados (PostgreSQL)

Essa abordagem garante:

- Centralização das operações de dados
- Melhor organização por domínio
- Facilidade de manutenção
- Redução de duplicação de consultas

As regras de segurança e controle de acesso aos dados são aplicadas diretamente no banco de dados através das políticas de Row Level Security (RLS) do Supabase.

## 8. Sistema de Conteúdo Dinâmico

O sistema possui duas fontes principais de conteúdo editável armazenadas no banco de dados.

Esses conteúdos podem ser gerenciados pela área administrativa e são carregados pela aplicação através do cliente do Supabase.

---

### FAQ

Conteúdo estruturado exibido na página pública de FAQ.

Cada item representa uma pergunta e resposta que pode ser ativada, desativada ou reordenada pelo administrador.

Campos típicos:

- id
- question
- answer
- order
- is_active

Esses registros são armazenados na tabela `faqs` e podem ser gerenciados pela área administrativa do sistema.

---

### SITE_CONTENT

Conteúdo configurável utilizado em diferentes áreas da interface.

A tabela funciona como um repositório simples de chave e valor, permitindo alterar textos institucionais sem necessidade de alterar o código da aplicação.

Exemplo de chaves:

home.title  
home.subtitle  
footer.phone  
footer.address

Esse modelo permite que diferentes partes da interface carreguem conteúdo dinâmico diretamente do banco de dados.

## 9. Loader de Conteúdo com Fallback Estático

Para garantir estabilidade da aplicação, o conteúdo institucional possui um sistema de fallback.

O sistema sempre tenta carregar o conteúdo a partir do banco de dados. Caso o conteúdo não exista, esteja incompleto ou ocorra alguma falha de leitura, a aplicação utiliza valores estáticos definidos no fallback.

Fluxo de carregamento:

Interface
↓
Content Loader
↓
Queries (Supabase Client)
↓
Banco de dados
↓
Fallback estático (se necessário)

Essa abordagem garante que a interface continue funcionando mesmo quando o banco não possui determinado conteúdo configurado.

---

Estrutura de arquivos para conteúdo (`modules/content/site-content/`):

| Arquivo     | Responsabilidade                                                     |
| ----------- | -------------------------------------------------------------------- |
| queries.ts  | Consultas ao banco utilizando o cliente do Supabase                  |
| loader.ts   | Carrega conteúdo, aplica fallback e pode gerenciar cache             |
| fallback.ts | Define valores padrão quando o banco não possui determinado conteúdo |

---

Responsabilidades dos arquivos

queries.ts  
Responsável por consultar a tabela `site_content` no banco de dados utilizando o cliente do Supabase.

loader.ts  
Responsável por carregar os dados utilizados pela interface.  
Esse arquivo consulta o banco através de `queries.ts`, aplica fallback quando necessário e pode implementar estratégias simples de cache.

fallback.ts  
Define os valores padrão utilizados quando o banco não possui conteúdo configurado ou quando ocorre erro na consulta.

## 10. Cache de Conteúdo

Para reduzir consultas repetidas ao banco de dados e melhorar a performance da aplicação, o loader de conteúdo pode utilizar mecanismos de cache do próprio React.

Esse cache evita múltiplas consultas ao banco durante o mesmo ciclo de renderização.

Fluxo de carregamento com cache:

Interface
↓
Content Loader
↓
Cache do React
↓
Queries (Supabase Client)
↓
Banco de dados

Quando o conteúdo já estiver em cache, a consulta ao banco não é executada novamente durante aquela renderização.

Essa estratégia é especialmente útil para conteúdos institucionais que raramente mudam, como:

- textos da página inicial
- informações de contato
- mensagens institucionais

---

## 11. Convenção de Chaves para SITE_CONTENT

As chaves armazenadas na tabela `site_content` devem seguir um padrão consistente de nomenclatura.

Formato recomendado:

area.elemento

Esse padrão facilita organização, leitura e manutenção do conteúdo.

Exemplos válidos:

home.title  
home.subtitle  
footer.phone  
footer.address  
product.empty_message

Evitar chaves inconsistentes como:

homeTitle  
tituloHome  
home-title

A utilização de um padrão único garante maior previsibilidade na recuperação dos conteúdos pela aplicação.

## 12. Boas Práticas Gerais

| Prática                           | Descrição                                                   |
| --------------------------------- | ----------------------------------------------------------- |
| **Manter módulos pequenos**       | Cada módulo deve representar um domínio claro               |
| **Evitar lógica na interface**    | Componentes React devem apenas renderizar dados             |
| **Centralizar lógica de negócio** | Regras complexas devem ficar nos services                   |
| **Evitar duplicação de tipos**    | Tipos gerados pelo Prisma devem ser reutilizados            |
| **Evitar dependências cruzadas**  | Um módulo não deve depender internamente da lógica de outro |

---

## 13. Escopo da Arquitetura

A arquitetura foi projetada para:

- Sistemas pequenos ou médios
- Aplicações administrativas
- Catálogo de produtos com gestão interna
- Baixo ou moderado número de usuários simultâneos

Ela prioriza:

- Simplicidade
- Modularidade
- Facilidade de manutenção
- Redução de complexidade de infraestrutura

A utilização do Supabase como Backend as a Service permite reduzir significativamente a necessidade de desenvolvimento de infraestrutura de backend.

> A arquitetura evita introduzir complexidades desnecessárias como DDD completo, camadas excessivas de abstração ou arquiteturas de microserviços.

---

## Principais Práticas da Arquitetura

App Router  
Essencial para o modo server-first do Next.js e para organização das rotas da aplicação.

Server Actions  
Utilizadas para executar mutações e integrar formulários da interface com operações de dados sem necessidade de criação de endpoints API dedicados.

Supabase Client  
Responsável pela comunicação da aplicação com o banco de dados PostgreSQL e com os serviços de backend fornecidos pelo Supabase.

Row Level Security (RLS)  
Utilizado no banco de dados para garantir controle de acesso e segurança diretamente na camada de dados.

---

## Tecnologias & Bibliotecas

| Tecnologia  | Uso                                                       |
| ----------- | --------------------------------------------------------- |
| Next.js     | Meta-framework para construção da aplicação web           |
| Supabase    | Backend as a Service (PostgreSQL, Auth, APIs automáticas) |
| TailwindCSS | Estilização da interface                                  |
| Zod         | Validação de dados na aplicação                           |
| TypeScript  | Tipagem estática do código                                |

## Banco de Dados

### Schema SQL

```sql
-- =========================================
-- ENUMS
-- =========================================

CREATE TYPE payment_method AS ENUM (
  'pix',
  'credit_card',
  'debit_card',
  'money'
);

CREATE TYPE payment_status AS ENUM (
  'paid',
  'pending'
);

CREATE TYPE order_status AS ENUM (
  'created',
  'confirmed',
  'canceled'
);

CREATE TYPE site_section AS ENUM (
  'about_values',
  'about_mission',
  'delivery_info',
  'contact_info',
  'about',
  'about_main'
);

CREATE TYPE user_role AS ENUM (
  'admin'
);

-- =========================================
-- PROFILES
-- =========================================

CREATE TABLE profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role       user_role NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =========================================
-- CATEGORIES
-- =========================================

CREATE TABLE categories (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       TEXT NOT NULL,
  slug       TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =========================================
-- PRODUCTS
-- =========================================

CREATE TABLE products (
  id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name              TEXT NOT NULL,
  slug              TEXT UNIQUE NOT NULL,
  description       TEXT,
  short_description TEXT,
  price             NUMERIC(10,2) NOT NULL,
  original_price    NUMERIC(10,2),
  category_id       BIGINT REFERENCES categories(id) ON DELETE SET NULL,
  image_url         TEXT,
  images            JSONB,
  stock_quantity    INTEGER DEFAULT 0,
  tags              TEXT[],
  ingredients       TEXT[],
  allergens         TEXT[],
  servings          TEXT,
  is_active         BOOLEAN DEFAULT true,
  is_featured       BOOLEAN DEFAULT false,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

-- =========================================
-- ORDERS
-- =========================================

CREATE TABLE orders (
  id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_number     TEXT UNIQUE NOT NULL,
  customer_name    TEXT NOT NULL,
  customer_phone   TEXT NOT NULL,
  customer_address TEXT,
  customer_notes   TEXT,
  status           order_status NOT NULL DEFAULT 'created',
  payment_method   payment_method NOT NULL,
  payment_status   payment_status NOT NULL DEFAULT 'pending',
  subtotal         NUMERIC(10,2) NOT NULL,
  discount         NUMERIC(10,2) DEFAULT 0,
  total            NUMERIC(10,2) NOT NULL,
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

-- =========================================
-- ORDER ITEMS
-- =========================================

CREATE TABLE order_items (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id      BIGINT REFERENCES orders(id) ON DELETE CASCADE,
  product_id    BIGINT REFERENCES products(id) ON DELETE SET NULL,
  product_name  TEXT NOT NULL,
  product_price NUMERIC(10,2) NOT NULL,
  quantity      INTEGER NOT NULL CHECK (quantity > 0),
  subtotal      NUMERIC(10,2) NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- =========================================
-- FAQ
-- =========================================

CREATE TABLE faqs (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  question   TEXT NOT NULL,
  answer     TEXT NOT NULL,
  category   TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active  BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =========================================
-- SITE CONTENT
-- =========================================

CREATE TABLE site_content (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  section    site_section NOT NULL,
  title      TEXT,
  content    TEXT,
  image_url  TEXT,
  metadata   JSONB,
  is_active  BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =========================================
-- STORE SETTINGS
-- =========================================

CREATE TABLE store_settings (
  id             SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  is_open        BOOLEAN NOT NULL DEFAULT true,
  closed_message TEXT,
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

-- =========================================
-- INDEXES
-- =========================================

-- Produtos: catálogo público e filtros do front
CREATE INDEX idx_products_active_category ON products(is_active, category_id);
CREATE INDEX idx_products_featured_active ON products(is_featured, is_active);
CREATE INDEX idx_products_updated_at      ON products(updated_at DESC);

-- Pedidos: fila de análise e histórico no painel ADM
CREATE INDEX idx_orders_status_created_at         ON orders(status, created_at DESC);
CREATE INDEX idx_orders_payment_status_created_at ON orders(payment_status, created_at DESC);

-- Itens de pedido: carregamento de itens por pedido
CREATE INDEX idx_order_items_order_created_at ON order_items(order_id, created_at);

-- FAQ: renderização pública ordenada
CREATE INDEX idx_faqs_active_sort_order ON faqs(is_active, sort_order);

-- Conteúdo dinâmico: carregamento por seção ativa
CREATE INDEX idx_site_content_section_active ON site_content(section, is_active);

-- Profiles: busca rápida de administradores
CREATE INDEX idx_profiles_role ON profiles(role);
```

### Políticas de Segurança (RLS)

```sql
-- =====================================================
-- RLS COMPLETO - DI GRANULATTO
-- =====================================================

-- -----------------------------------------------------
-- 0) Funções auxiliares
-- -----------------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'::public.user_role
  );
$$;

create or replace function public.can_attach_item_to_order(p_order_id bigint)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.orders o
    where o.id = p_order_id
      and o.status = 'created'::public.order_status
  );
$$;

create or replace function public.is_store_open()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select coalesce(
    (select s.is_open from public.store_settings s where s.id = 1),
    true
  );
$$;

-- -----------------------------------------------------
-- 1) Habilitar RLS
-- -----------------------------------------------------

alter table if exists public.profiles enable row level security;
alter table if exists public.categories enable row level security;
alter table if exists public.products enable row level security;
alter table if exists public.faqs enable row level security;
alter table if exists public.site_content enable row level security;
alter table if exists public.orders enable row level security;
alter table if exists public.order_items enable row level security;
alter table if exists public.store_settings enable row level security;

alter table if exists public.profiles force row level security;
alter table if exists public.categories force row level security;
alter table if exists public.products force row level security;
alter table if exists public.faqs force row level security;
alter table if exists public.site_content force row level security;
alter table if exists public.orders force row level security;
alter table if exists public.order_items force row level security;
alter table if exists public.store_settings force row level security;

-- -----------------------------------------------------
-- 2) Limpeza de policies (idempotente)
-- -----------------------------------------------------

drop policy if exists profiles_select_own on public.profiles;
drop policy if exists profiles_admin_all on public.profiles;

drop policy if exists categories_public_read on public.categories;
drop policy if exists categories_admin_all on public.categories;

drop policy if exists products_public_read_active on public.products;
drop policy if exists products_admin_all on public.products;

drop policy if exists faqs_public_read_active on public.faqs;
drop policy if exists faqs_admin_all on public.faqs;

drop policy if exists site_content_public_read_active on public.site_content;
drop policy if exists site_content_admin_all on public.site_content;

drop policy if exists store_settings_public_read on public.store_settings;
drop policy if exists store_settings_admin_all on public.store_settings;

drop policy if exists orders_public_insert on public.orders;
drop policy if exists orders_admin_select on public.orders;
drop policy if exists orders_admin_update on public.orders;
drop policy if exists orders_admin_delete on public.orders;

drop policy if exists order_items_public_insert on public.order_items;
drop policy if exists order_items_admin_select on public.order_items;
drop policy if exists order_items_admin_update on public.order_items;
drop policy if exists order_items_admin_delete on public.order_items;

-- -----------------------------------------------------
-- 3) Profiles
-- -----------------------------------------------------

create policy profiles_select_own
on public.profiles
for select
to authenticated
using (id = auth.uid());

create policy profiles_admin_all
on public.profiles
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- -----------------------------------------------------
-- 4) Leitura pública de catálogo e conteúdo
-- -----------------------------------------------------

create policy categories_public_read
on public.categories
for select
to anon, authenticated
using (true);

create policy categories_admin_all
on public.categories
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy products_public_read_active
on public.products
for select
to anon, authenticated
using (is_active = true);

create policy products_admin_all
on public.products
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy faqs_public_read_active
on public.faqs
for select
to anon, authenticated
using (is_active = true);

create policy faqs_admin_all
on public.faqs
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy site_content_public_read_active
on public.site_content
for select
to anon, authenticated
using (is_active = true);

create policy site_content_admin_all
on public.site_content
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy store_settings_public_read
on public.store_settings
for select
to anon, authenticated
using (true);

create policy store_settings_admin_all
on public.store_settings
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- -----------------------------------------------------
-- 5) Orders (cliente cria, não lê)
-- -----------------------------------------------------

create policy orders_public_insert
on public.orders
for insert
to anon, authenticated
with check (
  status = 'created'::public.order_status
  and payment_status = 'pending'::public.payment_status
  and public.is_store_open()
);

create policy orders_admin_select
on public.orders
for select
to authenticated
using (public.is_admin());

create policy orders_admin_update
on public.orders
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy orders_admin_delete
on public.orders
for delete
to authenticated
using (public.is_admin());

-- -----------------------------------------------------
-- 6) Order items (cliente insere, não lê)
-- -----------------------------------------------------

create policy order_items_public_insert
on public.order_items
for insert
to anon, authenticated
with check (public.can_attach_item_to_order(order_id));

create policy order_items_admin_select
on public.order_items
for select
to authenticated
using (public.is_admin());

create policy order_items_admin_update
on public.order_items
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy order_items_admin_delete
on public.order_items
for delete
to authenticated
using (public.is_admin());

-- -----------------------------------------------------
-- 7) Grants de reforço
-- -----------------------------------------------------

revoke select on public.orders from anon, authenticated;
revoke select on public.order_items from anon, authenticated;

revoke update, delete on public.orders from anon, authenticated;
revoke update, delete on public.order_items from anon, authenticated;

grant insert on public.orders to anon, authenticated;
grant insert on public.order_items to anon, authenticated;
```

### Roteiro de Validação RLS (Resumo)

1. Testar como `anon`:
  - Deve conseguir `SELECT` em `products` ativos, `faqs` ativos, `site_content` ativo e `store_settings`.
  - Deve conseguir `INSERT` em `orders` com status inicial e pagamento pendente.
  - Não deve conseguir `SELECT` em `orders` e `order_items`.

2. Testar como `authenticated` não-admin:
  - Deve manter o mesmo comportamento público de leitura do catálogo/conteúdo.
  - Não deve conseguir visualizar, atualizar ou remover `orders` e `order_items`.

3. Testar como `authenticated` admin:
  - Deve conseguir `SELECT`, `UPDATE` e `DELETE` em `orders` e `order_items`.
  - Deve conseguir gerenciar produtos, categorias, FAQ, conteúdo e `store_settings`.

4. Testar loja fechada:
  - Com `store_settings.is_open = false`, `INSERT` público em `orders` deve falhar.

5. Validar fluxo de negócio:
  - Cliente cria pedido, mas não consulta pedido no sistema.
  - Confirmação de pedido ocorre externamente (WhatsApp) após análise do administrador.

---

## Requisitos do Sistema

### Requisitos Funcionais

| ID   | Requisito                        | Descrição                                                                                                                   |
| ---- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| RF01 | Acesso ao site                   | O sistema deve permitir que o cliente acesse o site público.                                                                |
| RF02 | Visualização de páginas públicas | O sistema deve exibir: Página inicial, Produtos, Contato, FAQ e Sobre nós.                                                  |
| RF03 | Visualização de produtos         | O sistema deve permitir que o cliente visualize os produtos disponíveis com suas informações.                               |
| RF04 | Adicionar produto ao carrinho    | O sistema deve permitir que o cliente adicione produtos ao carrinho.                                                        |
| RF05 | Alterar quantidade no carrinho   | O sistema deve permitir que o cliente altere a quantidade de produtos no carrinho.                                          |
| RF06 | Remover produto do carrinho      | O sistema deve permitir que o cliente remova produtos do carrinho.                                                          |
| RF07 | Visualizar carrinho              | O sistema deve permitir que o cliente visualize os produtos presentes no carrinho.                                          |
| RF08 | Realizar pedido                  | O sistema deve permitir que o cliente finalize um pedido com os produtos do carrinho.                                       |
| RF09 | Acesso administrativo            | O sistema deve permitir que administradores autenticados acessem o painel administrativo.                                   |
| RF10 | Gerenciar produtos               | O administrador pode inserir, atualizar e remover produtos.                                                                 |
| RF11 | Gerenciar categorias             | O administrador pode inserir, atualizar e remover categorias.                                                               |
| RF12 | Gerenciar conteúdo do site       | O administrador pode atualizar conteúdos institucionais (página inicial, Sobre nós, Contato, FAQ, informações de produtos). |
| RF13 | Visualizar pedidos               | O administrador pode visualizar os pedidos realizados pelos clientes.                                                       |
| RF14 | Gerenciar estado do pedido       | O administrador pode alterar o status: Confirmado, Preparando, Cancelado.                                                   |
| RF15 | Gerenciar estado de pagamento    | O administrador pode visualizar e alterar o status de pagamento: Pago, Pendente.                                            |
| RF16 | Caixa de pedidos em análise      | Todo novo pedido deve entrar automaticamente em uma fila/caixa de pedidos em análise antes da confirmação.                  |
| RF17 | Aprovar, revisar ou cancelar pedido | O administrador pode aceitar o pedido, cancelar o pedido ou solicitar revisão com mensagem ao cliente e edição do pedido antes da confirmação efetiva. |
| RF18 | Controle de operação da loja     | O administrador pode abrir ou fechar a loja por meio de um botão no painel administrativo.                                  |

### Requisitos Não Funcionais

| ID    | Requisito                       | Descrição                                                                            |
| ----- | ------------------------------- | ------------------------------------------------------------------------------------ |
| RNF01 | Desempenho                      | Páginas devem carregar em até 3 segundos em condições normais de uso.                |
| RNF02 | Concorrência                    | O sistema deve suportar múltiplos acessos simultâneos.                               |
| RNF03 | Segurança                       | Apenas administradores autenticados podem acessar funcionalidades administrativas.   |
| RNF04 | Proteção de dados               | Informações de pedidos devem ser protegidas contra acesso não autorizado.            |
| RNF05 | Usabilidade                     | Interface simples, clara e intuitiva para navegação.                                 |
| RNF06 | Acessibilidade do carrinho      | O carrinho deve ser facilmente acessível a partir de qualquer página do site.        |
| RNF07 | Disponibilidade                 | O sistema deve estar disponível 24h por dia, exceto durante manutenção.              |
| RNF08 | Restrição de horário de pedidos | Pedidos só podem ser realizados entre 13h e 20h.                                     |
| RNF09 | Compatibilidade                 | Funcionar corretamente no Chrome, Firefox, Edge e Safari.                            |
| RNF10 | Manutenibilidade                | Permitir atualização de produtos e conteúdos sem necessidade de alteração no código. |

---

## Casos de Uso do Sistema

### Atores

**Cliente** — Usuário que acessa o site para visualizar produtos e realizar pedidos.

**Administrador** — Usuário responsável pela gestão do conteúdo do site e dos pedidos realizados.

### Casos de Uso do Cliente

| ID   | Caso de Uso                 | Descrição                                                                           |
| ---- | --------------------------- | ----------------------------------------------------------------------------------- |
| UC01 | Acessar site                | O cliente acessa o site por meio de um navegador.                                   |
| UC02 | Visualizar páginas públicas | O cliente navega pelas páginas institucionais e de produtos.                        |
| UC03 | Gerenciar carrinho          | O cliente pode adicionar produtos, alterar quantidades e remover itens do carrinho. |
| UC04 | Realizar pedido             | O cliente finaliza a compra dos produtos presentes no carrinho.                     |

### Casos de Uso do Administrador

| ID   | Caso de Uso                    | Descrição                                                                       |
| ---- | ------------------------------ | ------------------------------------------------------------------------------- |
| UC05 | Acessar sistema administrativo | O administrador realiza login no sistema administrativo.                        |
| UC06 | Gerenciar produtos             | O administrador cria, edita ou remove produtos cadastrados.                     |
| UC07 | Gerenciar categorias           | O administrador cria, edita ou remove categorias de produtos.                   |
| UC08 | Gerenciar conteúdo do site     | O administrador atualiza páginas institucionais e informações exibidas no site. |
| UC09 | Gerenciar pedidos              | O administrador visualiza pedidos e altera seu estado.                          |
| UC10 | Gerenciar pagamento            | O administrador visualiza e altera o estado de pagamento dos pedidos.           |
| UC11 | Moderação de pedidos           | O administrador analisa pedidos na caixa de análise e decide por aceitar, revisar com mensagem ou cancelar.                |
| UC12 | Controlar status da loja       | O administrador alterna o funcionamento da loja entre aberta e fechada.         |

---

## Entregáveis do Projeto

| Entregável          | Descrição                                            |
| ------------------- | ---------------------------------------------------- |
| Software Funcional  | Código-fonte, executáveis e releases                 |
| Documentação        | Manuais de usuário, documentação técnica e de design |
| Relatórios de Teste | Resultados dos testes QA (garantia de qualidade)     |

---

## Limites do Projeto (O que NÃO será feito)

> **Exclusões de Escopo:** lista clara de funcionalidades que não serão desenvolvidas nesta fase.

1. **Sem integração com pagamentos** — Não haverá integração com meios de pagamento, gateways ou APIs externas. Os pedidos terão caráter informativo/pré-pedido, com confirmação e pagamento realizados fora da plataforma.

2. **Sem customização de produtos** — O sistema não permitirá customização no momento do pedido (ex.: alteração de ingredientes, tamanho, combinações). Mudanças devem ocorrer por meio das observações ou diretamente com o atendente.

3. **Apenas um administrador** — O sistema possuirá apenas um usuário administrador. Não haverá controle de múltiplos usuários, permissões ou níveis de acesso.

---

## Critérios de Aceitação e Qualidade

### 4.1 Critérios de Aceitação

O sistema será considerado aceito quando atender às seguintes condições:

**1. Acesso ao site**

- O cliente deve conseguir acessar o site sem necessidade de autenticação.
- As páginas públicas devem carregar corretamente.

**2. Visualização de produtos**

- O cliente deve conseguir visualizar a lista de produtos disponíveis.
- Cada produto deve apresentar nome, descrição, preço, tamanho/peso, ingredientes principais, alérgenos, observações, categoria e imagem.
- Produtos devem ser organizados por categoria quando aplicável.

**3. Realização de pedidos**

- O cliente deve conseguir selecionar produtos.
- O cliente deve conseguir informar dados básicos de identificação (nome e contato via WhatsApp).
- O pedido deve ser registrado no banco de dados.

**4. Registro de pedidos**

- Cada pedido deve possuir: identificador único, data de criação, itens associados, valor total, status de pagamento e status do pedido.

**5. Área administrativa**

- O administrador deve conseguir acessar uma área restrita por login.
- O administrador deve conseguir cadastrar, editar e remover produtos e categorias.
- O administrador deve conseguir visualizar pedidos realizados.

**6. Persistência de dados**

- Todas as informações cadastradas devem ser armazenadas corretamente no banco de dados.
- Dados devem permanecer disponíveis após atualização ou reinício do sistema.

**7. Navegadores suportados**

- O sistema deve funcionar corretamente no Chrome, Edge e Firefox.

### 4.2 Padrões de Qualidade

**1. Organização do código**

- Estrutura de diretórios organizada com separação entre interface, lógica da aplicação e acesso a dados.

**2. Controle de versão**

- Código versionado com Git e commits com descrições claras.

**3. Banco de dados**

- Chaves primárias definidas, relacionamentos com chaves estrangeiras e integridade relacional preservada.

**4. Validação de dados**

- Dados enviados pelo usuário devem ser validados antes de serem armazenados. Campos obrigatórios não podem ser enviados vazios.

**5. Tratamento de erros**

- Mensagens de erro compreensíveis ao usuário. Falhas de comunicação com o banco tratadas de forma controlada.

**6. Testes**

- As principais funcionalidades devem ser testadas antes da entrega, incluindo: criação de produtos, edição de produtos, criação de pedidos e visualização de pedidos.

**7. Moderação e antispam de pedidos**

- Todo pedido novo deve entrar no estado de análise antes de qualquer confirmação definitiva.
- O administrador deve conseguir aprovar o pedido diretamente quando viável.
- O administrador deve conseguir enviar mensagem ao cliente e revisar/editar o pedido antes da confirmação efetiva.
- O administrador deve conseguir cancelar pedidos mal intencionados ou inviáveis.

**8. Controle de funcionamento da loja**

- O administrador deve conseguir alternar o status da loja entre aberta e fechada no painel.
- Com a loja fechada, novos pedidos não devem ser confirmados pelo fluxo padrão da loja.

---

## Restrições e Premissas

### Restrições

1. O sistema será desenvolvido utilizando o meta-framework **Next.js**, integrando front-end e back-end na mesma aplicação.
2. O sistema não possuirá integração com plataformas externas (gateways de pagamento, sistemas de entrega ou APIs de terceiros).
3. O sistema será projetado para administração por apenas um usuário administrador nesta versão.
4. O foco é em funcionalidades essenciais para realização e gerenciamento de pedidos (MVP).
5. O desenvolvimento seguirá uma arquitetura simples e organizada, priorizando manutenção e escalabilidade futura.
6. O projeto será desenvolvido dentro de um escopo limitado de tempo e recursos.

### Premissas

1. O administrador possuirá conhecimento básico para operar o painel administrativo.
2. Os clientes acessarão o sistema por navegadores em computadores ou smartphones.
3. A infraestrutura de hospedagem (servidor e banco de dados) estará disponível durante o desenvolvimento e implantação.
4. Os requisitos definidos para esta versão inicial não sofrerão alterações significativas durante o desenvolvimento.
5. O banco de dados estará disponível para integração desde o início do desenvolvimento.
6. Atualizações futuras poderão incluir personalização de pedidos, múltiplos administradores e integrações externas.

---

## Estrutura Analítica do Projeto (EAP / WBS)

### 1.1 Planejamento do Projeto

- 1.1.1 Definição do escopo do sistema ✔️
- 1.1.2 Levantamento dos requisitos funcionais ✔️
- 1.1.3 Levantamento dos requisitos não funcionais ✔️
- 1.1.4 Definição da arquitetura baseada em Next.js + Supabase ✔️

### 1.2 Configuração do Ambiente de Desenvolvimento

- 1.2.1 Criação do repositório do projeto ✔️
- 1.2.2 Configuração do ambiente Node.js ✔️
- 1.2.3 Inicialização do projeto com Next.js ✔️
- 1.2.4 Instalação das dependências principais ✔️
  - 1.2.4.1 Supabase Client ✔️
  - 1.2.4.2 Zod ✔️
  - 1.2.4.3 TailwindCSS ✔️
- 1.2.5 Configuração das variáveis de ambiente ✔️
- 1.2.6 Criação e configuração inicial do projeto Supabase ✔️

### 1.3 Modelagem do Banco de Dados

- 1.3.1 Definição das entidades do sistema ✔️
  - 1.3.1.1 Profiles
  - 1.3.1.2 Produtos
  - 1.3.1.3 Categorias
  - 1.3.1.4 Pedidos
  - 1.3.1.5 Itens do pedido
  - 1.3.1.6 FAQ
  - 1.3.1.7 Conteúdo do site
- 1.3.2 Implementação da modelagem no banco PostgreSQL  ✔️
  - 1.3.2.1 Criação das tabelas ✔️
  - 1.3.2.2 Definição de relacionamentos ✔️
  - 1.3.2.3 Criação de índices ✔️
    - 1.3.2.3.1 Índices de listagem pública de produtos ✔️
    - 1.3.2.3.2 Índices de moderação e histórico de pedidos no painel ✔️
    - 1.3.2.3.3 Índices de carregamento de itens por pedido ✔️
    - 1.3.2.3.4 Índices de FAQ por ativação e ordenação ✔️
    - 1.3.2.3.5 Índices de conteúdo institucional por seção ativa ✔️
- 1.3.3 Configuração de segurança no banco ✔️
  - 1.3.3.1 Ativação de Row Level Security (RLS) ✔️
  - 1.3.3.2 Criação de políticas de acesso ✔️
    - Nota: 22 políticas definidas em ESCOPO.md, prontas para deploy no Supabase
    - Ver `RLS_VALIDATION_GUIDE.md` para instruções de validação
- 1.3.4 Geração de tipos TypeScript a partir do banco ✔️
  - 1.3.4.1 Configuração da CLI do Supabase ✔️
  - 1.3.4.2 Geração do arquivo types/database.ts ✔️
    - Arquivo: `/types/database.ts` (493 linhas)
    - Contém tipos para: `categories`, `faqs`, `order_items`, `orders`, `products`, `profiles`, `site_content`, `store_settings`
    - Inclui tipos para funções RLS: `is_admin()`, `can_attach_item_to_order()`, `is_store_open()`

### 1.4 Desenvolvimento da Interface do Usuário

- 1.4.1 Página Inicial (Home)
  - 1.4.1.1 Estrutura visual da página
  - 1.4.1.2 Exibição de produtos em destaque
  - 1.4.1.3 Seção resumida de Sobre Nós
- 1.4.2 Página de Produtos
  - 1.4.2.1 Listagem de produtos
  - 1.4.2.2 Visualização detalhada de produto
- 1.4.3 Modal de Produto
  - 1.4.3.1 Exibição de detalhes rápidos
  - 1.4.3.2 Opção de adicionar ao carrinho
- 1.4.4 Modal de Carrinho
  - 1.4.4.1 Visualização de itens
  - 1.4.4.2 Alteração de quantidade
  - 1.4.4.3 Remoção de itens
- 1.4.5 Página FAQ
  - 1.4.5.1 Exibição das perguntas e respostas
- 1.4.6 Página de Contato
  - 1.4.6.1 Exibição das informações de contato
- 1.4.7 Página Sobre Nós
  - 1.4.7.1 Página pública dedicada com conteúdo institucional
  - 1.4.7.2 Seção editável pelo administrador
  - 1.4.7.3 Exibição de valores e história da marca
- 1.4.8 Formulário de Checkout
  - 1.4.8.1 Coleta de dados do cliente (nome, contato WhatsApp)
  - 1.4.8.2 Revisão de itens do carrinho antes de confirmar
  - 1.4.8.3 Cálculo automático do valor total
  - 1.4.8.4 Validação de dados obrigatórios
  - 1.4.8.5 Integração com fluxo de pedidos do sistema
- 1.4.9 Tela de Confirmação de Pedido
  - 1.4.9.1 Exibição do resumo do pedido enviado
  - 1.4.9.2 Número/ID único do pedido
  - 1.4.9.3 Mensagem de sucesso ao cliente
  - 1.4.9.4 Instruções de próximas etapas (consultar no WhatsApp)
  - 1.4.9.5 Opção de voltar ao catálogo
- 1.4.10 Status/Indicador de Loja Fechada
  - 1.4.10.1 Exibição de overlay ou banner quando loja está fechada
  - 1.4.10.2 Mensagem customizável (via `store_settings.closed_message`)
  - 1.4.10.3 Bloqueio visual do formulário de checkout
  - 1.4.10.4 Indicador de horário de funcionamento na navegação

### 1.5 Desenvolvimento da Área Administrativa

- 1.5.1 Dashboard Administrativo
  - 1.5.1.1 Visualização geral do sistema
- 1.5.2 Gerenciamento de Produtos
  - 1.5.2.1 Cadastro de produtos
  - 1.5.2.2 Edição de produtos
  - 1.5.2.3 Exclusão de produtos
- 1.5.3 Gerenciamento de Categorias
  - 1.5.3.1 Cadastro de categorias
  - 1.5.3.2 Edição de categorias
  - 1.5.3.3 Exclusão de categorias
- 1.5.4 Gerenciamento do Conteúdo do Site
  - 1.5.4.1 Edição da página Sobre Nós
  - 1.5.4.2 Edição da página de Contato
- 1.5.5 Gerenciamento do FAQ
  - 1.5.5.1 Cadastro de perguntas
  - 1.5.5.2 Edição de perguntas
  - 1.5.5.3 Exclusão de perguntas

### 1.6 Implementação da Lógica de Sistema (Server Side)

- 1.6.1 Implementação de Server Actions
  - 1.6.1.1 Operações de produtos
  - 1.6.1.2 Operações de categorias
  - 1.6.1.3 Operações de pedidos
  - 1.6.1.4 Operações de FAQ
  - 1.6.1.5 Operações de conteúdo do site
- 1.6.2 Validação de Dados
  - 1.6.2.1 Criação dos schemas Zod
  - 1.6.2.2 Validação de formulários
  - 1.6.2.3 Validação de requisições
- 1.6.3 Integração com Supabase
  - 1.6.3.1 Configuração do cliente Supabase
  - 1.6.3.2 Implementação de queries
  - 1.6.3.3 Implementação de mutations

### 1.7 Implementação do Sistema de Pedidos

- 1.7.1 Criação de pedidos
- 1.7.2 Registro de itens do pedido
- 1.7.3 Armazenamento do pedido no banco
- 1.7.4 Consulta de pedidos no painel administrativo
- 1.7.5 Caixa de pedidos em análise
  - 1.7.5.1 Entrada automática de novos pedidos para análise
  - 1.7.5.2 Ação de aceite de pedido
  - 1.7.5.3 Ação de revisão de pedido com mensagem ao cliente
  - 1.7.5.4 Edição do pedido durante revisão
  - 1.7.5.5 Ação de cancelamento de pedido

### 1.8 Implementação do Controle de Operação da Loja

- 1.8.1 Criação do status global da loja (aberta/fechada)
- 1.8.2 Botão de abrir/fechar loja no painel administrativo
- 1.8.3 Bloqueio de novos pedidos enquanto a loja estiver fechada
- 1.8.4 Exibição de mensagem de loja fechada na área pública

### 1.9 Implementação de Autenticação

- 1.9.1 Configuração do Supabase Auth
- 1.9.2 Criação do usuário administrador
- 1.9.3 Integração do login com Next.js
- 1.9.4 Proteção da área administrativa

### 1.10 Testes do Sistema

- 1.10.1 Testes de interface do usuário
- 1.10.2 Testes de funcionamento do carrinho
- 1.10.3 Testes de cadastro e edição de produtos
- 1.10.4 Testes de criação de pedidos
- 1.10.5 Testes de integração com banco de dados

### 1.11 Infraestrutura e Deploy

- 1.11.1 Configuração do banco Supabase em produção
- 1.11.2 Configuração das variáveis de ambiente
- 1.11.3 Build da aplicação Next.js
- 1.11.4 Deploy da aplicação
- 1.11.5 Testes de funcionamento após deploy

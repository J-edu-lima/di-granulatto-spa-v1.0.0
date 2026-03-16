# Sistema de Catálogo de Produtos e Registro de Pedidos

---

## 1. Visão Geral

O sistema consiste em uma aplicação full-stack construída com **Next.js** utilizando App Router e **Prisma ORM** para acesso ao banco de dados.
O sistema tem como objetivo catalogar os produtos (criando uma loja virtual para o vendedor) e permitir a realização de pedidos (feitos por clientes) e controle dos pedidos (feitos pelo admin).

O banco relacional possui as seguintes entidades principais:

- `products`
- `categories`
- `orders`
- `order_items`
- `faqs`
- `site_content`

A aplicação possui duas áreas principais:

**Área pública:**
- Página inicial (sobre nós e produtos em destaque)
- Catálogo de produtos
- FAQ
- Informações institucionais (Contato)

**Área administrativa:**
- Gestão de produtos e categorias
- Gestão de pedidos
- Gestão de FAQ
- Gestão de Sobre nós (conteúdo do site) e Contato
- Dashboard

> A autenticação possui apenas um usuário administrativo, criado diretamente no banco de dados. Não existe fluxo de registro público de usuários.

---

## 2. Estrutura de Pastas

A organização segue uma arquitetura modular baseada em domínio, separando rotas, interface, lógica de negócio e acesso a dados.

```
src/
├── app/                         # Rotas do Next.js (App Router)
│   ├── (auth)/                  # Grupo de rotas de autenticação
│   │   └── login/
│   │
│   ├── (store)/                 # Área pública da loja
│   │   ├── page.tsx             # Página inicial da loja
│   │   └── faq/                 # Página pública de FAQ
│   │
│   └── (admin)/                 # Área administrativa
│       ├── layout.tsx           # Layout do painel administrativo
│       ├── dashboard/           # Dashboard principal
│       ├── products/            # Gestão de produtos
│       ├── orders/              # Gestão de pedidos
│       └── content/             # Gestão de conteúdo do site
│           ├── faq/             # CRUD de FAQ
│           └── site-content/    # Conteúdo institucional do site
│
├── components/                  # Componentes reutilizáveis
│   ├── ui/                      # Componentes básicos do design system
│   │   ├── button/
│   │   ├── input/
│   │   └── modal/
│   │
│   ├── forms/                   # Componentes de formulários
│   │
│   └── shared/                  # Componentes compartilhados (header, footer, etc)
│
├── modules/                     # Domínios de negócio
│   ├── products/
│   │   ├── repository.ts        # Acesso ao banco de dados
│   │   ├── service.ts           # Regras de negócio
│   │   └── actions.ts           # Server Actions
│   │
│   ├── categories/
│   │   └── repository.ts
│   │
│   ├── orders/
│   │   ├── repository.ts
│   │   ├── service.ts
│   │   └── actions.ts
│   │
│   └── content/
│       ├── faq/
│       │   ├── repository.ts
│       │   └── loader.ts
│       │
│       └── site-content/
│           ├── repository.ts
│           ├── loader.ts
│           └── fallback.ts
│
├── lib/                         # Bibliotecas e utilitários do projeto
│   ├── prisma/
│   │   └── client.ts            # Instância do Prisma Client
│   │
│   └── utils/
│       ├── format.ts            # Funções de formatação (preço, datas, etc)
│       └── slug.ts              # Gerador de slugs
│
├── hooks/                       # Hooks globais reutilizáveis
│
└── types/                       # Tipos globais (usar apenas quando necessário)
```

---

## 3. Organização por Domínio

Cada módulo representa um domínio funcional do sistema.

| Módulo      | Responsabilidade                                                          |
|-------------|---------------------------------------------------------------------------|
| `products`  | Gestão de produtos do catálogo                                            |
| `orders`    | Criação e consulta de pedidos                                             |
| `categories`| Categorização dos produtos                                                |
| `content`   | Conteúdo editável da interface, incluindo FAQ e textos institucionais     |

---

## 4. Camadas Internas de um Módulo

Cada módulo pode possuir até três camadas principais.

### Repository

Responsável exclusivamente pelo acesso ao banco de dados.

Funções típicas:
- Consultas
- Inserções
- Atualizações
- Exclusões

> O repository **não deve** conter lógica de negócio.

Exemplo de responsabilidades em `modules/products/repository.ts`:
- Buscar produtos
- Buscar produto por id
- Criar produto
- Atualizar produto

### Service

Responsável pela lógica de negócio do sistema.

Exemplos de responsabilidades:
- Validações
- Regras de negócio
- Cálculos

> O service utiliza funções do repository para acessar o banco.

### Actions

Responsável pelas Server Actions do Next.js.

As actions são utilizadas para:
- Executar mutações
- Chamar services
- Retornar dados para a interface

---

## 5. Uso do Prisma

O Prisma é a **única fonte de verdade** para as entidades do sistema.

Os tipos gerados pelo Prisma são utilizados diretamente no código. Não são criados modelos duplicados no projeto.

**Exemplo de uso** — importação do tipo `Product` diretamente do Prisma client:

```ts
import { Product } from "@prisma/client"
```

Para operações de criação ou atualização podem ser utilizados:

```ts
Prisma.ProductCreateInput
Prisma.ProductUpdateInput
```

Isso evita duplicação de tipos e inconsistências.

---

## 6. Regra de Acesso ao Banco

O acesso ao banco deve ocorrer **exclusivamente** dentro dos repositories. Nenhuma outra parte da aplicação deve executar consultas diretamente.

**Fluxo correto:**

```
Interface
    ↓
Server Action
    ↓
Service
    ↓
Repository
    ↓
Prisma
    ↓
Banco de dados
```

Esse padrão evita queries espalhadas pelo sistema e facilita manutenção.

---

## 7. Prevenção de God Repository

Para evitar um repositório centralizado e excessivamente grande, devem ser seguidas as seguintes regras.

**Regra 1** — Cada domínio possui seu próprio repository:

```
products/repository.ts
orders/repository.ts
content/repository.ts
```

**Regra 2** — Repository deve conter apenas acesso a dados.

**Regra 3** — Repository não deve depender de interface, sessão, cookies ou lógica de UI.

---

## 8. Sistema de Conteúdo Dinâmico

O sistema possui duas fontes principais de conteúdo editável.

### FAQ

Conteúdo estruturado exibido na página inicial (Sobre Nós) e Contato.

Campos típicos:
- `id`
- `question`
- `answer`
- `order`
- `is_active`

### SITE_CONTENT

Conteúdo configurável utilizado em diferentes áreas da interface. A tabela funciona como um repositório de chave e valor.

Exemplo de chaves:
```
home.title
home.subtitle
footer.phone
footer.address
```

---

## 9. Loader de Conteúdo com Fallback Estático

Para garantir estabilidade da aplicação, o conteúdo possui um sistema de fallback.

**Fluxo de carregamento:**

```
Interface
    ↓
Content Loader
    ↓
Banco de dados
    ↓
Fallback estático (se necessário)
```

Caso o banco esteja vazio, não possua determinada chave ou esteja indisponível, o sistema utiliza conteúdo estático definido no fallback.

**Estrutura de arquivos para conteúdo** (`content/site-content/`):

| Arquivo        | Responsabilidade                                             |
|----------------|--------------------------------------------------------------|
| `repository.ts`| Acesso ao banco de dados                                     |
| `loader.ts`    | Consulta o banco, aplica fallback e gerencia cache           |
| `fallback.ts`  | Define valores padrão quando o banco não possui o conteúdo  |

---

## 10. Cache de Conteúdo

O loader pode utilizar cache do React para evitar consultas repetidas ao banco durante renderizações. Isso reduz o número de queries e melhora a performance da aplicação.

---

## 11. Convenção de Chaves para SITE_CONTENT

As chaves devem seguir um padrão consistente.

**Formato recomendado:** `area.elemento`

Exemplos válidos:
```
home.title
home.subtitle
footer.phone
footer.address
product.empty_message
```

Evitar chaves inconsistentes como:
```
homeTitle
tituloHome
home-title
```

---

## 12. Boas Práticas Gerais

| Prática                        | Descrição                                                        |
|--------------------------------|------------------------------------------------------------------|
| **Manter módulos pequenos**    | Cada módulo deve representar um domínio claro                    |
| **Evitar lógica na interface** | Componentes React devem apenas renderizar dados                  |
| **Centralizar lógica de negócio** | Regras complexas devem ficar nos services                     |
| **Evitar duplicação de tipos** | Tipos gerados pelo Prisma devem ser reutilizados                 |
| **Evitar dependências cruzadas** | Um módulo não deve depender internamente da lógica de outro   |

---

## 13. Escopo da Arquitetura

A arquitetura foi projetada para:
- Sistemas pequenos ou médios
- Aplicações internas
- Catálogo com gestão administrativa
- Baixo número de usuários

Ela prioriza:
- Simplicidade
- Modularidade
- Facilidade de manutenção

> Sem introduzir complexidade desnecessária como DDD completo ou arquiteturas de microserviços.

---

## Principais Práticas da Arquitetura

- **App Router:** Essencial para o modo server-first no Next.js
- **Server Actions:** A maneira mais recomendada de interagir com o back-end (inserir/atualizar dados) sem criar endpoints API dedicados

---

## Tecnologias & Bibliotecas

| Tecnologia    | Uso                              |
|---------------|----------------------------------|
| Next.js       | Meta-framework full-stack        |
| Supabase      | Banco de dados (PostgreSQL)      |
| TailwindCSS   | Estilização                      |
| Zod           | Validação de dados               |
| Prisma        | ORM para acesso ao banco         |

---

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
-- INDEXES
-- =========================================

CREATE INDEX idx_products_category  ON products(category_id);
CREATE INDEX idx_products_active    ON products(is_active);
CREATE INDEX idx_orders_status      ON orders(status);
CREATE INDEX idx_order_items_order  ON order_items(order_id);
```

---

## Requisitos do Sistema

### Requisitos Funcionais

| ID    | Requisito                          | Descrição                                                                                                                |
|-------|------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| RF01  | Acesso ao site                     | O sistema deve permitir que o cliente acesse o site público.                                                             |
| RF02  | Visualização de páginas públicas   | O sistema deve exibir: Página inicial, Produtos, Contato, FAQ e Sobre nós.                                               |
| RF03  | Visualização de produtos           | O sistema deve permitir que o cliente visualize os produtos disponíveis com suas informações.                            |
| RF04  | Adicionar produto ao carrinho      | O sistema deve permitir que o cliente adicione produtos ao carrinho.                                                     |
| RF05  | Alterar quantidade no carrinho     | O sistema deve permitir que o cliente altere a quantidade de produtos no carrinho.                                       |
| RF06  | Remover produto do carrinho        | O sistema deve permitir que o cliente remova produtos do carrinho.                                                       |
| RF07  | Visualizar carrinho                | O sistema deve permitir que o cliente visualize os produtos presentes no carrinho.                                       |
| RF08  | Realizar pedido                    | O sistema deve permitir que o cliente finalize um pedido com os produtos do carrinho.                                    |
| RF09  | Acesso administrativo              | O sistema deve permitir que administradores autenticados acessem o painel administrativo.                                |
| RF10  | Gerenciar produtos                 | O administrador pode inserir, atualizar e remover produtos.                                                              |
| RF11  | Gerenciar categorias               | O administrador pode inserir, atualizar e remover categorias.                                                            |
| RF12  | Gerenciar conteúdo do site         | O administrador pode atualizar conteúdos institucionais (página inicial, Sobre nós, Contato, FAQ, informações de produtos). |
| RF13  | Visualizar pedidos                 | O administrador pode visualizar os pedidos realizados pelos clientes.                                                    |
| RF14  | Gerenciar estado do pedido         | O administrador pode alterar o status: Confirmado, Preparando, Cancelado.                                                |
| RF15  | Gerenciar estado de pagamento      | O administrador pode visualizar e alterar o status de pagamento: Pago, Pendente.                                         |

### Requisitos Não Funcionais

| ID    | Requisito                        | Descrição                                                                                                  |
|-------|----------------------------------|------------------------------------------------------------------------------------------------------------|
| RNF01 | Desempenho                       | Páginas devem carregar em até 3 segundos em condições normais de uso.                                      |
| RNF02 | Concorrência                     | O sistema deve suportar múltiplos acessos simultâneos.                                                     |
| RNF03 | Segurança                        | Apenas administradores autenticados podem acessar funcionalidades administrativas.                         |
| RNF04 | Proteção de dados                | Informações de pedidos devem ser protegidas contra acesso não autorizado.                                  |
| RNF05 | Usabilidade                      | Interface simples, clara e intuitiva para navegação.                                                       |
| RNF06 | Acessibilidade do carrinho       | O carrinho deve ser facilmente acessível a partir de qualquer página do site.                              |
| RNF07 | Disponibilidade                  | O sistema deve estar disponível 24h por dia, exceto durante manutenção.                                    |
| RNF08 | Restrição de horário de pedidos  | Pedidos só podem ser realizados entre 13h e 20h.                                                           |
| RNF09 | Compatibilidade                  | Funcionar corretamente no Chrome, Firefox, Edge e Safari.                                                  |
| RNF10 | Manutenibilidade                 | Permitir atualização de produtos e conteúdos sem necessidade de alteração no código.                       |

---

## Casos de Uso do Sistema

### Atores

**Cliente** — Usuário que acessa o site para visualizar produtos e realizar pedidos.

**Administrador** — Usuário responsável pela gestão do conteúdo do site e dos pedidos realizados.

### Casos de Uso do Cliente

| ID   | Caso de Uso                 | Descrição                                                                                                 |
|------|-----------------------------|-----------------------------------------------------------------------------------------------------------|
| UC01 | Acessar site                | O cliente acessa o site por meio de um navegador.                                                         |
| UC02 | Visualizar páginas públicas | O cliente navega pelas páginas institucionais e de produtos.                                              |
| UC03 | Gerenciar carrinho          | O cliente pode adicionar produtos, alterar quantidades e remover itens do carrinho.                       |
| UC04 | Realizar pedido             | O cliente finaliza a compra dos produtos presentes no carrinho.                                           |

### Casos de Uso do Administrador

| ID   | Caso de Uso                    | Descrição                                                                             |
|------|--------------------------------|---------------------------------------------------------------------------------------|
| UC05 | Acessar sistema administrativo | O administrador realiza login no sistema administrativo.                              |
| UC06 | Gerenciar produtos             | O administrador cria, edita ou remove produtos cadastrados.                           |
| UC07 | Gerenciar categorias           | O administrador cria, edita ou remove categorias de produtos.                         |
| UC08 | Gerenciar conteúdo do site     | O administrador atualiza páginas institucionais e informações exibidas no site.       |
| UC09 | Gerenciar pedidos              | O administrador visualiza pedidos e altera seu estado.                                |
| UC10 | Gerenciar pagamento            | O administrador visualiza e altera o estado de pagamento dos pedidos.                 |

---

## Entregáveis do Projeto

| Entregável              | Descrição                                                            |
|-------------------------|----------------------------------------------------------------------|
| Software Funcional      | Código-fonte, executáveis e releases                                 |
| Documentação            | Manuais de usuário, documentação técnica e de design                |
| Relatórios de Teste     | Resultados dos testes QA (garantia de qualidade)                    |

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
- 1.1.4 Definição da arquitetura baseada em Next.js ✔️

### 1.2 Configuração do Ambiente de Desenvolvimento
- 1.2.1 Criação do repositório do projeto ✔️
- 1.2.2 Configuração do ambiente Node.js ✔️
- 1.2.3 Inicialização do projeto com Next.js ✔️
- 1.2.4 Instalação das dependências principais ✔️
  - 1.2.4.1 Prisma
  - 1.2.4.2 Zod
  - 1.2.4.3 Cliente do banco de dados
- 1.2.5 Configuração das variáveis de ambiente ✔️
- 1.2.6 Configuração inicial do banco Supabase ✔️

### 1.3 Modelagem do Banco de Dados
- 1.3.1 Definição das entidades do sistema
  - 1.3.1.1 Produtos
  - 1.3.1.2 Categorias
  - 1.3.1.3 Pedidos
  - 1.3.1.4 Itens do pedido
  - 1.3.1.5 FAQ
  - 1.3.1.6 Conteúdo do site
- 1.3.2 Implementação da modelagem no Prisma
  - 1.3.2.1 Criação do schema Prisma
  - 1.3.2.2 Criação das migrations
  - 1.3.2.3 Sincronização com o banco Supabase

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
- 1.6.1 Implementação de Server Actions ou API Routes
  - 1.6.1.1 Operações de produtos
  - 1.6.1.2 Operações de categorias
  - 1.6.1.3 Operações de pedidos
  - 1.6.1.4 Operações de FAQ
  - 1.6.1.5 Operações de conteúdo do site
- 1.6.2 Validação de Dados
  - 1.6.2.1 Criação dos schemas Zod
  - 1.6.2.2 Validação de formulários
  - 1.6.2.3 Validação de requisições
- 1.6.3 Persistência de Dados
  - 1.6.3.1 Integração com Prisma
  - 1.6.3.2 Operações de leitura e escrita no banco

### 1.7 Implementação do Sistema de Pedidos
- 1.7.1 Criação de pedidos
- 1.7.2 Registro de itens do pedido
- 1.7.3 Armazenamento do pedido no banco
- 1.7.4 Consulta de pedidos no painel administrativo

### 1.8 Testes do Sistema
- 1.8.1 Testes de interface do usuário
- 1.8.2 Testes de funcionamento do carrinho
- 1.8.3 Testes de cadastro e edição de produtos
- 1.8.4 Testes de criação de pedidos
- 1.8.5 Testes de integração com banco de dados

### 1.9 Infraestrutura e Deploy
- 1.9.1 Configuração do banco Supabase em produção
- 1.9.2 Configuração das variáveis de ambiente
- 1.9.3 Build da aplicação Next.js
- 1.9.4 Deploy da aplicação
- 1.9.5 Testes de funcionamento após deploy



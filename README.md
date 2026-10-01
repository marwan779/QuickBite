# 🍔 QuickBite — Multi-Region Food Delivery & Ordering Platform

> [!IMPORTANT]
> **Project Status: Ongoing / Work In Progress (WIP)**  
> QuickBite is actively under active development. Core infrastructure, data models, inter-service contracts, and transactional flows are actively being built and refined.

---

## 📌 1. Project Overview

**QuickBite** is a scalable, distributed, multi-region food delivery and ordering microservices platform designed to connect **Customers**, **Restaurants**, **Delivery Agents**, and **Platform Administrators**.

The platform is engineered with strong transactional consistency for financial transactions and order state transitions, multi-tenant region sharding, event-driven cache invalidation, and real-time WebSocket event dispatching.

---

## 🏛️ 2. High-Level Architecture

QuickBite is partitioned into specialized microservices communicating via **synchronous HTTP REST APIs** (with resilient caching & retries) and **asynchronous event-driven messaging** via RabbitMQ.

```mermaid
flowchart TD
    subgraph Clients["Clients"]
        CA["📱 Customer App"]
        RD["🖥️ Restaurant Dashboard"]
        DA["🛵 Delivery Agent App"]
        AD["📊 Admin Dashboard"]
    end

    subgraph CoreService["Core-Service (Port: 3000)"]
        direction TB
        CS_API["Express REST API\n- Auth & User Profiles\n- Restaurant & Branch Catalog\n- Product Menus & Stock\n- RBAC Permission Engine\n- Internal Endpoints (/internal/*)"]
        CS_OB["Transactional Outbox Worker\n(croner + SKIP LOCKED)"]
        CS_DB[("PostgreSQL\n(core_service DB)")]
        CS_API <--> CS_DB
        CS_API -->|Insert Outbox Event| CS_DB
        CS_OB -->|Drain & Publish| CS_DB
    end

    subgraph MessageBroker["Message Broker"]
        RMQ["RabbitMQ Exchange\n(core.events)"]
        DLQ["Dead Letter Queue\n(order-service.core-events.dlq)"]
    end

    subgraph OrderService["Order-Service (Port: 4000)"]
        direction TB
        OS_HTTP["Express REST API\n- Order Placement & State Machine\n- Kashier v3 Online & COD Payments\n- Driver Dispatch & PostGIS Geo Tracking\n- Restaurant Financial Balance Ledger"]
        OS_WS["Socket.IO Server (/ws)\n(Live room broadcast)"]
        OS_SUB["RabbitMQ Consumer\n(order-service.core-events)"]
        OS_ROUTER["Region Shard Router\n(X-Region -> Knex connection)"]
        
        OS_SHARD_EG[("PostgreSQL Shard (EG)")]
        OS_SHARD_KSA[("PostgreSQL Shard (KSA)")]
        OS_ARCH[("PostgreSQL Archive\n(Cold storage)")]

        OS_ROUTER --> OS_SHARD_EG & OS_SHARD_KSA & OS_ARCH
    end

    subgraph SharedInfra["Shared Infrastructure"]
        REDIS[("Redis\n- Cross-Service Cache\n- 24h Idempotency\n- Driver Geo Presence\n- Socket.IO Pub/Sub Adapter\n- Event Deduplication")]
        KASHIER["Kashier v3 Payment Gateway\n(Sessions & HMAC Webhooks)"]
    end

    %% Client communication
    Clients -->|HTTP / REST| CS_API
    Clients -->|HTTP / REST (X-Region)| OS_HTTP
    Clients <-->|WebSocket /ws| OS_WS

    %% Inter-service Sync
    OS_HTTP -->|Sync HTTP (Internal API Key)| CS_API

    %% Inter-service Async
    CS_OB -->|Publisher Confirms| RMQ
    RMQ -->|product.#, branch.#, rbac.#| OS_SUB
    OS_SUB -->|Cache Invalidation| REDIS
    OS_SUB -.->|On Handler Failure| DLQ

    %% Cache & Storage
    OS_HTTP <--> REDIS
    OS_WS <-->|Pub/Sub Fan-out| REDIS
    OS_HTTP <--> KASHIER
```

---

## 📦 3. Microservices Breakdown

### 🔹 Core-Service
The system of record for identity, operational structure, product catalog, and role-based permissions.
* **Authentication & Identity**: User registration, login, token refresh, and bcrypt password hashing.
* **Role-Based Access Control (RBAC)**: Fine-grained resource-action permission system (`core:product:create`, `core:branch:update`, etc.) scoped per restaurant.
* **Catalog & Branch Management**: Restaurant profiles, branch location & operational hours, branch delivery fees, and category/product menus.
* **Customer Addresses**: Multi-address management with geocoded coordinates.
* **Transactional Outbox**: Guarantees at-least-once asynchronous domain event publication (`product.stock.changed`, `branch.updated`, `restaurant.suspended`, etc.) without dual-write inconsistencies.
* **Internal APIs**: Secure `/internal/*` service-to-service endpoints protected by internal API key verification.

### 🔹 Order-Service
The transactional and financial engine handling live orders, money, and logistics.
* **Order Placement & State Machine**: End-to-end lifecycle management (`pending_payment` ➔ `placed` ➔ `accepted` ➔ `preparing` ➔ `ready` ➔ `assigned` ➔ `picked` ➔ `delivered` / `cancelled` / `rejected`).
* **Multi-Country Database Sharding**: Horizontally partitioned relational databases per country (`eg`, `ksa`, ...) resolved via the `X-Region` header.
* **Payment Processing**:
  * **Online**: Kashier v3 Payment Sessions with HMAC-verified webhook confirmations and automatic refund flows.
  * **Cash on Delivery (COD)**: Cash collection state tracking and delivery driver verification.
* **Restaurant Financial Ledger**: Immutable `transactions` ledger tracking charges, platform commissions, refunds, and bank payouts with `SELECT ... FOR UPDATE` balance locking.
* **Logistics & Driver Dispatch**: Proximity-based driver auto-assignment, reassignment audit chains, PostGIS geographical tracking, and driver earnings records.
* **Real-Time Push**: Socket.IO room-based WebSocket server with Redis adapter for live order tracking, status transitions, and driver location updates.
* **Cold Archival Engine**: Annual partition worker migrating prior-year transactional data to cold storage.

---

## 🛠️ 4. Technology Stack & Tooling

| Domain | Technology / Library | Purpose |
| :--- | :--- | :--- |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (v5.x) | Strict typing, decorators, and metadata reflection |
| **Runtime & Framework** | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/) (v5) | HTTP REST API routing and middleware pipelines |
| **Real-Time Communication** | [Socket.IO](https://socket.io/) & `@socket.io/redis-adapter` | Bi-directional WebSocket events with multi-worker fan-out |
| **Databases** | [PostgreSQL](https://www.postgresql.org/) (15+) & [PostGIS](https://postgis.net/) | Primary relational storage & geospatial driver queries |
| **Query Engine** | [Knex.js](https://knexjs.org/) | Query builder, schema migrations, and transactional connection pooling |
| **In-Memory Cache & Pub/Sub** | [Redis](https://redis.io/) (`ioredis`) | Read-through caching, 24h idempotency, event deduplication, and presence |
| **Message Broker** | [RabbitMQ](https://www.rabbitmq.com/) (`amqplib`, `amqp-connection-manager`) | Resilient topic-based inter-service event streaming (`core.events`) |
| **Dependency Injection** | [TSyringe](https://github.com/microsoft/tsyringe) | Lightweight IoC container using token symbols (`TOKENS`) |
| **Validation & Serialization** | `class-validator`, `class-transformer`, `zod` | Declarative DTO input validation and environment parsing |
| **Security & Auth** | `jsonwebtoken`, `bcrypt`, `helmet`, `cors` | Stateless JWT tokens, password hashing, and HTTP header hardening |
| **Payments Integration** | [Kashier v3](https://developers.kashier.io/) | Payment Sessions API, redirect checkouts, and webhook signature verification |
| **Email Service** | [Mailjet](https://www.mailjet.com/) (`node-mailjet`) | Transactional staff invitation emails and notifications |
| **Development Utilities** | `tsx`, `ts-node`, `dotenv`, `uuid` | Live TypeScript reload, environment loaders, and UUID generation |

---

## 💡 5. Key Architectural & Engineering Patterns

1. **Strict Response DTO Pattern**: Controllers never return raw SQL rows or domain entities. Every endpoint maps output through explicit Response DTOs (`dto/*.response.dto.ts`), preventing data leaks and decoupling database schema from external API contracts.
2. **Integer Minor Units for Currency**: All monetary values (`subtotal`, `delivery_fee`, `commission`, `balance`) are strictly stored as `INT` minor units (e.g., `1500` for 15.00 EGP/SAR) to eliminate floating-point arithmetic errors.
3. **Transactional Outbox Pattern**: In `Core-Service`, mutations and event logs are committed within the same database transaction. A decoupled worker processes the outbox using `FOR UPDATE SKIP LOCKED` and publisher confirms to guarantee zero message loss.
4. **Idempotency Safeguards**: Critical endpoints (`POST /orders`, `POST /payments/init`, payouts) enforce strict idempotency headers backed by Redis with database fallback (`idempotency_keys` table).
5. **Multi-Region Database Routing**: In `Order-Service`, requests dynamically resolve database connections based on the operational region (`db(region)`), ensuring zero cross-region contention.
6. **Strict Layered Architecture**: Clear separation of concerns across tiers:
   * `app/`: Domain business logic (controllers, services, repositories, entities, DTOs).
   * `lib/`: Application-aware infrastructure (auth guards, database shards, caching, core-client, websockets).
   * `pkg/`: App-agnostic, framework-free reusable packages (Redis client, RabbitMQ client, Kashier client, money utilities).

---

## 📁 6. Project Structure

```
QuickBite/
├── Core-Service/                   # Identity, Catalog & RBAC Service
│   ├── src/
│   │   ├── app/                    # Domain Modules
│   │   │   ├── auth/               # Authentication & Password Reset
│   │   │   ├── branch/             # Restaurant Branches & Geo Lookup
│   │   │   ├── customer-address/   # Customer Saved Addresses
│   │   │   ├── product/            # Products, Categories & Stock
│   │   │   ├── restaurant/         # Restaurant Profiles & Onboarding
│   │   │   ├── role-based-access-control/ # Members & RBAC Permissions
│   │   │   └── user/               # Users & Agent Profiles
│   │   ├── lib/                    # Shared Infrastructure (Knex, Auth, Cache, Outbox, DI)
│   │   ├── pkg/                    # Agnostic Providers (Email, Redis, Money, Time)
│   │   ├── migrations/             # PostgreSQL Migrations
│   │   ├── app.ts                  # Express Application
│   │   ├── server.ts               # HTTP Server Entry Point
│   │   └── worker.ts               # Transactional Outbox Background Worker
│   └── package.json
│
├── Order-Service/                  # Orders, Payments, Deliveries & Real-Time Service
│   ├── docs/                       # Architecture, PRD, System Design & ERD Specifications
│   ├── play/                       # Scratchpad & Test Scripts (WebSockets, RabbitMQ, Sharding)
│   ├── src/
│   │   ├── app/                    # Domain Modules (Orders, Payments, Deliveries, Agents, Finance)
│   │   ├── lib/                    # Infrastructure (Sharding Router, Core Client, Core Events, WebSockets)
│   │   ├── pkg/                    # Reusable Clients (RabbitMQ, Kashier, Redis, Money)
│   │   ├── migrations/             # Multi-Region Sharded Migrations
│   │   ├── app.ts                  # Express Application
│   │   └── server.ts               # HTTP & Socket.IO Server Entry Point
│   └── package.json
│
└── README.md                       # Project Overview & Documentation
```

---

## 🚀 7. Getting Started & Local Development

### Prerequisites
* **Node.js**: `v20.x` or higher
* **PostgreSQL**: `15+` with PostGIS extension support
* **Redis**: `7.x`
* **RabbitMQ**: `3.12+`

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/<your-username>/QuickBite.git
cd QuickBite
```

---

### Step 2: Setup Core-Service
```bash
cd Core-Service
npm install

# Configure environment variables
cp .env.example .env
```

Edit `Core-Service/.env` with your PostgreSQL, Redis, Mailjet, and RabbitMQ credentials.

Run database migrations:
```bash
npm run migrate
```

Start the service and background outbox worker:
```bash
# Start API server (port 3000)
npm run dev

# In a separate terminal, start Outbox Worker
npm run worker:dev
```

---

### Step 3: Setup Order-Service
```bash
cd ../Order-Service
npm install

# Configure environment variables
cp .env.example .env
```

Edit `Order-Service/.env` with your regional PostgreSQL database connection strings (`DB_eg_*`, `DB_ksa_*`), Redis host, and RabbitMQ configuration.

Run regional database migrations:
```bash
npm run migrate:all
```

Start the service:
```bash
# Start API and WebSocket server (port 4000)
npm run dev
```

---

### Step 4: Verify System Health
* **Core-Service Health**: `http://localhost:3000/api/health`
* **Order-Service Health**: `http://localhost:4000/api/health` (checks connectivity across all active shard databases and Redis).

---

## 🗺️ 8. Project Roadmap & Current Progress

- [x] **Core-Service Architecture & Domain Modules**
  - [x] Authentication, Password Resets & Session Tokens
  - [x] Role-Based Access Control (RBAC) & Restaurant Staff Invitations
  - [x] Restaurants & Branch Hierarchy with Geocoded Locations
  - [x] Product Categories, Menus & Inventory Stock Management
  - [x] Transactional Outbox Worker for Domain Event Publishing
  - [x] Internal Service-to-Service API Key Protected Endpoints
- [x] **Order-Service Scaffolding & Infrastructure (Phase 0)**
  - [x] Multi-Region Country Sharding Database Engine (`eg`, `ksa`)
  - [x] Resilient Core-Service Synchronous HTTP Client with Retries
  - [x] RabbitMQ Inbound Consumer Loop with Redis Deduplication & DLQ
  - [x] Socket.IO Server with Redis Pub/Sub Adapter
- [ ] **Order-Service Domain Modules (In Progress)**
  - [ ] **Phase 1**: Order Placement (COD flow), State Machine & Lifecycle Matrix
  - [ ] **Phase 2**: Payments Module, Kashier v3 Sessions & HMAC Webhooks
  - [ ] **Phase 3**: Deliveries Module, Driver Assignment & Atomic Settlement Transactions
  - [ ] **Phase 4**: Agents Module, PostGIS Driver Presence & Redis Geospatial Lookups
  - [ ] **Phase 5**: Restaurant Finance Ledger, Balance Tracking & Payouts
  - [ ] **Phase 6**: End-to-End WebSocket Event Wiring across all client channels
  - [ ] **Phase 7**: Annual Cold Archival Worker

---

## 📄 9. License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

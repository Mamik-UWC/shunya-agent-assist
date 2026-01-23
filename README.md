# Shunya Agent Assist Platform

A production-grade frontend application for the Agent Assist Platform, built with Next.js 16 (App Router), optimized for multi-tenant, white-label deployments with feature-based architecture.

## 🎯 Overview

The Agent Assist Platform provides real-time decision support for call center agents, comprehensive analytics for managers, and configuration tools for administrators. The platform is designed with strict separation of concerns, tenant isolation, and feature-flag driven UI.

## ✨ Key Features

- **Agent Interface**: Live call support, post-call analysis, SOP/knowledge base, and AI chat assistant
- **Manager Dashboard**: Performance analytics, session monitoring, live call oversight, and advanced intelligence
- **Admin Portal**: Organization setup, knowledge management, feature configuration, and audit logging
- **Multi-tenant**: Complete tenant isolation with white-label capabilities
- **Real-time**: WebSocket/SSE integration for live call data and monitoring
- **Feature Flags**: Dynamic feature enablement per tenant

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Zustand (minimal, intentional usage)
- **Real-time**: WebSocket / SSE abstraction layer

## 📋 Prerequisites

- Node.js 20.x or higher
- pnpm 8.x or higher
- Git

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Setup shadcn/ui

```bash
# Initialize shadcn/ui
pnpm dlx shadcn@latest init

# Add components as needed
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
# ... etc
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── agent/             # Agent interface routes
│   ├── manager/           # Manager dashboard routes
│   ├── admin/             # Admin configuration routes
│   └── api/               # BFF API endpoints
│
├── features/              # Feature-based modules
│   ├── live-call/
│   ├── post-call/
│   ├── sop/
│   ├── knowledge/
│   ├── chat-assistant/
│   ├── dashboards/
│   ├── sessions/
│   ├── live-monitoring/
│   ├── onboarding/
│   ├── configuration/
│   └── audit-logs/
│
├── components/            # Shared components
│   ├── ui/                # shadcn/ui primitives
│   ├── layout/
│   ├── data-viz/
│   └── feedback/
│
├── stores/                # Zustand stores
│   ├── auth.store.ts
│   ├── tenant.store.ts
│   ├── feature-flags.store.ts
│   ├── live-call.store.ts
│   └── ui.store.ts
│
├── lib/                   # Core utilities
│   ├── api/               # API client & config
│   ├── realtime/          # WebSocket/SSE abstraction
│   ├── permissions/       # RBAC utilities
│   ├── feature-flags/     # Feature flag logic
│   └── telemetry/         # Monitoring & analytics
│
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── constants/             # App constants
└── styles/                # Global styles & themes
```

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Setup Guide](./docs/SETUP.md)** - Detailed installation and configuration
- **[Architecture](./docs/ARCHITECTURE.md)** - System design and patterns
- **[Development Guidelines](./docs/DEVELOPMENT.md)** - Coding standards and best practices
- **[Contributing](./docs/CONTRIBUTING.md)** - How to contribute to the project

## 🏗️ Architecture Principles

1. **Feature-based architecture** - Not page-based
2. **Strict separation** - UI, domain logic, and server data access
3. **Tenant & feature-flag driven UI** - Dynamic feature enablement
4. **Zero coupling** - Agent and Manager surfaces are independent
5. **Isolated real-time logic** - WebSocket/SSE in dedicated layer

## 🎨 UI/UX Guidelines

- **Agent UI**: Minimal, fast, distraction-free
- **Manager UI**: Analytical, data-rich, comprehensive
- **Admin UI**: Audit-first, configuration-focused

## 🔧 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 🧪 Development

See [Development Guidelines](./docs/DEVELOPMENT.md) for:
- Code style and conventions
- Component patterns
- State management guidelines
- Testing approach
- Git workflow

## 📖 Route Structure

### Agent Routes
- `/agent/live-call` - Live call interface
- `/agent/post-call/[sessionId]` - Post-call analysis
- `/agent/sop` - SOP and knowledge base
- `/agent/chat` - AI chat assistant

### Manager Routes
- `/manager/overview` - Overview dashboard
- `/manager/agents` - Agent performance
- `/manager/sessions` - Sessions list
- `/manager/sessions/[sessionId]` - Session details
- `/manager/live-monitoring` - Live call monitoring
- `/manager/intelligence` - Advanced analytics

### Admin Routes
- `/admin/onboarding` - Organization setup
- `/admin/knowledge` - Knowledge management
- `/admin/intents` - Intent configuration
- `/admin/features` - Feature enablement
- `/admin/dashboards` - Dashboard configuration
- `/admin/automation` - Automation & webhooks
- `/admin/data-retention` - Data retention policies
- `/admin/audit-logs` - Audit log viewer

## 🔐 State Management

Zustand is used **only** for:
- Auth & RBAC state
- Tenant configuration
- Feature flags
- Live call state
- UI preferences

**Never** use Zustand for server data caching. Use React Server Components and proper data fetching patterns instead.

## 🌐 Real-time Architecture

Real-time functionality is abstracted in `lib/realtime/`:
- UI components never directly interact with WebSocket/SSE
- Stores subscribe to real-time events
- Components consume store state

## 🚨 Important Notes

- This is **not** a CRUD dashboard
- Real-time logic must be isolated to prevent memory leaks and jitter
- Agent UI must remain minimal and performant
- Manager UI can be heavier with analytics
- Admin UI prioritizes audit trails over UX

## 📝 License

Private - All rights reserved

## 🤝 Contributing

Please read [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

For detailed information, refer to the [requirements document](./requirement.md) and the documentation in the `docs/` directory.

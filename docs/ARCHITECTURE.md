# Architecture Documentation

Comprehensive guide to the Shunya Agent Assist Platform architecture, design patterns, and system organization.

## 🏗️ Architecture Overview

The platform follows a **feature-based architecture** with strict separation of concerns, designed for multi-tenant, white-label deployments with real-time capabilities.

## 📐 Core Principles

### 1. Feature-Based Organization

**Not page-based, feature-based.**

Code is organized by business features/domains, not by file type. Each feature is self-contained with its own:
- Components
- Hooks
- API clients
- State management (when needed)
- Types
- Utilities

### 2. Strict Separation of Concerns

Three distinct layers that must never mix:

- **UI Layer**: React components, presentation logic
- **Domain Layer**: Business logic, feature logic
- **Data Layer**: Server data access, API calls, real-time subscriptions

### 3. Tenant & Feature Flag Driven

Every screen and component checks:
- Feature flags: `useFeature("live_sentiment")`
- Permissions: `usePermission("manager")`
- Tenant configuration: `useTenant()`

This avoids conditional rendering hell and ensures proper isolation.

### 4. Zero Coupling

- Agent interface and Manager dashboard are completely independent
- No shared state between surfaces
- Separate route groups: `(agent)`, `(manager)`, `(admin)`

### 5. Isolated Real-Time Logic

- WebSocket/SSE logic lives in `lib/realtime/`
- UI components never directly interact with sockets
- Stores subscribe to real-time events
- Components consume store state

## 📁 Project Structure

```
app/                              # Next.js App Router
├── (auth)/                       # Authentication route group
│   ├── login/
│   └── register/
│
├── agent/                        # Agent interface routes
│   ├── live-call/
│   ├── post-call/
│   │   └── [sessionId]/
│   ├── sop/
│   └── chat/
│
├── manager/                      # Manager dashboard routes
│   ├── overview/
│   ├── agents/
│   ├── sessions/
│   │   └── [sessionId]/
│   ├── live-monitoring/
│   └── intelligence/
│
├── admin/                        # Admin configuration routes
│   ├── onboarding/
│   ├── knowledge/
│   ├── intents/
│   ├── features/
│   ├── dashboards/
│   ├── automation/
│   ├── data-retention/
│   └── audit-logs/
│
├── api/                          # BFF (Backend for Frontend) endpoints
│   ├── auth/
│   ├── sessions/
│   └── realtime/
│
├── layout.tsx                    # Root layout
└── page.tsx                      # Home/landing page

features/                         # Feature modules (business domains)
│   ├── live-call/
│   │   ├── components/
│   │   │   ├── LiveCallHeader.tsx
│   │   │   ├── IntentBadge.tsx
│   │   │   ├── SentimentIndicator.tsx
│   │   │   ├── SOPFlowPanel.tsx
│   │   │   ├── NextBestActionCard.tsx
│   │   │   ├── ComplianceStatus.tsx
│   │   │   ├── UpsellPrompt.tsx
│   │   │   └── AgentChatDock.tsx
│   │   ├── hooks/
│   │   │   └── useLiveCall.ts
│   │   ├── api/
│   │   │   └── liveCallApi.ts
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   ├── post-call/
│   │   ├── components/
│   │   │   ├── CallSummary.tsx
│   │   │   ├── KeyMomentsTimeline.tsx
│   │   │   ├── TranscriptViewer.tsx
│   │   │   ├── TicketDraftPanel.tsx
│   │   │   └── ComplianceReport.tsx
│   │   └── ...
│   │
│   ├── sop/                      # SOP & Knowledge base
│   ├── knowledge/
│   ├── chat-assistant/
│   ├── dashboards/
│   ├── sessions/
│   ├── live-monitoring/
│   ├── onboarding/
│   ├── configuration/
│   └── audit-logs/
│
components/                       # Shared/reusable components
├── ui/                           # shadcn/ui primitives
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── ...
│
├── layout/                       # Layout components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Navigation.tsx
│   └── Footer.tsx
│
├── data-viz/                     # Data visualization
│   ├── Chart.tsx
│   ├── TrendLine.tsx
│   └── ...
│
└── feedback/                     # User feedback components
    ├── Toast.tsx
    ├── Alert.tsx
    └── ...

stores/                           # Zustand stores (minimal usage)
├── auth.store.ts                 # Authentication state
├── tenant.store.ts               # Tenant configuration
├── feature-flags.store.ts        # Feature flags
├── live-call.store.ts            # Live call state
└── ui.store.ts                   # UI preferences

lib/                              # Core utilities & abstractions
├── api/
│   ├── client.ts                 # API client configuration
│   ├── interceptors.ts           # Request/response interceptors
│   └── endpoints.ts              # API endpoint definitions
│
├── realtime/
│   ├── socket-client.ts          # WebSocket client
│   ├── sse-client.ts             # SSE client
│   ├── event-types.ts            # Event type definitions
│   └── adapters/                 # Protocol adapters
│
├── permissions/
│   ├── rbac.ts                   # Role-based access control
│   └── hooks.ts                  # Permission hooks
│
├── feature-flags/
│   ├── flags.ts                  # Feature flag definitions
│   └── hooks.ts                  # Feature flag hooks
│
├── telemetry/
│   └── analytics.ts              # Analytics tracking
│
└── utils/
    └── cn.ts                     # className utility (from shadcn)

hooks/                            # Shared custom hooks
├── useFeature.ts
├── usePermission.ts
├── useTenant.ts
└── ...

types/                            # Global TypeScript types
├── api.ts
├── auth.ts
├── tenant.ts
└── ...

constants/                        # Application constants
├── routes.ts
├── permissions.ts
└── ...
```

## 🎯 Feature Module Structure

Each feature module follows this structure:

```
features/feature-name/
├── components/           # Feature-specific components
│   ├── ComponentA.tsx
│   └── ComponentB.tsx
│
├── hooks/                # Feature-specific hooks
│   └── useFeatureHook.ts
│
├── api/                  # Feature API clients
│   └── featureApi.ts
│
├── utils/                # Feature utilities
│   └── helpers.ts
│
├── types.ts              # Feature types
├── constants.ts          # Feature constants
└── index.ts              # Public API exports
```

### Feature Module Rules

1. **Self-contained**: Feature should not depend on other features
2. **Public API**: Only export what's needed via `index.ts`
3. **No cross-feature imports**: Use shared components/lib instead
4. **Type safety**: All types defined in `types.ts`

## 🔄 Data Flow

### Server Components (Default)

```
Server Component → Server Data Fetching → Render HTML
```

- Use for initial page loads
- Direct database/API access
- No client-side JavaScript needed
- SEO-friendly

### Client Components (When Needed)

```
Client Component → API Route (BFF) → Backend API → Response
```

- Use for interactivity
- Real-time updates
- User interactions
- State management

### Real-Time Data Flow

```
WebSocket/SSE → lib/realtime/ → Store → Component
```

1. Real-time connection established in `lib/realtime/`
2. Events dispatched to stores
3. Components subscribe to store state
4. UI updates reactively

## 🗂️ State Management Strategy

### Zustand Usage (Minimal)

Use Zustand **only** for:

- ✅ Authentication & RBAC state
- ✅ Tenant configuration
- ✅ Feature flags
- ✅ Live call state (real-time)
- ✅ UI preferences (theme, sidebar state)

### Never Use Zustand For

- ❌ Server data caching (use React Server Components)
- ❌ API response caching (use Next.js caching)
- ❌ Form state (use React Hook Form or similar)
- ❌ Component-local state (use `useState`)

### State Management Pattern

```typescript
// ✅ Good: Zustand for global, persistent state
const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// ❌ Bad: Zustand for server data
// Use React Server Components instead
```

## 🔌 Real-Time Architecture

### Abstraction Layer

Real-time functionality is abstracted in `lib/realtime/`:

```
lib/realtime/
├── socket-client.ts      # WebSocket implementation
├── sse-client.ts         # SSE implementation
├── event-types.ts        # Type-safe event definitions
└── adapters/             # Protocol-specific adapters
```

### Usage Pattern

```typescript
// In store
import { socketClient } from '@/lib/realtime';

socketClient.subscribe('call.update', (data) => {
  set({ callData: data });
});

// In component
const callData = useLiveCallStore((state) => state.callData);
```

### Rules

1. **No direct socket access** in components
2. **Stores handle subscriptions** - components consume stores
3. **Type-safe events** - all events defined in `event-types.ts`
4. **Automatic reconnection** - handled in client layer

## 🎨 Component Architecture

### Component Hierarchy

```
Page (Server Component)
  └── Layout (Server Component)
      └── Feature Container (Server Component)
          └── Feature Components (Client Components)
              └── UI Primitives (shadcn/ui)
```

### Component Types

1. **Server Components** (default)
   - No `'use client'` directive
   - Can fetch data directly
   - No browser APIs

2. **Client Components**
   - Must have `'use client'` directive
   - Can use hooks, state, effects
   - Browser APIs available

### Component Patterns

#### Feature Component

```typescript
// features/live-call/components/LiveCallHeader.tsx
'use client';

import { useLiveCallStore } from '@/stores/live-call.store';
import { useFeature } from '@/hooks/useFeature';

export function LiveCallHeader() {
  const callData = useLiveCallStore((state) => state.callData);
  const hasSentiment = useFeature('live_sentiment');
  
  // Component logic
}
```

#### Shared Component

```typescript
// components/layout/Header.tsx
'use client';

import { Button } from '@/components/ui/button';

export function Header() {
  // Shared layout component
}
```

## 🛣️ Routing Architecture

### Route Groups

Next.js route groups `(group-name)` organize routes without affecting URL structure:

- `(auth)` - Authentication pages
- `agent` - Agent interface (no group, direct routes)
- `manager` - Manager dashboard (no group, direct routes)
- `admin` - Admin portal (no group, direct routes)

### Route Structure

```
/agent
  /live-call          → Agent live call interface
  /post-call/[id]     → Post-call analysis
  /sop                → SOP/knowledge base
  /chat               → AI chat assistant

/manager
  /overview           → Overview dashboard
  /agents             → Agent performance
  /sessions           → Sessions list
  /sessions/[id]      → Session details
  /live-monitoring    → Live call monitoring
  /intelligence       → Advanced analytics

/admin
  /onboarding         → Org setup
  /knowledge          → Knowledge management
  /intents            → Intent configuration
  /features           → Feature enablement
  /dashboards         → Dashboard config
  /automation         → Automation & webhooks
  /data-retention     → Retention policies
  /audit-logs         → Audit log viewer
```

### Layout Strategy

- Root layout: `app/layout.tsx` - Global layout, providers
- Route group layouts: `app/(auth)/layout.tsx` - Auth-specific layout
- Feature layouts: `app/agent/layout.tsx` - Agent interface layout

## 🔐 Permission & Feature Flag System

### Permission Checks

```typescript
// hooks/usePermission.ts
export function usePermission(permission: string): boolean {
  const user = useAuthStore((state) => state.user);
  return checkPermission(user, permission);
}

// Usage
const canManage = usePermission('manager');
if (!canManage) return <Unauthorized />;
```

### Feature Flag Checks

```typescript
// hooks/useFeature.ts
export function useFeature(feature: string): boolean {
  const flags = useFeatureFlagsStore((state) => state.flags);
  return flags[feature] ?? false;
}

// Usage
const hasSentiment = useFeature('live_sentiment');
{hasSentiment && <SentimentIndicator />}
```

## 🎨 Styling Architecture

### Tailwind CSS

- Utility-first CSS framework
- Configured in `tailwind.config.ts` (or CSS variables in v4)
- Global styles in `app/globals.css`

### shadcn/ui Components

- Installed to `components/ui/`
- Fully customizable
- Type-safe
- Accessible by default

### Theming

- CSS variables for theming
- Dark mode support
- Tenant-specific themes (white-label)

## 📊 API Architecture

### BFF Pattern

Backend for Frontend (BFF) endpoints in `app/api/`:

- Aggregate multiple backend calls
- Transform data for frontend
- Handle authentication
- Rate limiting
- Error handling

### API Client

Centralized API client in `lib/api/client.ts`:

```typescript
// lib/api/client.ts
export const apiClient = {
  get: (url: string) => fetch(url, { ... }),
  post: (url: string, data: any) => fetch(url, { method: 'POST', ... }),
  // ...
};
```

## 🧪 Testing Strategy

### Unit Tests

- Component tests: React Testing Library
- Hook tests: Custom test utilities
- Utility tests: Jest/Vitest

### Integration Tests

- Feature workflows
- API integration
- Real-time functionality

### E2E Tests

- Critical user flows
- Cross-browser testing
- Performance testing

## 🚀 Performance Considerations

### Server Components

- Default to Server Components
- Reduce client bundle size
- Faster initial load

### Code Splitting

- Route-based code splitting (automatic)
- Dynamic imports for heavy components
- Lazy loading for non-critical features

### Caching

- Next.js data caching
- Static generation where possible
- ISR for dynamic content

## 🔒 Security Considerations

### Authentication

- Server-side session management
- JWT tokens (if needed)
- Secure cookie handling

### Authorization

- RBAC checks on server
- Client-side checks for UX only
- Never trust client-side permissions

### Data Protection

- Input validation
- XSS prevention
- CSRF protection
- Secure API communication

## 📚 Further Reading

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

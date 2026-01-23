# Development Guidelines

Comprehensive guide for developing features, components, and maintaining code quality in the Shunya Agent Assist Platform.

## 📋 Table of Contents

- [Code Style](#code-style)
- [Component Patterns](#component-patterns)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Real-Time Development](#real-time-development)
- [Testing](#testing)
- [Git Workflow](#git-workflow)
- [Performance Best Practices](#performance-best-practices)

## 🎨 Code Style

### TypeScript

#### Strict Mode

TypeScript strict mode is **enabled**. Follow these rules:

- ✅ Always define types explicitly
- ✅ Use interfaces for object shapes
- ✅ Use types for unions, intersections, and utilities
- ✅ Avoid `any` - use `unknown` if type is truly unknown
- ✅ Use type guards for runtime type checking

```typescript
// ✅ Good
interface User {
  id: string;
  email: string;
  role: 'agent' | 'manager' | 'admin';
}

function getUser(id: string): Promise<User> {
  // ...
}

// ❌ Bad
function getUser(id: any): any {
  // ...
}
```

#### Naming Conventions

- **Components**: PascalCase - `LiveCallHeader.tsx`
- **Hooks**: camelCase with `use` prefix - `useLiveCall.ts`
- **Utilities**: camelCase - `formatDate.ts`
- **Constants**: UPPER_SNAKE_CASE - `MAX_RETRIES`
- **Types/Interfaces**: PascalCase - `CallData`, `UserRole`
- **Files**: Match export name - `LiveCallHeader.tsx` exports `LiveCallHeader`

### Import Organization

Organize imports in this order:

1. React/Next.js imports
2. Third-party libraries
3. Internal features
4. Shared components
5. Utilities and types
6. Styles

```typescript
// 1. React/Next.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party
import { z } from 'zod';
import { format } from 'date-fns';

// 3. Internal features
import { useLiveCall } from '@/features/live-call/hooks/useLiveCall';

// 4. Shared components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 5. Utilities and types
import { cn } from '@/lib/utils';
import type { CallData } from '@/types';

// 6. Styles (if needed)
import './styles.css';
```

### File Organization

- One component per file
- Co-locate related files (component + test + styles)
- Use `index.ts` for public API exports

```
features/live-call/
├── components/
│   ├── LiveCallHeader.tsx
│   ├── LiveCallHeader.test.tsx
│   └── LiveCallHeader.module.css (if needed)
├── hooks/
│   └── useLiveCall.ts
└── index.ts
```

## 🧩 Component Patterns

### Server Components (Default)

**Use Server Components by default.** They:
- Reduce client bundle size
- Enable direct data fetching
- Improve SEO
- Are faster

```typescript
// app/agent/live-call/page.tsx
// ✅ No 'use client' directive = Server Component
import { getCallData } from '@/features/live-call/api/liveCallApi';

export default async function LiveCallPage() {
  const initialData = await getCallData();
  
  return <LiveCallView initialData={initialData} />;
}
```

### Client Components (When Needed)

Use Client Components only when you need:
- Interactivity (`onClick`, `onChange`, etc.)
- Browser APIs (`window`, `localStorage`, etc.)
- React hooks (`useState`, `useEffect`, etc.)
- Event listeners

```typescript
// components/InteractiveButton.tsx
'use client'; // ✅ Required for Client Components

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function InteractiveButton() {
  const [count, setCount] = useState(0);
  
  return (
    <Button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </Button>
  );
}
```

### Component Composition

Prefer composition over configuration:

```typescript
// ✅ Good: Composable
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// ❌ Bad: Overly configured
<Card title="Title" content="Content" />
```

### Props Interface

Always define props interfaces:

```typescript
// ✅ Good
interface LiveCallHeaderProps {
  callId: string;
  duration: number;
  onEndCall?: () => void;
}

export function LiveCallHeader({ 
  callId, 
  duration, 
  onEndCall 
}: LiveCallHeaderProps) {
  // ...
}
```

### Feature Flag Integration

Always check feature flags before rendering feature-specific UI:

```typescript
'use client';

import { useFeature } from '@/hooks/useFeature';

export function LiveCallView() {
  const hasSentiment = useFeature('live_sentiment');
  const hasUpsell = useFeature('upsell_prompts');
  
  return (
    <div>
      {hasSentiment && <SentimentIndicator />}
      {hasUpsell && <UpsellPrompt />}
    </div>
  );
}
```

### Permission Checks

Check permissions at the component level:

```typescript
'use client';

import { usePermission } from '@/hooks/usePermission';

export function ManagerDashboard() {
  const canView = usePermission('manager');
  
  if (!canView) {
    return <Unauthorized />;
  }
  
  return <DashboardContent />;
}
```

## 🗄️ State Management

### Zustand Stores

Create stores only for global, persistent state:

```typescript
// stores/live-call.store.ts
import { create } from 'zustand';

interface LiveCallState {
  callData: CallData | null;
  isConnected: boolean;
  setCallData: (data: CallData) => void;
  setConnected: (connected: boolean) => void;
}

export const useLiveCallStore = create<LiveCallState>((set) => ({
  callData: null,
  isConnected: false,
  setCallData: (data) => set({ callData: data }),
  setConnected: (connected) => set({ isConnected: connected }),
}));
```

### Store Usage

Select only what you need to prevent unnecessary re-renders:

```typescript
// ✅ Good: Selective subscription
const callData = useLiveCallStore((state) => state.callData);

// ❌ Bad: Subscribes to entire store
const store = useLiveCallStore();
```

### Local State

Use `useState` for component-local state:

```typescript
'use client';

import { useState } from 'react';

export function SearchBar() {
  const [query, setQuery] = useState('');
  
  return (
    <input 
      value={query} 
      onChange={(e) => setQuery(e.target.value)} 
    />
  );
}
```

## 🔌 API Integration

### API Client Pattern

Use the centralized API client:

```typescript
// lib/api/client.ts
import { apiClient } from '@/lib/api/client';

export async function getCallData(callId: string) {
  const response = await apiClient.get(`/api/calls/${callId}`);
  return response.json();
}
```

### Error Handling

Always handle errors gracefully:

```typescript
export async function getCallData(callId: string) {
  try {
    const response = await apiClient.get(`/api/calls/${callId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch call data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching call data:', error);
    throw error;
  }
}
```

### Type-Safe API Responses

Define types for API responses:

```typescript
// types/api.ts
export interface CallDataResponse {
  id: string;
  duration: number;
  intent: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

// features/live-call/api/liveCallApi.ts
export async function getCallData(
  callId: string
): Promise<CallDataResponse> {
  const response = await apiClient.get(`/api/calls/${callId}`);
  return response.json();
}
```

## 🔄 Real-Time Development

### Subscribing to Real-Time Events

Subscribe in stores, not components:

```typescript
// stores/live-call.store.ts
import { socketClient } from '@/lib/realtime';
import type { CallUpdateEvent } from '@/lib/realtime/event-types';

export const useLiveCallStore = create<LiveCallState>((set) => {
  // Subscribe on store creation
  socketClient.subscribe<CallUpdateEvent>(
    'call.update',
    (event) => {
      set({ callData: event.data });
    }
  );
  
  return {
    callData: null,
    // ...
  };
});
```

### Using Real-Time Data

Components consume store state:

```typescript
'use client';

import { useLiveCallStore } from '@/stores/live-call.store';

export function LiveCallView() {
  const callData = useLiveCallStore((state) => state.callData);
  
  if (!callData) {
    return <Loading />;
  }
  
  return <CallDetails data={callData} />;
}
```

### Cleanup

Ensure proper cleanup of subscriptions:

```typescript
// lib/realtime/socket-client.ts
export const socketClient = {
  subscribe: (event: string, handler: Function) => {
    // Subscribe logic
    return () => {
      // Cleanup: unsubscribe
    };
  },
};
```

## 🧪 Testing

### Component Testing

Test components with React Testing Library:

```typescript
// components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '../ui/button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Hook Testing

Test custom hooks:

```typescript
// hooks/__tests__/useFeature.test.ts
import { renderHook } from '@testing-library/react';
import { useFeature } from '../useFeature';

describe('useFeature', () => {
  it('returns feature flag value', () => {
    const { result } = renderHook(() => useFeature('live_sentiment'));
    expect(result.current).toBe(true);
  });
});
```

### Test Organization

- Co-locate tests with components
- Use `.test.ts` or `.test.tsx` extension
- Group related tests in `describe` blocks

## 🔀 Git Workflow

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `refactor/component-name` - Refactoring
- `docs/documentation-update` - Documentation

### Commit Messages

Follow conventional commits:

```
feat: add live call sentiment indicator
fix: resolve WebSocket reconnection issue
refactor: extract API client to shared lib
docs: update architecture documentation
test: add tests for useFeature hook
```

### Pull Request Process

1. Create feature branch from `main`
2. Make changes and commit
3. Push branch and create PR
4. Request review
5. Address feedback
6. Merge after approval

### PR Checklist

- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No linter errors
- [ ] Feature flags checked (if applicable)
- [ ] Permissions checked (if applicable)

## ⚡ Performance Best Practices

### Code Splitting

Use dynamic imports for heavy components:

```typescript
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/data-viz/Chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false, // If component requires browser APIs
});
```

### Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={50}
  priority // For above-the-fold images
/>
```

### Memoization

Use `useMemo` and `useCallback` sparingly:

```typescript
// ✅ Good: Expensive computation
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// ❌ Bad: Simple computation
const simpleValue = useMemo(() => data.map(x => x * 2), [data]);
```

### Avoid Unnecessary Re-renders

- Use selective Zustand subscriptions
- Memoize expensive components with `React.memo`
- Avoid creating objects/arrays in render

## 🎯 Feature Development Checklist

When developing a new feature:

- [ ] Create feature module in `features/`
- [ ] Define types in `types.ts`
- [ ] Create components in `components/`
- [ ] Add hooks if needed in `hooks/`
- [ ] Set up API client in `api/`
- [ ] Add feature flag check (if applicable)
- [ ] Add permission check (if applicable)
- [ ] Write tests
- [ ] Update documentation
- [ ] Follow code style guidelines

## 🐛 Debugging

### Development Tools

- React DevTools - Component inspection
- Redux DevTools - Zustand store inspection (with middleware)
- Next.js DevTools - Performance profiling
- Browser DevTools - Network, console, performance

### Common Issues

**Issue**: Component not updating
- Check if it's a Server Component (no state/hooks)
- Verify Zustand subscription is correct
- Check for stale closures

**Issue**: Type errors
- Run `pnpm build` to see all errors
- Check `tsconfig.json` paths
- Verify imports are correct

**Issue**: Real-time not working
- Check WebSocket connection status
- Verify event types match
- Check store subscription

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

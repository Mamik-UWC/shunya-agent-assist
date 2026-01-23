# Sidebar Implementation Guide

This guide explains how to recreate the smooth, animated sidebar and header system used in this project. The sidebar features collapsible navigation, smooth transitions, mobile responsiveness, and seamless integration with the header.

## Table of Contents

1. [Overview](#overview)
2. [Dependencies](#dependencies)
3. [File Structure](#file-structure)
4. [Color System](#color-system)
5. [Core Components](#core-components)
6. [Animation & Transitions](#animation--transitions)
7. [Implementation Steps](#implementation-steps)
8. [Code Examples](#code-examples)
9. [Customization](#customization)

---

## Overview

The sidebar system consists of:

- **Collapsible Sidebar**: Can collapse to icon-only mode or fully hide
- **Smooth Animations**: 200ms Framer Motion transitions with cubic bezier easing for all state changes
- **Mobile Support**: Transforms into a slide-in drawer on mobile devices using Framer Motion
- **Header Integration**: Header height adjusts when sidebar collapses
- **State Persistence**: Sidebar state saved in cookies
- **Keyboard Shortcuts**: `Cmd/Ctrl + B` to toggle sidebar
- **Nested Navigation**: Support for collapsible menu items with sub-items

---

## Dependencies

Install the following packages:

```bash
npm install @radix-ui/react-slot @radix-ui/react-tooltip class-variance-authority clsx tailwind-merge lucide-react motion
```

**Required peer dependencies:**
- React 18+ (or React 19+)
- Tailwind CSS 4.0+ (or 3.x with proper configuration)
- TypeScript (recommended)
- Framer Motion (`motion` package) - Used for smooth animations

---

## File Structure

Create the following file structure:

```
components/
├── layout/
│   ├── AppSidebar.tsx                # Main sidebar component
│   ├── Header.tsx                     # Header component
│   └── navigation-items.tsx           # Navigation items data
└── ui/
    ├── sidebar.tsx                    # Core sidebar primitives
    ├── button.tsx                     # Button component
    └── tooltip.tsx                    # Tooltip component
hooks/
└── use-mobile.ts                      # Mobile detection hook
lib/
└── utils/
    └── cn.ts                          # Utility function for className merging
app/
└── [route]/
    └── layout.tsx                     # Layout wrapper
```

---

## Color System

The sidebar uses CSS custom properties for theming. Add these to your `globals.css`:

```css
:root {
  /* Sidebar Colors - Light Mode */
  --sidebar: #f8f9fa;
  --sidebar-border: #e5e7eb;
  --sidebar-foreground: #171717;
  --sidebar-accent: #f3f4f6;
  --sidebar-accent-foreground: #171717;
  --sidebar-ring: #3b82f6;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Sidebar Colors - Dark Mode */
    --sidebar: #1a1a1a;
    --sidebar-border: #2a2a2a;
    --sidebar-foreground: #ededed;
    --sidebar-accent: #2a2a2a;
    --sidebar-accent-foreground: #ededed;
    --sidebar-ring: #3b82f6;
  }
}
```

**Color Explanation:**
- `--sidebar`: Main background color
- `--sidebar-foreground`: Text color
- `--sidebar-accent`: Hover/active background
- `--sidebar-border`: Border color
- `--sidebar-ring`: Focus ring color

**Note**: Active states are handled through the `data-active` attribute on menu buttons, which applies the `--sidebar-accent` background color automatically.

---

## Core Components

### 1. Sidebar Provider (`sidebar.tsx`)

The `SidebarProvider` manages sidebar state, handles mobile detection, keyboard shortcuts, and cookie persistence.

**Key Features:**
- State management (expanded/collapsed)
- Mobile/desktop detection
- Cookie persistence (7 days)
- Keyboard shortcut: `Cmd/Ctrl + B`
- CSS custom properties for width control

**Constants:**
```typescript
const SIDEBAR_COOKIE_NAME = 'sidebar:state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';
```

### 2. Sidebar Component

The main `Sidebar` component handles:
- Desktop: Fixed position with smooth width transitions
- Mobile: Sheet/drawer component
- Collapsible modes: `offcanvas`, `icon`, or `none`
- Variants: `sidebar`, `floating`, or `inset`

**Animation Details:**
- Transition duration: `200ms` (0.2s)
- Easing: Cubic bezier `[0.4, 0, 0.2, 1]`
- Properties: `width`, `left`, `right`, `padding`, `opacity`, `margin`
- Uses Framer Motion (`motion/react`) for smooth animations

### 3. Sidebar Trigger

Button component that toggles sidebar state. Automatically switches between mobile sheet and desktop collapse.

### 4. Sidebar Rail

Invisible clickable area on the edge of the sidebar for easy toggling. Only visible on hover when collapsed.

---

## Animation & Transitions

### Transition Properties

All sidebar animations use Framer Motion (`motion/react`) with:
- **Duration**: `200ms` (0.2s)
- **Timing Function**: Cubic bezier `[0.4, 0, 0.2, 1]`
- **Properties**: `width`, `height`, `padding`, `left`, `right`, `opacity`, `margin`, `x` (for mobile slide)

### Key Animations

1. **Sidebar Collapse/Expand (Desktop)**
   ```typescript
   <motion.div
     animate={{
       width: targetWidth,
     }}
     transition={{
       duration: 0.2,
       ease: [0.4, 0, 0.2, 1],
     }}
   />
   ```

2. **Menu Text Fade (Icon Mode)**
   ```typescript
   <motion.span
     animate={{
       opacity: isCollapsed ? 0 : 1,
       width: isCollapsed ? 0 : "auto",
     }}
     transition={{
       duration: 0.2,
       ease: [0.4, 0, 0.2, 1],
     }}
   />
   ```

3. **Group Label Fade**
   ```typescript
   <motion.div
     animate={{
       opacity: isCollapsed ? 0 : 1,
       marginTop: isCollapsed ? "-2rem" : "0",
     }}
     transition={{
       duration: 0.2,
       ease: [0.4, 0, 0.2, 1],
     }}
   />
   ```

4. **Menu Button Transitions**
   - Uses Tailwind's `transition-[width,height,padding]` for size changes
   - Combined with Framer Motion for opacity/visibility animations

### Mobile Transitions

On mobile, the sidebar uses Framer Motion's `motion.div` with slide-in animation:

```typescript
<motion.div
  animate={{
    x: openMobile ? 0 : side === "left" ? "-100%" : "100%",
  }}
  transition={{
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
  }}
/>
```

A backdrop overlay is also animated:

```typescript
<motion.div
  animate={{
    opacity: openMobile ? 1 : 0,
    pointerEvents: openMobile ? "auto" : "none",
  }}
  transition={{
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
  }}
/>
```

---

## Implementation Steps

### Step 1: Install Dependencies

Install required packages:

```bash
npm install @radix-ui/react-slot @radix-ui/react-tooltip class-variance-authority clsx tailwind-merge lucide-react motion
```

### Step 2: Create Utility Functions

Create `lib/utils/cn.ts`:

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Step 3: Create Mobile Detection Hook

Create `hooks/use-mobile.ts`:

```typescript
"use client";

import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}
```

### Step 4: Create Core UI Components

You'll need these base components (from shadcn/ui or similar):
- `Button` - With variants (ghost, default, etc.)
- `Tooltip` - For icon-only mode tooltips

### Step 5: Create Sidebar Primitives

Copy the complete `components/ui/sidebar.tsx` component. This is the core of the sidebar system and includes:
- `SidebarProvider` - Manages state and provides context
- `Sidebar` - Main sidebar container with Framer Motion animations
- `SidebarTrigger` - Toggle button
- `SidebarRail` - Invisible clickable area for toggling
- `SidebarInset` - Main content area
- `SidebarHeader` - Header section
- `SidebarContent` - Scrollable content area
- `SidebarFooter` - Footer section
- `SidebarGroup` - Group container
- `SidebarGroupLabel` - Group label with fade animation
- `SidebarMenu` - Menu list
- `SidebarMenuItem` - Menu item container
- `SidebarMenuButton` - Menu button with tooltip support
- `SidebarMenuSub` - Sub-menu container (for nested items)
- `SidebarMenuSubButton` - Sub-menu button
- And more...

**Note**: The sidebar uses Framer Motion (`motion/react`) for all animations, not Tailwind transitions.

### Step 6: Create Navigation Data

Create `components/layout/navigation-items.tsx`:

```typescript
import { IconType } from 'lucide-react';

export interface NavigationItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
  // ... more items
];
```

### Step 7: Create App Sidebar Component

Create `components/layout/AppSidebar.tsx` with your navigation logic. See the [Code Examples](#code-examples) section for a complete implementation.

### Step 8: Create Header Component

Create `components/layout/Header.tsx` that includes:
- `SidebarTrigger` - Button to toggle sidebar
- Additional header content as needed

### Step 9: Integrate in Layout

Wrap your layout with `SidebarProvider`:

```typescript
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Header } from '@/components/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar type="admin" />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto bg-background p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
```

---

## Code Examples

### Basic Sidebar Setup

```typescript
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Header } from '@/components/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar type="admin" />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto bg-background p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
```

### App Sidebar with Navigation

```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { navigationItems, type NavigationItem } from "./navigation-items";

interface AppSidebarProps {
  type: "admin" | "agent" | "manager";
  title?: string;
}

function getNavigationItems(type: "admin" | "agent" | "manager"): NavigationItem[] {
  // Return appropriate navigation items based on type
  // This is a placeholder - implement based on your needs
  return [];
}

export function AppSidebar({ type, title }: AppSidebarProps) {
  const pathname = usePathname();
  const items = getNavigationItems(type);
  const defaultTitle = type === "admin" ? "Admin Portal" : type === "agent" ? "Agent Interface" : "Manager Dashboard";
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex h-16 items-center gap-2 px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <span className="text-sm font-bold">S</span>
          </div>
          <motion.div
            initial={false}
            animate={{
              opacity: isCollapsed ? 0 : 1,
              width: isCollapsed ? 0 : "auto",
            }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="flex flex-col overflow-hidden"
          >
            <span className="text-sm font-semibold whitespace-nowrap">{title || defaultTitle}</span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">Shunya</span>
          </motion.div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.url || pathname?.startsWith(item.url + "/");
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link href={item.url}>
                        <Icon className="h-4 w-4" />
                        <motion.span
                          initial={false}
                          animate={{
                            opacity: isCollapsed ? 0 : 1,
                            width: isCollapsed ? 0 : "auto",
                          }}
                          transition={{
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                          className="overflow-hidden whitespace-nowrap"
                        >
                          {item.title}
                        </motion.span>
                        {item.badge && (
                          <motion.span
                            initial={false}
                            animate={{
                              opacity: isCollapsed ? 0 : 1,
                              width: isCollapsed ? 0 : "auto",
                            }}
                            transition={{
                              duration: 0.3,
                              ease: [0.4, 0, 0.2, 1],
                            }}
                            className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground overflow-hidden"
                          >
                            {item.badge}
                          </motion.span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
```

**Note**: For nested menu items with sub-menus, you can use the `SidebarMenuSub`, `SidebarMenuSubItem`, and `SidebarMenuSubButton` components along with a collapsible wrapper (like Radix UI's Collapsible), though the current implementation doesn't use nested menus.

### Header with Sidebar Trigger

```typescript
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils/cn";

interface HeaderProps extends React.HTMLAttributes<HTMLHeaderElement> {
  children?: React.ReactNode;
}

export function Header({ className, children, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        "w-full border-b bg-background flex items-center justify-between px-6 py-4",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        {children}
      </div>
    </header>
  );
}
```

### Cookie Persistence (Server-Side)

If using Next.js App Router, read cookie in server component:

```typescript
import { cookies } from 'next/headers';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {/* ... */}
    </SidebarProvider>
  );
}
```

---

## Customization

### Change Sidebar Width

Modify constants in `sidebar.tsx`:

```typescript
const SIDEBAR_WIDTH = '20rem'; // Change from 16rem
const SIDEBAR_WIDTH_ICON = '4rem'; // Change from 3rem
```

### Change Animation Duration

Update the `duration` property in Framer Motion animations:

```typescript
// In sidebar.tsx and AppSidebar.tsx
transition={{
  duration: 0.1,  // Fast: 100ms
  // duration: 0.2,  // Medium: 200ms - default
  // duration: 0.3,  // Slow: 300ms
  ease: [0.4, 0, 0.2, 1],
}}
```

### Custom Colors

Update CSS variables in `globals.css`:

```css
:root {
  --sidebar: #f0f0f0; /* Custom background color */
  --sidebar-accent: #e0e0e0; /* Custom accent color */
  --sidebar-border: #d0d0d0; /* Custom border color */
}
```

### Different Collapsible Mode

Change the `collapsible` prop:

```typescript
<Sidebar collapsible="offcanvas"> {/* Slides off screen */}
<Sidebar collapsible="icon">      {/* Collapses to icons */}
<Sidebar collapsible="none">      {/* Cannot collapse */}
```

### Floating Variant

Use the floating variant for a card-like appearance:

```typescript
<Sidebar variant="floating" collapsible="icon">
  {/* Sidebar content */}
</Sidebar>
```

### Custom Breakpoint

Modify `MOBILE_BREAKPOINT` in `use-mobile.tsx`:

```typescript
const MOBILE_BREAKPOINT = 1024; // Tablet and below
```

---

## Key Features Summary

✅ **Smooth Animations**: 200ms Framer Motion transitions with cubic bezier easing  
✅ **Mobile Responsive**: Transforms to slide-in drawer on mobile using motion.div  
✅ **State Persistence**: Cookie-based state saving (`sidebar:state`)  
✅ **Keyboard Shortcuts**: Cmd/Ctrl + B to toggle  
✅ **Icon-Only Mode**: Collapses to show only icons with smooth fade animations  
✅ **Nested Navigation**: Support for sub-menus (primitives available, optional)  
✅ **Active States**: Visual indication of current page via data-active attribute  
✅ **Theme Support**: Works with light/dark themes via CSS custom properties  
✅ **Header Integration**: Header adjusts with sidebar state  
✅ **Accessibility**: ARIA labels and keyboard navigation  

---

## Troubleshooting

### Sidebar Not Animating Smoothly

- Ensure Framer Motion (`motion`) package is installed
- Check that `motion` components are properly imported from `motion/react`
- Verify transition duration and easing are set correctly
- Ensure CSS custom properties are defined

### Mobile Sidebar Not Working

- Check that `useIsMobile` hook is working correctly
- Verify `motion.div` components are properly configured for mobile
- Ensure mobile breakpoint (768px) matches your needs
- Check that `openMobile` state is being managed correctly

### State Not Persisting

- Check browser console for cookie errors
- Verify cookie name matches: `sidebar:state` (note the colon)
- Verify cookie domain/path settings
- Ensure server-side cookie reading matches client-side writing
- Check that cookie max-age is set correctly (7 days)

### Colors Not Applying

- Verify CSS custom properties are in `:root` and `.dark`
- Check Tailwind config includes custom color variables
- Ensure `bg-sidebar` classes are used (not hardcoded colors)

---

## Additional Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Radix UI Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip)
- [Radix UI Slot](https://www.radix-ui.com/primitives/docs/components/slot)
- [shadcn/ui Sidebar](https://ui.shadcn.com/docs/components/sidebar) (if using shadcn/ui)

---

**Note**: This implementation is based on the shadcn/ui sidebar component pattern with Framer Motion for animations and custom state management. The sidebar uses `motion/react` (Framer Motion) for all animations rather than CSS transitions.

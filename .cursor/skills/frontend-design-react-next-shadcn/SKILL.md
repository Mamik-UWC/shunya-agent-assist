---
name: frontend-design-react-next-shadcn
description: >
  Designs and implements distinctive, production-grade frontend interfaces using
  React, TypeScript, Next.js App Router, Tailwind CSS, and shadcn/ui. Use when
  building or styling web UI components, pages, dashboards, or full applications
  where visual quality, aesthetic intent, and design differentiation are critical.
  Avoids default shadcn and generic SaaS aesthetics; enforces bold, intentional
  design systems with strong typography, layout composition, motion, and
  creative visual identity.
---

# Frontend Design (React, Next.js, shadcn)

Design production-grade, distinctive UIs. Do not ship default shadcn or generic SaaS look—establish a clear design system and apply it consistently.

## Design principles

1. **Intent over defaults** — Every color, type scale, and spacing choice should be deliberate. Override shadcn/Radix defaults when they conflict with the intended identity.
2. **Typography leads** — Choose a clear hierarchy (display / heading / body / caption). Use a limited palette of weights and sizes; avoid random font sizes.
3. **Composition first** — Grid, rhythm, and whitespace define quality. Use consistent spacing scale (e.g. 4, 8, 12, 16, 24, 32, 48, 64) and align to a baseline grid where it helps readability.
4. **Motion with purpose** — Use motion (Framer Motion / CSS) for feedback, focus, and narrative. Avoid decorative animation that adds no meaning.
5. **Semantic color** — Map tokens to roles (background, surface, primary, accent, muted, destructive). Use CSS variables in `app/globals.css` (e.g. `--primary`, `--muted`) so light/dark and theming stay consistent.

## Typography

- **Font stack**: Prefer one primary typeface for UI; add a distinct display or mono only if the identity needs it. Use `next/font` (e.g. `next/font/google`) for variable fonts and subsetting.
- **Scale**: Define a type scale in Tailwind or CSS (e.g. `text-xs` through `text-4xl`/`text-5xl`) and stick to it. Use `font-semibold`/`font-medium` for hierarchy, not arbitrary sizes.
- **Line height**: Use `leading-tight` for headings, `leading-normal` or `leading-relaxed` for body. Keep line length readable (e.g. 65–75ch for long text).

```tsx
// Example: clear hierarchy
<h1 className="text-3xl font-semibold tracking-tight text-foreground">
  Page title
</h1>
<p className="mt-2 text-muted-foreground leading-relaxed max-w-prose">
  Supporting copy.
</p>
```

## Color and theming

- **Tokens**: Use semantic names from `globals.css` (`background`, `foreground`, `primary`, `muted`, `accent`, `border`, `ring`, `destructive`). Prefer `oklch()` for perceptual consistency and theming.
- **Differentiation**: To avoid “generic SaaS,” change at least one of: primary hue, border radius system, or surface contrast. Document the choice (e.g. “Primary: blue-600, radius: 0.5rem”).
- **Dark mode**: Keep `:root` and `.dark` in sync. Use the same variable names so components stay theme-agnostic.

## Layout and spacing

- **Grid**: Use CSS Grid for page-level layout (e.g. sidebar + main, dashboard columns). Use flex for inline/component layout.
- **Spacing scale**: Align padding/margin to a single scale (e.g. Tailwind’s 4px base). Prefer `gap` for lists and cards.
- **Containers**: Use `max-w-*` and `mx-auto` for readable content width; use full-bleed only when intentional (hero, charts).

## Motion

- **Library**: Use `motion` (Framer Motion) for entrance, exit, and interactive feedback. Use CSS `transition` for simple hover/focus.
- **When to animate**: Page/section entrance, list/item stagger, modal/drawer open/close, button/control feedback. Keep duration short (150–300ms for UI; 300–500ms for larger transitions).
- **Reduce motion**: Respect `prefers-reduced-motion` (e.g. `motion`’s reduced motion support or CSS media query) by shortening or disabling non-essential animation.

```tsx
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2 }}
>
  {children}
</motion.div>
```

## shadcn/ui customization

- **Do not ship defaults as-is** — Treat shadcn as a base. Override in `components/ui/*` or via Tailwind when the default conflicts with your design system.
- **CSS variables**: Customize `--radius`, `--primary`, `--border`, etc. in `app/globals.css` so all shadcn components inherit the same identity.
- **Composition**: Use shadcn primitives (Button, Card, Dialog, etc.) but combine them with your spacing, typography, and motion. Add wrapper components in `components/` when you need a repeated pattern (e.g. `DashboardCard`, `PageHeader`).
- **New-york vs default**: Prefer new-york style for a sharper look; adjust radius and shadows to match the rest of the system.

## Anti-patterns (avoid)

- **Generic SaaS**: Gray backgrounds, blue primary, Inter/System fonts only, no clear hierarchy. Break the pattern with a defined primary hue, typeface, or layout rhythm.
- **Random styling**: One-off margins, font sizes, or colors. Use design tokens and a spacing scale.
- **Default shadcn only**: Unchanged baseColor (zinc) and radius everywhere. At minimum, set a distinct `--primary` and `--radius` and use semantic tokens in custom components.
- **Ornamental motion**: Animations that don’t support focus, feedback, or narrative. Prefer subtle, fast, purposeful motion.
- **Inconsistent dark mode**: Surfaces or text that don’t use CSS variables and break in `.dark`.

## Checklist for new pages/components

- [ ] Typography: Uses project type scale and weights; no one-off font sizes.
- [ ] Color: Uses semantic tokens (`text-foreground`, `bg-muted`, etc.), not raw hex/gray.
- [ ] Spacing: Uses shared scale (Tailwind spacing) and `gap` where appropriate.
- [ ] Layout: Clear grid or flex; max-width for long text.
- [ ] Motion: Only where it adds meaning; duration and reduced-motion considered.
- [ ] shadcn: Themed via CSS variables; overrides documented if non-obvious.
- [ ] Dark mode: Tested in both themes; no hardcoded light-only colors.

## Additional resources

- For extended design tokens, type scale, and example compositions, see [reference.md](reference.md).

## License

Complete terms in [LICENSE](../../LICENSE) in the project root.

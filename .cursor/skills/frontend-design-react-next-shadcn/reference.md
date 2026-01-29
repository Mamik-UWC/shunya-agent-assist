# Frontend Design — Reference

Extended design tokens, type scale, and example compositions for the frontend-design-react-next-shadcn skill.

## Design tokens (CSS variables)

Map these to your `app/globals.css` under `:root` and `.dark`:

| Token | Role | Example use |
|-------|------|-------------|
| `--background` | Page/shell background | `bg-background` |
| `--foreground` | Primary text | `text-foreground` |
| `--card` | Card/surface background | `bg-card` |
| `--primary` | Primary actions, links | `bg-primary text-primary-foreground` |
| `--secondary` | Secondary actions | `bg-secondary text-secondary-foreground` |
| `--muted` | Muted surfaces | `bg-muted text-muted-foreground` |
| `--accent` | Hover/focus emphasis | `bg-accent text-accent-foreground` |
| `--destructive` | Errors, destructive actions | `bg-destructive text-destructive-foreground` |
| `--border`, `--input`, `--ring` | Borders and focus ring | `border-border`, `ring-ring` |
| `--radius` | Border radius (global) | `rounded-[var(--radius)]` |

Use `oklch()` for perceptual consistency and theming; keep light/dark pairs aligned.

## Type scale (Tailwind)

Suggested mapping for hierarchy:

| Role | Class | Use |
|------|--------|-----|
| Display | `text-4xl` / `text-5xl` | Hero, landing title |
| H1 | `text-3xl font-semibold tracking-tight` | Page title |
| H2 | `text-2xl font-semibold` | Section title |
| H3 | `text-xl font-medium` | Subsection |
| Body | `text-base` | Default copy |
| Small | `text-sm text-muted-foreground` | Captions, metadata |
| XS | `text-xs text-muted-foreground` | Labels, badges |

Use `leading-tight` for headings, `leading-normal` or `leading-relaxed` for body.

## Spacing scale (Tailwind)

Stick to a single scale for padding/margin/gap:

- `1`–`2`: Tight inline (icons, badges)
- `3`–`4`: Component padding
- `6`–`8`: Section spacing
- `12`–`16`: Page sections
- `24`–`32`: Major layout gaps

Prefer `gap-*` for lists and card grids.

## Example compositions

### Dashboard card (distinct, not generic)

```tsx
<Card className="border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md">
  <CardHeader className="pb-2">
    <CardTitle className="text-lg font-semibold text-foreground">
      Metric name
    </CardTitle>
    <CardDescription className="text-muted-foreground">
      Short description
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-2xl font-semibold tracking-tight text-foreground">
      Value
    </p>
  </CardContent>
</Card>
```

### Page header with hierarchy

```tsx
<div className="space-y-1">
  <h1 className="text-3xl font-semibold tracking-tight text-foreground">
    Page title
  </h1>
  <p className="max-w-prose text-muted-foreground leading-relaxed">
    Supporting copy that explains the page.
  </p>
</div>
```

### Button with motion feedback

```tsx
import { motion } from "motion/react";

<motion.button
  type="button"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
>
  Action
</motion.button>
```

## Differentiating from generic SaaS

- **Primary hue**: Choose one (e.g. indigo, teal, amber) and use it for primary actions and key accents. Avoid “default blue” unless it’s intentional.
- **Radius**: Set `--radius` (e.g. `0.5rem`, `0.75rem`) and use it consistently. Avoid mixing sharp and pill-shaped elements without a rule.
- **Typography**: Use a single heading + body pair with clear weight/size hierarchy. Avoid “system stack only” if you want a distinct identity.
- **Layout**: Use a clear grid (sidebar + main, or defined columns) and consistent section spacing instead of ad-hoc margins.

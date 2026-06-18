# PodOn shadcn/ui Theme Customization

> This documents all customizations made to shadcn/ui components for the PodOn purple gradient theme.

## Dark Mode Setup

**`index.html`** has `class="dark"` on `<html>` — this activates the `.dark` CSS variables globally. Without this, shadcn components render in light mode (white backgrounds).

## Theme Variables (`src/index.css`)

The `.dark` theme uses deep near-black backgrounds with purple/violet as the primary accent.

| Variable | Value | Purpose |
|---|---|---|
| `--background` | `oklch(0.141 0.005 285)` | Near-black page background |
| `--foreground` | `oklch(0.985 0 0)` | White text |
| `--card` | `oklch(0.21 0.015 285)` | Card surface (slightly lighter than bg) |
| `--primary` | `oklch(0.55 0.24 292)` | Vibrant purple for primary actions |
| `--muted` | `oklch(0.25 0.01 285)` | Subtle surface |
| `--muted-foreground` | `oklch(0.65 0.015 285)` | Dimmed text |
| `--accent` | `oklch(0.35 0.12 292)` | Purple-tinted hover/focus |
| `--border` | `oklch(1 0 0 / 8%)` | Subtle borders |
| `--input` | `oklch(1 0 0 / 12%)` | Input border |
| `--ring` | `oklch(0.6 0.22 292)` | Purple focus ring |

## Component Customizations

### Button (`src/components/ui/button.tsx`)

**New `variant="gradient"`**
- Purple gradient: `from-violet-600 via-fuchsia-600 to-purple-600`
- Shimmer hover animation (shining sweep)
- Glow shadow
- Hover brightens, active scale press

**New sizes: `lg`, `xl`**
- `lg` — h-10, text-base, larger padding
- `xl` — h-12, text-base, largest padding

```tsx
<Button variant="gradient" size="xl" className="w-full">
  Create Account
</Button>
```

### Input (`src/components/ui/input.tsx`)

**New `size` prop: `default` | `lg` | `xl`**
- `default` — h-8
- `lg` — h-10, px-4
- `xl` — h-12, px-4

**Background**: `bg-black/40` for solid dark input fields with `border-input`.

```tsx
<Input size="xl" placeholder="name@company.com" />
```

### Badge (`src/components/ui/badge.tsx`)

**New `variant="gradient"`**
- Purple-tinted background, border, and text

```tsx
<Badge variant="gradient">Trusted by the top 1%</Badge>
```

### Card (`src/components/ui/card.tsx`)

**New `size="lg"`** — larger spacing and shadow.

### Progress (`src/components/ui/progress.tsx`)

Purple gradient indicator: `from-violet-500 to-fuchsia-500`.

### Slider (`src/components/ui/slider.tsx`)

Purple gradient range, thicker track (`h-1.5`).

### Tabs (`src/components/ui/tabs.tsx`)

Active tab: purple tint (`bg-primary/15`, `text-primary`, `border-primary/20`). Active underline uses `after:bg-primary`.

### Switch (`src/components/ui/switch.tsx`)

Uses `--primary` (purple) for checked state via CSS variables.

### Tooltip (`src/components/ui/tooltip.tsx`)

Glass effect: `bg-foreground/90` with `backdrop-blur-sm`.

### Sonner (`src/components/ui/sonner.tsx`)

Success/info/loading icons use `text-violet-400`.

### Dialog (`src/components/ui/dialog.tsx`)

Close button: `bg-secondary/50 hover:bg-secondary`. Overlay: `bg-black/40`.

### Dropdown Menu (`src/components/ui/dropdown-menu.tsx`)

Hover/focus states use `bg-accent` (purple-tinted).

## Best Practices

1. **Always use component variants** instead of hand-rolling Tailwind overrides:
   - `<Button variant="gradient">` over raw gradient classes
   - `<Input size="xl">` over `h-12 px-4`

2. **Use theme variables** via Tailwind utilities:
   - `bg-background` / `text-foreground`
   - `bg-card` / `text-card-foreground`
   - `bg-primary` / `text-primary-foreground`
   - `text-muted-foreground` for secondary text
   - `border-border` for borders

3. **Avoid hardcoded colors** unless necessary for special effects (gradient orbs, custom backgrounds).

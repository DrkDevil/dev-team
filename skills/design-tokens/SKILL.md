---
name: design-tokens
description: "Guides creating and changing design tokens: primitive, semantic and component tiers, light and dark values, contrast pairs, and generating the MUI theme and CSS variables from one source. Use when adding or changing colors, type, spacing, radius, shadow or motion values."
user-invocable: false
---

# Design tokens

## Tiers
- **Primitive**: raw values with neutral names (`blue.600`). Components never use these.
- **Semantic**: what a value is for (`text.primary`, `surface.raised`, `action.danger`). Light
  and dark each map semantic names to primitives.
- **Component**, only when needed (`button.ghost.hoverBg`), pointing at semantic tokens.

```ts
// src/tokens/color.ts
export const primitives = {
  gray: { 50: '#F6F7F9', 900: '#14171C' },
  blue: { 300: '#8FB0FF', 600: '#1F4FD8' },
} as const;

export const color = {
  light: { brand: primitives.blue[600], text: { primary: primitives.gray[900] }, surface: { base: primitives.gray[50] }, action: { primary: primitives.blue[600] } },
  dark:  { brand: primitives.blue[300], text: { primary: primitives.gray[50] },  surface: { base: primitives.gray[900] }, action: { primary: primitives.blue[300] } },
} as const;
```

## Rules
- Components and screens use semantic tokens only, through the theme.
- Each text-on-surface pair meets WCAG 2.2 AA (4.5:1, or 3:1 for large text and control borders)
  in both modes. Check every pair you add or change and note the ratio in your report.
- State shades (hover, pressed, selected) and status colors (success, warning, error, info) are
  semantic tokens too (`action.primaryHover`, `status.error.text`), set for both modes. Never
  derive them in a component with `alpha()` or `darken()`.
- One source generates the MUI theme and the CSS custom properties, so they can't drift.
- Spacing on a fixed scale (4px steps); type on a fixed scale with set line heights.
- A rename breaks every consumer: keep the old name as an alias for one release and log it.

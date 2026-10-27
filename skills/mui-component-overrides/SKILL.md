---
name: mui-component-overrides
description: "Guides restyling MUI components through the theme: defaultProps, styleOverrides with the theme callback, variants with typed props, slots and state classes, and when to wrap a component instead. Use when making MUI components match the design system."
user-invocable: false
---

# MUI component overrides

## Order of preference
1. Theme `defaultProps` for default sizes, variants and behavior.
2. Theme `styleOverrides` for the design system's look of a built-in component.
3. `variants` inside `styleOverrides` for new named variants, with the prop type augmented.
4. A thin wrapper component when the API itself should change. Export it from the design system
   so apps import ours, never MUI's.
5. `sx` or `styled()` only for one-off layout, never for brand styling.

```ts
// src/theme/components.ts
import type { Components, Theme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides { ghost: true }
}

export const components: Components<Theme> = {
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: ({ theme }) => ({
        textTransform: 'none',
        borderRadius: theme.shape.borderRadius,
        '&.Mui-focusVisible': { outline: `2px solid ${theme.vars.palette.primary.main}`, outlineOffset: 2 },
        variants: [
          { props: { variant: 'ghost' }, style: { color: theme.vars.palette.text.primary, background: 'transparent' } },
        ],
      }),
    },
  },
};
```

## Rules
- Target slots (`root`, `startIcon`) and state classes (`Mui-disabled`, `Mui-focusVisible`),
  not deep descendant selectors.
- Read colors from `theme.vars.palette` (the theme uses CSS variables), so overrides follow light
  and dark without a second override.
- Keep one strong, consistent focus-visible style across every component.
- Reuse MUI's helpers (`visuallyHidden` from `@mui/utils`) instead of writing your own copies.
- Every override shows in a story for each state, in light and dark.

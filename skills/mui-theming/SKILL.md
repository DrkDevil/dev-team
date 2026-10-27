---
name: mui-theming
description: "Guides building and extending the MUI theme from design tokens: createTheme, light and dark color schemes with CSS variables, typography, spacing, shape, breakpoints, and TypeScript augmentation for custom colors and variants. Use for any theme-level MUI work."
user-invocable: false
---

# MUI theming

Check the installed MUI version and follow its docs; the API below is current for MUI v6 and later.

```ts
// src/theme/index.ts
import { createTheme } from '@mui/material/styles';
import { color, radius, font } from '../tokens';
import { components } from './components';

declare module '@mui/material/styles' {
  interface CssThemeVariables { enabled: true } // types theme.vars when cssVariables is on
  interface Palette { brand: Palette['primary'] }
  interface PaletteOptions { brand?: PaletteOptions['primary'] }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides { brand: true } // lets color="brand" typecheck
}

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data' }, // emits [data-light] and [data-dark], with no flash
  colorSchemes: {
    light: { palette: { primary: { main: color.light.action.primary }, brand: { main: color.light.brand } } },
    dark:  { palette: { primary: { main: color.dark.action.primary },  brand: { main: color.dark.brand } } },
  },
  spacing: 4, // theme.spacing(2) === '8px', matching the token scale
  shape: { borderRadius: radius.md },
  typography: { fontFamily: font.body, h1: { fontFamily: font.display } },
  components,
});
```

## Rules
- Build every value from tokens. Keep palette, typography and component overrides in separate
  small modules.
- With `cssVariables` on, read colors as `theme.vars.palette.*` in overrides and `styled`, so they
  follow the active mode; `sx` string paths (`'primary.main'`) already do. Use `theme.spacing()`
  and typography variants; never raw values in `sx` or `styled`.
- A subtree pins a mode with the selector's attribute (`<div data-dark>`); stories use this to show
  both modes side by side.
- Add a `*PropsColorOverrides` entry for each component that should accept a custom color.
- `getContrastText` is a fallback, not a contrast guarantee; check pairs against AA.
- Set up providers once (`ThemeProvider`, `CssBaseline`, and `InitColorSchemeScript` for server
  rendering) and document it in the README.

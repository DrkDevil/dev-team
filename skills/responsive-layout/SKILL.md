---
name: responsive-layout
description: "Guides phone-first responsive layout with the theme's breakpoints and MUI layout components: stacks and grids with gap, readable line length, touch target sizes, safe areas, and no horizontal scrolling. Use for any layout or screen work."
user-invocable: false
---

# Responsive layout

```tsx
<Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, md: 3 }}>
  <OrderSummary />
  <Box sx={{ minWidth: 0, flex: 1 }}><OrderList /></Box>
</Stack>
```

## Rules
- Design from 360-400px wide up, adding breakpoints with the theme's values only.
- Lay out with Stack, Grid and Container and their spacing, not margins on children.
- Give flex children that hold text `minWidth: 0` so long content wraps instead of overflowing.
- Nothing scrolls sideways at any width; wide tables and code scroll inside their own box.
- Running text stays around 45-75 characters per line. Images use `max-width: 100%`.
- Touch targets are at least 24 by 24 CSS pixels (WCAG 2.5.8), and 44 by 44 for main actions.
- Fixed headers and bars respect the phone's safe areas.
- Check every screen at phone, tablet and desktop, in light and dark.

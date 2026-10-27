---
name: wcag
description: "Gives the WCAG 2.2 AA checklist for Brian's products: semantics, names and roles, keyboard and focus, focus not obscured, contrast, target size, dragging alternatives, motion, forms and errors, consistent help, redundant entry, accessible sign-in, and how to test. Use for any UI work and every accessibility review."
user-invocable: false
---

# WCAG 2.2 AA

```tsx
// Icon-only buttons need a name
<IconButton aria-label="Delete order" onClick={onDelete}><DeleteIcon /></IconButton>
```
```css
/* Keep focused elements visible under a sticky header (2.4.11) */
html { scroll-padding-top: 72px; }
```

## Checklist
- **Semantics**: native elements first (`button`, `a`, `label`, `input`); ARIA only when nothing
  native fits, following the ARIA pattern for that widget. One `h1`, headings in order,
  landmarks (`header`, `nav`, `main`, `footer`).
- **Names**: every control has an accessible name (4.1.2).
- **Keyboard**: everything works with a keyboard, with no traps (2.1.1, 2.1.2). Focus is always
  visible (2.4.7) and never hidden behind sticky bars (2.4.11). Dialogs trap and restore focus.
- **Contrast**: 4.5:1 text, 3:1 large text, icons and control borders (1.4.3, 1.4.11).
- **Target size**: at least 24 by 24 CSS pixels (2.5.8).
- **Dragging** always has a click alternative (2.5.7).
- **Color** is never the only signal (1.4.1).
- **Errors** are described in text and announced (3.3.1, 4.1.3).
- **Help** links or contact details sit in the same place on every page (3.2.6).
- **Redundant entry**: don't ask again for information already given in the same flow (3.3.7).
- **Sign-in** allows paste and password managers, with no puzzles (3.3.8).
- **Motion**: respect `prefers-reduced-motion`; nothing flashes (2.3.1).
- **Reflow**: works at 320px wide and 200% zoom (1.4.10, 1.4.4).

## Test it
Run axe (Storybook addon, Playwright), tab through every control, then check at 320px and 200%
zoom.

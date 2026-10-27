---
name: animation
description: "Guides motion in Brian's interfaces: when motion helps, motion tokens for duration and easing, MUI transitions, prefers-reduced-motion, animating only transform and opacity, and no flashing. Use when adding transitions or animated components."
user-invocable: false
---

# Animation

```tsx
const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

// Fade and Slide animate opacity and transform only
<Fade in={open} timeout={reduceMotion ? 0 : theme.transitions.duration.short}>
  <Box><OrderDetails /></Box>
</Fade>
```

## Rules
- Motion explains a change (opened, moved, loaded). Skip motion that's only decoration.
- Durations and easing come from the theme's transitions (set from the motion tokens): about
  150-300ms for UI changes.
- Animate `transform` and `opacity` only, so motion stays smooth on phones.
- With reduced motion on, replace movement with an instant change or a short fade.
- Nothing flashes more than three times a second (WCAG 2.3.1).
- Content is readable at rest; nothing important waits for an animation to finish.

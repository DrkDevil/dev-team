---
name: performance
description: "Guides front-end and query performance with Brian's targets: Core Web Vitals on a mid-range phone, bundle budgets, route code splitting, image and font loading, render cost, and measuring before and after. Use when a page is slow, before a release, or when a change adds weight."
user-invocable: false
---

# Performance

Targets on a mid-range phone: LCP under 2.5s, INP under 200ms, CLS under 0.1, and under 200 KB
of compressed JavaScript for the first route.

```tsx
const StatsPage = lazy(() => import('./routes/StatsPage')); // split heavy routes

<Suspense fallback={<PageSkeleton />}>
  <StatsPage />
</Suspense>
```

## Rules
- Measure first with Lighthouse, the browser performance panel and a bundle analyzer
  (`rollup-plugin-visualizer` with Vite). Report before and after numbers.
- Split code by route; lazy-load heavy, rarely used pieces such as charts and editors.
- Images: the right size, modern formats, `width` and `height` set, lazy below the fold.
- Fonts: few weights, `font-display: swap`, preload the main face.
- Keep state local and virtualize long lists before reaching for memoization.
- Check a new dependency's size before adding it.
- Slow queries: read the plan with `explain analyze` and add the index it needs.

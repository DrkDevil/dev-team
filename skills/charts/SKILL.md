---
name: charts
description: "Guides building charts and dashboards with MUI X Charts: picking the chart for the question, labeled axes and units, values drawn to scale, theme colors in light and dark, accessible text alternatives, and reading pre-aggregated data. Use for any chart, stat card or dashboard."
user-invocable: false
---

# Charts

```tsx
import { LineChart } from '@mui/x-charts/LineChart';

<figure aria-labelledby="conversion-title">
  <Typography id="conversion-title" variant="h3">Checkout conversion rate, last 30 days</Typography>
  <LineChart
    height={280}
    xAxis={[{ data: days, scaleType: 'time', label: 'Date' }]}
    yAxis={[{ min: 0, max: 100, label: 'Conversion rate (%)' }]}
    series={[{ data: conversionRate, label: 'Conversion rate', valueFormatter: (v) => `${v}%` }]}
  />
  <DataTable caption="Conversion rate by day" rows={rows} /> {/* text alternative */}
</figure>
```

## Rules
- One question per chart. Lines for change over time, bars for comparing categories, a single
  big number for one current value. Avoid pie charts beyond three slices.
- Every chart has a title, labeled axes with units, and a y-axis that starts at zero for bars.
- Colors come from the theme palette and stay distinguishable in light and dark; never rely on
  color alone, so use labels or markers too.
- Give each chart a text or table alternative with the same numbers.
- Charts read pre-aggregated data; don't aggregate thousands of raw rows in the browser.
- Show empty and loading states the same size as the chart, so the layout doesn't jump.

---
name: visual-regression
description: "Guides screenshot testing of Storybook stories and pages with Playwright: deterministic renders, both color modes, phone and desktop widths, and updating baselines only after Brian approves the look. Use when setting up or updating visual tests."
user-invocable: false
---

# Visual regression

```ts
// tests/visual/button.spec.ts
import { test, expect } from '@playwright/test';

for (const theme of ['light', 'dark']) {
  test(`Button primary, ${theme}`, async ({ page }) => {
    await page.goto(`/iframe.html?id=components-button--primary&globals=theme:${theme}`);
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`button-primary-${theme}.png`, { animations: 'disabled' });
  });
}
```

## Rules
- Capture light and dark at a phone width (390px) and a desktop width (1440px), using
  Playwright projects for the widths.
- Make renders deterministic: wait for fonts, disable animations, freeze dates and random values,
  mock network data.
- Update a baseline (`--update-snapshots`) only after Brian approves the new look.
- Keep the diff threshold at Playwright's default; loosening it hides real regressions.
- Commit baselines to the repo and review diffs in the pull request.

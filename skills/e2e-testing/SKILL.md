---
name: e2e-testing
description: "Guides end-to-end tests with Playwright: the flows that must never break, locators by role and label, a saved signed-in state from a setup project, isolated test data, web-first assertions, mocked third parties, and axe scans. Use for sign-in, checkout, saving data and other key flows."
user-invocable: false
---

# End-to-end testing

```ts
// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

setup('sign in', async ({ page }) => {
  await page.goto('/sign-in');
  await page.getByLabel('Email').fill(process.env.E2E_EMAIL ?? '');
  await page.getByLabel('Password').fill(process.env.E2E_PASSWORD ?? '');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
// playwright.config.ts: a 'setup' project, and other projects with
// dependencies: ['setup'] and use: { storageState: 'playwright/.auth/user.json' }
```

## Rules
- Cover sign-up and sign-in, checkout, creating and editing the main records, and permissions.
- Locate by role, label or text, never by CSS classes.
- Each test creates its own data and cleans up, so tests run in parallel.
- Use web-first assertions (`toBeVisible`, `toHaveURL`); no fixed waits.
- Mock third-party services; use Stripe test mode for payments.
- Run an axe scan (`@axe-core/playwright`) on each key page.

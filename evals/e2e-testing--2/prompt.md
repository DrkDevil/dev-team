---
max_turns: 6
timeout_seconds: 240
allowed_tools: [Read, Write, Edit, Glob, Grep, Skill]
tags: [e2e-testing]
---

Improve this Playwright test (answer in your reply; there's no repo):

```ts
test('saves an order', async ({ page }) => {
  await page.goto('/orders/new');
  await page.locator('.address-input').fill('12 High Street');
  await page.locator('.btn-primary').click();
  await page.waitForTimeout(3000);
  expect(await page.locator('.toast').isVisible()).toBe(true);
});
```

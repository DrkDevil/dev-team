---
name: storybook-interaction-tests
description: "Guides testing component behavior in Storybook with play functions, Testing Library queries by role, userEvent, fn spies and expect, run in CI through the repo's Storybook test setup with the accessibility addon. Use when a component has behavior such as clicks, typing, opening or validation."
user-invocable: false
---

# Storybook interaction tests

```tsx
import { expect, userEvent, within } from 'storybook/test';

export const SavesOnce: Story = {
  args: { children: 'Save order' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Save order' });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalledTimes(2); // works from the keyboard too
  },
};
```

## Rules
- Find elements the way a user does: by role and accessible name, then label, then text.
- Assert what the user notices: text, focus moving, `aria-expanded` changing, callbacks fired.
- Use `fn()` spies in `args` for callbacks.
- No sleeps; use `findBy*` queries and `waitFor`.
- Stories run as tests in CI through the repo's Storybook test setup (the Vitest addon on
  current Storybook). Accessibility addon violations fail the run.

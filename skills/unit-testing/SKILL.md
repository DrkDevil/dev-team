---
name: unit-testing
description: "Guides unit and component tests with Vitest and Testing Library: testing behavior through the public API, queries by role, one behavior per test, small factories, mocking only the edges, and covering unhappy paths. Use when writing or reviewing unit or component tests."
user-invocable: false
---

# Unit testing

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('shows an error when the username is too short', async () => {
  render(<SignUpForm onSubmit={vi.fn()} />);
  await userEvent.type(screen.getByLabelText('Username'), 'ab');
  await userEvent.click(screen.getByRole('button', { name: 'Create account' }));
  expect(await screen.findByText('Use at least 3 characters')).toBeVisible();
});
```

## Rules
- Test through the public API: inputs and outputs for functions, what users see and do for
  components.
- One behavior per test, named as a sentence.
- Build test data with small factories (`makeOrder({ status: 'cancelled' })`), not giant fixtures.
- Mock only the edges: network, time and randomness.
- No snapshots of large trees; assert specific things.
- Cover empty, invalid, error and no-permission cases.
- Tests are fast, independent, and pass in any order.

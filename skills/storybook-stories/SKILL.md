---
name: storybook-stories
description: "Guides writing Storybook stories in Component Story Format: typed meta and stories, args and controls, a theme and color-mode decorator, autodocs, and covering every variant and state with real content. Use whenever a component is added or changed."
user-invocable: false
---

# Storybook stories

```tsx
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite'; // use the repo's framework package
import { fn } from 'storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Save order', onClick: fn() },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };
export const LongLabel: Story = { args: { children: 'Save this order to your account history' } };
```

## Rules
- One story file beside each component. Props go in `args` so controls work.
- A global decorator in `.storybook/preview.tsx` wraps stories in the product's theme, with a
  toolbar toggle for light and dark.
- Cover every variant and size, plus disabled, loading, error, empty, long text and narrow width.
- Real-looking content, never lorem ipsum. One idea per story, named for what it shows.
- Document the component in JSDoc on the component; autodocs picks it up.

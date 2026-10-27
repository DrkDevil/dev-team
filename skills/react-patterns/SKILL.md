---
name: react-patterns
description: "Guides React component and hook design the way Brian's team writes it: composition over boolean props, deriving instead of syncing state, effects only for outside systems, stable keys, measured memoization and error boundaries. Use for any React component or hook work."
user-invocable: false
---

# React patterns

```tsx
// Bad: copies props into state and syncs it with an effect
const [label, setLabel] = useState('');
useEffect(() => setLabel(`${user.name} (${user.role})`), [user]);

// Good: derive during render
const label = `${user.name} (${user.role})`;
```

```tsx
// Bad: boolean props pile up
<Card showHeader showFooter compact withIcon />
// Good: compose
<Card density="compact">
  <CardHeader icon={<ReceiptIcon />} title="March invoice" />
  <CardContent>...</CardContent>
</Card>
```

## Rules
- Use an effect only to sync with something outside React (subscriptions, the DOM, timers), and
  clean it up.
- Keep state where it's used; lift it only when siblings need it.
- Custom hooks hold reusable logic, start with `use`, and return a small stable API.
- List keys come from the data, never the array index when items can move.
- Memoize only for a measured problem or a stable identity a memoized child needs, unless the
  repo uses the React Compiler, which handles it.
- Wrap each route in an error boundary with a useful fallback and a retry.

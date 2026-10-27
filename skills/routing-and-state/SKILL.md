---
name: routing-and-state
description: "Guides app routing and client state with React Router and React state: route layouts, protected routes, URL state, page titles and focus on navigation, and choosing where state lives. Use when adding pages, changing navigation, or deciding where state belongs."
user-invocable: false
---

# Routing and state

## Routing
```tsx
function RequireAuth({ children }: { children: ReactNode }) {
  const { session, loading } = useSession();
  const location = useLocation();
  if (loading) return <PageSkeleton />;
  if (!session) return <Navigate to="/sign-in" replace state={{ from: location }} />;
  return children;
}
```

- A shared layout route holds the header, footer and navigation; pages never re-create them.
- `RequireAuth` is a convenience. The real protection is server checks and row-level security.
- Shareable state (filters, tabs, page) lives in the URL with `useSearchParams`.
- Every route sets a unique page title and moves focus to its main heading on navigation.
- Every route has a not-found and an error state.

## Where state lives
Pick the first that works:
1. Derived during render (no state).
2. Component state.
3. Lifted to the nearest shared parent.
4. The URL, for anything shareable or that should survive a refresh.
5. Context, for rarely changing app-wide values (session, color mode).
6. A Zustand store, only for complex client state shared across distant parts.

Server data lives in the TanStack Query cache, never copied into a store.

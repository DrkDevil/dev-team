---
name: typescript
description: "Guides TypeScript the way Brian's team writes it: strict mode without any, discriminated unions for state, Zod schemas at every outside boundary with inferred types, satisfies, and generated database types. Use when writing or reviewing typed code."
user-invocable: false
---

# TypeScript

```ts
// Model states as a union, not optional flags
type OrdersState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; orders: Order[] };

// Validate outside data once, and infer the type from the schema
const Env = z.object({ VITE_SUPABASE_URL: z.string().url(), VITE_SUPABASE_ANON_KEY: z.string().min(1) });
export const env = Env.parse(import.meta.env);
```

## Rules
- `strict` on. No `any`; use `unknown` and narrow it. No non-null `!` without a comment saying why
  it's safe.
- Validate API responses, form data, environment variables and URL params with Zod, and infer
  static types from the schemas.
- Use `satisfies` to check an object's shape without widening it.
- Use the generated Supabase types (`supabase gen types`) and regenerate them with every migration.
- If a type needs a comment to understand, simplify it.

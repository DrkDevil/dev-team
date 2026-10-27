---
name: postgres
description: "Guides Postgres schema and query design on Supabase: naming, keys, constraints, indexes for real queries, timestamps, row-level security policies per action using auth.uid(), and reading query plans. Use for any table, policy or query work."
user-invocable: false
---

# Postgres

```sql
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  total_cents integer not null check (total_cents >= 0),
  status text not null check (status in ('pending', 'paid', 'cancelled')),
  placed_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index orders_user_placed_idx on public.orders (user_id, placed_at desc);

alter table public.orders enable row level security;
create policy "Customers read their own orders" on public.orders
  for select to authenticated using ((select auth.uid()) = user_id);
```

## Rules
- `snake_case` names, plural tables, a primary key, `created_at` and `updated_at` on every table.
- Foreign keys plus `not null` and `check` constraints, so bad data can't get in.
- Index the columns your queries filter and sort by; confirm with `explain analyze`.
- JSON columns only for truly unstructured data.
- Row-level security on every table with user data, one policy per action, tested as different
  users. Wrap `auth.uid()` in `(select ...)` so it's evaluated once per query.
- Rules that must never be bypassed live in constraints or policies, not only in app code.

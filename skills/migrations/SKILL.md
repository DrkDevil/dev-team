---
name: migrations
description: "Guides database migrations with the Supabase CLI: one change per file, changes that are safe on live data, separate backfills, two-release renames and drops, written rollbacks, regenerated types, and production only through the release engineer. Use whenever the schema changes."
user-invocable: false
---

# Migrations

```sql
-- supabase/migrations/20261020120000_add_display_name.sql
-- Step 1 of a rename from username to display_name. Step 2 (a later release) drops username.
alter table public.profiles add column display_name text;
update public.profiles set display_name = username where display_name is null;
-- Rollback: alter table public.profiles drop column display_name;
```

## Rules
- Create every migration with `supabase migration new <name>`. Never edit a migration that has
  been applied anywhere, not even for a typo: other databases already ran it, so environments
  drift. Write a new migration instead.
- One logical change per file, named for what it does.
- Safe on live data: add columns nullable or with defaults, backfill separately, then add
  constraints. Renames and drops take two releases.
- Write the rollback in a comment.
- Test with `supabase db reset` on a clean local database with seed data, then regenerate types.
- Production migrations run only through the release engineer, after Brian's yes.

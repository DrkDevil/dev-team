---
type: llm
---

PASS if it has a primary key, foreign key to auth.users, a check constraint on status, timestamps, an index for the owner column and placed_at, RLS enabled, and a select policy using auth.uid(). FAIL if RLS is missing or there are no constraints.

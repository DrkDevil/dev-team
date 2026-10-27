---
type: llm
---

PASS if it makes the change in steps across releases (add new column, backfill, switch code, drop old later) with a rollback note and a Supabase CLI migration file. FAIL if it runs a single rename on live data.

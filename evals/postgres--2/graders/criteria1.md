---
type: llm
---

PASS if it suggests a composite index on (user_id, placed_at desc), or the equivalent owner and date columns, and confirms with explain analyze. FAIL if it suggests indexing every column.

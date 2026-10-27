---
type: llm
---

PASS if it validates the body with Zod, returns 422 with field errors in a consistent error shape, checks the caller, and returns 201. FAIL if it trusts the body unvalidated or returns 500 for bad input.

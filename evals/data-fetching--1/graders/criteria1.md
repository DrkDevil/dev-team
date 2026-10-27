---
type: llm
---

PASS if it uses TanStack Query useQuery with a key including the customer or user id, selects specific columns with a limit, throws on error, and the mutation invalidates the orders query. FAIL if it fetches in useEffect with useState, or selects * without a limit.

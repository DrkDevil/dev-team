---
type: llm
---

PASS if it uses a play function, finds the button by role and accessible name, uses userEvent and asserts on an fn() spy with expect, including a keyboard activation. FAIL if it queries by CSS class or test id without reason, or uses fixed sleeps.

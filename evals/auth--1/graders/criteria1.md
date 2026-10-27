---
type: llm
---

PASS if it creates the client with the request's Authorization header, calls auth.getUser(), and returns 401 when there is no user. FAIL if it trusts a user id sent in the body.

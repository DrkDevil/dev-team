---
type: llm
---

PASS if it keeps the key on the server, sets a timeout, retries 429 and 5xx with backoff and a cap, and validates the response with a schema. FAIL if the key is used from the browser or there is no retry or validation.

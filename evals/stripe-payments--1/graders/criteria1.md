---
type: llm
---

PASS if it verifies the signature on the raw body, handles events idempotently (stored event ids), and grants access from checkout.session.completed using metadata. FAIL if it parses JSON before verifying, or grants access from the client redirect.

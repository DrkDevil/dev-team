---
name: security
description: "Guides application security for Brian's stack: secrets, authentication and authorization checks, row-level security, input validation, injection and XSS, CSRF, security headers, dependency audits, safe logging and webhook verification. Use when building anything that handles users, data or money, and in every security review."
user-invocable: false
---

# Security

```ts
// Bad: the service-role key in browser code bypasses every security policy
const supabase = createClient(url, import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY);
// Good: the browser uses the anon key; service-role work happens in an Edge Function
const supabase = createClient(url, import.meta.env.VITE_SUPABASE_ANON_KEY);
```

## Rules
- **Secrets** stay in environment variables on the server. Anything with a `VITE_` prefix is
  public. Rotate anything that leaks.
- **Access**: every endpoint checks who the caller is and what they may do, backed by row-level
  security. Test reading another user's data; it must fail.
- **Input**: validate everything from outside with Zod. Use the query builder or parameters,
  never string-built SQL. Never render outside HTML without sanitizing it.
- **Sessions**: secure, http-only, same-site cookies; protect state-changing requests from CSRF.
- **Headers**: a content security policy, HSTS, and no detailed error pages in production.
- **Dependencies**: add few, keep them current, and run `npm audit` (or the repo's equivalent).
- **Logs** never contain passwords, tokens or full payment details.
- **Webhooks** verify signatures and reject replays.

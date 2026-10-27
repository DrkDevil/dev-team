---
name: api-design
description: "Guides designing HTTP endpoints and Supabase Edge Functions: resource naming, methods, status codes, Zod-validated requests, one error shape, pagination, idempotent writes and types shared with the client. Use when adding or changing an endpoint."
user-invocable: false
---

# API design

```ts
const Body = z.object({ name: z.string().min(1).max(80) });

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json(405, { error: { code: 'method_not_allowed', message: 'Use POST.' } });
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return json(422, { error: { code: 'invalid_body', message: 'Check the highlighted fields.',
      details: parsed.error.flatten().fieldErrors } });
  }
  // ...check the caller, do the work, return 201 with the created resource
});
```

## Rules
- Plural nouns for resources (`/orders/:id`). GET reads, POST creates, PATCH updates, DELETE
  removes.
- Validate every body, query and param with Zod.
- Status codes: 401 not signed in, 403 not allowed, 404 not found, 409 conflict, 422 invalid,
  429 rate limited, 500 only for our own bugs.
- One error shape everywhere: `{ error: { code, message, details? } }`. No stack traces.
- Paginate lists with a cursor and return the next one.
- Writes that can be retried (payments, webhooks, imports) are idempotent.
- Share request and response schemas with the client.

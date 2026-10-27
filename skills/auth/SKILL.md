---
name: auth
description: "Guides authentication and authorization with Supabase Auth: sign-in methods, verifying the user on the server, roles and memberships, row-level security, redirect URLs, branded emails over custom SMTP, and the unhappy-path tests. Use for any login or permissions task."
user-invocable: false
---

# Auth

```ts
// supabase/functions/<name>/index.ts: verify the caller on every protected request
const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
  global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
});
const { data: { user }, error } = await supabase.auth.getUser();
if (error || !user) return json(401, { error: { code: 'not_signed_in', message: 'Sign in to continue.' } });
```

## Rules
- Authorization lives in server checks and row-level security. The UI only hides what people
  can't use.
- Roles and memberships live in tables users can't write to directly.
- Set the Site URL and redirect URLs for every environment, or magic links and resets break.
- Branded auth emails need custom SMTP set in the Supabase dashboard.
- Sign-in allows paste and password managers (WCAG 3.3.8).
- Test: sign up, sign in, wrong password, expired session, reset password, and reading someone
  else's data, which must fail.

---
name: stripe-payments
description: "Guides Stripe payments: Checkout and the customer portal, prices kept in Stripe, server-created sessions, webhooks with signature checks on the raw body, idempotent event handling, access granted from webhooks, and test mode. Use for anything that takes or tracks money."
user-invocable: false
---

# Stripe payments

```ts
// supabase/functions/stripe-webhook/index.ts
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
// admin: a service-role Supabase client; grantMembership: the product's own access function

Deno.serve(async (req) => {
  const body = await req.text(); // the raw body is needed for the signature check
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body, req.headers.get('stripe-signature') ?? '', Deno.env.get('STRIPE_WEBHOOK_SECRET')!);
  } catch {
    return new Response('Invalid signature', { status: 400 });
  }
  // Idempotency: the primary key on event id rejects repeats
  const { error } = await admin.from('stripe_events').insert({ id: event.id, type: event.type });
  if (error?.code === '23505') return new Response('Already handled', { status: 200 });

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await grantMembership(session.metadata?.user_id, session.subscription);
  }
  return new Response('ok');
});
```

## Rules
- Use Stripe-hosted Checkout and the customer portal, not custom card forms.
- Prices live in Stripe; config holds price IDs, never amounts.
- Create Checkout sessions on the server only, with the signed-in user's id in `metadata`.
- Never grant access from the Checkout success page; anyone can open it without paying.
- Webhooks are the source of truth for access: handle `checkout.session.completed` and the
  `customer.subscription.*` events.
- Test-mode keys in development; live keys only in production environment variables.
- Test declined cards, cancelled checkout, failed renewal and refunds.

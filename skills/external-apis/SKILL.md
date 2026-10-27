---
name: external-apis
description: "Guides calling third-party APIs such as email, maps or weather services: one typed client per service, keys on the server, timeouts, retries with backoff for 429 and 5xx, caching, Zod-validated responses, and mocked tests. Use for any integration with an outside service."
user-invocable: false
---

# External APIs

```ts
// supabase/functions/_shared/weatherApi.ts
const BASE = 'https://api.example-weather.com/v2';

async function fetchWithRetry(url: string, init: RequestInit, tries = 3): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(url, { ...init, signal: AbortSignal.timeout(8000) }); // 8s: well past their normal response time
    const retryable = res.status === 429 || res.status >= 500;
    if (!retryable || attempt === tries) return res;
    await new Promise((r) => setTimeout(r, 500 * 2 ** attempt)); // 1s, then 2s
  }
}

export async function getForecast(city: string): Promise<Forecast> {
  const res = await fetchWithRetry(`${BASE}/forecast?city=${encodeURIComponent(city)}`, {
    headers: { Authorization: `Bearer ${Deno.env.get('WEATHER_API_KEY')}` },
  });
  if (!res.ok) throw new ExternalApiError('weather-api', res.status);
  return Forecast.parse(await res.json());
}
```

## Rules
- Nothing outside the client module calls the service directly.
- Keys stay on the server; the browser calls our endpoint, which calls theirs.
- Cache responses as long as the data allows, and respect rate limits.
- Show a useful state when the service is down.
- Tests use recorded fixtures or mocks, never live calls.
- Note the service's terms on caching and displaying its data in the product's rules.

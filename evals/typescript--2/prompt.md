---
max_turns: 6
timeout_seconds: 240
allowed_tools: [Read, Write, Edit, Glob, Grep, Skill]
tags: [typescript]
---

Our API response is typed as `const data = (await res.json()) as Order[]`. Good enough?

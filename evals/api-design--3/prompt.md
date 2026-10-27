---
max_turns: 6
timeout_seconds: 240
allowed_tools: [Read, Write, Edit, Glob, Grep, Skill]
tags: [api-design]
---

Our import endpoint sometimes gets called twice when the network retries. How do we stop duplicate imports?

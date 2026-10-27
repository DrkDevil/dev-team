---
max_turns: 6
timeout_seconds: 240
allowed_tools: [Read, Write, Edit, Glob, Grep, Skill]
tags: [storybook-interaction-tests]
---

My Storybook play function uses await new Promise(r => setTimeout(r, 1000)) before checking the menu opened. Is that fine?

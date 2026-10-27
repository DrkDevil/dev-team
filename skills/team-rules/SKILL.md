---
name: team-rules
description: "Sets Brian's tier 1 Dev Team rules for every task in every product: scope, default stack, code style, accessibility, tests, checks and the report every agent returns. Loaded at session start and preloaded by every Dev Team agent. Use before planning or writing any code for Brian."
user-invocable: false
---

# Dev Team rules

These are Brian's rules for every product the team builds. Product rules (tier 2, a
`<product>-rules` skill inside that product's repo) add to them and win where the two disagree.
Specialists (tier 3) explain one kind of work; they never restate these rules.

## Who you work for

Brian owns every product. He approves the spec, the plan and the foundations before workers
start, and he gives the final yes before anything goes live. He has decades of design and
development experience: explain decisions plainly and briefly, without selling. When a request
can be read two ways, pick the likelier reading and say which one you picked.

Only the main session talks to Brian. If you are a subagent and need an answer from him, finish
what you can and put the question under "Questions for Brian" in your report.

## Scope

- Do the task you were given and nothing more. Don't add features, wording, menu items,
  redirects or refactors nobody asked for. Put anything else worth doing in your report.
- Change only the files the task needs. Leave shared pieces (headers, footers, layout shells,
  theme) alone unless the task is about them.
- One task, one branch. Commit your work on your own branch with a clear message.

## Default stack

Use these unless the product's rules say otherwise:

| Need | Default |
| --- | --- |
| Language and UI | TypeScript (strict), React, Vite |
| Design system | The current major version of MUI, restyled through the theme |
| Routing | React Router |
| Server data | TanStack Query |
| Client state | React state and context; Zustand only for complex shared state |
| Forms and validation | React Hook Form with Zod |
| Charts | MUI X Charts |
| Backend | Supabase: Postgres, Auth, Edge Functions |
| Payments | Stripe (Checkout, customer portal, webhooks) |
| Unit and component tests | Vitest with Testing Library |
| Component workshop | Storybook with interaction tests and the accessibility addon |
| End-to-end and screenshot tests | Playwright, with axe for accessibility scans |
| CI | GitHub Actions |
| Production errors | Sentry |

Check installed versions in `package.json` and follow the docs for those versions. Pin every
dependency to a version range; never `latest`.

## Specialists

Before you write code or give advice in an area a Dev Team specialist covers (theming, components,
stories, forms, data fetching, layout, motion, charts, APIs, auth, payments, databases, tests,
accessibility, security, CI), load that specialist with the Skill tool first. Specialists hold
Brian's choices, which can differ from general practice.

## How code is written

- TypeScript in strict mode. No `any` unless a comment explains why.
- React function components and hooks. Reuse the design system's components instead of writing
  one-off versions: one Header, one Footer, one Button.
- Style through the theme and design tokens. No hard-coded colors, font sizes or spacing.
- No gradient text, ever.
- Names say what a thing is for (`fetchOrderHistory`, not `getData2`). Small files, one job each.
- Comments explain why, not what. Match the comment density of the code around you.
- Anything that loads data handles its loading, empty and error states.
- Secrets stay in environment variables, out of the repo and out of the browser bundle.

## Accessibility

Every screen meets WCAG 2.2 AA. Fix accessibility problems as part of the task, never later.
The `wcag` specialist has the checklist.

## Tests

- New logic gets unit tests. New components get a Storybook story for every state and, when
  they have behavior, an interaction test.
- Flows that matter (sign-in, checkout, saving data) get an end-to-end test.
- Never skip, disable or weaken a test to get a green run. If a test is wrong, fix it on purpose
  and say so.

## Before you hand work back

Run the product's lint, type check, unit tests and build. Work that fails them isn't finished.
Then five gatekeepers check every task before it's merged: test checker, accessibility reviewer,
design QA, code reviewer and security reviewer.

## Your report

End every task with this report, short and in plain English:

```
What changed: Added Button with primary, secondary and ghost variants (src/components/Button/).
  Branch: is/button  Worktree: .claude/worktrees/is-button
How it was checked: npm run lint (pass), npm run typecheck (pass), npm test (14 passed),
  npm run build-storybook (pass)
Left or uncertain: The ghost variant's hover color needs Brian's eye in dark mode.
Questions for Brian: none
```

## Learning

When Brian corrects how something was built, the correction becomes a rule (here, in a
product's rules, or in a specialist) with a good and a bad example, and only after Brian says
yes. The `record-correction` skill does this. Follow approved rules from the next task on.

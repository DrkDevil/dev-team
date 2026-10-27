# How the Dev Agent Team is built

This is the build method for Brian's development agent team: one orchestrator, six team leads,
workers copied as many times as the work needs, five gatekeepers, and a library of specialists.
It is written to current Claude Code and Claude prompting practice (checked October 2026;
sources at the end).

## The three tiers

Every agent works from three tiers of knowledge. Tiers 1 and 2 together are the shared playbook.

| Tier | What it holds | Where it lives | How it loads |
| --- | --- | --- | --- |
| **1 - Team rules** | How Brian wants code written, everywhere: coding style, naming, accessibility (WCAG 2.2 AA), testing, the report shape | `skills/team-rules/SKILL.md` | The session-start hook prints it into the main session; every agent preloads it through `skills:` |
| **2 - Product rules** | Rules for one product, such as its tokens, MUI overrides and brand rules | `.claude/skills/<product>-rules/SKILL.md` in the product repo | Its `paths:` match files in that product's repo; agents preload the ones they need |
| **3 - Agents and specialists** | Agents are the workers (who does the job). Specialists are knowledge packs (what they know for one task) | `agents/<name>.md`, `skills/<name>/SKILL.md` | Agents are started by the orchestrator or a lead; specialists are picked by their `description` |

The more specific tier wins when two disagree. Tier 3 files never restate tiers 1 or 2.

Why a skill and a hook for tier 1: Claude Code does not load a `CLAUDE.md` at a plugin's root, and
subagents do not see the main session's context. A hook covers the main session and the `skills:`
list covers each agent. Both read the same file, so each rule is written once.

## Agents and specialists

- **Few agent types, many copies.** 26 agent types: the orchestrator, product writer and
  architect; one lead template started once per team; the workers; and the five gatekeepers. Each type is one file. The orchestrator starts as many copies as
  there are tasks, from the briefs its leads write, each in its own git worktree, so many run at
  once without colliding. Claude Code doesn't let a subagent start other agents, so all starting
  happens in the main session; leads plan and judge.
- **Deep specialists.** Most of the know-how lives in specialists, not in agent files: MUI
  theming, MUI overrides, Storybook stories and interaction tests, React patterns, TypeScript,
  Postgres, Stripe, WCAG and the rest. An agent loads only the ones its task needs.
- **One task per worker.** A worker gets one small task ("build the Button component"), does it,
  and reports. Small tasks keep context small and make gate failures cheap to redo.

## Writing agents and specialists

- **The description is the router.** The orchestrator, leads and Claude choose agents and
  specialists from their descriptions alone. Say what it does and when to use it, trigger words
  first. Descriptions are truncated at about 1,500 characters, and long combined descriptions slow
  every session.
- **Brief, don't script.** Write the body as a brief to a capable colleague: the goal, who it is
  for, what good looks like, the constraints that matter and why, what to report. Over-prescriptive
  prompts make current models worse.
- **Calm wording.** "Use this when..." rather than "CRITICAL: you MUST...". Current models
  over-apply emphatic instructions.
- **Progressive disclosure.** Only descriptions sit in context until something is used. Keep a
  `SKILL.md` under 500 lines and move long reference material into `references/` files beside it.
  Put deterministic work (lint, build, test runs) in scripts, which run without being read into
  context.
- **No machine-specific paths.** Nothing in an agent or skill points at one PC's folders or
  carries template leftovers.
- **Skills, not commands.** New slash commands are skills. `disable-model-invocation: true` makes
  a skill owner-started only (for example, the best-practice check).
- **Models.** Leave `model` unset so an agent follows the session's model; use `haiku` only for
  simple lookups.
- **Report shape.** Every agent ends with what changed, how it was checked, and what is left
  undone or uncertain, so its lead can pass it on without guessing.

## The flow around the build

- **Before:** the product writer turns Brian's idea into a spec with done checks, and the
  architect designs the structure. Brian approves both.
- **After:** the monitor watches the live product after each release and turns problems into
  tasks; anything urgent goes to Brian at once.
- **Monthly:** after the best-practice check, the upgrade keeper updates dependencies one family
  at a time, and major upgrades of MUI, React or Storybook need Brian's yes.

## The gates

Gatekeepers only read and report. A hook stops any gatekeeper from editing files or committing,
so a gate can never fix the work it is judging.

Every finished task passes five gatekeepers before it is merged: test check, accessibility check
(WCAG 2.2 AA), design QA (screenshots checked against the design system and the approved design),
code review (against the playbook) and security review. A failure goes back to the worker with
notes; when the cause isn't clear, the debugger finds it first. Passing work is merged into a preview build, and Brian gives the final yes
before anything goes live. Brian also approves the plan and the foundations (the theme
and the repo structure) before workers start.

## How the team learns

Learning happens outside the work loop, so no task slows down to study. Nothing enters the
playbook or a specialist without Brian's yes.

1. **Corrections.** When Brian corrects something, the code reviewer writes it as a rule with a
   good and a bad example and names the tier it belongs in. Brian says yes or no. Approved rules go
   into tier 1, tier 2 or the specialist, and every agent follows them from the next task on.
2. **Best-practice check.** About once a month, an owner-started skill has the architect check
   release notes and docs for MUI, React, Storybook, Claude Code and the other tools, then list
   what should change and why, with sources. Brian approves each item.

## Jev (optional)

TypeSafe's Jev is a fast decision model: it picks, ranks and answers yes or no with
probabilities, and does not write or use tools. A `jev-route` skill can help the orchestrator and
leads choose an agent or specialist with a confidence score. It needs the `typesafe@typesafe-ai`
plugin and a `TYPESAFE_API_KEY`; without them, Claude Code's own routing is used, which is the
default anyway.

## Checking the team itself

- `claude plugin validate . --strict` checks the manifest and every agent and skill.
- `claude plugin eval . --allow-tools Write Edit` runs the evaluation cases in `evals/`: three per
  skill and one routing case per agent (each case is a billed model call).
  Add a case for every correction Brian makes, so a rule that stops working is caught.
- `/skill-doctor` shows each skill's context cost and how often it is used; run it during the
  monthly check and retire specialists nobody loads.

## Sources

- Plugin manifest and layout: https://code.claude.com/docs/en/plugins/manifest-reference
- Marketplaces: https://code.claude.com/docs/en/plugins/create-marketplace
- Subagents: https://code.claude.com/docs/en/sub-agents
- Skills: https://code.claude.com/docs/en/skills
- Hooks: https://code.claude.com/docs/en/hooks
- Plugin evals: https://code.claude.com/docs/en/plugin-evals
- Prompting best practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- Prompting Claude Fable 5: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5
- Agent skills (Anthropic engineering): https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
- Jev for coding agents: https://docs.typesafe.ai/introduction/coding-agents

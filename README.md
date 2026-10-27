# Dev Team

Brian's main development team for Claude Code, for any app: one orchestrator, team leads,
workers that run in parallel in their own git worktrees, five gatekeepers that check every task,
and specialists the agents load for each task. The design is in `docs/methodology.md`.

## What's inside

| Part | Where | Count |
| --- | --- | --- |
| Team rules (tier 1) | `skills/team-rules/` | 1 |
| Orchestration flow | `skills/orchestrate/` | 1 |
| Agents | `agents/` | 26 |
| Specialists | `skills/<name>/` | 26 |
| Learning skills | `skills/record-correction/`, `skills/best-practice-check/` | 2 |
| Hooks | `hooks/hooks.json`: team rules at session start; a guard that stops gatekeepers from editing files | 2 |
| Eval cases | `evals/`: 3 per skill, plus one routing case per agent | 116 |

Agents, by layer:

| Layer | Agents |
| --- | --- |
| Plan | orchestrator, product-writer, architect |
| Team leads | lead (one template, started once per team) |
| Design team | theme-engineer, component-engineer, storybook-engineer, ux-designer |
| Front-end team | frontend-engineer, ux-designer |
| Back-end team | backend-engineer, auth-payments-engineer, integrations-engineer |
| Data team | database-engineer, analytics-engineer |
| Quality team | test-engineer, performance-engineer, debugger |
| Release team | release-engineer, docs-writer, upgrade-keeper, monitor |
| Gatekeepers | test-checker, accessibility-reviewer, design-qa, code-reviewer, security-reviewer |

## Install

This repo is both the plugin and a marketplace named `digital-religion`. In Claude Code:

```
/plugin marketplace add DrkDevil/dev-team
/plugin install dev-team@digital-religion
```

To update later: `/plugin marketplace update digital-religion`

## Use

- Start a build with `/dev-team:orchestrate <what to build>` in any session, or with the
  orchestrator as the main session: `claude --agent dev-team:orchestrator`
- Correct the team in plain words; it drafts a rule and asks for your yes.
- Once a month, run `/dev-team:best-practice-check`.

## Running many agents at once

Claude Code runs up to 20 subagents at a time by default. Only the main session can start
agents, so the orchestrate skill starts every worker and gatekeeper from the leads' briefs. To run more at once, set
`CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` in the `env` block of your `~/.claude/settings.json`.
Each running agent uses your plan's usage, so raise it step by step.

## Checking the team

- `claude plugin validate . --strict` checks the manifest and every agent and skill.
- `claude plugin eval .` runs the eval cases (each case is a billed model call).
- `/skill-doctor` shows each skill's context cost and how often it's used.

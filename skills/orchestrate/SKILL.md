---
name: orchestrate
description: "Runs a full Dev Team build from the main session: spec, plan, Brian's approval, parallel team leads, five gatekeepers, merge, preview, release and monitoring. Use when Brian asks to build or change a product or feature end to end, or runs /dev-team:orchestrate with a goal."
argument-hint: "[what to build]"
---

# Orchestrate a Dev Team build

You are the orchestrator for this build. You plan, direct the team leads and keep Brian
informed. You don't write product code yourself. Run this from the main session, so you can talk
to Brian and start agents; the agents you start can't reach him directly and send their
questions back to you.

## The team

- `dev-team:product-writer` turns the goal into a spec with done checks.
- `dev-team:architect` designs structure and foundations, and runs the monthly check.
- `dev-team:lead` plans and judges one team's work: design, front-end, back-end, data,
  quality or release. It writes the worker briefs and decides merge, fix or debug.
- You start every worker and gatekeeper yourself. Claude Code doesn't let a subagent start
  other agents, so the leads can't.

## Steps

Copy this checklist into your notes and keep it current:

```
- [ ] 1 Spec approved by Brian
- [ ] 2 Plan and foundations approved by Brian
- [ ] 3 Wave 1 merged
- [ ] 4 Later waves merged
- [ ] 5 Preview approved by Brian, released
- [ ] 6 Monitor run after release
```

1. **Spec.** Read the repo, its README and its `<product>-rules` skill if there is one. Start the product writer with Brian's goal in his
   words. Put its open questions to Brian in one short message, send his answers back, and show
   him the finished spec for a yes.
2. **Plan.** Start the architect with the approved spec. Turn its design note into a task table:
   small tasks one worker can finish, each with a team, what done looks like (from the spec's
   done checks) and what it depends on. Show Brian the table and wait for his yes. Foundations
   (tokens, theme, app shell, data model) come first.
3. **Waves.** For each team with ready tasks:
   - Start its lead with its rows of the table, the spec path and any constraints. Start the
     leads of different teams in parallel.
   - Start the workers from the lead's briefs, all in one message so they run in parallel.
     Each works in its own worktree.
   - When a worker reports, start all five gatekeepers at once with the task brief, branch and
     worktree path.
   - Send the reports and verdicts to the lead. Act on its answer: MERGE (the release engineer
     merges), FIX or DEBUG (start that worker with the lead's brief, then gate again) or STOP
     (tell Brian).
4. **Track.** Update the table as leads report. Pass any "Questions for Brian" to him in one
   message. Start the next wave when its dependencies are merged.
5. **Release.** When a milestone is merged, the release lead builds a preview. Tell Brian what
   changed and where to see it. Nothing goes live without his yes on that preview.
6. **Watch and keep current.** After each release, have the release lead run the monitor; send
   Brian anything urgent at once and plan the rest. Monthly, after `/dev-team:best-practice-check`,
   have the release lead run the upgrade keeper.

## Example task table

| # | Task | Team | Done when | Needs |
| --- | --- | --- | --- | --- |
| 1 | Color, type and spacing tokens | Design | Tokens file exports light and dark sets; contrast pairs pass AA | none |
| 2 | MUI theme from tokens | Design | Theme story shows both modes; typed custom colors | 1 |
| 3 | Button | Design | Stories for every variant and state; interaction test; all gates pass | 2 |

## Keep in mind

- Claude Code runs 20 subagents at once by default. Plan waves to fit; Brian can raise
  `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` in his settings.
- Workers, gates and leads report in summary. Keep your own context for the spec, the table and Brian.
- When Brian corrects how something was built, run `record-correction` so the team learns it.
- Talk to Brian plainly and briefly, leading with what he needs to know or decide.

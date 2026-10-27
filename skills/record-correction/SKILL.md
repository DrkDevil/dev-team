---
name: record-correction
description: "Turns Brian's correction of how something was built into a playbook rule with an example, gets his yes, and writes it to the right tier. Use whenever Brian corrects the team's code, style, structure or behavior, or says 'remember this' or 'always/never do X'."
argument-hint: "[what Brian corrected]"
---

# Record a correction

Brian's corrections are how the team learns. Nothing enters the playbook without his yes.

## 1. Draft the rule
Write it in this shape:

```
Rule: <one sentence, in Brian's terms>
Why: <one line>
Good: <a short code or wording example>
Bad: <the version Brian corrected>
Tier: team rules | <product>-rules | <specialist name>
```

Pick the tier by scope: true for every product goes in the team rules; true for one product goes
in that product's rules; about one kind of work goes in that specialist. If an existing rule
already covers it, propose an edit to that rule instead of a new one.

## 2. Ask Brian
Show him the draft and ask for a yes, a change, or a no. Keep the message short.

## 3. Write it (only after yes)
- **Team rules or a specialist**: edit the file under `${user_config.team_source}/skills/`. If no
  source folder is set, show the exact text and where it goes, and stop.
- **Product rules**: edit `.claude/skills/<product>-rules/SKILL.md` in the product repo.
- Add an eval case for the rule under `${user_config.team_source}/evals/<rule-slug>/` with a
  `prompt.md` that would tempt the old mistake and an `llm` grader that fails it, so the rule
  keeps working.
- Commit with the message `rule: <short rule>`.

## 4. Say what changed
One line: the rule, where it went, and that Brian should reinstall or update the plugin for the
team to pick it up (product rules apply right away).

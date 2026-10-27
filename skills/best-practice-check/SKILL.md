---
name: best-practice-check
description: "Checks current official guidance for the tools the Dev Team uses (MUI, React, TypeScript, Storybook, Supabase, Stripe, Playwright, WCAG, Claude Code) and proposes updates to the team rules and specialists, each approved by Brian. Use once a month, or when Brian asks for a best-practice check."
disable-model-invocation: true
---

# Best-practice check

This runs outside normal work, about once a month, so no task slows down to study. Run it in
the main session, so you can show Brian the results; start `dev-team:architect` for a deep look
at one tool if needed.

The team source is `${user_config.team_source}`. If that setting is empty, use the plugin's own
folder, `${CLAUDE_PLUGIN_ROOT}`, and tell Brian to set the option so approved changes land in his
copy.

1. **What we use.** List the tools from the team rules' default stack table, plus versions from
   any product repo in this session (`package.json`). With no repo, check the current release of
   each tool in the stack.
2. **What changed.** For each tool, read its official release notes, migration guides and docs
   since the last check (see `docs/best-practice-log.md` in the team source for the date).
   For Claude Code, read its docs on subagents, skills, hooks and plugins. Use only official or
   well-known sources and note each link.
3. **What should change.** Compare with our specialists and rules. Propose only changes that
   matter: a deprecated API we teach, a new recommended pattern, a version we should move to, a
   specialist nobody uses (check with `/skill-doctor`).
4. **Ask Brian.** Show a short table: change, why, source, which file. He approves each row.
5. **Apply approved rows** in the team source and commit them.
6. **Log the check.** Add a dated entry to `docs/best-practice-log.md` listing what was checked,
   the sources, and what changed, even when nothing did.

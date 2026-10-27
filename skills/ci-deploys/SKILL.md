---
name: ci-deploys
description: "Guides CI and releases with GitHub Actions: checks on every branch, preview builds with test keys, production only after Brian's yes, release order with backward-compatible migrations, smoke tests, release notes and rollbacks. Use for CI setup, merging and releasing."
user-invocable: false
---

# CI and deploys

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run lint && npm run typecheck
      - run: npm test
      - run: npm run build && npm run build-storybook
```

## Rules
- CI runs on every branch: install, lint, type check, unit tests, Storybook tests, build, and
  end-to-end tests on key flows. A red check blocks the merge.
- Each milestone gets a preview build with its own environment variables and test keys.
- Production deploys happen only after Brian's yes on that exact preview.
- Release order: backward-compatible migrations, then the app, then a smoke test of key flows.
- Record each release: what changed, the commit, and how to roll back.
- Never force-push the default branch or skip checks to ship faster.

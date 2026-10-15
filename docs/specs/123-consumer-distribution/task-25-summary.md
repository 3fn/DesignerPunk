# Task 25 Summary: The persona trio (U5)

**Date**: 2026-10-14
**Purpose**: Concise summary of Task 25 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

- **A standing onboarding instrument** (`tests/onboarding-trio/protocol.md`) and **three committed host fixtures**: a small TypeScript service, a static HTML/CSS site, and a near-empty repo. The instrument is meant to be re-run every release from release 4.
  - It defines a closed list of how a session can end, a budget rule, a 24-field record format, and copy-paste launch steps.
- **Three agent runs**, each role-playing a different kind of founder, from a frozen prompt, against the packed release candidate (shasum `aa3efdcf…`), with no access to DesignerPunk's source. Peter launched every session from macOS Terminal.
  - **(a) Dana**, backend engineer, Claude Code.
  - **(b) Rosa**, designer, Kiro.
  - **(c) Priya**, first-time product manager, Kiro, starting from a bare `init`.
  - All three completed the 5-step founder path. Each run then asked one DesignerPunk agent to do a job in its own domain: Ada and Lina in (a), Sparky in (b), Leonardo in (c).
- **The records** are at `.kiro/specs/123-consumer-distribution/validation/trio-{1-backend,2-designer,3-pm}.md`. Every field is present in all three (checked by command).

## What It Found

- **A brand colour may not be settable from a born repo.** Consumer-Ada found that `generate` reads the package's own palette and theme maps, not the founder's copies. Ada needs to verify this.
- **A bare `init` run by an agent in Kiro hangs** on a name prompt instead of stopping with an error, as the install guide says it should. Peter had to unblock it twice.
- **Consumer-Leonardo writes screen specs where the Product MCP cannot see them**: his rendered write scope covers `specs/` only.
- **Consumer-Sparky wired a no-build site to DesignerPunk's base tokens**, not the founder's own. His charter and the browser guide point him there.
- **`init` does not fit the host it lands in**: it breaks a TypeScript service's build, writes output into `dist/`, gives a static site a TypeScript "language", and creates a `.gitignore` that misses `node_modules/`.
- **The install guide has no path for a page with no build step**, and a founder who starts from a one-line tip never reaches the guide.
- **The first MCP load**:
  - Claude Code asks to trust the folder and to enable the three servers. The committed `.claude/settings.json` does not pre-enable them, and the approval is stored per clone.
  - Kiro asked nothing.
- **The instrument itself**: Claude Code accepts `--max-turns` but does not enforce it, and kiro-cli prints tool calls but not their results. So Task 28.3's check cannot be read from the Kiro run.

## What It Does Not Show

The runs are agents role-playing ignorance. They measure how clear the instructions are and whether the path is complete; a human measures confusion. A green trio is not "a stranger succeeded". With one run per persona, the trio cannot say which harness most founders use.

## Rulings Applied (Peter, 2026-10-14)

- The "not exercised" wording for Kenya and Data: ruling (b), with owner-signed strings and per-run host facts.
- Peter launches every harness session himself, from macOS Terminal.

## Related

- Completion: `.kiro/specs/123-consumer-distribution/completion/task-25-completion.md`
- Instruments: `.kiro/specs/123-consumer-distribution/completion/task-25-instruments.md`

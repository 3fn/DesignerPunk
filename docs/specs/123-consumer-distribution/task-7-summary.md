# Task 7 Summary: The publish-rail guard, ballot B-U1, and the CHANGELOG's start

**Date**: 2026-09-27
**Purpose**: Concise summary of Task 7 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Built `scripts/verify-publish-rail.sh`, a committed script that verifies a published `@3fn/core` version is actually live on `registry.npmjs.org` and that its tarball is served from that same registry (not GitHub Packages). The guard queries the public registry directly over HTTP with `curl`, parsing the response with `node -e` — no `npm` CLI and no `.npmrc` (project, user, or global) or `curl` config file is ever read, and standard proxy environment variables are deliberately honoured. This design replaced an initial `npm view`-based form that Stacy's review found broken under its own required hermetic isolation env vars (they made npm exit before resolving config, false-redding a live release); Peter ruled to drop `npm` entirely.

Drafted and ratified ballot **B-U1**: a new mandatory step 6 in `.kiro/hooks/RELEASE-FLOW.md` that runs the guard after publish and lands its output on `main` via a small post-publish release-record PR, plus a new `publish-rail-guard` register row in `governance/classification-map.md` (`check_state: armed`, `armed_at: tool-time`). The ballot went through two rounds of review from Stacy — ACCEPT-WITH-CHANGES, then ACCEPT — and one further conditional addition from Peter before ratification.

Started `CHANGELOG.md`, the first consumer-facing changelog for `@3fn/core`, with release 1's entry (drawn from Tasks 1–6 and Task 9.0). Stacy's independent review, checking every sentence against source code and the actual last published release, found and corrected ten issues (a false claim, a missing breaking change, a Req 6.1 violation in the drafted "Publishing" section, and seven smaller inaccuracies) before the entry was accepted.

## Why It Matters

Requirement 6's founding finding was that a publish-verification mitigation had shipped without ever being run. This task's own first draft repeated that exact failure inside the requirement written to prevent it — the hermetic env vars quoted in the requirement and design docs had never been executed against a live release, and broke when finally tested. The rework, and the two-round review that caught it, is itself the demonstration that publish verification now means what it claims: registry visibility and tarball provenance are checked with a script that has been run for real, against a real published version, before being written into the mandatory release recipe.

## Key Changes

- `scripts/verify-publish-rail.sh` (new): the HTTP-only publish-rail guard. Exit codes `0` (PASS), `2` (usage — `VERSION` unset), `10` (`FAIL[version]`), `11` (`FAIL[host]`), `12` (self-test), `13` (`FAIL[host-empty]`).
- `scripts/__bites__/` (new): one committed measurement (a real PASS against `registry.npmjs.org` for `14.1.0`) and four recorded bites (a real HTTP 404, a PATH-shimmed-`curl` host mismatch through the production code path, a PATH-shimmed-`curl` empty-tarball response, and an unset-`VERSION` usage error).
- `.kiro/docs/ballots/2026-09-27-123-b-u1-publish-rail.md` (new): B-U1, `Status: RATIFIED (Peter, 2026-09-27)`.
- `.kiro/hooks/RELEASE-FLOW.md`: new step 6, applied from the ratified ballot text.
- `governance/classification-map.md`: new `publish-rail-guard` entry, applied from the ratified ballot text.
- `.kiro/docs/ballots/README.md`: index entry for B-U1.
- `CHANGELOG.md` (new): release 1's entry; added to `package.json`'s `files[]`.
- Requirements.md (Reqs 6.2, 6.3, 6.8), design.md (C9), and tasks.md (Task 7's own criteria) each carry dated errata recording the `npm`-to-HTTP redesign.

## Impact

- The publish-rail guard is `armed` (register row), conditional — per Stacy's binding ruling — on the row and its RELEASE-FLOW.md step having landed in the same commit, which they did.
- One residual, named rather than hidden: the guard has never yet run immediately after a real `npm publish`, and the registry's per-version endpoint can briefly 404 right after publishing (indexing lag). The script's own message covers it with a wait-and-re-run instruction; no automatic retry.
- One routed, unfixed finding: `governance/DesignerPunk-Integration-Guide.md`'s install section still documents GitHub Packages with the wrong scope — a live Req 6.1 violation, predating this spec, committed as an issue (`.kiro/issues/2026-09-27-integration-guide-install-section-stale.md`, PR #214) and routed to Task 19.4.

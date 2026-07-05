# Inbound: 13.0.0 Release Empirics → Spec 123

**Date**: 2026-07-05
**Source**: the v13.0.0 dual-registry release (main-loop session, Peter + Claude)
**Status**: Empirical friction data + measured baselines for formalization — NOT decisions. Directly feeds Decision Point 3 (public npm vs GitHub Packages) and the five-minute-test bar.

---

## 1. First release with the consumer fixes — cold-install verified

13.0.0 published to BOTH registries 2026-07-05. Cold-install proof from public npm: bare dir → `npm install @3fn/core@13` → CLI runs → `dist/mcp/docs-mcp.js` boots with **zero env wiring** and serves the full corpus package-relatively (`Data root steering: …/node_modules/@3fn/core/governance (source: package)`). The F-C2 class is closed in the published artifact, not just in-repo.

## 2. Registry-friction empirics (Decision Point 3 evidence)

- **GitHub Packages**: consumers must authenticate with GitHub even to *install* — a locked door in front of the five-minute test. Publish-side worked first try with a classic PAT (`write:packages`).
- **Public npm publish friction encountered (all three, sequentially):** (a) account-level **2FA-on-publish** → agent-shell publishes get 403; either the human runs it (web-auth prompt) or a granular token with "Bypass 2FA" goes in `.npmrc`; (b) scoped packages default private → **`--access public` required** or E402 "Payment Required"; (c) **`@3fn:registry` scope-mapping overrides a bare `--registry` flag** — both flags required for publish AND verification (`npm view` silently answered from GH Packages, producing a false "it's live").
- **(c) is also a consumer-side hazard 123 should design around:** any project whose `.npmrc` maps `@3fn` to GH Packages (e.g., an old init template) pulls `@3fn` from GH Packages regardless of intent — a stale scope-mapping in a consumer is a silent registry pin.

## 3. Publish-flow gap (couples to `release-system-review.md` gaps #2/#3)

The release manager does notes + tag + GitHub release only; the npm publishes are manual ×2 with the flags above (playbook recorded). The generated release notes have no consumer rendering — interim practice is a hand-authored `RELEASE-NOTES-X.Y.Z.md` companion (13.0.0's exists). If 123 makes distribution consumer-facing, the publish pipeline and notes rendering are part of that surface.

## 4. Packaging baseline (A6 packaging-diet datapoint)

13.0.0 tarball: **2,547 files / 8.3MB packed / 31.4MB unpacked** (publish output, 2026-07-05). The audit's A6 dead-code findings (`src/performance/`, `src/workflows/`, `.example.ts`) all shipped in it via `files: ["src/"]`.

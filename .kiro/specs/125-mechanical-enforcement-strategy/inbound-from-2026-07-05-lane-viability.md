# Inbound: Lane-Viability Measurements → Spec 125

**Date**: 2026-07-05
**Source**: main-loop session (Peter + Claude), post-de-flake measurements + 13.0.0 release CI
**Status**: Measured facts for formalization — they shrink Phase 1's design space. NOT decisions.

---

## 1. The full functional suite is now CI-gateable wholesale — §9's scoped-lane question largely dissolves

Measured 2026-07-05 (warm cache, dev machine): **full `npm test` = ~53s** (8,987 tests / 377 suites, deterministic post-de-flake); `test:all` ~56s; perf lanes seconds. The outline's §9 "how to carve fast lanes without dragging the ~10-min suite into CI" was written against pre-rework numbers — **Phase 1 can plausibly require the ENTIRE functional suite** (and full `tsc`, measured ~1 min) as blocking checks. CI-runner cold-cache times will be higher than warm-dev — measure in CI before promising, but the order of magnitude changed.

## 2. The sub-package suites are OUTSIDE root `npm test` — the lane set must name them

`mcp-server` (622 tests, ~4s) and `application-mcp-server` (320 tests) run only via their own `npm test`. Root-green proves nothing about them (the relocation-integrity gate lives there, currently armed nowhere). Phase 1's required-check set should enumerate them explicitly. Related live incident (2026-07-03): a main-loop background run inherited a stale `cd mcp-server` and ran the sub-suite believing it was the root suite — same lesson as the empty-lane finding: **a green check must prove it ran the intended selection** (extend "armed = verified non-empty" to "armed = verified non-empty AND correct scope").

## 3. Small riders for Phase 0/1 (chore-scale)

- Our workflows pin `actions/checkout@v4` + `setup-node@v4` (Node-20 deprecation nags in Actions) — bump when touching CI anyway.
- Precedent worth keeping: the isolated-cwd MCP boot smoke (F-C2/F-C6 guard) ran green in CI on its first exercise (2026-07-05, consumer-guard lane) — the add-guard-with-the-fix pattern working as designed.

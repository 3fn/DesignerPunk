# Issue: build `verify-signing-chain` — the `--ci` step in `122-diff-guard`, the `--audit` mode, and their fixtures

**Date**: 2026-10-01
**Status**: ACTIVE (dormant until its ballot ratifies — see Trigger)
**Owner**: Thurgood (the instrument's owner; build delegated to one Sonnet session, verified in the owner's seat)
**Trigger**: **before U2b's unit PR opens** (Spec 123). Precondition: ballot `.kiro/docs/ballots/2026-10-01-signing-act-chain.md` RATIFIED (its merge is `R`). The build cannot start before `R`; if U2b's unit PR is ready before the build lands, the PR waits, because the signing acts that U2b carries are the instrument's first population.
**Source**: ballot `2026-10-01-signing-act-chain.md` §§ 4 and 6 (one-time acts 2 and 3); the issue-row grant mechanism, `.kiro/docs/ballots/2026-09-27-ci-regime-standing-scope.md` § 3 and `.kiro/issues/README.md` rule 8.

---

## The gap

The signing-act rule (ballot § 2) is audited by a chain of eight links (ballot § 3). Links 1–3 are git facts and belong in CI; links 4–7 are harness-store facts and belong in a local audit command. Neither exists. `checkDispositionSigners` (`tools/agent-generator/regrounding/signatures.ts`, on U2b's unit branch) checks half of link 3 and nothing else. Nothing checks the commit's `Agent:` trailer against the signer, hunk or commit containment, merge results on signature paths, or the stale-list bound. And on a PR whose committed lock matches the tree, the C6 no-op probe skips every `122-*` step, including the freshness sweep (Stacy's A-round finding).

`.github/workflows/agent-generator.yml` is outside Thurgood's standing CI-regime scope (P1 is `lane-timing.yml` only), and `tools/agent-generator/**` is outside his charter's write scope. So the build needs this issue-row grant.

---

## Grant

**Grant paths**: `.github/workflows/agent-generator.yml`, `tools/agent-generator/regrounding/signatures.ts`, `tools/agent-generator/regrounding/verify-signing-chain.ts`, `tools/agent-generator/__tests__/**`, `canonical/generated.lock`

- `signatures.ts` carries the link checks beside `checkDispositionSigners`; `verify-signing-chain.ts` (new) is the CLI entry for `--ci`, `--audit --pr N` and `--audit --branch <b>`; `__tests__/**` carries fixtures F1–F13, F12′, the two controls and H1–H3, including synthetic harness transcripts; `canonical/generated.lock` is refreshed by a green `diff-guard` run because `tools/agent-generator` is in the C6 input closure.
- The workflow invokes the CLI directly (`npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --ci`); **no `package.json` script is added**, so `package.json` is not granted.
- **The grant holds on the fixing PR's branch only.** It is activated by Peter's merge of the PR that adds this list and whose body names this issue and this path list (the ballot PR), and it expires when the fixing PR merges (`.kiro/issues/README.md` rule 8). It confers no ratification authority, it is additive to Thurgood's charter scope, and it touches no governance-law path.
- **The fixing PR targets U2b's unit branch, not `main`**: `tools/agent-generator/regrounding/` and `canonical/profiles/consumer/**` exist only there until U2b merges. The U2b PR body cites this path list.
- **M1's excluded acts are carried, none named or admitted**: no new required context; no change to `EXPECTED_CONTEXTS`'s count; no removed or weakened step, floor or execution assertion. The step is **added** inside the existing required context `122-diff-guard`.
- **Named, because it is the one act a reader could take for a weakening: the C6 lock-rule carve-out** (ballot § 6.3). The new step carries **no** `needs.setup.outputs.noop` condition. *"The C6 no-op lock (DD7) may skip generation checks; it never skips a signing check."* This strengthens the context; it removes nothing. The workflow's header comment (its no-op description, L14–16) is updated to name the carve-out. The step may select itself to the `122-diff-guard` matrix entry (`if: matrix.context == '122-diff-guard'`, or the workflow's equivalent key), and it may deepen history for its own use (`fetch-depth: 0`, or an explicit fetch inside the step), chosen at build, provided no existing step's behavior is reduced.

---

## The fix

1. **`--ci`** (ballot § 4.1): links 1–3 over the PR's full range (`base.sha..head.sha`; on a branch dispatch, `merge-base(main, head)..head`), plus the full freshness sweep. Fails loud on shallow or unreadable history. Floor: when no commit in range touches `canonical/profiles/**`, prints `signing-chain: no signing paths in range — 0 rows (pass)`; otherwise prints rows checked and fails on zero. Prints "consistency, not identity".
2. **`--audit --pr N` / `--audit --branch <b>`** (ballot §§ 4.2–4.4): links 4–7 on every act; Stacy's lookup rule verbatim, with success decided from evidence and ambiguity → `anomaly`; one verdict per act from `anchored` · `unanchored` · `record absent` · `FAIL` · `anomaly`, link-numbered, never rolled up. Reads `refs/pull/N/head` and the harness store by `agent-<id>`, never a `/private/tmp` path. Never blocks.
3. **Fixtures** (ballot § 4.5; **Stacy specifies, this build implements — any divergence from her specification is routed to her, never resolved in the build**): F1–F13, F12′, the clean `assent` and `refuse` controls, H1, H2a, H2b, H3. `npm run test:agent-generator` green.
4. **The CI-path bites**: F9, F10 and F11 recorded **red on the fixing PR's own CI runs** (throwaway commits, reverted before ready), with run URLs in the PR body.
5. **The register row** `signing-act-consistency`'s `--ci` scope flips `proposed` → `armed` **in the same PR**, as a dated history line citing the bite runs. *(The row lives in `governance/classification-map.md`, a governance-law path this grant cannot reach; the flip is authorized by the ratified ballot § 4.1, not by this issue, and the PR carrying it is Peter-merged — U2b's unit PR is in any case. If the flip does not ride the fixing PR, the row stays `proposed`. The ballot's binding condition: a step without its bite evidence never reads `armed`.)*
6. `npm run check:122:diff-guard` → `full-run-green`, lock refreshed.

---

## Criterion (decidable without consulting the author)

- `git diff --name-only <U2b base>..<fixing-PR head>` ⊆ the grant paths above, plus `governance/classification-map.md` only if step 5 rides (authorized by the ballot, not this grant).
- **Additivity**: in `git diff <base>..<head> -- .github/workflows/agent-generator.yml`, every removed line is either a header-comment line (the C6 carve-out wording) or the checkout step's `fetch-depth` line (if that form is chosen), and the PR body names each one; every pre-existing step remains, with its `if:` unchanged.
- The new step has no `noop` condition: `git grep -n 'verify-signing-chain' -- .github/workflows/agent-generator.yml` resolves to a step whose `if:` (if any) does not reference `noop`.
- `npm run test:agent-generator` green, with every fixture named in ballot § 4.5 present by id.
- F9, F10, F11: three red run URLs from the fixing PR's own CI, in its body.

---

## ARMING

A `.github/**` grant: per the CI-regime ballot § 3 clause 6, the extent finding is read at ARMING. **ARMING also fires at the fixing PR's merge as the arming of `signing-act-consistency`'s `--ci` scope** (Stacy): she reads the extent, the absence of a `noop` condition on the new step, the fixture set against her specification, and the three CI-path bite runs.

---

## Filed by

Thurgood, 2026-10-01, in the ballot PR for `2026-10-01-signing-act-chain.md` (one-time act 2).

# ARMING read: the `hermetic-publish-path` register row, armed at #355's merge

**Event**: ARMING, limb "a new barrier arms" (trigger row, `canonical/agents/stacy.md`; generated `.claude/agents/stacy.md` L186). The row's own pre-flip comment named this read ("ARMING read: Stacy, at the flip PR's merge"), and #355's history line carries it ("ARMING read: Stacy, at this PR's merge").
**What armed**: `governance/classification-map.md` § `hermetic-publish-path`, `check_state: proposed → armed`, `armed_at: tool-time`, three `checks[]`. Row owner **Ada** (the instrument); law text **Thurgood**.
**Authority**: ballot `2026-10-03-hermetic-publish-path` (RATIFIED, Peter, 2026-10-03), § 4 and § 9 F-4: arm at the first release run under the law. The vehicle moved from the step-6 release-record PR (#351) to a follow-up PR under Peter's 2026-10-14 ruling on RL-7's fork, option (a) (RELEASE claims pass 15.1.0, `completion/claims-pass-release-15.1.0.md` § RL-7). That ruling is recorded in the row's 2026-10-14 history line and carried by Peter's merge of #355 under the governance carve-out.
**Merge**: PR #355 (`chore/hermetic-publish-path-arm`). Squash **`2fe2c8906f647400cd9b67f99dd14a031e6d6c1f`**, committed 2026-10-13T23:20:37-04:00 (2026-10-14Z). The diff touches one file, `governance/classification-map.md` (+5/−12). `git show --name-only --format= 2fe2c8906 | grep -cE '^\.github/|verify-gate-registration|jest\.config|package\.json$'` → `0`.
**Reader**: Stacy · **Read date**: 2026-10-14 · **Tree read**: worktree `chore/hermetic-publish-path-arming-read`, HEAD `68cdbeea8` (#356, after #355). `git diff --quiet 2fe2c8906 HEAD -- scripts tools .github canonical governance package.json` is clean. The only file changed since the merge is `docs/releases/15.1.0/publish-verification.txt` (#356's erratum), which is part of the evidence read in § 4.
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.

---

## VERDICT: **ARMED, faithfully.**

- The `checks[]` are verbatim the strings pre-named in the 2026-10-03 flip comment.
- The three instruments exist at the merge and are unchanged since the evidenced release.
- The live evidence the flip condition requires is committed, including #356's erratum.
- Gate registration is unchanged at 19.
- Coverage-of-coverage is null, as pre-registered, for a structural reason.
- `completion-criteria-parity` is not dormant.

**Findings: none.**

## 1. Gate registration (`verify-gate-registration.sh`): **measured by the orchestrator**, not by me

The orchestrator ran it from the credentialed main checkout at this merge. Pasted result, as relayed:

```
PASS: all 19 required contexts present, count-asserted (N=19 recorded in this script)
```

I hold no credentials, so I did not run it. Cross-reads I did make:
- The merge touched no registration surface (the `0` above).
- `audit:coverage-map` independently reports `required contexts : 19 (verify-gate-registration.sh EXPECTED_CONTEXTS)` (§ 2).

## 2. Coverage-of-coverage (`npm run audit:coverage-map`): **measured by me**

**Pre-registered null** (stated in the orchestrator's notice before the run, and adopted here): PASS, with no new map row or column. The row's three checks are a repository script, a `package.json` lifecycle tripwire and a release-step record, which run at tool time. None is a CI context, and `CHECK_CONTEXTS` (`tools/agent-generator/coverage-map.ts` L63) holds required contexts only. The row's comment places the CI half (`test:pack-contents` in `lane-functional-root`, #281) outside this row. **The null therefore means "out of the map's surface class", never "covered".**

```
$ npm run audit:coverage-map        # exit=0
audit:coverage-map: PASS (surfaces PASS · lanes PASS)
  total surfaces      : 496
  guarded             : 495
  blank               : 1
  adjudicated-blank   : 1
    [adjudicated] canonical/generated.lock
  lanes (required-check steps vs local lane roots; sweep: audit:coverage-map:lanes): PASS
    required contexts : 19 (verify-gate-registration.sh EXPECTED_CONTEXTS) -> 20 job run(s) in 7 workflow(s)
    stale adjudications ...: (none)
```

- The figures are identical to the U4 baseline (496 / 495 / 1 / 1).
- `git status --porcelain` stayed empty after the run, so the generated maps are current.
- **The null held.**

## 3. `completion-criteria-parity` dormancy: **measured by me**

```
$ npx tsx scripts/check-completion-criteria-parity.ts        # exit=0
spec 123-consumer-distribution: 4 parent(s) unticked — not evaluated (no completion claim yet)
population: 155 tasks.md — 2 declared per-parent, 0 spec-level (skipped), 153 legacy (skipped)
SUMMARY: parents evaluated 30, pass 30, fail 0; emissions 0; reds 0
```

The checker is not dormant. It selects and evaluates a non-empty population (30 parents across the two declared per-parent specs, 123 and 127), as expected.

## 4. The row against the flip condition and the live evidence: **read by me**

| Condition (ballot § 4 / § 9 F-4) | Read | Status |
|---|---|---|
| `check_state: armed`, `armed_at: tool-time` | `git show 2fe2c8906:governance/classification-map.md`, row L886 onward | ✅ |
| `checks[]` = the three strings pre-named in the flip comment | Mechanical comparison: the pre-flip comment at `2fe2c8906^`, its wrapped lines joined, against the armed `checks:` line at `2fe2c8906`. `3 3 True`, with no per-item difference | ✅ |
| The instruments exist at the merge | `scripts/release-publish.ts` @ `762b8c209`; `.kiro/hooks/RELEASE-FLOW.md` @ `2a85df7fc` (step 6b at L158); `package.json` `prepublishOnly` (folder publish refused, L201) | ✅ |
| The armed instruments are the evidenced instruments | Both shas are ancestors of S (`e49359e49`). `git diff e49359e49 2fe2c8906 -- scripts/release-publish.ts package.json scripts/pack-assert.ts` is empty, and no `RELEASE-FLOW.md` commit lies in `e49359e49..2fe2c8906` | ✅ |
| It is the first release under steps 5–7 | 15.1.0: RELEASE claims pass RL-7 "Qualifies" | ✅ (cited, not re-derived) |
| 5.3 ran through the script, at the tag | #356 erratum, `publish-verification.txt` L111: `npx tsx scripts/release-publish.ts 15.1.0 --expect-sha e49359e49dc338078669a90aa5b37aa2436b60a4`. `git rev-parse 'v15.1.0^{commit}'` → `e49359e49dc338…` = #346's squash | ✅ |
| 6a rail PASS, with the full record | L40–42: `PASS … exit code: 0`. #356 (L96–107) pastes the earlier `FAIL[version] … exit code: 10` run, read against the packument per step 6 and not retried blindly | ✅ (with #356) |
| 6b: four sha1s equal the 5.3 record | L49, L57, L71/L76, L79: npmjs `dist.shasum` and fetched bytes, GitHub Packages `dist.shasum` and fetched bytes, all `f4dd5caa2f2801633cf351b8f3ffaaa94f7ff620`. 1673 files on both registries. L89's summary matches | ✅ |

## 5. Findings

**none.** Two-route rule: no remediation route fires, and no standards item is newly raised. Three things I read and did not count as findings:
- **The ballot's § 4 text still names the release-record PR as the flip vehicle.** F-4 was a one-time act, now discharged through a different vehicle by Peter's ruling, and the register's history line records that. It is not live law that will mislead a later reader. The class behind it is already open as RS-13 (Thurgood, with Peter).
- **Ada's confirmation of the conditions** is relayed in the orchestrator's notice. I did not read it at first hand (it is in the PR body). **Unverified, not refuted.**
- **The row's HONEST REACH stands as written.** A publish with `--ignore-scripts`, or of a tarball the script did not produce, is not caught before publish; 6b catches it after. Arming does not widen that reach, and this read does not claim it does.

## Method

- Sample: the whole population, which is one row, three `checks[]`, three instruments and one evidence file. **1 of 1.**
- Measured by me: § 2, § 3, § 4.
- Measured by the orchestrator: § 1 (credentialed).
- Platform rows: none. The evidence is registry and tarball bytes, not a platform toolchain.

**Standards implications: none.** RS-13 is already routed and is unchanged by this read.

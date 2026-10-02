# Task 13.7 Completion — Author ballot B-U2 (counting block + L686); Stacy's review; record-first

**Spec**: 123 — Consumer Distribution · **Unit**: U2b · **Parent**: Task 13 · **Agent**: Thurgood (Opus). Stacy reviewed in her own seat.

**CI-provenance**: local

**Write scope**: `.kiro/docs/ballots/2026-09-28-123-b-u2.md` is on Task 13's Primary Artifacts list. **Out-of-list, disclosed**:
- `.kiro/docs/ballots/README.md`: the "Ballots on record" entry, added by the ratifying session per the B-U1 / B-CI precedent.
- `.kiro/issues/2026-09-28-full-survival-assent-signal-instrument.md`: the gap-line issue, directed by Peter's F-3 ruling.
- The five F-1 errata: `tasks.md` L127 and L129, `design.md` L832, requirements L391 and L400. These are inside Thurgood's charter scope (`.kiro/specs/**`); the ballot ratifies them.

## What changed

**The ballot** is `.kiro/docs/ballots/2026-09-28-123-b-u2.md`, final at **`9ad0b3b6`**. It carries two measures:
- **M1**: the claims-pass counting block gains **re-grounding dispositions**:
  - the `no-consumer-counterpart` rate (a state metric, baselined at the first render);
  - the per-signer assent rate and the refusal count (event metrics, which skip the first render), counted from history per signature event;
  - a named, per-signer spot-check fraction, in which Peter samples Stacy-signed assents;
  - a gap line that counts nothing, for the not-yet-instrumented full-survival assent signal.
- **M2**: the `package-name-scope-drift` rule drops `product-template/` and adds `governance/`. It is applied at 17.3, and its rule↔`SCAN_DIRS` check becomes a standing test in Task 17.

**The rounds, all recorded in the ballot's § 7**

| Round | Commit | What |
|---|---|---|
| Draft | `28e671e8` | Two forks (F-1, F-2) |
| `[STACY R1]` | `179ecdcd` | ACCEPT-WITH-CHANGES, C1–C10 |
| `[THURGOOD R2]` | `de399cf0` | All ten folded; F-3 surfaced |
| `[STACY R2]` | `8f9bec83` | CONFIRM-WITH-AMENDMENTS, A1–A7 |
| `[THURGOOD R3]` | `9c1bf86a` | All seven applied as quoted |
| **Ratification (record-first)** | **`8ef106ac`** | `**Status**: **RATIFIED (Peter, 2026-09-28)**`; § 4 § "Rulings (Peter, 2026-09-28)"; README entry |
| `[STACY R3]` / `[THURGOOD R4]` | `8a18e969` | Both ratification-time sentences amended; condition (1) discharged |
| `[STACY R4]` / `[THURGOOD R5]` | `9ad0b3b6` | 13.8's lint remedy: the `volatile-ok` marker, with her reason text |

**The rulings (Peter, 2026-09-28)**:
- **F-1 = (a)**, per-metric, on Stacy's state-versus-event reading;
- **F-2 = (B)**, plus the standing parity test and a pointer for the workflow comment;
- **F-3 = (ii)**, with (ii′) declined, plus the gap line.

**The F-1 (a) errata**: one commit each. Each replaces its span as quoted and appends a dated note, and each commit is numstat 1/1.

| Erratum | Commit | Site |
|---|---|---|
| E-a1 | `0e68b60f` | `tasks.md` L127 |
| E-a2 | `89006304` | `design.md` L832 |
| E-a3 | `e9674812` | requirements L400 |
| E-a4 | `9b34c90d` | requirements L391 |
| E-a5 | `c494c40f` | `tasks.md` L129 |

**The gap-line issue** is `2396892a`; its quote was kept matching at `8a18e969`.

## Targeted tests + result

- `grep -cE '^\*\*Status\*\*: \*\*RATIFIED .Peter, 2026-09-28\)\*\*' .kiro/docs/ballots/2026-09-28-123-b-u2.md` → `1`, the pinned form.
- The ratification record precedes the measure's application: `git merge-base --is-ancestor 8ef106ac aca6b32d` (13.8's apply commit) → exit 0.
- Every erratum's Old span was confirmed unique at the unit head before replacement.
- `npm run check:completion-criteria-parity` after the errata → `SUMMARY: parents evaluated 15, pass 15, fail 0; emissions 0; reds 0`. After this tick, see the 13.8 doc.

## Application-time adaptations

1. **The ballot needed four review rounds and a post-ratification read.** Each ratification-time sentence was amended by Stacy before 13.8. Condition (1) was discharged at `[STACY R3]`.
2. **The After text failed `generate` at 13.8.** Its requirement-number citations tripped the volatile-fact lint's semver pattern. The remedy was a dated ballot erratum adding the lint's exemption marker, with Stacy's reason text (`9ad0b3b6`). **Standards learning** (carried to the parent doc's lessons): a ballot that edits `canonical/agents/**` should run its After text through `generate` in a scratch tree before ratification, and record the exit code.
3. **A self-correction.** My consult read before the ruling moved from (a) to (b) on F-1. Peter ruled (a) on Stacy's state-versus-event reasoning, and her read was the better one. My (b) read treated the no-counterpart rate like an event metric.
4. **The README entry and the issue file** are out-of-list; both are disclosed above.

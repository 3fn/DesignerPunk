# Peter's ruling: U11's two link-7 FAILs are redone on a fresh branch (g); four-fixes item 1 is pulled forward

**Recorded by**: the orchestrator. The time was taken from the clock at receipt (`date -u`).
**Context**: `verify-signing-chain --audit --pr 775` at `bf67fbb15` (U11, Spec 129 Task 16) read "11 act(s) — anchored 9 · unanchored 0 · record absent 0 · FAIL 2 · anomaly 0". Both FAILs are on link 7: Kenya's confirmation `c08bf6751` (`kenya.yaml#ios-theming-spec-094`) and her signature `300855cdf` (`kenya.dispositions.yaml#ios-theming-spec-094`), from the transcript `agent-a7bb346825d350209.jsonl`.

The FAIL is true, not a matcher artifact. After Thurgood's correction (`89aa1604d`) and Lina's second regeneration (`e10072c9d`), Kenya checked the corrected unit only by a script that compared it with her draft. She never printed the unit, or its rendering, whole. Her read before the correction was `grep -A12 | cut -c1-400`. Both of her records say she read the whole unit "through tool results", and the signature cites "L183–L192" from a one-line grep of the heading. Those sentences are false as written. Her hashes, her item checks and her 10-item ruling are sound.

## The exchange

1. **The orchestrator's decision brief** (this session, 2026-11-08) put two decisions.
   - **Decision 1** had three options:
     - (g) A fresh branch from `dc0acd632`, the last commit before her first failing act. Kenya prints each unit whole and redoes her four acts fresh. Data's branch is re-joined by merge, and the commits that sit on top of the failing acts are re-made by their authors. A new PR opens, and #775 closes as superseded. This needs no force-push and no § 4.6 exception.
     - (a) Accept the acts as script-checked, with an erratum.
     - (d) Re-cut and force-push #775 under a new one-off exception, as on 2026-11-01 (R11 line 18, `.kiro/issues/archive/2026-10-30-release-16-2-peter-rulings-and-delegation.md`).

     Stacy's (h), redoing the two acts on top of #775, fails `--ci` F5 because neither hash moves (Thurgood).
   - **Decision 2** asked whether to pull item 1 of `.kiro/issues/2026-11-05-signing-act-prevention-four-fixes.md` forward, before U12's signing acts. Item 1 is a verifier mode that prints the whole unit and its hash in one tool result.
   - **Consulted**:
     - Thurgood: the FAIL is true; (g) is lawful with no exception, provided the redone acts are fresh and not reruns of the old scripts, and `f8e32ffd2`, `8af746763` and `b04322499` are re-made by their authors and never merged in; pull item 1 forward. Surviving counter: (g) gets the exception's result without asking for one, and a green audit proves one printed line, not a read.
     - Stacy: two of Kenya's record claims are false; she leans to (g); (a) on an unmerged PR would make #606's merged-only fix the general one.
     - Kenya: she agrees her read claims are false and chooses (g).
2. **2026-11-08T12:20:05Z**, Peter: **"(g) and yes to item 1. 776 is merged"**

## What was ruled

- **(g)** for U11.
  - The new branch is cut from `dc0acd632`.
  - Kenya prints each unit, and each unit's rendering, whole, then makes fresh acts for `#ios-theming-spec-094` (confirmation and signature), `#in-scope` (signature) and `commands[platform-tokens]` (signature). She never reruns her old act scripts, and she runs `--audit --branch` before reporting.
  - Data's `task/129-16-data-sign2` (`4d36052ab`) is re-joined by merge, keeping its SHAs.
  - Thurgood's and Lina's subtask-doc commits and Lina's lock refresh are re-made fresh by their authors.
  - A new PR replaces #775, which closes as superseded.
  - The four superseded acts (`c08bf6751`, `2215d8861`, `300855cdf`, `67004532f`) stay at `refs/pull/775/head`, in J. Kenya's erratum record names them, with what she actually read.
  - No ref is rewritten, so § 4.6 of ballot `2026-10-01-signing-act-chain` holds unchanged.
- **Item 1, yes.** Thurgood builds the print mode in `verify-signing-chain.ts`, in his standing scope with no ballot, with Stacy's two fixtures, before U12's signing acts. The record's owner re-rules its item-1 Trigger citing this record. Items 2–4 keep their Trigger.
- **The brief practice**, the orchestrator's own and not ruled here: signing briefs copy the template's "print the whole unit" step verbatim, with no line ranges; they require a re-print after any change; and they require `--audit --branch` before reporting, stopping on any verdict that is not anchored.

---

## Addendum: #775 merged; (g) retired by Peter's (A′)

**What happened.** #775 (U11's first cut, head `bf67fbb15`) merged as `d74057506` at 2026-11-08T13:33:30Z. That brought the two link-7-FAIL acts to `main`: `c08bf6751` and `300855cdf`, both of whose records carry false read-claims. Peter, at about 13:34Z: "775 merged. 777 has conflicts", then "My mistake, sorry: 775 merged. 777 has conflicts". A merge never answers a ruling, so (g) stood until Peter re-ruled.

**The finding is the orchestrator's** (Stacy's read, accepted). After the 12:20:05Z ruling, #775 stayed open and green, with no "superseded" line and no hold marker. The class fix is the orchestrator's practice from now on: a PR that a ruling supersedes is closed, or turned to draft with a do-not-merge line, in the same turn as the ruling.

**Put to Peter** (orchestrator's brief, 2026-11-08):
- (A) Keep #775, with #606's treatment from R11 line 18: the two acts stand as script-checked, plus Kenya's erratum and a records PR.
- (A′) (A), plus Kenya's erratum citing her whole-unit prints on `task/129-16-theming-text-r2` as a later read, never counted as an act (Stacy).
- (B) Revert `d74057506` and land the second cut. Thurgood tested it: a plain revert fails `--ci` 39 times (link 3 once, link 2 thirty-eight times). A lawful revert costs about 22 seat acts, or an exception.

**Consulted**: Thurgood (leans (A); #606 fits; (B) costs about 22 acts). Stacy (leans (A) once Peter re-rules; offered (A′); places the finding on the orchestrator). The surviving counter: a mistaken merge overrode a dated ruling, and two known-false read-claims stay on `main` for good, at script-checked strength.

**2026-11-08T13:52:10Z**, Peter: **"let's go (A′)"**

**What was ruled.** (A′) retires (g):
- #775's 11 acts stand on `main`. Kenya's `c08bf6751` and `300855cdf` stand as script-checked, under the #606 precedent.
- A post-merge records PR carries:
  - Kenya's erratum, which quotes both false sentences, states what she actually read, and cites her later whole-unit prints on `task/129-16-theming-text-r2` (`7579a9124`, `9a91bec27`, and the transcript showing them) as a later read, not an act;
  - Task 16's completion-doc head-H rows: the four harness contexts from run 42476736031 at `bf67fbb15`, and `--audit --pr 775` kept at FAIL 2, citing the erratum and this record, never ✅;
  - this addendum.
- The second-cut branch `task/129-16-theming-text-r2` is abandoned and never merged. Its acts stay on that ref.
- Item 1 (the print mode) is unaffected and proceeds.

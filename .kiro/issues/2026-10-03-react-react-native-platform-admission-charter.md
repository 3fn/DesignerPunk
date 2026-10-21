# Platform Admission, React and React Native — SPEC CHARTER (Spec 128)

**Date**: 2026-10-03
**Type**: **CHARTER** — a directed spec with a named formalization trigger, opened deliberately at Peter's direction (sitting of 2026-10-02) rather than queued as an intention
**Authority**: Peter's direction statements, recorded verbatim in `.kiro/specs/128-react-react-native-platform-admission/inbound-from-react-rn-sitting-2026-10-02.md` § 1. **No ballot yet** — the identity ballot is the charter's first deliverable.
**Status**: **CHARTERED — not scheduled.** No build work is authorized. Outline drafting is permitted before the trigger; nothing lands.
**Owner**: **Thurgood** (formalization; identity ballot drafting). **Ada and Lina — designers** of the registry, emitter contract, and component expression. **Leonardo — adopter front door.**
**Trigger**: `manual` — the identity ballot is RATIFIED and Spec 128's outline round opens (the § 3 close event). The start event above (the v15.0.0 tag and the parity required-flip) is prose. Drafting is underway, but not on `main`. *(Back-filled 2026-10-20, Thurgood, rules 1 and 9, at the pulled-forward walk (Peter's go, 2026-10-20); ledger `archive/TRIAGE-2026-10-20.md`.)*
**Superseded trigger (back-filled 2026-10-20; verbatim)**: **the v15.0.0 tag is cut AND the completion-criteria-parity required-flip has merged** (ballot 70f8fe54) → Thurgood drafts the identity ballot and opens the outline round. Secondary trigger: Peter rules on the inbound's § 8 forks (or directs that they ride the outline round).
**Class**: P3 improvement · charter *(set 2026-10-20, Thurgood, rule 12. A directed spec charter, ranked 2 in `2026-10-18-spec-priorities-by-outcome.md`. It is not stale: its drafting is in progress.)*
**Grant paths**: none — this charter grants no write scope; formalization proceeds through the normal spec pipeline.

---

## 1. What is chartered

Adoption is the goal (Peter, 2026-10-02). React and React Native enter as platforms under an **admission rule with declared support tiers** and a **platform registry**; adopters create **tokens and components of their own shape**. The project is **not** split (P5 declined by all four owning seats); the front door and, later, the packaging are. Full record: the inbound; strategy altitude: `docs/roadmap/2026-10-03-react-react-native-platform-admission-roadmap-update.md`.

## 2. What the walk checks

- Has the trigger fired? If the tag is cut and the flip merged with no identity-ballot draft on record → finding.
- Are the § 8 forks still open with no ruling and no decision to carry them? → surface to Peter at the walk, not a finding.
- Have the incidental defects in inbound § 11 been routed to their owners? → unrouted after one walk = finding.

## 3. Closing

When the identity ballot is RATIFIED and Spec 128's outline round opens, record both here (dated) and `git mv` to `archive/`.

## Walk log

- 2026-10-20 (Thurgood): **the identity-ballot draft exists, and it was carried, not ratified.** It was drafted R0–R2 on 2026-10-20 (§ 2's walk finding is discharged).
  - Peter then ruled that the sitting stops and its work moves inside Spec 128, with no fork ruled. The draft now lives at `.kiro/specs/128-react-react-native-platform-admission/inbound-from-identity-sitting-2026-10-20.md`. The § 8 forks are open questions for the outline round, which satisfies the charter's secondary trigger ("directs that they ride the outline round").
  - **§ 3's closing condition no longer fits as written.** It reads "identity ballot is RATIFIED", but the Core Goals and charter changes now ride a later ballot that follows 128's outline rulings. I will re-rule § 3 when the outline round opens. Until then this charter stays at the root.
- 2026-10-21 (Thurgood): **the outline round is written to three user stories, not to the § 8 forks.** Peter stated them on 2026-10-21 and authorized the record: `.kiro/specs/128-react-react-native-platform-admission/inbound-from-peter-user-stories-2026-10-21.md` (§ 1 verbatim; § 2 the stories; § 4 where his words bear on F-2, Q4, the chooser question, F-3, the sequence and F-8 — by pointer, nothing ruled; § 6 four items open for Peter). § 2's second walk check ("§ 8 forks still open with no ruling and no decision to carry them") reads differently from here: the forks were carried on 2026-10-20 and are **inputs** to a round written to the stories; they are not the round's frame, and "still open" is no longer the state to surface. The two earlier inbounds keep their standing as inputs. **§ 3's re-rule stays owed at outline open** (my 2026-10-20 line): the stories change what the round is written to; they do not open it. The incidental defects (inbound § 11) check is unchanged by this line.

# Obligation: re-run the 16.1.0 Kiro conformance pair after the Kiro plan's credit reset (re-queued by Peter, 2026-10-25)

**Date**: 2026-10-25
**Status**: ACTIVE
**Owner**: **Leonardo** — the trio's operator and the protocol's owner. **Peter** launches every harness session (Decision 1, 2026-10-14).
**Trigger**: `manual` — the event is **the Kiro plan's 2026-11-01 credit reset**, which only the launcher's `/usage` screen shows. The re-run is owed in the first week of November 2026, after that reset. Start condition: a grant row for the records' paths, on the branch the candidate ruling below selects *(2026-10-25, Leonardo: the fork is ruled. Was: "Start condition: Peter's answer to the open fork below, and a grant row for the records' paths")*, (the 16.1.0 trio grant expires at the records PR's merge, `.kiro/issues/README.md` rule 8).
**Class**: P2 obligation (record) · owed-act *(set 2026-10-25, Leonardo, rule 12. Nothing is false at a reader: the two 16.1.0 records say `not run` with the reason. What is owed is the run.)*
**Source**: Peter, 2026-10-25, about 21:55Z, in chat, relayed by the orchestrator: **"Go with the last option, re-queue the Kiro pair for November"**. The option, as the orchestrator put it to him: "Release with four records and a disclosed gap. The conformance record is written as 'not run, plan credits exhausted' with a trigger carrying it to release 6." *Unverified here: chat only. Peter may confirm the relay on the PR; his words are committed in this record.* Filed under rule 10, in the PR that records the ruling (the 16.1.0 trio records PR, `chore/release-16.1.0-trio`).
**Grant paths**: none here. The November records need their own grant row, whose paths follow Peter's pick below.
**Consulted**: none needed — the operator's own instrument and records, under Peter's ruling.

---

## What is owed

The Kiro conformance pair (protocol § 15.3): identity probe consumer-Thurgood, identity probe consumer-Stacy, beat 1 (Thurgood, re-grounding tasks 1–5), beat 2 (Stacy, task 6), then step 12, recorded in the § 15.3 field set. 16.1.0's window ran steps 0–7 and 12 only: `tests/onboarding-trio/records/16.1.0/conformance-kiro-beat-1.md` and `-beat-2.md`, both `not run` for the probes and beats.

**Why it matters, measured**: both Kiro renderings changed since release 4 (`thurgood-prompt.md` 6 lines, `stacy-prompt.md` 54 lines, against `tests/onboarding-trio/fixtures/born-kiro/`; `conformance-kiro-beat-1.md` § `why-run:`). Until this runs, consumer-Thurgood and consumer-Stacy on Kiro have no behavioural run of this release's rendering.

## The candidate — RULED

**RULED (Peter, 2026-10-25, about 22:50Z, chat, relayed by the orchestrator)**: "Use the shipped tarball if it's out, otherwise the preview". That is (b) if 16.1.0 has shipped by the November window, and (a) if it has not. *Unverified here: chat only. Peter may confirm the relay on the PR; his words are committed in this record.*

**What follows, per branch of the pick** (read at the window, from whether a `v16.1.0` tag and its publish exist):
- **16.1.0 has shipped → (b), the shipped tarball.** A fresh founder's birth from the published `@3fn/core` 16.1.0 tarball, placed as `.pack/3fn-core-candidate.tgz` (the frozen prompts' release-neutral name, unchanged). Step 0 checks the tarball's sha1 against the publish record and S in place of F. **Records folder**: `tests/onboarding-trio/records/16.1.0-post/` (a 16.1.0 addendum, read as release 6's early Kiro pair; not 16.1.0's discharge, since its commit is not an ancestor of S). **Grant row paths**: `tests/onboarding-trio/records/16.1.0-post/**`, plus `tests/onboarding-trio/protocol.md` only if the launch blocks need the S/published-tarball step-0 variant.
- **16.1.0 has not shipped → (a), the preview candidate** (F `de63033b9`, sha1 `42515c34…`, the stored pack). **Records folder**: `tests/onboarding-trio/records/16.1.0/` (the two `conformance-kiro-beat-*.md` records are completed in place, with a dated note; they then merge before S as § 5.0 wants). **Grant row paths**: `tests/onboarding-trio/records/16.1.0/conformance-kiro-beat-1.md` and `conformance-kiro-beat-2.md`.
- Either way the folder name and the grant row are mine to file as owner (rule 10), in the PR that opens the November run.

*Was (2026-10-25, Leonardo, before the ruling):* "**Open for Peter**: which candidate does the November re-run use? The protocol does not say: § 5.0 places every run before S on a preview of F, and § 15.3 adds nothing for a run after S. No pick is made here.
- **(a) The same preview candidate** (F `de63033b9bfacb7da3e8fdd8a2b13538f2092a6a`, sha1 `42515c34784552f6d87453ac3e67dc033a773d19`, stored at `/Users/3fn/Documents/Work Projects/Kiro/u5-pack/16.1.0/`). Like-for-like with the four 16.1.0 records. If 16.1.0 has shipped by then, it measures a tarball consumers do not install.
- **(b) The shipped 16.1.0 tarball**, if 16.1.0 has shipped, through a fresh founder's birth (the prompts' release-neutral `.pack/3fn-core-candidate.tgz` name needs no change; step 0 checks the published tarball's sha1 and S in place of F). It measures what shipped. Its records are not ancestors of 16.1.0's S, so they read as release 6's early pair or a 16.1.0 addendum, not as 16.1.0's discharge.
- **Operator's lean, offered only as a lean**: (b) if 16.1.0 has shipped, (a) if it has not. The release PR's diff touches no rendering, so (b) loses little comparability.
- **What follows from the pick**: the records' folder (`records/16.1.0/` addendum or a release-6 folder) and the grant row's paths." *(End of the earlier text.)*

## Before the launch (the class fix, from the 16.1.0 runs)

- **Read `/usage` in the real profile before the window and record it** (the credits used and left, and the reset date). The 16.1.0 sitting met "Request quota exceeded" three times (`trio-2-designer` twice, `trio-3-pm` once) and stopped this pair. Peter's screen after the stops read "KIRO FREE", "Credits (43.79 of 50 covered in plan)", 87.6%, "resets on 2026-11-01". **Whether that ceiling or a request-rate quota caused the stops is not established**: 6.21 credits were left, and `trio-2-designer`'s third attempt succeeded later the same day (`conformance-kiro-beat-1.md` CK-1).
- The pair needs the most model calls of any run (probes 30 + 30, beats 120 + 60 turns of guard). It runs alone in its window, with nothing else drawing on the plan.
- The protocol's step-10/step-12 read of kiro-cli's conversation table (`trio-2-designer` R2-15) applies, so the beats' tool results can be read back.

## Walk

At each monthly health check, and at Leonardo's session start (Start Up Tasks item 9: a `manual` record is re-read against its prose): has the 2026-11-01 reset passed? If yes, has the pair run, or has Peter re-ruled? **Reset passed, no run and no re-ruling = finding.**

## Outcomes

*(appended by the owner)*

# Platform-Build Verification Harness — TOOLCHAIN CHARTER (candidate)

**Date**: September 17, 2026
**Type**: **CHARTER** — a candidate tool with named evaluation triggers and an evidence criterion, opened deliberately rather than queued as an intention (Peter's tracking ruling, 2026-09-17)
**Authority**: `.kiro/docs/ballots/2026-09-17-spec-127-outline-settle.md` § 5.4 (Peter addition (c) to the Q5 ratification) — RATIFIED (Peter, 2026-09-17)
**Discovered by**: **Lina**, R1 review of the Spec 127 design outline (carried Q5 item 2, "the platform-toolchain re-verification gap"), with **Ada** converging from the token-generation side
**Status**: **CHARTERED — not scheduled.** No build work is authorized by this charter; it is evaluated at the triggers below.
**Priority**: MEDIUM as an audit gap; **the consumer-facing gap it symptomatizes is the real problem** — see § 1
**Owners**: **Kenya (iOS) and Data (Android) — DESIGNERS of the harness.** **Ada and Lina — VERIFIED PARTIES** (their generated output is what the harness would compile)
**Explicitly NOT**: Kenya and Data do **not** become standing per-pass verifiers — § 4

---

## 1. Problem

**Nothing in this repository verifies that the Kotlin and Swift we generate actually compiles.**

The token pipeline emits `DesignTokens.ios.swift` and `DesignTokens.android.kt`; the component layer emits SwiftUI and Compose implementations. Every check that runs on a PR is a JS/TS check. No `swiftc`, no `xcodebuild`, no `gradle`, no `kotlinc` runs anywhere in CI or locally as part of any gate.

**The consumer-facing gap is the problem.** Generated platform code can be syntactically or semantically invalid — a reserved word used as an identifier, a malformed literal, a type that does not exist in the target SDK — and nothing in our process notices. It reaches a consumer's build, and the consumer's compiler is our first verifier.

**The audit gap is the symptom.** Spec 127 makes `Evidence` a mandatory cell and names "a command + its result" as one valid evidence kind. For two of three platforms, **"command + result" Evidence is trust-the-reported-result — for ANY verifier, not just the claims auditor** (Lina R1; recorded in the outline at § 4.1's Evidence-cell edge (2) and § 5.3's honest-reach obligation). A verifier who cannot re-run the command is grep-checking the claim's text. That is a real limit on the instrument and it is documented as one — but it is downstream of the fact that nobody compiles this code at all.

**Why "harness modules" and not "just compile the fragment."** The generated artifacts are **fragments, not buildable units**: a `.swift` file of token constants has no package manifest, no target, no scheme; a `.kt` file of the same has no Gradle module, no plugin block, no SDK level. Verifying compilation requires a **minimal host module per platform** that the fragment is dropped into and built. That is the shape of the work, and it is the reason this is a charter rather than a one-line script.

---

## 2. Interim posture (in force now — this is what we do until the charter is evaluated)

**(a) Method-line honesty.** Claims passes and completion-doc Evidence cells state **which platforms were re-verified and which were not**, per criterion. The claims-pass Method section (`pre-spec/q5-lifecycle-amendment.md` § 2.5, required section 3) already forces the sample to be named; the ruled per-criterion form is *"web verified / iOS not re-verified"* (ballot § 8). **An unverified platform claim is recorded as unverified, never rolled up into a ✅.**

**(b) Kenya's local spot-check recipe.** Kenya's host has Xcode. She documents and runs a local `swiftc` / `xcodebuild` spot-check recipe against generated Swift — a **recipe an owner runs on request**, not a standing obligation and not a gate. Its output is citable Evidence when it has been run.

**(c) Data checks Android SDK presence.** First step on the Android side is the cheaper factual question: is an Android SDK / `gradle` toolchain reachable on any machine we work from at all? The answer determines whether an Android spot-check recipe is even writable today, and it is a precondition for sizing the harness.

**The interim posture is honest, not adequate.** It makes the gap visible in the record rather than closing it. Recording it that way is the point: *a verifier who inherits an over-claimed instrument inherits the author's blind spot.*

---

## 3. Evaluation triggers (named, per the tracking ruling — whichever fires FIRST)

1. **First product spec kickoff.** A product spec puts real screens on real platforms and forces most of this infrastructure anyway (§ 6).
2. **A generator-emits-invalid-platform-code incident.** Any instance — found by a consumer, by a platform agent, or by an audit — of generated Swift or Kotlin that does not compile. One instance is enough to fire the trigger; it does not need a pattern.
3. **Post-campaign queue review.** The 125-B campaign-close queue review (§ 5).

**When a trigger fires, the charter is evaluated — not automatically built.** Evaluation asks: has the evidence criterion accumulated, has the first product spec already built the host modules, and is the harness now cheaper than the interim posture?

---

## 4. Ownership boundary (load-bearing — it protects the Q5 cut ratified the same day)

- **Kenya and Data DESIGN the harness.** They hold the platform toolchains and know what a minimal host module costs on their platform.
- **Ada and Lina are VERIFIED PARTIES.** Their generated output is the harness's input; they do not design the instrument that checks their own output.
- **Kenya and Data do NOT become standing per-pass verifiers.** They must not be enlisted to "just check the iOS claim" on each claims pass. **They build tools; the verifier verifies.** Turning platform agents into per-pass verifiers would muddy the boundary Q5 ratified on the same day — execution-claims verification has one owner, and it is not distributed across the platform roster by convenience.
- **The claims auditor never gains a platform toolchain by this charter.** If the harness exists, the auditor re-runs *the harness*, which is a normal command. That is the whole point of building a tool rather than granting access.

---

## 5. Evidence criterion and sequencing

**Evidence criterion**: **the count of unverified-platform claims accumulating in claims-pass Method lines.** Every pass that records "iOS not re-verified" or "Android not re-verified" against a platform-spanning criterion is one data point. The count is produced by work that happens anyway — no measurement project, no instrumentation, and it cannot be gamed by the party who would benefit from a low number, because the Method line is the auditor's own honesty clause.

**What the number decides**: a low count means platform-spanning claims are rare and the interim posture is proportionate; a rising count means the Evidence column is systematically carrying unverifiable cells on two of three platforms, which is the condition under which the harness earns its cost.

**Sequencing**: **post-campaign queue review.** This is not on Spec 127's critical path and must not be allowed onto it — the rule and the checker ship independently of whether generated Kotlin compiles. Nothing here gates the 127 ballot, the checker build, or the arming decision.

---

## 6. The honest deflation, recorded because it is an argument against building this soon

**The first product spec forces most of this infrastructure anyway.** A real iOS screen needs an Xcode project; a real Android screen needs a Gradle module. Once those exist, "does the generated token file compile" is close to free — it is a target that already builds, with one more file in it. Building a bespoke verification harness *before* the first product spec risks constructing throwaway scaffolding that the product work then duplicates or supersedes.

**The counter to that counter**: the gap is live **now**, on a package that publishes to npm and ships platform outputs to consumers today, and the first product spec has no date. Waiting means the consumer's compiler stays our first verifier for an unbounded period.

**Both are recorded. Neither is ruled here** — that is what the evaluation triggers are for.

---

## 7. Related records

- `.kiro/docs/ballots/2026-09-17-spec-127-outline-settle.md` § 5.4 — the ruling that opened this charter; § 5.5 — the tracking ruling that requires charters to carry named triggers and an evidence criterion
- `.kiro/specs/127-completion-claims-integrity/design-outline.md` § 4.1 (Evidence-cell edge 2), § 5.3 (honest-reach obligation), § 8 Q5 carried item 2 — where the gap is recorded on the spec
- `.kiro/specs/127-completion-claims-integrity/pre-spec/q5-joint-working-agreement.md` § 4.1 — the write-scope gap, the same class of capability fact
- `.kiro/specs/127-completion-claims-integrity/pre-spec/q5-lifecycle-amendment.md` § 2.5 — the claims-pass Method section that produces this charter's evidence criterion (PR #165, **merged 2026-09-17**)

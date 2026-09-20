# Spec Feedback: 123 — Consumer Distribution — Requirements

**Spec**: 123-consumer-distribution
**Artifact under review**: `requirements.md` (DRAFT, authored 2026-09-20 from the settled outline)
**Created**: 2026-09-20
**Spec author**: Thurgood

---

## Context for Reviewers

**What this is.** The requirements formalization of a **settled** outline. Peter merged PR #194 (`a062f44b`) on 2026-09-20 — **that merge was the formal settle act** — and authorized the requirements phase. These requirements **formalize the ruled record; they decide nothing and reopen nothing.**

**What this round is for**: **formalization fidelity** (does each requirement faithfully carry its ruling?) and **execution consequences** (what does implementing it actually cost or break?). **It is not a re-litigation surface.**

**26 requirements, mapped to the five declared units** — U1: 1–8 · U2: 9–14 · U3: 15–19 · U4: 20–21 · U5: 22–25 · cross-cutting: 26.

---

### SETTLED — do NOT re-litigate

**Sixteen decisions are closed.** Each is cited to its outline section; raise **execution consequences** freely, but the decisions themselves are not open. Full record: `design-outline.md` § 10 (the decision record) and `feedback/design-outline.md`.

| Ruling | Substance | Source |
|---|---|---|
| **R1** | Persona: solo technical founder (primary); reference-corpus (named secondary) | outline § 3.1 |
| **R2** | Public npm primary | § 3.2 |
| **R3** | The full agent org ships, with the consumer-generation-profile guardrail | § 3.3 |
| **R4** | Persona-embodied cold-user trio as the blocking bar | § 3.4 |
| **R5** | All eight agents ship; contract = subtraction **+ re-grounding** | § 3.5 |
| **R6** | Starter specs as curriculum; launch set of two | § 3.6 |
| **R7 / Q6** | **Package-consumed-primary + clone hatch** — conditions absorbed as named requirements | § 3.8, § 4.2 |
| **R8 / Q1** | The onboarding path is a formal requirement; *"five-minute" is philosophical, not literal*; **no truncation at a time boundary** | § 3.9 |
| **R9 / Q7** | Keep the GH-Packages dual-publish; the tax accepted knowingly | § 3.10 |
| **Q3 / Q4** | The cold-user bar · all eight charters | § 3.4, § 3.5 |
| **Q5** | **Filtered-by-derivation**, never a hand-curated second tree | § 7.3 |
| **Q8** | Lint rider in 123; the rename is **Lina's separate bounded issue** | § 4.5 (**Lina's call**) |
| **Q9** | **Shape (ii)** — profile as an emission dimension | § 7.1 |
| **§ 7.2 fork** | **FORK (B)** — buy section-granular provenance in U2, criterion pre-stated | § 7.2 |
| **Gate 4a** | **Banner the measured set**; corpus ships whole and MCP-served; banner **+ presence guard** | § 6.2 |
| **Gate 4b** | **STOP COPYING** — `init` drops the `governance/` + `.kiro/steering/` copy steps | § 6.2 |
| **Gate 5** | **One spec, five units**; ordering **unconditional** | § 9.3, § 9.1 |
| **`personal-note.md`** | Template-ized in U3; audit A10 dissolved | § 3.7 |

**Two consequences of those rulings that are also closed**: the **ordering conditional is DISCHARGED** (gate 4a was the "which way" it waited on — nothing prunes, so U1→U2→U3→U4→U5 is unconditional), and the **outline's own proposed split line is WITHDRAWN**.

---

### Your conditions are here, with your name on them

**Every reviewer condition from R1–R3 that survived became a requirement, and the requirement names you.** That is deliberate: *a condition that loses its author loses its reason.* If a requirement carries your name and has **drifted from what you meant**, that is the highest-value finding this round can produce — it is a fidelity defect, which is exactly what this round is for.

- **Ada** — Q6 conditions at **R1** (theme-authoring exports, C′ survival as an AC, floor-downstream-of-API) · the arbiter's package-mode gap at **R3.2** · the floor at **R4** · the `dist.tarball` candidate at **R6.8**
- **Lina** — catalog merge at **R2** · metadata floor at **R4.2–4.4** · the component-tree breakdown at **R4.5** · generator mechanics at **R14.1–14.3** · the reference sweep at **R14.5** · always-set as a class at **R12** · degradation at **R13** · Q9 shape and its counter at **R9** · the lint at **R8**
- **Stacy** — the re-grounding contract and its two falsification failures at **R11** · the pre-stated criterion verbatim at **R11.4** · C1/C2/C3/C4 at **R11.5, 11.6, 24.4** · the publish guard and its liveness detector at **R6** · the path/run/stop AC shape and the forbidden look-alikes at **R22** · trio preconditions at **R23.2** · the forced negative at **R25.5** · the tripwire firing rule at **R26.5**
- **Leonardo** — Product MCP wiring at **R7** · tool routes in the contract at **R11.3.5** · gate 4b's two surfaces at **R14.4** / **R20** · trio fixtures and the feasibility argument at **R23.3–23.5** · the populated-repo gap at **R19.3** · the no-init path and banner-serves-the-mode at **R15.3**, **R20.8** · P4 two-sided at **R17.4**

---

### Scope boundaries

**In scope for this round**: whether each requirement faithfully carries its ruling; whether acceptance criteria are verifiable; unit placement; execution cost and breakage; missing consequences of settled decisions.

**Out of scope**: the sixteen rulings · the `*.refs.ts` rename as 123 work (Lina's issue, out by her own call) · 125 Phase 3 · re-fixing F-C1/F-C2/F-C6 · the MCP infra-ring · a plugin contract · a benchmark harness · the Q6 release-manager retirement execution. Full list: `requirements.md` § "Explicit exclusions".

---

### Two things the author wants attacked specifically

1. **§ "What resisted translation to EARS grain"** (end of `requirements.md`) — **ten items** that did not become acceptance criteria, each with how it was handled instead. This is round input, not a defect list, and **a reviewer who thinks any of them needs an AC after all should say so.** The most consequential: the banner set's unenumerability (handled by re-measure-at-execution), the § 7.2 sign-off's *outcome* versus its *occurrence*, and the trio's recurring obligation being handed off rather than smuggled in.
2. **The open-inputs table** — six dated items with owners. **Nothing there is silent, and nothing there is pretended settled.**

---

### Three items owed IN this round, so they do not drift

- **[@LINA] The always-set application unit** (R12.3–12.4): defined as *prose member → the document's own top-level heading set; template member → the declared slot set*. **You scoped the class in and this should not be settled over you — confirm or correct it.** Stacy's attack 5 is what surfaced the gap: *"extends to the always-set" was an assertion without an application unit.*
- **[@LINA] The `*.refs.ts` rename timing declaration** (R8.4): the work is out of 123 by your own call, but its landing is **gated before U3 ships the install doc.** A declaration this round keeps the gate real.
- **[@THURGOOD → self] "Trivial"** (R11.6): a **non-binding candidate** is on the page — *a section is trivial with respect to its canonical counterpart if it carries none of the counterpart's operative content kinds: no obligation, no named procedure, no enumerated set, no route or command.* Deliberately relational and structural rather than a line count, so it cannot be satisfied by padding. **[@STACY] owes the exemplars it is falsified against** — not the author who wrote the threshold.

---

### Reviewers

**Lina** · **Ada** · **Stacy** · **Leonardo** — the same four, all REQUIRED. **Kenya and Data** are **not tagged for this round** but now have a **specific, measured question waiting at the tasks round** (R4.5: the 1.5 MB of `.swift`/`.kt`, where `dist` carries three files of each in total, so `src/` is the only rail platform sources reach consumers on).

**Write-safety convention**: reviewers **self-write** their own round entries in this file. Do not edit `requirements.md` or another reviewer's entry.

---

## Requirements Feedback

*(Rounds below. Stamp format: `#### [AGENT R#]`. Reference artifact sections with `§` and requirements by number. Directed questions go in the asker's own section as `[@AGENT] …`. **Scan and answer any `[@YOUR_NAME]` mentions before writing your own feedback** — Spec-Feedback-Protocol § "Mandatory @ Mention Scanning".)*

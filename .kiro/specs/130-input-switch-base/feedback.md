# Spec Feedback: Input-Switch-Base (the on/off switch, gap G1)

**Spec**: 130-input-switch-base
**Created**: 2026-10-17

---

## Design Outline Feedback

### Context for Reviewers
- **Scope of this round**: the outline only. No code, no scaffolding, no token created, no edit to the settings pattern, family docs, Input-Checkbox-Base or `canonical/**` rides this unit → design-outline.md § "Status" (header)
- **Lina's inbound is input, not a spec artifact.** Review the outline; the inbound is cited by section and is not itself under review → `inbound-from-lina.md` § header "Status"
- **Settled, not reopened**: a system switch, not a product one-off; interim = Input-Checkbox-Base + helper text (Peter, 2026-10-13, fork 1 (i)) → design-outline.md § "2. Settled decisions"
- **Settled, not reopened**: Form-Inputs family; size medium; Ada token co-owner → design-outline.md § "2. Settled decisions"
- **Settled by register law**: no disabled state, no "saving" lock → design-outline.md § "2. Settled decisions", § "4.2 What the switch must NOT inherit from Input-Checkbox-Base"
- **Settled by the author, open to R1**: name `Input-Switch-Base`; sibling primitive, not a variant → design-outline.md § "3. Name and inheritance"
- **Token candidates are proposals only**: each needs Ada's design and Peter's review before creation. Ada's read is folded and quoted: **C5 (on fill) and C6 (off outline) are NEEDED, measured** with the repo's `contrastRatio()`; C4 (off fill) is optional (fork P-10); C1–C3 sizing (fork P-11). The outline makes no 3:1 claim for the focus ring (a system defect) → design-outline.md § "6.1 EXISTING", § "6.2 CANDIDATE"
- **Corrections to the record** (ten, none silent; C-8 adjudicated by Ada, a Core Goals ballot owed) → design-outline.md § "9. Corrections to the record (none silent)"
- **Forks for Peter** (P-1–P-13; P-1–P-7 are Lina's F1–F7, P-6 rewritten on Ada's measurements; P-10–P-13 from Ada's read; P-9 and P-13 are the class-level options) — reviewers give reads, Peter rules → design-outline.md § "11. Open forks for Peter"
- **Your seat's questions**: Lina (§ 3, P-7, § 7.1, P-9) · Ada (a read on her own fold-in: § 6, C-8–C-10, P-6, P-10–P-13) · Leonardo (§ 4, § 7.2, P-2) · Kenya (P-1, P-2) · Data (P-1) · Sparky (§ 5.1, P-3, § 7.3) · Stacy (§ 10, optional this round) → design-outline.md § "12. Reviewers"

#### [PETER R0]
*Relayed. Peter answered in chat on 2026-10-18; the orchestrator relayed the answers and Thurgood recorded them. This entry is a record of what was said. It is not a ratification. Item 1 becomes law only through its ballot. Items 2 and 3 take effect as outline content when R1 incorporates them.*

- **P-1, rendering (Lina F1).** Peter: *"True Native Development does not necessarily mean True Native Design, and design needs to be able to part from native design to solve a product team's own user needs and branding."* He agreed this should become law through a short ballot, not stay a feedback line. The draft ballot is `.kiro/docs/ballots/2026-10-18-true-native-development-is-not-true-native-design.md`. P-1 itself is not ruled here. The ballot settles only that native look is not binding, so the choice between (b) and (c) stays open for R1. → design-outline.md § "11. Open forks for Peter" (P-1)
- **P-6 (the light-base on fill) and P-13 (sequencing against the contrast queue).** Peter: *"punt on accessibility issues for the time being; I'll need to consider a larger redesign to complement the maturation of DesignerPunk's development."* → design-outline.md § "11. Open forks for Peter" (P-6, P-13), § "6. Tokens"
- **R1 roster.** FULL: every impacted agent, with insight weighed over cost. → design-outline.md § "12. Reviewers"

Consequences Peter agreed to with answers 2 and 3:
- **(a)** Ada's measured failures are pinned on the contrast-queue record, `.kiro/issues/2026-09-12-semantic-contrast-adjudication-queue.md`, and the redesign becomes the new trigger. **Ada owns that pin.** It does not ride this spec. → design-outline.md § "6.2 CANDIDATE", § "11" (P-13)
- **(b)** The Spec 130 outline never claims 3:1 for anything that fails. → design-outline.md § "6. Tokens", § "9. Corrections to the record (none silent)"
- **(c)** The switch's own tokens are designed to pass now: an outlined off state and a theme-varying on fill. The system-wide fix waits for the redesign. → design-outline.md § "6.2 CANDIDATE" (C5, C6), § "11" (P-10, P-6)

#### [THURGOOD R1-prep]
- R1 opens when Peter says go, with the full § 12 roster. Reviewers read [PETER R0] first. The outline is not edited before R1, because incorporating these answers is R1's job. → design-outline.md § "12. Reviewers"
- R0 does not settle two items, and R1 asks Peter about them rather than inferring an answer. **P-10**: consequence (c) says "outlined off state", which reads toward (b), but it was given as a consequence, not as a ruling on the fork. **P-6**: the light-base value is still open. Both cyan400 and cyan500 pass on the canvas, but only cyan500 passes on a white200 surface. → design-outline.md § "11. Open forks for Peter" (P-6, P-10)

---

## Requirements Feedback

### Context for Reviewers
- [Populated by spec author before requesting review]

---

## Design Feedback

### Context for Reviewers
- [Populated by spec author before requesting review]

---

## Tasks Feedback

### Context for Reviewers
- [Populated by spec author before requesting review]

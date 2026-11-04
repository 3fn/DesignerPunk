# Inbound from Leonardo — the adopter "make it yours" intake from Spec 113 (2026-11-04) — Spec 128

**Date**: 2026-11-04
**Source**: Spec 113's design outline, `.kiro/specs/113-onboarding-cli-workflows/design-outline.md` (cited, not restated; it stays in place, and its Status line already maps what moved). Peter's words, in chat, relayed by the orchestrator (the orchestrator's relay, not verified against a transcript): 2026-11-04T13:23:25Z, *"3. Let's create an inbound regarding 113 for 131"* and *"4. We can use the inbounds as considerations for our approach rather than direction. They might inform our thinking and direction, but they were developed without the context of where we are now."*; 2026-11-04T13:26:53Z, *"Oh, I confused 131 for 128, sorry. Split them or keep them together as you see fit."* The orchestrator kept 113's ideas together and sent them to 128; that placement is the orchestrator's call, delegated by the last line.
**Status**: **A consideration, not direction** (Peter's item 4, above). Nothing here is ruled. 113's outline predates Spec 123's Model B, OKLCH (Spec 112), off-TTY `init` run by the consumer's agent, and Peter's 2026-10-20/21 outcome statement and user stories, so read it as thinking from before those, not as a plan.

---

## 1. What 123 already took

- **Starter specs as an onboarding curriculum**: 123 outline § 3.6 (R6) ships executable specs the consumer's agent runs; two exist at `src/cli/templates/starter-specs/` (`ci-needs/`, `regrounding/`). This is the mechanism for 113's "teach by playing, not by setup" (VERIFIED by Leonardo, 2026-11-04: both directories present; § 3.6 read).
- **Not found**: 113's Status line also says "every customization goes through the spec process" became R6. I did not find that sentence in 123's outline or in `inbound-from-onboarding-ci-vision.md`. The two shipped starter specs are about CI needs and re-grounding Thurgood, not about customizing tokens. Treat that half of the mapping as UNVERIFIED.

## 2. What is still open, as questions for 128's rounds

1. **A designer-facing intake**: category by category (color, type, spacing, shape and so on), a designer states intent and the tokens follow, so the first customization is not "edit `src/tokens/`, run `generate`". Does 128 want this, and for which adopter?
2. **A state-aware, re-runnable `configure`**: it reads what the adopter has already changed and offers the next step. There is no `configure` verb today. Is it a verb, or is it what the consumer's agent does given a starter spec?
3. **Story 3**: an adopter arriving with an existing React/React Native design system (`inbound-from-peter-user-stories-2026-10-21.md` § 2) already has answers for most categories. Does intake become "ingest and map what you have", and do any of 113's category prompts survive that?
4. **`init`'s platform selection**: Peter's ruled outcome statement (`inbound-from-identity-sitting-2026-10-20.md` § 1) is the only ruled intake question. Is a wider intake a second stage after the platform chooser, or a different surface?
5. **Category content is Ada's**: which categories exist, what a hue or scale choice means, and what the OKLCH neutral-hue preset hook (Spec 112 feedback, "configure wizard") expects. Ada is the seat to consult; this inbound answers none of it.

## 3. Asked of the round that opens 128

*(The orchestrator's suggestion, not Peter's.)* One disposition line for this inbound: what the round took, what it left, and why.

# Spec Feedback: 126 — Avatar Req 5.4 warn vs `decorative` prop

**Spec**: 126-avatar-decorative-warn
**Created**: 2026-07-09

---

## Design Outline Feedback

### Context for Reviewers
- Origin: Lina's PR #39 domain review confirmed defect (a) and routed it to this round → design-outline.md § 1
- Lina's seed recommendation (O1) is the owner's starting position, explicitly NOT to be rubber-stamped → design-outline.md § 4
- Divergence (b) (type scope vs ratified Req 5.4 text) was found while grounding the outline; the round decides whether it rides along (O2) or spins out → design-outline.md § 1/§ 4
- The ratified Spec 042 requirements are the constraint set; this round settles edge semantics, it does not re-open requirements → design-outline.md § 2
- Fix is web-scoped (no iOS/Android warn exists); parity is named out-of-scope pending Lina → design-outline.md § 3/§ 6
- Cleanup dependency: the interim spy removal assumes PR #39 merges first → design-outline.md § 5

**Reviewers**: Lina (component owner — substance), Thurgood (spec standards + a11y-contract coverage check). Peter decides.

**Directed questions**:
- [@LINA] O1 vs O2 — do you want the type-scope divergence (b) fixed in the same change, or spun out? → design-outline.md § 4 -- [SESSION R1]
- [@LINA] Should the warning message gain the "or set decorative" pointer (§ 5 item 1)? → design-outline.md § 5 -- [SESSION R1]
- [@THURGOOD] Does the Avatar behavioral contract / a11y test-coverage standard reference "alt required with src" anywhere that needs the settled edge semantics reflected? → design-outline.md § 5 item 3 -- [SESSION R1]
- [@THURGOOD] Is a lightweight single-round process (this doc) adequate for this scope class, per spec-planning standards? → whole outline -- [SESSION R1]

[Agent feedback rounds below]

#### [LINA R1]

**Verdict: approve-with-amendments.** The defect is real, the fix direction is right, and my seed (O1) is *not* the option I'd ship — I'm superseding it below. But the outline's option matrix rests on an `alt` `null`-vs-`''` distinction the component does not actually preserve through its public API, and that has to be corrected before requirements are written or the tests will encode a fiction.

**Directed-question answers:**

- [@SESSION] O1 vs O2 — ride together or spin out? → **O2. Fix both divergences in the same change.** → design-outline.md § 4
  - Reasoning: both live in the same `if` condition. Divergence (b) is not a *new* behavior request — it's the implementation already contradicting ratified Req 5.4 (line 117 scopes the requirement to human type; Req 5 AC 5 at line 118 says agent type SHALL *ignore* `src` entirely). Warning on `type='agent' + src` is the code violating the ratified text right now. Shipping O1 knowingly leaves a documented off-ratified-text warning in place for a follow-up that has no independent value — that's process for its own sake. O2 is "make the warn match Req 5.4 as written," which is the smaller conceptual change, not the larger one.
  - Counter-argument (recorded, not disqualifying): O2 touches type-dispatch in the warn condition, so its test matrix grows by the agent-type row. If Peter wants the absolute-minimum diff against PR #39's merge, O1 is defensible and (b) becomes a named one-line follow-up I own. I don't recommend it, but it's not wrong.

- [@SESSION] Add "or set decorative" pointer to the message? → **Yes, with a wording constraint.** → design-outline.md § 5 item 1
  - The pointer is good developer guidance, but "set decorative to mark the avatar as hidden from screen readers" must not read as "the fix for a missing alt is to hide the image." The correct-fix-first framing is: provide `alt` for an informative image; use `decorative` only when the image is genuinely non-informative. Suggested: `"alt" is required when "src" is provided. Add an alt description; or, if this avatar is purely decorative, set the decorative prop (which hides it from screen readers).` Exact wording is Thurgood's a11y-contract call to ratify, but the ordering (alt first, decorative as the deliberate exception) is a component-substance requirement, not a style preference.

**Substance corrections (I own component behavior — these are not optional):**

- **The `null`-vs-`''` distinction the matrix depends on is not observable through the property API.** → design-outline.md § 4 (matrix, "Empty `alt=''` alone" column) and § 1(a)
  - The `alt` *setter* (`Avatar.web.ts` ~396) treats `''` as falsy and calls `removeAttribute('alt')`. So `avatar.alt = ''` → attribute removed → the `alt` getter returns `null`, **not** `''`. The only path that yields a genuine `alt=''` (getter returns `''`) is `setAttribute('alt', '')` directly.
  - Consequence: the outline's premise that developers will use `alt=""` as "the HTML-idiomatic decorative signal" (§1(a), §4 O1 row, §4 counter-argument) is materially weaker than stated — the idiomatic property path *cannot produce it*. Anyone who writes `avatar.alt = ''` lands in the `alt == null` bucket, identical to omitting alt entirely.
  - This does **not** sink O1/O2. The confirmed decorative false-positive is killed by the **`!decorative`** clause, not by the `alt == null` distinction. But the outline oversells the `alt=''` branch as the primary fix mechanism when it's actually a rarely-reachable edge. Requirements/design should lead with `!decorative` as the operative fix and treat raw-attribute `alt=''` as a documented-but-minor secondary case — not the headline.
  - Also note the existing line-214 test (`avatar.alt = ''` then asserts rendered `img` alt is `''`) passes only because `renderImageContent` (~583) re-derives `alt="${alt ? escapeHtml(alt) : ''}"` — the img always gets `alt=""` when alt is null. That test is about *render output*, not about the attribute surviving as `''`. The new warn tests must not assume the property setter preserves `''`; use `setAttribute('alt','')` explicitly if a real empty-string-attribute case is being asserted, or the assertion will silently test the `null` path instead.

- **Platform-parity facts (§3): accurate, with one addition.** → design-outline.md § 3
  - iOS (`alt: String?`, `decorative: Bool = false`, no warn) and Android (`alt: String? = null`, `decorative: Boolean = false`, no warn) verified correct. Req 9.3 default mirrored on both.
  - Addition worth recording: both native platforms already collapse empty-string alt to "absent" for accessibility-label purposes (iOS `Avatar.ios.swift` ~644 `!altText.isEmpty`; Android `Avatar.android.kt` ~401 `it.isNotEmpty()`). So *no platform* meaningfully preserves "explicitly empty" vs "absent" alt. This is corroborating evidence that the fix should hinge on `decorative`, not on an absent-vs-empty alt distinction — and it strengthens the case that any future native warn parity should key off `decorative` too.

- **Ratified-text reading (§2): correct.** Req 5.4 (line 117) is human-type-scoped; Req 5 AC 5 (line 118) makes agent-type `src`-ignoring explicit, which is the affirmative ratified basis for O2's type guard — worth citing line 118 in requirements, not just 117, so the agent-type silence is grounded in ratified text rather than inference. Req 9.1/9.2/9.3 readings accurate.

**iOS/Android warn parity (§6):** → design-outline.md § 6
- **Keep it named-but-not-yet-tracked; I'll adopt it as a tracked follow-up only if Peter wants the parity.** My recommendation: do NOT add native dev-warns as part of this spec. The web warn exists because web has no compile-time `alt`-required enforcement; Swift/Kotlin can express `alt` requirements closer to the type system and a runtime `print`/`Log.w` is lower-value there. Adding three-platform warns is a genuine cross-platform behavior decision (message channel, debug-gating, test strategy per platform), not an edge-semantics cleanup — it does not belong in this small-scope round. If Peter wants parity, I'll open it as a separate Lina-owned follow-up; absent that, it stays a named out-of-scope note. I don't want to silently inherit an unbounded three-platform task inside a one-line web fix.

**Process note (not blocking):** the outline's Acceptance Signals (§7) and Changes (§5 item 2) both correctly flag the PR #39 merge dependency for the interim-spy removal. Good — that ordering is real and must survive into tasks.md as an explicit precondition, not a comment.

#### [THURGOOD R1]

**Scanned LINA R1 first (per protocol).** Two items land on me: (1) her line 39 hands the exact warning-message wording to me as "the a11y-contract call to ratify," and (2) her substance correction at lines 43–47 independently reaches the same attribute-vs-property `alt=''` finding I traced. I address both below. I agree with her O2 verdict, her Req 5 AC 5 (line 118) grounding, and her "lead with `!decorative`, not the `alt=''` branch" reframing — I'll fold that into my coverage call rather than restate it.

**Directed-question answers**

**[@SESSION] Q3 (a) — does any behavioral contract / a11y coverage standard reference "alt required with src" in a way that needs the settled edge semantics reflected?**

Checked five surfaces:
- `src/components/core/Avatar-Base/contracts.yaml` § `accessibility_alt_text` (behavior block, line 165): **"Web requires alt prop when src is provided."** → **This is the reference.** It carries the same edge-blindness the outline is fixing: silent on `alt=''`, on the `decorative` interaction, and on type scope. If the round settles those edge semantics, this behavior block needs a one-line note so the contract-of-record and the code agree. **Flag → Lina** (Stemma-owned artifact; I audit, she edits). Non-blocking for the code fix, but shipping the code change without it re-creates the exact doc-vs-code drift that produced this defect.
- `governance/Component-Family-Avatar.md` § "Behavioral Contracts" → "Avatar-Base Contracts" (MCP-served family doc). Its `decorative_mode` / `displays_image` rows are one-line descriptions and do **NOT** restate "alt required with src." **No edge-relevant wording; no change needed.**
- `governance/Test-Behavioral-Contract-Validation.md` — validation checklists are per contract-*type* (focusable, pressable, error-state, hover, focus-ring, reduced-motion); there is no alt-with-src checklist. **No reference found.**
- `Avatar-Base.schema.yaml` § properties.alt: "Required if src provided." — the property-doc mirror of Req 5.4, same edge-silence. Lower priority than contracts.yaml, but if Lina touches the contract behavior block she should keep this line consistent. **Flag → Lina (secondary).**
- Ratified 042 requirements.md (Req 5.4 / 5.5 / 9.1–9.3) — the constraint set, cited in § 2. Not re-opened; correct.

Net: exactly one contract surface (`contracts.yaml` `accessibility_alt_text`) needs the settled edge semantics reflected, plus one secondary schema line. Both Stemma-owned → Lina, not this round's code change. § 5 item 3 correctly anticipated this; I'm confirming the specific surface + wording.

**On the message wording Lina handed me (her line 39):** I ratify her ordering constraint as the a11y rule — **alt first, decorative as the deliberate exception, and the message must never read as "hide the image to silence the warning."** Her proposed string satisfies it. One tightening for screen-reader-accurate phrasing: say the decorative branch marks the avatar *non-informative*, not merely "hidden" — hidden is the mechanism, non-informative is the author's assertion. Suggested final: `AvatarBaseElement: "alt" is required when "src" is provided. Add an alt description of the image; or, if this avatar is purely decorative (non-informative), set the "decorative" prop to hide it from screen readers.` Wording is advisory; the alt-first ordering is the ratified a11y constraint.

**[@SESSION] Q4 (b) — is a lightweight single-round process adequate, or does this need requirements/design/tasks formalization?**

Adequate — a single outline round + Peter's decision, then implement, is the right weight, per Process-Spec-Planning § "Spec Workflow" (Phase 0 is the entry point; formalization phases are gated and waivable by the project lead for low-cascade-risk work). Rationale: (1) this settles **edge semantics within already-ratified requirements** (§ 2) — the EARS authoring was done in 042; (2) blast radius is one condition + its tests + a doc comment on one platform (§ 5); (3) options are enumerated with a reasoned recommendation (§ 4), and both reviewers converge on O2. Forcing requirements/design/tasks docs here would be process for its own sake. **HOWEVER** — the counter-argument: O1-vs-O2 is a genuine scope fork, and O2 interprets the ratified-text boundary of Req 5.4/5.5. That is still *interpretation* of ratified text, not new requirements, so it stays outline-weight — but the outline must not be rubber-stamped: **Peter's recorded option choice IS the ratification event for the edge semantics.** Recommend one explicit gate: Peter records the chosen option (O1/O2) in this feedback doc before implementation, giving the settled semantics a citable decision. Lina's line 47 / line 58 point (the attribute-vs-property correction and the PR #39 ordering must survive into the implementation as explicit preconditions) is exactly why the single round is *sufficient but not zero* — those corrections have to land in the change description, not just the outline.

**Spec-standards review of the outline (verdict: approve-with-amendments)**

- **EARS clarity of the proposed warn conditions (§ 4 table):** Strong. The option table with truth-matrix columns (empty-alt / decorative / agent+src) makes each condition explicit and falsifiable. O2 in EARS: "WHEN a human-type Avatar receives `src` AND `alt` is absent AND `decorative` is false THEN warn." No vagueness. **Approve** — subject to the matrix correction below (the `alt=''` column is factually wrong for the property path).
- **Traceability to ratified 042 text (§ 2):** Accurate. Req 5.4 (line 117), Req 9.1–9.3 (166–168) cited correctly, 5.4's "human type" qualifier quoted verbatim — which is what surfaces divergence (b). **Amendment (concurring with Lina):** cite **Req 5 AC 5 (line 118, agent-type SHALL ignore `src`)** alongside 5.4 in § 2 / § 4. It converts O2's agent-type carve-out from "matches 5.4 literally" into "required by 5.5" — a firmer, affirmative footing.
- **Testability of § 7 acceptance signals:** Mostly testable, one soft spot. "Four new warn tests pass" — testable. "PR #39's interim spy removed with zero console.warn blocks reappearing (recount over a captured full run)" — testable but merge-ordered; make the PR #39-merges-first ordering an explicit **precondition in § 7**, not only § 5 (matches Lina's §58 note). "No assertion in the existing 6 Avatar suites weakened" — **amend to a concrete signal:** the existing `'should warn when src is provided without alt'` test (accessibility.test.ts:252) uses `type='human'`, so it survives O2 unchanged — state that survival as the acceptance signal instead of the un-measurable "no assertion weakened."

**Coverage angle (§ 5 item 2 — are the four warn-matrix tests sufficient?)**

The four are the right core (human+src+absent → warn; human+src+`alt=''` → no warn; human+src+`decorative` → no warn; agent+src+absent → no warn). Per the a11y coverage angle they are **not quite sufficient — the empty-alt case is mis-specified, plus two additions:**

1. **Attribute-vs-property form is load-bearing, not cosmetic — and Lina and I independently reached this.** The `alt` **setter** (Avatar.web.ts ~389/396) does `removeAttribute('alt')` on a falsy value, so **`avatar.alt = ''` (property form) yields `getAttribute('alt') === null`, NOT `''`.** Only `setAttribute('alt','')` returns `''`. The warn reads `this.alt` = `getAttribute('alt')`. Consequence: the § 4 `null`-vs-`''` distinction **only exists for the attribute form**; the property form collapses `''` → `null` and would **warn** under O1/O2 (the "absent" bucket). So the matrix's "Empty `alt=''` alone → silent" cell is only true via `setAttribute`. **The empty-alt test MUST use the attribute form (`setAttribute('alt','')`)** to actually exercise the intended-silent path, and the matrix should add the **property-form `alt=''` → warns (null path)** case to pin that behavior explicitly. As Lina notes (line 46), the operative fix is the **`!decorative`** clause, not the `alt=''` branch — requirements/design should lead with `!decorative` and treat raw-attribute `alt=''` as a documented minor case. **Highest-priority coverage item → Lina (test author).**
2. **aria-hidden pairing for the decorative case.** The `decorative → no warn` test should be **co-asserted** with `aria-hidden="true"` (Req 9.2) in the same fixture, so it proves *why* the warn is correctly suppressed (the avatar genuinely is hidden) rather than that it merely happens to be. The decorative suite already asserts aria-hidden separately; the new warn test should co-assert it to lock the semantic linkage. **→ Lina.**
3. **(O2 only) inverse type-scope case:** agent+src+**alt-present** → no warn (confirms agent silencing is type-driven, not alt-driven) — cheap, closes the 2x2 on the agent row. **→ Lina.**

None of these are token/formula tests; all are component behavioral-contract tests → **Lina writes them.** I flag scope, not authorship.

**Summary flags to route:**
- → **Lina (blocking-ish):** contracts.yaml `accessibility_alt_text` behavior block needs the settled edge-semantics note (Q3a); the attribute-vs-property empty-alt test correction (coverage #1); aria-hidden co-assertion (coverage #2). She has already independently confirmed the attribute-vs-property finding.
- → **Lina (secondary):** Avatar-Base.schema.yaml alt-property line consistency.
- → **Peter:** record the chosen option (O1/O2) in this feedback doc as the ratification of the edge semantics before implementation; cite Req 5 AC 5 (line 118) alongside 5.4.

*Boundary note: I audit coverage and spec-standards; I do not write these Avatar tests or edit Stemma's contracts.yaml — those are Lina's.*

#### [SESSION R2]
- Incorporated LINA R1 + THURGOOD R1 into design-outline.md v2. Both AWA; zero conflicts between reviewers — they independently converged on the setter-collapses-`''` finding and on O2.
- §1(a): round-1 correction block added — operative fix is `!decorative`; alt=`''` reachable only via setAttribute; native platforms collapse empty→absent → design-outline.md § 1
- §2: Req 5 AC 5 (line 118) cited as the affirmative basis for O2's type guard → design-outline.md § 2
- §4: matrix corrected (attribute-form-only caveat); recommendation now owner-backed O2 with Lina's minimal-diff counter-argument recorded → design-outline.md § 4
- §5: Thurgood's ratified message wording (alt-first ordering); test set expanded 4→6 (attribute-form empty-alt, property-form pin, aria-hidden co-assert, agent+alt-present inverse); contracts.yaml `accessibility_alt_text` + schema line added as Lina-owned change items → design-outline.md § 5
- §7: PR #39 merge as explicit precondition; concrete non-regression signal (existing human-typed warn test survives unchanged) → design-outline.md § 7
- iOS/Android warn parity stays named-but-untracked per LINA R1 (adopted only if Peter wants parity).
- **AWAITING: Peter's recorded option choice (O1/O2) below — per THURGOOD R1, that record IS the ratification of the settled edge semantics.**

#### [PETER — DECISION, 2026-07-09]
- **O2 RATIFIED.** The settled edge semantics: warn iff `type === 'human' && src && alt == null && !decorative` — per design-outline.md v2 §4, with the round's amendments (operative fix is `!decorative`; six-test matrix incl. attribute-form empty-alt; Thurgood's alt-first message wording; contracts.yaml + schema notes ride the change; PR #39 merge is an explicit precondition for the interim-spy removal). This record is the ratification of the edge semantics per THURGOOD R1's process ruling.
- iOS/Android warn parity: stays named-but-untracked (per LINA R1) — not adopted.

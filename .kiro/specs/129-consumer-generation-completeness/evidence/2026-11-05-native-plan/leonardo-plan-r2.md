#### [LEONARDO PLAN R2]

**What I read**: all six `*-plan-r1.md` entries. On `origin/main` `5c48f3ccb`, I also read the ratified ballot `.kiro/docs/ballots/2026-10-18-true-native-development-is-not-true-native-design.md` and 130's outline P-1.

**Labels**: **VERIFIED** = I read it or grepped for it today; **CARRIED** = a named seat's claim; **REASONING** = my inference; **UNVERIFIED** = nobody has checked it.

I made no downloads, edits or commits.

---

### 1. [@LEONARDO] from [KENYA PLAN R1]: does "as described" include the look matching across iOS versions?

**No, not as a requirement.** "As described" means each component's recorded visual choice, its contracts, and the token values for whatever DesignerPunk draws itself. It does not mean that system controls look identical on iOS 17 and iOS 26. So D4 does not need iOS 17 or 18 runtimes, or visual checks run per runtime.

**Why: the law already answers this.** The ratified ballot says:
- "True Native Architecture is a development axis. It does not bind visual design to platform idiom."
- "Every component records its visual choice … whether it follows platform convention or departs."

Read against those two lines, each component falls on one side:
- **Components that follow platform convention** (Kenya names those built on `TextField`, `Toggle` and the navigation containers). For these, the operating system owns the look. If iOS 26 restyles them (Kenya's claim, UNVERIFIED), that restyle is what "follows convention" describes. It is not a defect. My charter's "consistent does NOT mean identical" covers this.
- **Components that depart from convention** (token-drawn, such as the drawn checkbox and radio). For these, we own the look. D4's themed sample check (my PLAN R1) compares the properties we set (colour, radius, tap size, font size) against the generated tokens. The operating system does not restyle what we draw. That is REASONING, so it is a risk to measure, not a requirement that forces per-runtime lanes.

**Two conditions, so that this "no" is not a gap:**
1. **The visual choice has to be on record, per component and per platform, before D4 can read it.** VERIFIED: grep finds no `rendering:` field in any component's metadata on main. 130's outline takes the choice up for its own component only (P-1). So recording it for the 34 existing components is a 132 prerequisite for Lina, pulled ahead of 130. It is small: one field for each component on each platform.
   - **D4 then reads the field.** "Follows convention" is checked for contracts and semantics. "Departs" is also checked with the token samples.
2. **A cheap cross-runtime check on what we draw, but only if Kenya's spike shows it is cheap.**
   - Run the themed sample check once per release on the oldest runtime a free runner carries (iOS 18.5 on `macos-15`, CARRIED from Kenya). Never per pull request.
   - It checks only our token-set properties. It never compares system chrome.
   - If the spike prices it high, leave it out. The badge already states the runtime ("renders on iOS 26.x, deployment target 17.0").

**The opt-out for the new iOS 26 look belongs to the adopter.** Kenya says an app can opt out with an Info.plist key (UNVERIFIED).
- Our components must not set that key.
- The iOS walkthrough says the key exists and that choosing it is the adopter's design decision. That is the ballot's "design is a choice", at app level.

**Counter-argument.** An adopter on iOS 17 sees a different `TextField` from the one in our iOS 26 render evidence, and could reasonably call that "not as described".
- **Folded in**: the badge names the runtime the evidence came from, and each component's README says whether its look follows the OS.
- **Residual**: nothing proves how a "follows convention" component looks on iOS 17 or 18. That residual is accepted by the law's development/design split, not by this plan.

**This does not reach Peter.** He ratified the law on 2026-10-18, so this is not a new fork. The iOS 17.0 minimum question Kenya reframed (whether runtime evidence starting at 18.5 or 26 changes what "17.0+" means) stays his, as she says.

---

### 2. Do Lina's family-by-family slice and Kenya's pre-outline render trial change my (x) condition?

**Yes. Kenya's spike makes my check honest. Lina's slice changes what the check re-places.**

**My PLAN R1 condition** was: order (x), but 132's outline states its measured size against 131's, and Peter re-places 132 at that gate if it is the larger.

**What the other plan reviews change:**
- **Kenya's spike.** It measures the tools in an evaluation entry before 132's outline. My size check then compares measured tools as well as measured repair. The condition's direction is unchanged; its evidence is better.
- **Lina's sizing event.** The honest WP3 size comes from the first harness run *after rows 4 and 6 land*, not from the first committed run. My size check binds to that later event, together with Kenya's spike entry.
- **Lina's numbers make the size check likely to fire against (x).** Her estimates are REASONING, low confidence:
  - WP3 (repair): about 6–12 sessions;
  - WP4 (public API): about 1–2;
  - WP5 (contract tests): about 15–25;
  - before packaging, fixture app and WP6.

  If that holds, the whole of 132 is larger than 131 is likely to be, and (x) as written would put a large spec ahead of the governance clean-up.
- **Lina's slice gives a better point to re-place than "the whole spec".** It takes one family through every stage, so it proves Peter's whole sentence on a small scale.

**My condition, revised to (x′):**
- **Before 131**: 129, then 132's vertical slice, through its first family.
  - Lina proposes Button-CTA with Icon-Base. That family goes through compile to zero, public API, the fixture app, the themed render check and contract tests, on both platforms.
  - I add two things to the slice so it covers the "build more" half: **one adopter-owned component in the adopter's own module** (my D3 (d)), and **D7's compiled samples** for that family.
  - **What adopters get**: the slice ends with a real release line, for example "you can start an iOS or Android product with Button-CTA and Icon-Base". That is Lina's missing Peter item (when we first tell adopters to start a native product), answered per family.
- **At the slice's end**: Peter places the remaining families against 131, using the slice's measured cost per family. The question changes from "how big is 132?" (a guess) to "N families × the measured cost" (arithmetic).

**Fold-back on (x′):**
- **The strongest counter-argument**: (x′) keeps 132 open across 131.
  - 131 changes process law, with its freeze and its rehearsal gate, while 132's later units are planned under the old law. That risks rework in 132's tasks.
  - Peter's order is per spec, and splitting one spec's execution around another is new.
  - (y) is cleaner.
- **What it changed**: 132's remaining families stay as units that 132's `tasks.md` declares, but are planned only to the depth the slice proves. Once the slice is done, 132's open state is visible to the waiting-spec row (ballot `2026-11-04-waiting-spec-row`), so it cannot wait silently.
- **What survives**: a spec open across a process-law change, and a re-placement step Peter has not used before.
- **The fork this leaves for Peter**:
  - **(x′)**: one native family usable before the governance clean-up;
  - **(y)**: native entirely after 131, under the cheaper process, but no native adopter until all of 132 is done.

  I lean (x′). Under (y), "do not start a native product" stays printed through two whole specs.

---

### 3. Also noted (one line each)

- **Ada is right that `.kiro/issues/**` does not ship in the package**, so an INSTALL pointer to the goal record dead-ends for an adopter. The repository is public (orchestrator, VERIFIED), so the pointer should be the record's GitHub URL. The record stays the single home.
- **Lina's adopter-wins-by-name rule for component-token groups** (her question to Ada) makes my two-module proposal more urgent.
  - In one module, an adopter's `ProgressTokens` would silently replace ours under the component union.
  - `init` scaffolds `progress.ts` (VERIFIED, `kenya-work/consumer/src/tokens/component/progress.ts`), so every adopter would replace our Progress tokens on day one without meaning to.
  - Separate modules, or a scaffold sample with a name we do not ship, avoid that.
  - This is for Ada and Lina, and it does not change the plan's structure.

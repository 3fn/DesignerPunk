# Task 16 — Instruments block

**Written**: 2026-11-08T04:52Z (`date -u`), before subtask 16.1 · **PRIMARY**: Kenya (Sonnet), on unit branch `task/129-16-theming-text`, cut from `2d9944ba9` (`origin/main`, #768) · **Go**: Peter, "Proceed as you recommend", 2026-11-08T04:12:21Z (the link-4 audit fix merged as #769, `e7d82c377`, an ancestor of the cut) · **Seats**: Data (his charter and overlay text, a draft in a scratch file), Thurgood (the profile author: commits both charters' text and the overlay and operative-set wording, crediting the drafters; F12′), Lina (regeneration, lock refresh), Kenya and Data (each confirms and signs their own unit, after Lina's regeneration).

**Form**: Start Up Tasks item 8. **Sha convention**: the commit that last touched the path, as of `2d9944ba9`.
**Criteria** (Task 16's success criteria, `tasks.md` order): C1 Kenya's theming section states what item (i) emits on iOS · C2 Data's states it on Android · C3 both overlays and both operative sets drop "no theme surface today" and state what is emitted · C4 diff-guard green, lock a green run's · C5 re-confirmations (`canonicalHash` moves, records), signatures, `--audit --pr <n>` green, no authoring commit moves a `canonicalHash` · C6 `git tag --contains <U6 merge>` prints no release tag · C7 four harness contexts on the PR at head H.

| # | Criterion | Instrument | State | Fit | Dependent subtasks |
|---|---|---|---|---|---|
| 1 | C1 | what item (i) emits on iOS: the generated Swift (`npx tsx scripts/generate-platform-tokens.ts --out <dir>`) and `src/generators/native/ThemeEmitter.ts`, `src/build/product/emitters/SwiftEmitter.ts` | exists (@ `5a6a7f32b`) | the output at the cut carries `DesignerPunkTheme: Sendable`, `DPThemeKey`, `\.dpTheme`, `<Name>Themes`, `<Name>ThemeFamily` and the `<name>Theme(_:)` provider; read from the output, not from design § 4 alone. The harness prints `ThemeEmitter` output for custom themes only from U9, so the text names the four fixed instances and the registered-theme rule | 16.1 |
| 2 | C2 | the generated Kotlin and `src/generators/native/ThemeEmitter.ts` | exists (@ `5a6a7f32b`) | Data's to read; named so his draft cites it | 16.1 |
| 3 | C1, C2, C3 | `canonical/agents/kenya.md` / `data.md`, `canonical/profiles/consumer/<seat>.overlay.md`, `canonical/operative-sets/<seat>.yaml` | exists (kenya.yaml @ `261cd1a3c`; the others read at 16.2) | the units to replace are quoted verbatim in my draft | 16.1, 16.2 |
| 4 | C1, C3 | Kenya's draft, `scratchpad/u11/kenya-text.md` | built here (16.1) | old and new text for the charter unit, the overlay unit and the operative-set items, each item a verified substring of the new unit; four stale-text findings in other units listed for the orchestrator | 16.1 |
| 5 | C2, C3 | Data's draft, `scratchpad/u11/data-text.md` | MISSING → Data: briefed by the orchestrator at 16.1 | gates Thurgood's commit of `data.md`; nothing in 16.1 for Kenya depends on it | 16.2 |
| 6 | C1–C3 | the charter commit | MISSING → Thurgood: 16.2, on his own seat branch, from both drafts | F12′: Kenya and Data both sign in this range, so neither commits their own charter; the profile author, who signs nothing here, does | 16.2, 16.3 |
| 7 | C4 | `tools/agent-generator/diff-guard.ts`, `canonical/generated.lock` | exists (@ `669b51b09`, `e7d82c377`) | run at parent close; the lock is last on whatever `main` is when this PR is next, sequenced by the orchestrator (one lock-carrying PR at a time) | 16.3, parent close |
| 8 | C4 | Lina's regeneration of `canonical/_consumer-output/**`, `.claude/agents/**`, `.kiro/agents/**` | MISSING → Lina: 16.3, before any signature | generated, never hand-edited | 16.3 |
| 9 | C5 | `tools/agent-generator/regrounding/verify-signing-chain.ts` (`--ci`, `--audit --pr <n>`) | exists (@ `e7d82c377`, #769, the link-4 audit fix) | `--audit --pr` needs the PR number, so it runs after the PR opens: ⚠️ at head H | parent close |
| 10 | C5 | `governance/signing-seat-brief.md` § "The commit line", `canonical/profiles/consumer/confirmations/kenya.md`, `canonical/profiles/consumer/signatures/kenya.md` | exists (@ `e7d82c377`, `261cd1a3c`) | the commit form is `git commit -q -F - <<'EOF' && git log -1 --format='%H %s'`; each act is one fresh commit, no hash handed over | 16.3 |
| 11 | C5 | the confirmations and signatures | none for me beyond the seats' own acts at 16.3 | | 16.3 |
| 12 | C6 | `git tag --contains 5a6a7f32b` (U6's merge) | exists (command) | prints nothing at the cut | parent close |
| 13 | C7 | the four harness contexts (`gh workflow run native-harness.yml --ref task/129-16-theming-text`, and the PR's own runs) | exists (`.github/workflows/native-harness.yml` @ `1686fea35`) | run URLs and summary lines at head H are owed on the PR: ⚠️ | parent close |
| 14 | C1–C7 | `npm test`, `test:agent-generator`, the 122 diff-guard, `scripts/check-completion-parity*` (parity) | exists | run locally at parent close | parent close |

## Files I expect to touch outside Task 16's Primary Artifacts

Named before code:
- `.kiro/specs/129-consumer-generation-completeness/completion/**` and `docs/specs/129-consumer-generation-completeness/**`: the instruments, subtask, parent completion and summary docs.
- `canonical/profiles/consumer/confirmations/kenya.md` and `canonical/profiles/consumer/signatures/kenya.md`: the confirmation and signature records my 16.3 acts write. They are named by the criterion, not by the Primary Artifacts list.
- `canonical/_consumer-output/**` and `canonical/generated.lock` are Lina's.

## Roots naming `task-16-completion.md`

`.kiro/issues/2026-10-01-plan-blast-radius-and-carry-tracking.md` names `.kiro/specs/123-consumer-distribution/completion/task-16-completion.md`: Spec 123's, a different file. No root record names Spec 129's `task-16-completion.md`.

## Found later

- (none yet)

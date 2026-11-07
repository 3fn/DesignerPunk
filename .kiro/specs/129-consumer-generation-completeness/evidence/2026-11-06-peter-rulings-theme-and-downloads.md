# Peter's rulings, 2026-11-06 22:38Z: theme decisions and Task 4 downloads

**Recorded by**: the orchestrator (primary session). This is a record of a ruling, not law.
**Received**: 2026-11-06T22:38:12Z, from `date -u` at receipt.

## Peter's words, verbatim

> 4 combine, 5 U9, 6 (b), 7 yes; downloads approved

## What each word answered

These are the options as Peter read them in the orchestrator's message just before. The paraphrase is the orchestrator's. Only the quoted line above is Peter's.

- **4 combine.** The theme-instance rule, as Ada folded it, is adopted with all three safeguards:
  - one shared harness module that holds the rule for both probes;
  - exact-set emitter tests in Task 11;
  - a per-run check of the generated code against the probe's declared instances.
- **5 U9.** Config theme-name refusals land in U9 (Task 14). The affected configs are measured first, and Req 10.4 applies: either no supported consumer is affected, or the refusal ships at 17.0.0.
- **6 (b).** The generated provider gets a theme-choice parameter in 129, so a WCAG adopter keeps automatic light/dark switching. Kenya and Data shape it. This went against Ada's lean, (a).
- **7 yes.** The iOS probe reads product tokens, as Android's does, through a Task 3 amendment. Leonardo was consulted after the ruling and returned no objection, with conditions; the conditions are carried into amendment 3.
- **downloads approved.** Task 4's local Android toolchain may be downloaded into the session scratch folder, and the Android SDK License Agreement may be accepted. The list Peter was shown:

  | Item | Source | Size | Licence to accept |
  |---|---|---|---|
  | Temurin JDK 17.0.21 | Adoptium (GitHub releases) | ~180 MB | none (GPLv2 + Classpath Exception) |
  | Gradle 9.8.2 | gradle.org | ~135 MB | none (Apache 2.0) |
  | Android SDK command-line tools, `platforms;android-36`, `build-tools;36.0.0` | dl.google.com | ~300 MB | **yes: the Android SDK License Agreement**, accepted via `sdkmanager --licenses` |
  | Maven dependencies (AGP, Kotlin, Compose BOM, etc.) | Google Maven, Maven Central, Gradle plugins | ~274 MB | none to click through |

  Peter was also told that the scratch folder is wiped at reboot and belongs to this session, so a later session may need the same downloads and his approval again. **The approval covers only this table.** Anything beyond it needs a new approval from Peter.

## Questions still open for Peter, not answered by this ruling

- Android cold-run counting, condition 3's Android clause.
- Merging PR #700 (the stub workflow) and PR #701 (Stacy's grant-activation read).

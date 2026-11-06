# The Shipped `Icon-Base/platforms/android/res/drawable/README.md` Is a Non-Resource File Inside an Android Resource Directory, and the Resource Merge Rejects It

**Date**: 2026-11-05
**Filed by**: Lina, under rule 10, on Peter's words, received 2026-11-05T04:36:29Z (orchestrator relay): "Yes to all three follow-ups", the follow-up he read being "Lina files a record for the shipped `README.md` that breaks Android builds." The observation is Data's ([DATA R3], `.kiro/specs/129-consumer-generation-completeness/feedback/design-outline.md` § "Q5 recommendation round", the first of "three things that block C beyond B"). Ada's class note is `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/ada-plan-r1.md` § 2d. Read at `45f5262ee`.
**Owner**: Lina (the file and the component directory). **Verifier**: Data (Android resource merge). **Class fix consulted, not decided**: Ada (`scripts/pack-assert.ts`, her scope).
**Class**: P1 consumer-blocking · defect *(set 2026-11-05, Lina, rule 12. The rule-12 reading: a shipped file that stops an adopter's Android build is consumer-blocking by definition, and the two sibling native records, `2026-10-24-android-component-unit-type-mismatches.md` and `2026-11-04-progress-bar-native-theme-reads-malformed.md`, are classed P1 on the same reading. No native adopter is supported today: `docs/consumer/INSTALL.md` says Android ships as reference source, not a build input, and that there is no Gradle module. So no reader is misled about it building, which keeps this out of P0, and nobody on a supported path is blocked today, which is the case for P2 or P3. I took P1 for consistency with the siblings, so that the three native defect records class alike; the owner may re-class by a dated line, and Peter may overrule.)* *(Confirmed 2026-11-05, Lina, on Peter's words, received 2026-11-05T04:41:33Z (orchestrator relay): "Yes, pin now; keep 655 at P1". He had read the P1 class with the P2 and P3 counter-case in this record. Peter confirmed P1; the class stands.)*
**Trigger**: `path:harness/**` — the first commit that adds the native build harness (Spec 129's or 132's file that first builds the package in an adopter shape), where this record is closed or re-ruled. *(Set 2026-11-05, Lina, rules 1 and 9. The harness is the first thing that reads the packed install in place, which is how Data found the defect, so it is the event that owes the close: the README move must land before the harness's first Android run or that run fails before any Kotlin compiles. If the harness lands under another root, the owner re-rules this line by a dated reason.)*

---

## What is wrong

Data's observation, as his and **not reproduced here** (no Gradle, no Android SDK and no download in this seat; Data's R3 runs were `--offline` against his R2 caches): pointing an Android module at the shipped resource directory fails the build before any Kotlin compiles, because AGP's resource merger rejects a `README.md` in `res/drawable/` ("The file name must end with .xml or .png"). He reports that AGP's ignore pattern did not get around it, and that the defect shows only to a build that reads the *package*; the repo's tree is not the same input.

## What I verified (read only, at `45f5262ee`)

- **One non-resource file under any Android `res/` directory in the components**:
  - `src/components/core/Icon-Base/platforms/android/res/drawable/README.md`
  - `res/` exists in no other component's `platforms/android/` (`Icon-Base` only), and the directory's other 50 files are `.xml`. No other non-`.xml` file sits under any `res/`.
- **It ships.** `package.json` `files` carries `"src/components/core/**/platforms/android/res/**"` (L84), and no negation follows it, so the README is packed with the 50 drawables. Whether `npm pack` lists it I did not run; the `files` pattern reads as including it.
- **Nothing cites it by path.** A grep of `src`, `scripts`, `docs`, `governance` and `.kiro/steering` for `drawable/README` finds only the file itself. It was added in `c9e4d19f0` (Task 7, MCP documentation infrastructure) and has not been touched since.
- **The file is also stale as documentation, which makes the move cheap.** Its `Location` line names `src/components/core/Icon/platforms/...` (the directory is `Icon-Base`), and its tree lists 15 icons where 50 exist.

## Fix options

1. **Move the README out of `res/`** (Data's one line): to `src/components/core/Icon-Base/platforms/android/README.md`, which `files` does not ship (the `*.kt` glob does not match it; confirm at the fix). Rewrite its stale `Location` and tree in the same commit, or drop the file if its content is better carried by the component README. Lina's act, in her scope.
2. **Exclude non-resource files from the package**: a `files` negation `!src/components/core/**/platforms/android/res/**/*.md`. It leaves the README in the repo as it is, but it is a second pattern guarding one file, and it fixes no other file of the same shape.
3. **Both**, if the README stays in `res/` for a reason I have not found. I find none.

Option 1 fixes this instance. The class is Ada's note below.

## The class note (Ada, PLAN R1 § 2d), consulted, not decided

Ada's reading: packaging defects found only by reading the package are a class, and `scripts/pack-assert.ts` is where it gets fixed, with a rule that the packed native resource folders hold only resource files. She places it in her standing scope, about 0.25 session, in Spec 129 because it concerns what the package ships. `pack-assert.ts` already builds an `androidRes` list from the packed paths (L186), so the rule would extend an existing check.

- **Why I would take it**: it turns a one-off human-visible defect into a mechanical one, found by the instrument that reads the package. A second README added next year to another `res/` directory fails the pack, not an adopter.
- **What survives my own counter-argument**: the rule guards a surface (`res/`) that has one directory and one defect, built for a harness that does not exist yet; the harness itself would catch the same defect on its first Android run, so the rule is a second net under a net not yet cast. If the harness is the only reader that matters, the rule is redundant. The case for the rule is that it runs on every pack, not on a path-triggered job. That trade is Ada's and Peter's, and I do not decide it here.

## Close

Closes (rule 5) when the README is out of every shipped Android `res/` directory (option 1 or 2) and a pack lists no non-resource file there, with the outcome line dated in the fixing PR. If Ada's `pack-assert` rule lands, it lands under her own record or Spec 129's tasks, and this record cites it.

---

## Outcome (2026-11-06, Lina; rule 5)

Closed by option 1, in the PR on branch `fix/129-u1-preconditions-lina` (Spec 129's U1 precondition). `src/components/core/Icon-Base/platforms/android/res/drawable/README.md` moved to `src/components/core/Icon-Base/platforms/android/README.md`, with its stale `Location` line, its 15-icon tree and its "all 15 icon files" checklist item rewritten (the directory holds 50). Measured at the fixing commit with `npm pack --dry-run --json --ignore-scripts` (local, nothing downloaded; `--ignore-scripts` skips the `prepack` build, which does not feed the `src/**` `files` globs this record concerns): before the move the pack listed one non-`.xml` file under a `res/` directory (the README); after it, the pack lists 50 files under `res/`, all `.xml`, no non-resource file under any shipped `res/`, and no `.md` under `Icon-Base/platforms/android/` (the `*.kt` glob does not match it). The class fix, `pack-assert`'s native resource rule and its red case, lands in Spec 129's Task 1.3 (Ada), which this record cites and does not decide. Archived in the same PR.

# Prior findings for the 16.3.0 trio — the F25 disposition set

**For**: each of the three 16.3.0 persona records (`tests/onboarding-trio/records/16.3.0/trio-{1-backend,2-designer,3-pm}.md`), field F25 `prior-findings:`.
**Law**: `governance/release-management-system.md` § "The Release Recipe" step 6: a prior finding is "one the previous release's trio recorded and did not disposition `fixed-and-observed`; a `fixed-and-observed` finding is not carried again".
**The reading**: the stricter one, ruled for release 6 by Thurgood (2026-10-30; `prompts/16.2.0/prior-findings.md`) and kept: *a prior finding stays unless all three 16.2.0 records disposition it `fixed-and-observed`.* Over-carrying costs one disposition line; under-carrying loses a finding one persona still met.
**The set (computed 2026-11-08 by Leonardo from the 52 `- disposition:` lines in each 16.2.0 record, by script, and re-checkable by `grep`)**: the previous release is 16.2.0 (release 6). Its three records dispositioned release 5's 52. **1 of the 52 was `fixed-and-observed` in all three records** and is not carried: **R1-20**. **The other 51 are carried.** Release 6's trio also recorded **5 new findings**: R1-22, R1-23, R2-18, R2-19, R3-20. **Each record carries 56 lines** (168 in all).
**Join, conformance, product-query and probe-rerun findings** (J-, K-, C-, BD-, PQ-, P-) are out of this set, as before.

**Fix state is read at F**, from each finding's routed record at the records' base. Nothing here is pre-filled. A run that does not reach the site writes `not reached in this run — <why>`.

**Line form** (protocol § 8.2 F25): `- disposition: <id> — <fixed-and-observed|fixed-not-observed|still-present> — <basis>`. `still-present` for every finding no fix has reached, with the basis saying `observed: <evidence>` or `not reached in this run — <why>`. For a carried finding that a 16.2.0 record already saw `fixed-and-observed`, the basis names that record's observation as the prior evidence and says what this run saw.

## Carried from release 6 (51; not `fixed-and-observed` in all three 16.2.0 records)

The third column is the 16.2.0 dispositions: trio-1 · trio-2 · trio-3.

| ID | Finding (as recorded) | 16.2.0 dispositions |
|---|---|---|
| R1-1 | `init` breaks a TypeScript host's build (`@3fn/core/types` under the host's `moduleResolution`) | still-present · still-present · still-present |
| R1-11 | `--max-turns` accepted, not enforced (CC) | fixed-not-observed · fixed-not-observed · fixed-not-observed |
| R1-12 | committed `.claude/settings.json` ignored until trust; enablement asked separately, stored per clone | fixed-and-observed · fixed-not-observed · fixed-not-observed |
| R1-13 | fresh `HOME` unsafe for CC on macOS (keychain) | fixed-and-observed · fixed-not-observed · fixed-not-observed |
| R1-14 | `npm install` reports 37 vulnerabilities; attribution `cannot-tell` | still-present · still-present · still-present |
| R1-15 | `npx designerpunk init --help` runs `init` instead of printing help. | still-present · still-present · still-present |
| R1-16 | Consumer-Ada plans a brand colour through the part of the token source `generate` does not read, and does not say so. | still-present · still-present · still-present |
| R1-17 | Consumer-Ada closes a plain-words answer with governance law. | still-present · still-present · still-present |
| R1-18 | Consumer-Lina's markup links DesignerPunk's base tokens, not the founder's, and imports by a bare specifier. | still-present · still-present · still-present |
| R1-19 | The agent layer's size surprised the persona | still-present · still-present · still-present |
| R1-2 | default output `./dist/tokens` sits in the host's gitignored build output | still-present · still-present · still-present |
| R1-21 | Two cross-release confounds the protocol does not pin. | fixed-and-observed · fixed-not-observed · fixed-not-observed |
| R1-4 | "token", "primitive", "semantic" never defined | still-present · still-present · still-present |
| R1-5 | "product" vs "design system" blur at birth | still-present · still-present · still-present |
| R1-6 | the consumer's palette and theme maps are inert (`generate` reads them from the package) | still-present · still-present · still-present |
| R1-7 | `get_token_consumers` returns `[]` in a born consumer | fixed-and-observed · fixed-and-observed · fixed-not-observed |
| R1-8 | `find_components` ranks an internal-only scaffold first for "status indicator"; 11 of 15 `strong` | still-present · still-present · still-present |
| R1-9 | `Badge-Label-Base` has no status tone, variant or styling hook | still-present · still-present · still-present |
| R2-1 | INSTALL has no path for a page with no build step | fixed-not-observed · fixed-and-observed · fixed-not-observed |
| R2-10 | Kiro isolation: `KIRO_HOME` keeps the login; login database stays in the real profile | fixed-not-observed · fixed-and-observed · fixed-and-observed |
| R2-11 | The install's audit line is left for a beginner to judge alone. | still-present · still-present · still-present |
| R2-12 | Button-CTA is served as a submit button, and on the web it cannot submit a form. | fixed-not-observed · fixed-and-observed · fixed-not-observed |
| R2-13 | INSTALL § Web never says what to do with the founder's own `ComponentTokens.web.css`. | still-present · still-present · still-present |
| R2-14 | Consumer-Sparky points a recolour at the token source without the palette caveat. | still-present · still-present · still-present |
| R2-15 | `KIRO_HOME` does not isolate kiro-cli's conversations; they go to the real profile. | fixed-not-observed · fixed-and-observed · fixed-and-observed |
| R2-16 | The launch blocks went off-protocol in three places, and one of them cost a field. | fixed-not-observed · fixed-and-observed · fixed-and-observed |
| R2-17 | Two Kiro confounds the protocol does not pin. | fixed-not-observed · fixed-and-observed · fixed-and-observed |
| R2-2 | consumer-Sparky and the browser guide point at the base `tokens.css`, not the founder's `DesignTokens.web.css` | fixed-not-observed · fixed-and-observed · fixed-not-observed |
| R2-3 | a no-build page cannot load the module bundle from `file://` | fixed-not-observed · fixed-and-observed · fixed-not-observed |
| R2-4 | `init` gives a hand-written HTML site a TypeScript toolchain | still-present · still-present · still-present |
| R2-5 | the `.gitignore` `init` creates does not ignore `node_modules/` | fixed-not-observed · fixed-and-observed · fixed-and-observed |
| R2-6 | "restart your agent session" not concrete for Kiro | still-present · still-present · still-present |
| R2-8 | kiro-cli tags workspace-agent servers `[legacy]` | still-present · still-present · still-present |
| R3-1 | `init` hangs in an agent's shell instead of stopping | fixed-and-observed · fixed-not-observed · still-present |
| R3-10 | no provision for a session blocked on input | fixed-not-observed · fixed-not-observed · fixed-and-observed |
| R3-11 | `init` scaffolds jest/tsconfig into a near-empty repo; `.gitignore` misses `node_modules/` | still-present · still-present · still-present |
| R3-12 | `[legacy]` on every workspace agent's servers (also R2-8) | still-present · still-present · still-present |
| R3-13 | Persona (c)'s bare-`init` premise did not hold, so DD9 was not exercised this release. | still-present · still-present · still-present |
| R3-14 | Consumer-Leonardo built a web-only screen on a component that is a scaffold on web, without saying so | still-present · still-present · still-present |
| R3-15 | The composition tools pass an interactive card that contains a button. | still-present · still-present · still-present |
| R3-16 | The screen spec references a token that does not exist, and the Product MCP indexes it without a warning. | still-present · still-present · still-present |
| R3-17 | Two charter steps skipped on a Novel surface | still-present · still-present · still-present |
| R3-18 | The probe ran over its guard and then ended on Kiro's quota. | fixed-not-observed · still-present · fixed-and-observed |
| R3-19 | The operator's own session wrote into `/tmp` during this run | still-present · still-present · still-present |
| R3-2 | `init` ignores `--name=value` | fixed-not-observed · fixed-not-observed · fixed-not-observed |
| R3-3 | the DD9 notice offers `attach --target=kiro` before `init` fails for want of a name | still-present · still-present · still-present |
| R3-5 | consumer-Leonardo's write scope excludes `product/**` | fixed-not-observed · fixed-not-observed · fixed-and-observed |
| R3-6 | consumer-Leonardo skipped three charter steps (`subject: leonardo`) | still-present · still-present · still-present |
| R3-7 | kiro-cli transcripts show tool calls, not results | still-present · still-present · still-present |
| R3-8 | "MCP server" and "harness" never defined | still-present · still-present · still-present |
| R3-9 | the restart cannot be done from inside the session; nothing says what it means | still-present · still-present · still-present |

## New at release 6 (5; carried as prior findings for the first time)

| ID | Finding | Source |
|---|---|---|
| R1-22 | The install's audit line grew from 3 low to 24 (6 low, 18 moderate), and one moderate is in `@3fn/core`'s own dependency tree. | new at 16.2.0 |
| R1-23 | The package README puts the install steps after about 125 lines of philosophy. | new at 16.2.0 |
| R2-18 | Consumer-Sparky tells a no-build designer to open the page from `file://`, citing the UMD bundle, where INSTALL says to serve a no-build page over local HTTP. | new at 16.2.0 |
| R2-19 | Birth ran over its turn budget, unenforced: 49 of 40. | new at 16.2.0 |
| R3-20 | Consumer-Leonardo wrote 14 token names into a screen spec without one token query, and 5 resolve to nothing. | new at 16.2.0 |

## Not carried (1; `fixed-and-observed` in all three 16.2.0 records)

| ID | 16.2.0 dispositions |
|---|---|
| R1-20 | trio-1:fixed-and-observed; trio-2:fixed-and-observed; trio-3:fixed-and-observed |

**Line skeleton**: each record pastes all 56 and fills the value and basis, in the table order above. The schema check (§ 9) counts these lines: 56 per record.

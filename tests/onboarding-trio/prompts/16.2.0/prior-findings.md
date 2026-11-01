# Prior findings for the 16.2.0 trio — the F25 disposition set

**For**: each of the three 16.2.0 persona records (`tests/onboarding-trio/records/16.2.0/trio-{1-backend,2-designer,3-pm}.md`), field F25 `prior-findings:`.
**Law**: `governance/release-management-system.md` § "The Release Recipe" step 6: a prior finding is "one the previous release's trio recorded and did not disposition `fixed-and-observed`; a `fixed-and-observed` finding is not carried again". The protocol's F25 (§ 8) reads it over "the previous release's three trio records".
**The reading (dated)**: the recipe does not say how three records' dispositions combine. **Ruled 2026-10-30 by Thurgood, the ballots steward and the recipe sentence's owner, relayed by the orchestrator before 2026-10-30T17:45:48Z (my clock, `date -u`, at receipt)** (chat; *unverified here*, so Thurgood may confirm it on the PR): take the stricter reading. *A prior finding stays unless all three 16.1.0 records disposition it `fixed-and-observed`.* His reason, as relayed: over-carrying costs one disposition line next release, while under-carrying loses a finding one persona still met. The ambiguity in F25 and recipe step 6 goes to the RS queue for a later CORRECTION (Thurgood files).
**The set**: the previous release is 16.1.0 (release 5). Its three records recorded **21 new trio findings** (R1-15–R1-21, R2-11–R2-17, R3-13–R3-19), and dispositioned release 4's 36. **5 of the 36 were `fixed-and-observed` in all three records** and are not carried (R1-3, R1-10, R2-7, R2-9, R3-4). **The other 31 are carried**, including the 11 that only one or two records saw fixed and observed. **Each record carries 52 lines** (156 in all).
**Join, conformance, product-query and probe-rerun findings** (J-, K-, C-, BD-, PQ-, P-) are not trio findings, so they are out of this set, as at release 5.

**Fix state is read at F**, from each finding's routed record at the records' base. The 16.2.0 fix-nows land before F, so nothing here is pre-filled. A run that does not reach the site writes `not reached in this run — <why>`.

**Line form** (protocol § 8.2 F25): `- disposition: <id> — <fixed-and-observed|fixed-not-observed|still-present> — <basis>`. The rule for the closed vocabulary's gap is unchanged from release 5: `still-present` for every finding no fix has reached, with the basis saying `observed: <evidence>` or `not reached in this run — <why>`. For a carried finding that a 16.1.0 record already saw `fixed-and-observed`, the basis names that record's observation as the prior evidence and says what this run saw.

## Carried from release 4 (31; not `fixed-and-observed` in all three 16.1.0 records)

| ID | Finding (short; release 5's set) | 16.1.0 dispositions | Fix state at F | Can observe (release 5's column) |
|---|---|---|---|---|
| R1-1 | `init` breaks a TypeScript host's build (`@3fn/core/types` under the host's `moduleResolution`) | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | trio-1 birth (`npm run build`) |
| R1-2 | default output `./dist/tokens` sits in the host's gitignored build output | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | trio-1 birth |
| R1-4 | "token", "primitive", "semantic" never defined | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | trio-1 persona-close |
| R1-5 | "product" vs "design system" blur at birth | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | trio-1 birth and close |
| R1-6 | the consumer's palette and theme maps are inert (`generate` reads them from the package) | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | trio-1 probe-ada |
| R1-7 | `get_token_consumers` returns `[]` in a born consumer | trio-1:fixed-and-observed; trio-2:fixed-and-observed; trio-3:fixed-not-observed | read at F | trio-1 probe-ada, if she queries consumers |
| R1-8 | `find_components` ranks an internal-only scaffold first for "status indicator"; 11 of 15 `strong` | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | trio-1 probe-lina |
| R1-9 | `Badge-Label-Base` has no status tone, variant or styling hook | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | trio-1 probe-lina |
| R1-11 | `--max-turns` accepted, not enforced (CC) | trio-1:fixed-and-observed; trio-2:fixed-not-observed; trio-3:fixed-not-observed | read at F | trio-1 `num_turns` |
| R1-12 | committed `.claude/settings.json` ignored until trust; enablement asked separately, stored per clone | trio-1:fixed-and-observed; trio-2:fixed-not-observed; trio-3:fixed-not-observed | read at F | trio-1 open |
| R1-13 | fresh `HOME` unsafe for CC on macOS (keychain) | trio-1:fixed-and-observed; trio-2:fixed-not-observed; trio-3:fixed-not-observed | read at F | trio-1 preflight |
| R1-14 | `npm install` reports 37 vulnerabilities; attribution `cannot-tell` | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | every run's install output |
| R2-1 | INSTALL has no path for a page with no build step | trio-1:fixed-not-observed; trio-2:fixed-and-observed; trio-3:fixed-not-observed | read at F | trio-2 birth |
| R2-2 | consumer-Sparky and the browser guide point at the base `tokens.css`, not the founder's `DesignTokens.web.css` | trio-1:fixed-not-observed; trio-2:fixed-and-observed; trio-3:fixed-not-observed | read at F | trio-2 probe-sparky |
| R2-3 | a no-build page cannot load the module bundle from `file://` | trio-1:fixed-not-observed; trio-2:fixed-and-observed; trio-3:fixed-not-observed | read at F | trio-2 probe-sparky |
| R2-4 | `init` gives a hand-written HTML site a TypeScript toolchain | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | trio-2 and trio-3 birth (`init` output) |
| R2-5 | the `.gitignore` `init` creates does not ignore `node_modules/` | trio-1:fixed-not-observed; trio-2:fixed-and-observed; trio-3:fixed-and-observed | read at F | trio-2, trio-3 (`repo-status.txt`) |
| R2-6 | "restart your agent session" not concrete for Kiro | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | trio-2 close |
| R2-8 | kiro-cli tags workspace-agent servers `[legacy]` | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | trio-2, trio-3 (`kiro-mcp-list.txt`) |
| R2-10 | Kiro isolation: `KIRO_HOME` keeps the login; login database stays in the real profile | trio-1:fixed-not-observed; trio-2:fixed-and-observed; trio-3:fixed-and-observed | read at F | trio-2, trio-3 step 6 |
| R3-1 | `init` hangs in an agent's shell instead of stopping | trio-1:fixed-and-observed; trio-2:fixed-not-observed; trio-3:fixed-not-observed | read at F | trio-3 birth (bare `init`) |
| R3-2 | `init` ignores `--name=value` | trio-1:fixed-not-observed; trio-2:fixed-not-observed; trio-3:fixed-not-observed | read at F | trio-3 birth, if the `=` form is used |
| R3-3 | the DD9 notice offers `attach --target=kiro` before `init` fails for want of a name | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | trio-3 birth |
| R3-5 | consumer-Leonardo's write scope excludes `product/**` | trio-1:fixed-not-observed; trio-2:fixed-not-observed; trio-3:fixed-and-observed | read at F | trio-3 probe-leonardo |
| R3-6 | consumer-Leonardo skipped three charter steps (`subject: leonardo`) | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | trio-3 probe-leonardo |
| R3-7 | kiro-cli transcripts show tool calls, not results | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | trio-2, trio-3 probes |
| R3-8 | "MCP server" and "harness" never defined | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | trio-3 close |
| R3-9 | the restart cannot be done from inside the session; nothing says what it means | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | trio-3 close |
| R3-10 | no provision for a session blocked on input | trio-1:fixed-not-observed; trio-2:fixed-not-observed; trio-3:fixed-not-observed | read at F | any run with a blocked session |
| R3-11 | `init` scaffolds jest/tsconfig into a near-empty repo; `.gitignore` misses `node_modules/` | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | trio-3 birth |
| R3-12 | `[legacy]` on every workspace agent's servers (also R2-8) | trio-1:still-present; trio-2:still-present; trio-3:still-present | read at F | trio-2, trio-3 |

## New at release 5 (21)

| ID | Finding (short; the 16.1.0 record's bold line) | Axis, as recorded | Fix state at F | Can observe |
|---|---|---|---|---|
| R1-15 | `npx designerpunk init --help` runs `init` instead of printing help. | **toolchain mechanics** (surfaced in (a)) | read at F | trio-1 (site per `records/16.1.0/trio-1-backend.md`); confirm at freeze |
| R1-16 | Consumer-Ada plans a brand colour through the part of the token source `generate` does not read, and does not say so. | outside the axes (surfaced by the probe; R1-6's site) | read at F | trio-1 (site per `records/16.1.0/trio-1-backend.md`); confirm at freeze |
| R1-17 | Consumer-Ada closes a plain-words answer with governance law. | **design vocabulary** (low) | read at F | trio-1 (site per `records/16.1.0/trio-1-backend.md`); confirm at freeze |
| R1-18 | Consumer-Lina's markup links DesignerPunk's base tokens, not the founder's, and imports by a bare specifier. | outside the axes (surfaced by the probe) · class also seen in release 4's `trio-2-designer` (R2-2, R2-3) | read at F | trio-1 (site per `records/16.1.0/trio-1-backend.md`); confirm at freeze |
| R1-19 | The agent layer's size surprised the persona | outside the axes (low) | read at F | trio-1 (site per `records/16.1.0/trio-1-backend.md`); confirm at freeze |
| R1-20 | Two cells of the U5 findings record lag the code. | outside the axes (record) | read at F | trio-1 (site per `records/16.1.0/trio-1-backend.md`); confirm at freeze |
| R1-21 | Two cross-release confounds the protocol does not pin. | outside the axes (instrument) | read at F | trio-1 (site per `records/16.1.0/trio-1-backend.md`); confirm at freeze |
| R2-11 | The install's audit line is left for a beginner to judge alone. | **toolchain mechanics** | read at F | trio-2 (site per `records/16.1.0/trio-2-designer.md`); confirm at freeze |
| R2-12 | Button-CTA is served as a submit button, and on the web it cannot submit a form. | **toolchain mechanics** (surfaced by the probe) · class also seen in release 4's `trio-2-designer` (an unrecorded workaround) | read at F | trio-2 (site per `records/16.1.0/trio-2-designer.md`); confirm at freeze |
| R2-13 | INSTALL § Web never says what to do with the founder's own `ComponentTokens.web.css`. | **toolchain mechanics** (surfaced by the probe) · low | read at F | trio-2 (site per `records/16.1.0/trio-2-designer.md`); confirm at freeze |
| R2-14 | Consumer-Sparky points a recolour at the token source without the palette caveat. | outside the axes (surfaced by the probe) · **also seen in `trio-1-backend` (R1-16)** · low | read at F | trio-2 (site per `records/16.1.0/trio-2-designer.md`); confirm at freeze |
| R2-15 | `KIRO_HOME` does not isolate kiro-cli's conversations; they go to the real profile. | outside the axes (instrument) | read at F | trio-2 (site per `records/16.1.0/trio-2-designer.md`); confirm at freeze |
| R2-16 | The launch blocks went off-protocol in three places, and one of them cost a field. | outside the axes (instrument) | read at F | trio-2 (site per `records/16.1.0/trio-2-designer.md`); confirm at freeze |
| R2-17 | Two Kiro confounds the protocol does not pin. | outside the axes (instrument) · **also seen in `trio-1-backend` (R1-21)**, for Claude Code | read at F | trio-2 (site per `records/16.1.0/trio-2-designer.md`); confirm at freeze |
| R3-13 | Persona (c)'s bare-`init` premise did not hold, so DD9 was not exercised this release. | **agent-harness fluency** (instrument) | read at F | trio-3 (site per `records/16.1.0/trio-3-pm.md`); confirm at freeze |
| R3-14 | Consumer-Leonardo built a web-only screen on a component that is a scaffold on web, without saying so | outside the axes — **`subject: leonardo`** | read at F | trio-3 (site per `records/16.1.0/trio-3-pm.md`); confirm at freeze |
| R3-15 | The composition tools pass an interactive card that contains a button. | outside the axes (validator) — **`subject: leonardo`** | read at F | trio-3 (site per `records/16.1.0/trio-3-pm.md`); confirm at freeze |
| R3-16 | The screen spec references a token that does not exist, and the Product MCP indexes it without a warning. | outside the axes — **`subject: leonardo`** | read at F | trio-3 (site per `records/16.1.0/trio-3-pm.md`); confirm at freeze |
| R3-17 | Two charter steps skipped on a Novel surface | outside the axes — **`subject: leonardo`** | read at F | trio-3 (site per `records/16.1.0/trio-3-pm.md`); confirm at freeze |
| R3-18 | The probe ran over its guard and then ended on Kiro's quota. | outside the axes (instrument) · **also seen in `trio-2-designer` (R2-17)** | read at F | trio-3 (site per `records/16.1.0/trio-3-pm.md`); confirm at freeze |
| R3-19 | The operator's own session wrote into `/tmp` during this run | outside the axes (instrument; operator conduct) | read at F | trio-3 (site per `records/16.1.0/trio-3-pm.md`); confirm at freeze |

## Not carried (5; `fixed-and-observed` in all three 16.1.0 records)

| ID | 16.1.0 dispositions |
|---|---|
| R1-3 | trio-1:fixed-and-observed; trio-2:fixed-and-observed; trio-3:fixed-and-observed |
| R1-10 | trio-1:fixed-and-observed; trio-2:fixed-and-observed; trio-3:fixed-and-observed |
| R2-7 | trio-1:fixed-and-observed; trio-2:fixed-and-observed; trio-3:fixed-and-observed |
| R2-9 | trio-1:fixed-and-observed; trio-2:fixed-and-observed; trio-3:fixed-and-observed |
| R3-4 | trio-1:fixed-and-observed; trio-2:fixed-and-observed; trio-3:fixed-and-observed |

**Line skeleton** (each record pastes all 52 and fills the value and basis), in the table order above. The schema check (§ 9) counts these lines: 52 per record.

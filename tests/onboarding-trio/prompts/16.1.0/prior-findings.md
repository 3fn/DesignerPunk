# Prior findings for the 16.1.0 trio — the F25 disposition set

**For**: each of the three 16.1.0 persona records (`tests/onboarding-trio/records/16.1.0/trio-{1-backend,2-designer,3-pm}.md`), field F25 `prior-findings:`.
**Law**: `governance/release-management-system.md` § "The Release Recipe" step 6: "Each persona record of a release's trio carries one disposition line per prior finding — `fixed-and-observed` / `fixed-not-observed` / `still-present` — where a prior finding is one the previous release's trio recorded and did not disposition `fixed-and-observed`; a `fixed-and-observed` finding is not carried again."
**The set**: release 4 (16.0.0) recorded 36 trio findings (`.kiro/specs/123-consumer-distribution/validation/trio-1-backend.md` R1-1–R1-14, `trio-2-designer.md` R2-1–R2-10, `trio-3-pm.md` R3-1–R3-12) and dispositioned none of them, because it was the first run. So all 36 are prior, and **each record carries all 36 lines** (108 in all). This is the literal reading: "per prior finding" and "the previous release's trio", not "this persona's prior record". If Thurgood, who owns the recipe text, reads it per persona instead, the set shrinks to 14 / 10 / 12, and each record drops the other personas' rows. Nothing else changes.
**Join, conformance, product-query and probe-rerun findings** (J-, K-, C-, BD-, PQ-, P-) are not trio findings, so they are out of this set. PQ-1, PQ-2 and P-5 are closed by the protocol revision (§ 5.1, § 12) and get their own owner lines in `.kiro/issues/2026-10-15-123-u5-instrument-findings.md` § 4b.

**Fix state** below is read from `.kiro/issues/2026-10-15-123-u5-instrument-findings.md` at `2f971c4db`. **Re-read it at the records' base**: a fix merged between now and F changes the basis. "Can observe" is where the site sits in the protocol's runs. A run that does not reach the site writes `not reached in this run — <why>`.

**Line form** (protocol § 8.2 F25): `- disposition: <id> — <fixed-and-observed|fixed-not-observed|still-present> — <basis>`.

**The rule for the closed vocabulary's gap**: the three values do not separate "not fixed and seen again" from "not fixed and not reached". The record writes `still-present` for every finding no fix has reached. The basis says `observed: <evidence>` or `not reached in this run — <why>`. A carried finding a run never met is then not read as a re-observation. This is my instrument-level reading of the recipe sentence, not a change to it. It is flagged to Thurgood, the sentence's owner.

| ID | Finding (short) | Fix state at `2f971c4db` | Can observe | Expected basis if not reached |
|---|---|---|---|---|
| R1-1 | `init` breaks a TypeScript host's build (`@3fn/core/types` under the host's `moduleResolution`) | doc half fixed #375 (TypeScript-host paragraph); **code half carried** (Lina, CLI follow-up) | trio-1 birth (`npm run build`) | trio-2/3: no TypeScript host |
| R1-2 | default output `./dist/tokens` sits in the host's gitignored build output | doc half fixed #375; **code half carried** | trio-1 birth | trio-2/3: no `dist/` build |
| R1-3 | docs MCP writes `mcp-server/logs/` into the repo root | **fixed #405** (logs under `os.tmpdir()`) | every run's `repo-status.txt` | — (all three reach it) |
| R1-4 | "token", "primitive", "semantic" never defined | **carried** (next INSTALL touch; INSTALL unchanged since v16.0.0) | trio-1 persona-close | trio-2/3: persona does not meet the words on her axis, unless her close says so |
| R1-5 | "product" vs "design system" blur at birth | doc and code halves **carried** | trio-1 birth and close | trio-2/3: a studio and a product, no company-wide-system premise |
| R1-6 | the consumer's palette and theme maps are inert (`generate` reads them from the package) | doc fixed #375; **pipeline waived for 16.0.0**, rides Spec 129 PR 1 (`.kiro/issues/2026-10-15-123-palette-read-from-package.md`) | trio-1 probe-ada | trio-2/3: no token change is asked |
| R1-7 | `get_token_consumers` returns `[]` in a born consumer | **fixed #452** | trio-1 probe-ada, if she queries consumers | other runs: no consumer query in the task |
| R1-8 | `find_components` ranks an internal-only scaffold first for "status indicator"; 11 of 15 `strong` | **carried** (discovery study's find_components arm) | trio-1 probe-lina | trio-2/3: no status-indicator query |
| R1-9 | `Badge-Label-Base` has no status tone, variant or styling hook | **carried** (component-gaps record) | trio-1 probe-lina | as R1-8 |
| R1-10 | agents wrote outside the run folder (`/tmp`) | instrument: **fixed in protocol** (§ 10, step 10's `tmp-writes.txt`) | every run's step 10 | — |
| R1-11 | `--max-turns` accepted, not enforced (CC) | instrument: **fixed in protocol** (§ 4, observed not enforced) | trio-1 `num_turns` | trio-2/3: Kiro has no flag (§ 4) |
| R1-12 | committed `.claude/settings.json` ignored until trust; enablement asked separately, stored per clone | **closed by Task 26.5** (install-doc approval line) | trio-1 open | trio-2/3: Kiro, not CC |
| R1-13 | fresh `HOME` unsafe for CC on macOS (keychain) | instrument: **fixed in protocol** (`CLAUDE_CONFIG_DIR`) | trio-1 preflight | trio-2/3: Kiro |
| R1-14 | `npm install` reports 37 vulnerabilities; attribution `cannot-tell` | attributed (Ada, 2026-10-15); **remedy owed at 16.1.0 prep** (Ada's audit, cannot-tell record row 5) | every run's install output | — (count each run) |
| R2-1 | INSTALL has no path for a page with no build step | **fixed #375** | trio-2 birth | trio-1/3: hosts with Node tooling or nothing built |
| R2-2 | consumer-Sparky and the browser guide point at the base `tokens.css`, not the founder's `DesignTokens.web.css` | **fixed #378 + #375** | trio-2 probe-sparky | trio-1/3: no no-build page task |
| R2-3 | a no-build page cannot load the module bundle from `file://` | **fixed #375** (local-HTTP sentence) | trio-2 probe-sparky | as R2-2 |
| R2-4 | `init` gives a hand-written HTML site a TypeScript toolchain | **carried** (Lina, CLI follow-up) | trio-2 and trio-3 birth (`init` output) | trio-1: a TypeScript host |
| R2-5 | the `.gitignore` `init` creates does not ignore `node_modules/` | **fixed #372** | trio-2, trio-3 (`repo-status.txt`) | trio-1: the fixture has its own `.gitignore` |
| R2-6 | "restart your agent session" not concrete for Kiro | **carried** (next INSTALL touch) | trio-2 close | trio-1: CC; trio-3 as R3-9 |
| R2-7 | docs MCP writes `mcp-server/logs/` (also R1-3) | **fixed #405** | every run | — |
| R2-8 | kiro-cli tags workspace-agent servers `[legacy]` | **carried**, benign per Lina; trigger none (closes on a run that shows otherwise) | trio-2, trio-3 (`kiro-mcp-list.txt`) | trio-1: CC |
| R2-9 | the first open's capture was overwritten | instrument: **fixed in protocol** (a capture per session) | trio-2, trio-3 open | trio-1 reaches it too (CC captures) |
| R2-10 | Kiro isolation: `KIRO_HOME` keeps the login; login database stays in the real profile | instrument: **settled in protocol § 12** | trio-2, trio-3 step 6 | trio-1: CC |
| R3-1 | `init` hangs in an agent's shell instead of stopping | **fixed #372** (refuses off a terminal, names the flags) + doc #375 | trio-3 birth (bare `init`) | trio-1/2: flags passed, if they pass them |
| R3-2 | `init` ignores `--name=value` | **fixed #372** | trio-3 birth, if the `=` form is used | others: the `=` form not used |
| R3-3 | the DD9 notice offers `attach --target=kiro` before `init` fails for want of a name | **carried** (Lina; class option B) | trio-3 birth | trio-1/2: `--target` given |
| R3-4 | nothing a founder meets first points to INSTALL | `--help` fixed #372; **`init`'s output still does not name INSTALL — carried** | trio-3 birth | others: they open INSTALL from the package |
| R3-5 | consumer-Leonardo's write scope excludes `product/**` | **fixed #378** | trio-3 probe-leonardo | others: no Leonardo probe |
| R3-6 | consumer-Leonardo skipped three charter steps (`subject: leonardo`) | **no DesignerPunk route** (Stacy's CLOSEOUT cross-read) | trio-3 probe-leonardo | as R3-5 |
| R3-7 | kiro-cli transcripts show tool calls, not results | instrument limit; **cannot-tell record rows 3–4** (§ 12: session store, `/context show`) | trio-2, trio-3 probes | trio-1: CC keeps results |
| R3-8 | "MCP server" and "harness" never defined | **carried** (next INSTALL touch) | trio-3 close | others: off-axis, unless a close says so |
| R3-9 | the restart cannot be done from inside the session; nothing says what it means | **carried** | trio-3 close | trio-1: CC; trio-2 as R2-6 |
| R3-10 | no provision for a session blocked on input | instrument: **fixed in protocol** (`operator-unblock`) | any run with a blocked session | — |
| R3-11 | `init` scaffolds jest/tsconfig into a near-empty repo; `.gitignore` misses `node_modules/` | split: R2-4 half **carried**; R2-5 half **fixed #372** | trio-3 birth | trio-1: a TypeScript host |
| R3-12 | `[legacy]` on every workspace agent's servers (also R2-8) | as R2-8 | trio-2, trio-3 | trio-1: CC |

**Line skeleton** (each record pastes all 36 and fills the value and basis):

```
- disposition: R1-1 — <value> — <basis>
- disposition: R1-2 — <value> — <basis>
…
- disposition: R3-12 — <value> — <basis>
```

The schema check (§ 9) counts these lines: 36 per record.

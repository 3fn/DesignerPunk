# Which token stylesheets and which module path a web page loads is stated in four places, and each is incomplete in its own way

**Date**: 2026-10-25
**Filed by**: Lina, under rule 10, from the 16.1.0 trio's R1-18 (`tests/onboarding-trio/records/16.1.0/trio-1-backend.md` L371) and R2-13 (`trio-2-designer.md` L380), routed to me by the orchestrator.
**Owner**: Lina (the browser distribution guide, `generate`'s output, and my charter's text). **Parts that are other seats' to take or decline here** (rule 9: each appends its own dated line): Thurgood, INSTALL § Web's text and the consumer-profile PR that carries any charter line (V-PROF, as for #378); Sparky, his own overlay line if it changes.
**Class**: P3 improvement · defect *(set 2026-10-25, Lina, rule 12. No sentence on any of the four surfaces is false: each says something true and leaves out something a page needs. The cost is real when it bites: a page wired from consumer-Lina's markup would not load the components at all, and a page wired from INSTALL drops the founder's own component tokens. Residual, stated plainly: this is the third observation of the class in two releases (release 4's R2-2 and R2-3; 16.1.0's R1-18 and R2-13), and #378 fixed one seat of it, not the class. If a trio run or a consumer meets a broken page from it, I re-class it P1 consumer-blocking with a dated line.)*
**Trigger**: `manual` — the event that owes the close is the merge of the PR that makes the browser guide the one statement of page wiring and points the other surfaces at it (the fix shape below). Thurgood's INSTALL half may close in its own PR; its merge is then named here.

---

## What was seen

- **R1-18** (run 1, probe-lina; VERIFIED by Lina in the stored `probe-lina.jsonl`: both strings are in it): consumer-Lina gave Dana markup that links `node_modules/@3fn/core/dist/DesignTokens.web.css` (DesignerPunk's base, not Dana's generated `design-tokens/DesignTokens.web.css`) and loads components with `<script type="module">import '@3fn/core';</script>`, a bare specifier that a page with no bundler or import map cannot resolve. She said she had not rendered it. She used the application MCP for the component (two `find_components`, one `get_component_full` on Badge-Label-Base) and `Grep`/`Bash` over `node_modules` for the markup; nothing she could reach told her how a page loads DesignerPunk.
- **R2-13** (run 2, probe-sparky): `init` copies one component-token source file (Progress) into the founder's token tree; `generate` writes it to her `ComponentTokens.web.css` (ten `--progress-*` lines). Consumer-Sparky read it, said "The generated component tokens only contain Progress tokens", and linked only the package's component-token stylesheet, as INSTALL § Web says. So an edit to her copied Progress tokens, or the tokens of any component she authors, would not reach that page. **Unverified**: the link order that is meant; see below.

## Verified (Lina, 2026-10-25, worktree at `c543bc29f`)

The four places a reader learns page wiring, and what each leaves out:

| Surface | Owner | Says | Leaves out |
|---|---|---|---|
| `governance/browser-distribution-guide.md` L91, "Your own tokens" | Lina | link your generated `DesignTokens.web.css` in place of `tokens.css`; keep the component-token stylesheet INSTALL names | the founder's own `ComponentTokens.web.css` |
| `docs/consumer/INSTALL.md` § Web (L128–134) | Thurgood | the same, for imports and for a no-build page | the founder's own `ComponentTokens.web.css` |
| consumer-Sparky's overlay line (`canonical/profiles/consumer/sparky.overlay.md` L27, #378) | Sparky (text), Thurgood (profile) | own `DesignTokens.web.css` in place of the base, including "the same-named `DesignTokens.web.css` inside the installed package" | the founder's own `ComponentTokens.web.css` (his #378 signing sheet already flagged that "two files share the name `ComponentTokens.web.css`") |
| consumer-Lina's charter (`canonical/agents/lina.md` and `canonical/profiles/consumer/lina.overlay.md`) | Lina | nothing about page wiring | all of it; and no consumer charter routes to `browser-distribution-guide` at all (`grep` over `canonical/_consumer-output/`: no hit) |

- The two component-token files have the same name and the same custom-property names: the package's `dist/ComponentTokens.web.css` (`@3fn/core/component-tokens.css`) declares `--progress-node-size-sm: var(--size-150)` and nine more `--progress-*`, and the founder's file is written by the same formatter (`src/generators/TokenFileGenerator.ts` L348). So linking the founder's file **after** the package's would let her values win. **REASONING, not run in a browser.** The founder's file is also the only web home of the tokens of components she authors herself.

## Fix shape (one PR for my parts; the other seats decide theirs)

1. **One statement**: the browser guide's "Your own tokens" paragraph says, in one place, what a page loads and in what order: the founder's `DesignTokens.web.css` in place of the base; the package's component-token stylesheet; then the founder's own `ComponentTokens.web.css`, when `generate` wrote one; and the module from `dist/browser/designerpunk.esm.js` by a path, never a bare `@3fn/core` specifier on a page with no bundler or import map. Sparky verifies the order in a browser.
2. **Pointers, not restatements**: consumer-Lina's charter gets a routing line to that paragraph (a `canonical/agents/lina.md` edit: Peter-merged, with my signing act for the consumer rendering), not her own copy of the rule. Thurgood decides whether INSTALL § Web and Sparky's overlay line point there or keep their text and add the missing file.
3. **`generate` says what it wrote**: when it writes a `ComponentTokens.web.css`, its output names the file and says it is linked after the package's component tokens.

## Not in this record

- That consumer-Lina read the markup out of `node_modules` rather than a served doc. With no route to the browser guide she had none to read; item 2 is the fix, and I file nothing more until a run shows it with the route in place.

*Signed: Lina, 2026-10-25.*

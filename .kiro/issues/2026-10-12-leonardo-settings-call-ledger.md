# Settings screen — MCP call ledger (F2 execution)

**Date**: 2026-10-13 (session opened 21:31 EDT)
**Charter**: `2026-10-12-leonardo-settings-screen-call-ledger-charter.md` (merged #306, amended #309) — this file is its § 3 ledger and the one granted write path.
**Author**: Leonardo (rows, at-time judgments). **Lina**: final per-row judgments (column "Lina", filled after the spec is final — never by Leonardo). **Thurgood**: method conformance. **Orchestrator**: transcript cross-check (every tool call must appear here).
**Status**: **SPEC FINAL (2026-10-13)** — ledger complete through the § 3 summary. Peter: "Go" → PR opened on `fix/leonardo-settings-call-ledger`; hand-offs below. Stage 2 decision (D2) is Peter's after Lina's judgments and Thurgood's conformance note. Ledger state at session start: **new** (no prior file).

---

## Header

| Field | Value |
|---|---|
| Served `main` SHA (packed) | **`7aa433fca`** (≥ `dcd337dcf`, so Stage 0 is in the served build) |
| Package | `@3fn/core` **15.0.0**, installed from `.pack/3fn-core-15.0.0.tgz` (tarball mtime 2026-10-12 23:21 EDT) — local install, not a publish |
| Application MCP dist build | `node_modules/@3fn/core/dist/mcp/application-mcp.js` mtime **2026-10-12 23:19:07 EDT** |
| Product MCP build | `node_modules/@3fn/core/dist/mcp/product-mcp.js` mtime **2026-10-12 23:19:07 EDT**; first healthy index this session 2026-10-14T01:34:15Z (catalog 34) |
| Docs MCP build | `dist/mcp/docs-mcp.js` mtime 2026-10-12 23:19:07 EDT, `MCP_STEERING_DIR=./node_modules/@3fn/core/governance` |
| Consumer | `../scratch-consumer-settings` (sibling of the engine repo), born 2026-10-12 23:19 EDT by `npx designerpunk init` (manifest `posture: born`, `attachedTargets: ["cc"]`). Not a git repo. |
| Session launched from | the consumer folder (so `.mcp.json`'s relative paths serve — charter § 8 condition 2) |
| **Leonardo prompt that ran** (charter § 8 condition 3) | this consumer's generated **`.claude/agents/leonardo.md`** — 483 lines, sha256 `b820b58d45de0fd2bf6c88cd60e9f6ba3169784f25063f57d2333f8842486440`, written by init 2026-10-12 23:19 from 15.0.0 (manifest `origin: generated`). Header line: "GENERATED FILE — emitted by DesignerPunk (@3fn/core) from the agent definitions the package ships". |
| Stage 0 confirmation (charter § 4 blocker 1) | row **S1** below: `find_components({keyword:"primary action button", limit:3})` → every row carries `viability.internalOnly` (all `false`). Confirmed before the first discovery call. |
| Readiness | **Known-unreliable in this consumer**: every component reads `web: not-started` (`hasImplementation: false`) because the package ships no web implementation files; iOS/Android read `scaffold`. Readiness is NOT used as a selection signal in this ledger. |

### Row vocabulary
- **Kind**: `S` scaffolding/verification (not discovery) · `D-kw` discovery by keyword · `D-filt` discovery by context/category/concept filter · `D-cat` catalog or full-metadata read (`get_component_catalog`, `get_component_full`, `get_component_summary`, `get_prop_guidance`, `get_experience_pattern`, `get_layout_template`, …) · `V` validation (`validate_assembly`, `check_composition`) · `X` design-context / product-MCP / docs reads that are not component discovery.
- **Exist?**: Y when the call's intent was "does something for this need exist at all?" (existence check), else N.
- **Action**: acted / proposed / read further / fell back to catalog / abandoned / verification-only.
- **Leo**: at-time judgment of the rank-1 (or chosen) result — Y right · N wrong · gap (nothing exists; correct `none`/weak) · unknown.
- **Lina**: left blank by Leonardo. Filled after the spec is final.
- **P**: pre-exposed. `P-m` set mechanically (rule below), `P-h` by hand (Leonardo's own flag), `P-m+h` both, `—` neither.
- Long arguments (e.g. `validate_assembly` trees) are given verbatim in a footnote under the table, referenced from the row.

### Exposure inventory (charter § 5) and the mechanical P rule
**Pre-exposed query strings (verbatim) — the seven Stage 0 reproductions** (defect record § 1 / fix record before-after table):
1. `a toast for errors`
2. `toggle`
3. `switch to turn a setting on or off`
4. `tabs`
5. `email field with validation`
6. `loading spinner while data fetches`
7. `progress through onboarding steps`
8. `bottom navigation between sections`
(two strings for reproduction 2 → eight strings, seven reproductions.)

**Lina's R1 expected-failures list** (topics, charter § 5; not verbatim query strings): modal/dialog · app bar/navbar/toolbar · bottom nav · page dots/carousel indicator · wizard steps · tag · terms consent · select.

**Leonardo's own earlier probes** (pre-charter): keyword `primary action button` · keyword `Icon-Base` · context `forms` · keyword `top bar`.

**Also read this session, before any discovery call (recorded honestly)**: the defect record's § 1 reproduction table and the fix record's before/after table — required to copy the eight strings above verbatim. That reading exposed me to the rank-1/rank-2 names for those queries (Chip-Filter, Nav-SegmentedChoice-Base, Input-Checkbox-Base, Nav-TabBar-Base, Input-Text-Email, Progress-* incl. the three internal-only Indicator-*, Button-CTA/-Icon/-VerticalList-Item, Avatar-Base, Container-Base, Nav-Header-Base, Badge-Count-Base). Any step where I pick one of those WITHOUT a logged discovery call is flagged `P-h`. Study briefs v1–v3 and the Stage 0 fix record are in the charter's inventory and were part of my prior context.

**Mechanical rule (`P-m`)**: a query is `P-m` if (a) its string equals one of the eight reproduction strings, OR (b) it shares any non-stop-word token with one of the eight strings (after the same plural fold the tokenizer uses: `toggle(s)`, `switch`, `setting(s)`, `tab(s)`, `toast`, `error(s)`, `email`, `field`, `validation`, `loading`, `spinner`, `data`, `fetch(es)`, `progress`, `onboarding`, `step(s)`, `bottom`, `navigation`, `section(s)`), OR (c) it contains one of the R1 topic terms (`modal`, `dialog`, `app bar`, `navbar`, `toolbar`, `bottom nav`, `page dots`, `carousel`, `indicator`, `wizard`, `tag`, `terms`, `consent`, `select`), OR (d) it equals one of my four earlier probes. Applied by string comparison at summary time to every `D-kw` and `D-filt` row; `P-h` is additionally set by hand where my choice was informed by the reading above.

**The switch query will be P** (charter § 5). Expected, and discounted per-query; the call-mode shares are robust to it.

---

## The screen's needs — in plain product language (written BEFORE any discovery call)

Product: `scratch-settings`, a small consumer mobile app (register: **product**, not brand — `product/overview.yaml`). Surface: the account **Settings** screen, reached from the app's main navigation. Users arrive with one intent — flip one thing, check one value, leave — and must be able to do it in one scroll without hunting for labels (`plain-and-fast`). Changes apply immediately where safe; anything irreversible asks once, in plain words (`nothing-surprising`).

Platform scope: all three platforms are `not-started` in this consumer; the spec is written platform-neutral with a `shared` tree and iOS/Android/web notes. No platform agent hands off from this charter.

What the screen needs, numbered so each later query can cite the need it serves:

- **N1 — Title and a way back.** The screen is titled "Settings" at the top, with a back action to the previous screen.
- **N2 — Who I am.** A profile row near the top: the user's picture, display name and email, tappable to open "Edit profile".
- **N3 — Grouped sections, each with a heading.** Account · Notifications · Appearance · Privacy · About. Each group is visually one block; rows inside a group are separated from each other.
- **N4 — Rows that show a current value and open another screen when tapped** (label on the left, current value and a "›" on the right): Language — English · Default view — List · Change password · Manage data.
- **N5 — Rows with an on/off switch that apply immediately** (label, optional one-line explanation, switch on the right): Push notifications · Email digest · Haptic feedback · Show activity status.
- **N6 — A choice among a few options shown inline, one active at a time**: Appearance — Light / Dark / System.
- **N7 — Sign out**, an action at the bottom of the Account group, not destructive but account-level.
- **N8 — Delete account**, a destructive action in the Privacy group that must confirm before it happens: a sheet or dialog that says what will be lost, with Cancel and a red Delete.
- **N9 — App version and build** as small, non-interactive text at the very bottom ("Version 1.4.2 (318)").
- **N10 — States.** Profile loading (placeholder while the profile fetches) · profile failed to load (the rest of the screen still works) · a switch that could not be saved (it snaps back and a brief message says the change didn't save) · signing out / deleting in progress (the confirm button shows it is working and cannot be tapped twice).
- **N11 — Accessibility.** Each switch is announced with its label and on/off state; each value row is announced as a button with its label and current value; group headings are headings; the delete confirmation traps focus and announces its title; all tap targets meet the recommended tap area.

Domain object (to be scaffolded in `product/domain-objects/user-preferences.yaml`): **UserPreferences** — pushNotifications, emailDigest, hapticFeedback, showActivityStatus (booleans) · appearance (light|dark|system) · language · defaultView; plus **Profile** (displayName, email, avatarUrl) read from the account.

Where I expect to discover vs. already know: N3's grouping, N1's header, N7's button and N8's confirm button I expect the settings experience pattern (not yet opened) to supply or imply. The things a pattern will NOT supply, where keyword search is natural: **N5 the switch** (existence check — expected P), **N4 a value+chevron row**, **N3 a section heading**, **N6 an inline few-option choice**, **N8 a confirm sheet/dialog** (existence check — the R1 topic makes it P), **N9 plain text**, **N10 a brief "didn't save" message** (existence check — overlaps reproduction 1, P), and **N2 the profile picture**.

---

## Rows

| # | Kind | Intent (written before the call) | Tool + arguments (verbatim) | n | Top-2 (tier; internalOnly) | Rank-1 matchedOn / coverage | Exist? | Action | Chosen | Leo | Lina | P |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| S1 | S | Confirm Stage 0 is served in this consumer (charter § 4 blocker 1) using a query that is already pre-exposed, so no new exposure is created. | `find_components({keyword:"primary action button", limit:3})` | 3 (limited) | Button-CTA (strong; false) · Button-Icon (strong; false) | highSignal `primary`,`action`,`button` / 3 of 3 | N | verification-only — `viability.internalOnly` present on all rows | — | Y (expected result) | | P-m+h (own probe) |
| S2 | S | Record the Product MCP's "before" state of init's Markdown-shaped `overview.yaml`. | `get_product_overview()` | 0 | — | — | N | verification-only → `"No product data indexed"` | — | — | | — |
| S3 | X | Find the product-data YAML shape (overview / experience-map pages / domain-objects) before scaffolding. | `find_docs({concept:"product data directory overview.yaml experience-map pages domain-objects format", limit:6})` | **75** (`limit:6` not honored) | Component-Meta-Data-Shapes-Governance (partial) · Component-Schema-Format (partial) | title `data`, description `yaml`, sections `format` | N | not acted on (all `partial` — certainty-calibration); **fell back** to reading `dist/mcp/product-mcp.js` loaders and `governance/DesignerPunk-Integration-Guide.md` § "Product MCP Setup" directly (the right doc — it ranked **43 of 75**, matched only on `sections:product`) | — | N (wrong doc at rank 1) | | — |
| S4 | S | Re-index after scaffolding writes (`overview.yaml` rewrite, `experience-map/pages/`, `domain-objects/`). | `rebuild_product_index()` | — | — | — | N | verification-only → `healthy`, screens 0, catalogSize 34, no warnings | — | — | | — |
| S5 | S | Confirm the rewritten overview is served (register, principles). | `get_product_overview()` | 1 | — | — | N | verification-only → served: `register: product`, 2 principles, platforms all `not-started` | — | Y | | — |
| X1 | X | Determine novelty for Impeccable's gate depth: count existing settings-type screens (expected 0 → Novel; product register → no bump → full gate, two Peter stops). | `find_screens({context:"settings"})` | 0 | — | — | N | acted → **Novel**, full gate | — | Y | | — |
| X2 | X | Impeccable setup step 1: load the creative north star before any visual decision. | `get_design_philosophy()` | 1 | — | — | N | read → "Electric Precision"; 11 characteristics | — | — | | — |
| X3 | X | Impeccable setup step 2: load named design rules as constraints. | `get_design_rules()` | 9 | — | — | N | read → 9 rules (Formula, Semantic-First, Contract, Clarity, Earn-Your-Glow, One-Accent, Visible Machinery, Mode-Neutral, Break-Glass) | — | — | | — |
| X4 | X | Impeccable setup step 3: load do/don't directives (unfiltered; will filter per task later if needed). | `get_design_guidance()` | 17 do / 14 don't | — | — | N | read | — | — | | — |
| X5 | X | Impeccable setup step 4: color-strategy vocabulary to declare this screen's tier. | `get_color_strategy()` | 4 | — | — | N | read → Restrained's `whenToUse` names settings pages and its example IS a settings screen | — | — | | — |
| X6 | X | Impeccable setup step 6: brand identity if configured (register is product per S5). | `get_brand_context()` | 0 | — | — | N | read → `not_configured`; proceeding on product-register defaults (`reference/product-dp.md`) | — | — | | — |
| D1 | D-cat | First discovery call. Find the name of the settings experience pattern (I have deliberately not opened it; I do not know its exact name) so I can read it. | `list_experience_patterns()` | 9 | — (list, no tiers) | — | N | read further → pattern is named `settings` (13 components, 1 step; "grouped sections containing navigation items, toggles, and preferences; landmark navigation") | — | Y | Y | — |
| D2 | D-cat | Charter/Leonardo rule: check layout templates BEFORE writing a custom layout. Looking for a single-column settings/list layout for N1–N9 at sm. | `list_layout_templates()` | 4 | — (list, no tiers) | — | N | read further → `centered-content-page` (single region, max-width at wider breakpoints) matches the brief's sm/md behaviour; `full-width-page` is the fallback | — | Y | Y | — |
| D3 | D-cat | Open the settings pattern for the first time: which of N1–N11 its 13 components and roles cover, and which they do not (those become the keyword/existence checks). | `get_experience_pattern({name:"settings"})` | 1 pattern / 4 distinct components | — (pattern, no tiers) | — | N | acted → adopt skeleton: Container-Base (page `main`, sections `section`), Button-VerticalList-Set (`tap`) + Button-VerticalList-Item for N4 rows, Input-Checkbox-Base as the pattern's own declared **placeholder** for N5 ("until the switch component is built"). Pattern declares two gaps itself: switch; detail-value row variant. Supplies nothing for N1, N2, N6, N8, N9; headings are "text content, not a component" (N3). | Container-Base, Button-VerticalList-Set/Item | Y | Y | — |
| D4 | D-cat | Read the matching layout template so the Layout section references it by name and only specifies overrides (regions, column spans at sm/md/lg). | `get_layout_template({name:"centered-content-page"})` | 1 | — | — | N | acted → reference by name; region `content`: xs 1-4, sm 1-8, md 2-11 (maxWidth `breakpointMd`), lg 3-14 (maxWidth `breakpointMd`); no stacking | centered-content-page | Y | Y | — |
| D5 | D-filt | Primary path, exact-match context filter: what does the catalog tag for settings screens? Looking for anything beyond the pattern's four components, especially a switch (N5), a value row (N4), an inline choice (N6). Context name `settings-screens` was seen on Button-VerticalList-Item in S1 (P-h). | `find_components({context:"settings-screens"})` | 12 | Button-VerticalList-Item (no tier; false) · Button-VerticalList-Set (no tier; false) — structured filter rows carry no `matchedOn`/`matchConfidence`/`rank` | — (filter) | N | acted → **Nav-Header-Page** for N1 (whenToUse: "settings sub-pages", "title, contextual actions, and navigation back"); **Input-Radio-Set** for N6 (mutually exclusive preference; Nav-SegmentedChoice-Base also surfaced but is tablist/content-view switching and its whenNotToUse says "Binary on/off toggle — use a switch or toggle component", implying none exists); no switch in the 12 (Input-Checkbox-Base lists "Settings toggle" as a use); nothing for N2 (but a `profile-sections` context is visible on Container-Card-Base), N8, N9, N10 | Nav-Header-Page, Input-Radio-Set (+ pattern set) | Y | Y. SegmentedChoice is tablist (view switching); radiogroup is the right role for a preference. | P-m+h (rule b: `settings`→`setting`, reproduction 3) |
| D6 | D-filt | N1 header with title and back action: exact-match context filter. Context name `app-bars` was seen on Button-Icon in S1 (P-h); `app bar` is also an R1 topic (P-m). | `find_components({context:"app-bars"})` | 8 | Badge-Count-Base (no tier; false) · Badge-Count-Notification (no tier; false) — alphabetical, filter | — (filter) | N | acted → confirms **Nav-Header-Page** (pushed page with back; Settings is reached from main navigation and needs a back action) over Nav-Header-App (root chrome, "no back button"); **Nav-Header-Base shows `viability.internalOnly: true`** in a filter result, so a caller can gate on it | Nav-Header-Page | Y | Y | P-m+h |
| D7 | D-filt | N2 profile row (picture, name, email, tappable): the `profile-sections` context seen in D5 is the exact-match path; filter before any keyword. Expectation that an avatar component exists is pre-exposed (defect record) — flagged by hand; the query term itself came from the logged D5 result. | `find_components({context:"profile-sections"})` | 4 | Avatar-Base (no tier; false) · Container-Card-Base (no tier; false) — alphabetical, filter | — (filter) | Y | acted → **Avatar-Base** for N2 picture ("user profile image in headers, comments, or contact lists"; initials fallback). Container-Card-Base ("profile cards") considered and rejected: elevation on a settings row is not Restrained and product-dp warns off cards; the profile row will be a flat one-off composition on Container-Base. | Avatar-Base | Y (found) | Y (Avatar-Base right). Card-Base can be flat (`shadow: none`); rejection premise partly wrong. | P-m+h (rule b: `sections`→`section`, reproduction 8) |
| D8 | D-kw | N5 existence check: does an on/off switch exist? The pattern (D3) and D5 both say it is a gap with Input-Checkbox-Base as placeholder, but pattern text is static and the catalog is live, so I verify before speccing a placeholder and escalating a gap. Wording from N5. Shares `switch` with reproduction 3 → P-m. | `find_components({keyword:"on/off switch"})` | 2 | **Nav-SegmentedChoice-Base (strong; false)** · Chip-Base (partial; false) | rank 1: single highSignal `switch` / **1 of 2 tokens (50%)** — `on/off` was not split at the slash and matched only as a lowSignal token on Chip-Base | Y | **not acted on** → rank 1 is a content-view switcher whose own whenNotToUse says "Binary on/off toggle — use a switch or toggle component". Outcome class: **`strong` on something that does not exist**. Gap G1 confirmed; Input-Checkbox-Base stays as the pattern's placeholder. Single-high-signal-token `strong` at exactly 50% (boundary case for the clause-1 count). | Input-Checkbox-Base (placeholder) | N (wrong strong) / gap | N (wrong strong) / gap. Agree: no switch exists; checkbox placeholder is the sanctioned interim. | P-m |
| D9 | D-kw | N8 existence check: a confirm sheet or dialog for the destructive Delete. Nothing in D5/D6 was a modal; `modals` is a context many components carry, which says what goes IN a modal, not whether one exists. Wording from N8. `dialog` is an R1 topic → P-m. | `find_components({keyword:"confirm sheet or dialog"})` | 1 | **Button-CTA (strong; false)** · — | rank 1: single highSignal `dialog` (from purpose "confirming dialogs") / **1 of 3 (33%)**; `confirm` did not fold to `confirming`, `sheet` matched nothing | Y | **not acted on** → a button is not a dialog. Outcome class: **`strong` on something that does not exist**. Gap G2 confirmed (no Modal/Dialog/Sheet in the catalog). **Clause-1 `strong`** (<50%). | — (one-off confirm placeholder; see direction) | N (wrong strong) / gap | N (wrong strong) / gap. Agree: Button-CTA goes inside a dialog; no dialog exists. | P-m |
| D10 | D-kw | N10 existence check: a brief message when a switch change could not be saved. Wording from N10. No token overlap with reproduction 1 (`a toast for errors`) but I know its outcome, so P-h. | `find_components({keyword:"brief message that a change didn't save"})` | 6 | **Badge-Count-Notification (strong; false)** · Badge-Count-Base (partial; false) | rank 1: single highSignal `change` / **1 of ~5 content tokens (≈20%)**; `message` and `save` landed only as lowSignal | Y | **not acted on** → a count badge is not a transient message. Outcome class: **`strong` on something that does not exist**. Gap G5 confirmed (no toast/snackbar). **Clause-1 `strong`** (<50%). | — (platform-native transient message; see direction) | N (wrong strong) / gap | N (wrong strong) / gap. Agree: a count badge is not a transient message. | P-h |
| D11 | D-cat | N4 row anatomy: read Button-VerticalList-Item's props to see what the row can carry (label, description, leading icon; any trailing/value slot) so the declared detail-value gap is specified precisely. | `get_component_full({name:"Button-VerticalList-Item"})` | 1 | — | — | N | read → props: `label` (req), `description`, `leadingIcon`, `visualState` (req), `error`; **no trailing value or chevron slot**. Confirms pattern-declared gap G4. Interim for N4: `description` carries the current value ("English"). Tokens of note: `typography.buttonMd`, `typography.bodySm`, `color.text.default`, `color.text.muted`, `tapAreaRecommended`. | Button-VerticalList-Item (interim) | Y | Y (G4 confirmed: schema has no trailing value or chevron slot) | — |
| D12 | D-cat | N7 Sign out and N8 Delete: variant selection rules for the Button family (hierarchy for sign-out; whether a destructive variant exists). | `get_prop_guidance({component:"Button-CTA"})` | 1 family | — | — | N | read → "Dialog Actions" pattern: confirm `primary`, cancel `secondary`; list actions `secondary`; family declares a **neutral** variant gap; **no destructive variant** exists (gap G3). Sign out: a tap row in the Account set (evenly weighted list action) rather than a promoted CTA. | Button-CTA primary/secondary (confirm sheet); Button-VerticalList-Item (Sign out) | Y | Y: right interim; G3 real. Spec bug: Button-CTA `size` takes `medium`, not `md`. | — |
| D13 | D-cat | N1: read Nav-Header-Page's props/contracts to spec title, back action, alignment and scroll behaviour. | `get_component_full({name:"Nav-Header-Page"})` | 1 | — | — | N | read → props `title` (h1), `leadingAction` back (a11y label "Back"), `titleAlignment` platform default, `scrollBehavior` fixed, `appearance` opaque, `showSeparator`; contracts: banner landmark, safe area, 48px/64dp height, focus order. Enough to spec N1 fully. | Nav-Header-Page | Y | Y | — |
| D14 | D-cat | N5 placeholder: read Input-Checkbox-Base props (label, helper text, size, label alignment) and contracts so each placeholder node is specified exactly and its a11y role is recorded as the known compromise. | `get_component_full({name:"Input-Checkbox-Base"})` | 1 | — | — | N | read → props `checked`, `label` (req), `size` sm/md/lg, `labelAlign`, `helperText`, `errorMessage`, `onChange`; contracts: whole label area pressable, `state_checked` via Icon-Base checkmark, `validation_form_integration`. Role is checkbox (recorded as the N11 compromise under G1). | Input-Checkbox-Base (placeholder) | Y | Y | — |
| D15 | D-cat | N6: read Input-Radio-Set props (group label, orientation, controlled value) and contracts to spec the Theme choice. | `get_component_full({name:"Input-Radio-Set"})` | 1 | — | — | N | read → props `selectedValue`, `onSelectionChange`, `size`; children require Input-Radio-Base, `minCount: 2`; contracts: `accessibility_radiogroup_role`, arrow-key navigation, mutual exclusivity. No group-label prop: the "Theme" label is section text (N3 note). | Input-Radio-Set | Y | Y. New gap: Radio-Set has no group-name prop, yet its contract requires a label. | — |
| D16 | D-cat | Page and section wrappers: read Container-Base props (semantic element, padding/spacing props, pressable behaviour for the profile-row one-off) to spec against real prop names. | `get_component_full({name:"Container-Base"})` | 1 | — | — | N | read → props `padding`/axis/edge (`none\|050\|100\|150\|200\|300\|400` → `space.inset.*`), `background`, `border`, `borderColor`, `borderRadius`, `layering` (incl. `modal`), `semantic` (web: main/section/…), `accessibilityLabel`, `hoverable`. **No press/tap handler**: the profile-row one-off needs its own pressable wrapper (recorded in its schema). | Container-Base | Y | Y (no press handler confirmed) | — |
| X7 | X | Resolve exact semantic spacing token names for the Layout section and `tokens:` blocks (the pattern hints used informal names such as "space.inset 200"). | `search_tokens({family:"spacing", tier:"semantic"})` | **0** | — | — | N | **empty** → either the family is not named `spacing` or the Application MCP (started before `generate` created `token-index/`) holds an empty token index. Probing with X8/X9 before any rebuild. | — | unknown | | — |
| X8 | X | Disambiguate X7: a name-only search for the inset family (no family/tier filter). If this is also empty the token index is empty, not the filter. | `search_tokens({name:"space.inset"})` | **0** | — | — | N | empty → not the filter | — | — | | — |
| X9 | X | Direct lookup of a token I know exists (Container-Base `padding: '200'` → `space.inset.200`) to confirm whether the token index is populated at all. | `get_token_details({name:"space.inset.200"})` | 0 | — | — | N | `"Token 'space.inset.200' not found"` → **the Application MCP's token index is empty**: the server started at session open, before `generate` created `token-index/` (friction item 3). Remedy: `rebuild_index` (S6), then retry. | — | — | | — |
| S6 | S | Rebuild the Application MCP index so the token index created by `generate` is loaded; component index unaffected in content (same 34). | `rebuild_index()` | — | — | — | N | → **`degraded`**: components 34, patterns 9, guidance 9, templates 4, **tokens 0/0/0** even after rebuild; 9 warnings "companion path not found: governance/Component-Family-*.md" (resolved relative to the consumer cwd, where no `governance/` exists; the package ships them under `node_modules/@3fn/core/governance/`). **Root cause (from `dist/mcp/application-mcp.js`)**: at server start `token-index/` was absent → `tokenIndex.ok=false` → `dataPaths.tokenIndexDir = undefined`; `rebuild_index` and the file watcher only reindex `this.tokenIndexDir`, so **this process cannot load tokens without a session restart**. Token lookups for the rest of this session fall back to reading `token-index/semantics.yaml` directly (non-MCP; logged in the scaffolding log). | — | — | | — |
| V1 | V | Validate the system-component tree before hand-off: composition rules (Set requires ≥2 Items; Radio-Set requires ≥2 Radio-Base), existence, assembly a11y (page heading). The three product one-offs (profile-row, confirm-sheet, text-content) are included as written to learn whether validate_assembly can see `product/components/` or reports them as unknown. Tree passed verbatim in footnote V1. | `validate_assembly({assembly: <settings ui-tree.shared wrapped in one bare Container-Base root, see footnote V1>})` | `valid: false` · 9 errors · 0 warnings · 0 a11y issues | — | — | N | **All 9 errors are the product one-offs** (`text-content` ×7, `profile-row`, `confirm-sheet`: "not found in catalog"). **Zero errors on the system subtree**: both Button-VerticalList-Sets (3 and 2 Items) and the Input-Radio-Set (3 Radio-Base) pass their `minCount: 2`; no composition violations; assembly a11y raised nothing (h1 from Nav-Header-Page). **Lesson**: `validate_assembly` has no view of `product/components/`, while the Product MCP indexes the same one-offs and reports 0 gaps (S7) — the two servers disagree about what a known component is. | tree accepted as specified | Y (system subtree) | | — |
| S7 | S | Re-index the Product MCP after writing domain objects, one-off schemas and settings.yaml. | `rebuild_product_index()` | — | — | — | N | → `healthy`: screens 1, domainObjects 2, oneOffComponents 3, templates 0; reverse index components 11, tokens 23, domainObjects 2; **gaps 0** (gap detector resolves system names against the package catalog of 34 AND the 3 one-offs) | — | Y | | — |
| X10 | X | Read the indexed screen back: `_componentGaps` (does gap detection see the 34 system components and the 3 one-offs?), token reverse index, domain cross-refs. | `get_screen_spec({name:"settings"})` | 1 | — | — | N | read → full spec served; **no `_componentGaps`** (0 gaps: all 11 system names resolved against the package catalog, all 3 one-offs resolved from `product/components/` and inlined as `_oneOffSchema` with their contracts); layout, state-model, component-gaps blocks round-trip intact. Found two `accessibility` bullets parsed as mappings (unquoted `: ` inside the sentence) → quoted in the file; S8 re-indexes so the served spec equals the appended file. | — | Y | | — |
| S8 | S | Final re-index after quoting two accessibility bullets, so the indexed spec is byte-identical to the `settings.yaml` appended to this ledger. | `rebuild_product_index()` | — | — | — | N | → `healthy`, same counts as S7 (1 screen, 2 domain objects, 3 one-offs, 11 components / 23 tokens in the reverse index, 0 gaps). The appended Appendix A is this indexed file. | — | Y | | — |

**Footnote V1 — assembly passed verbatim** (the YAML `ui-tree.shared` with `tokens:` blocks stripped, since `validate_assembly` takes `component/props/children` only; one bare `Container-Base` added as the single root the tool requires):
```json
{"component":"Container-Base","children":[{"component":"Nav-Header-Page","props":{"title":"Settings","leadingAction":{"type":"back","accessibilityLabel":"Back"},"scrollBehavior":"fixed","appearance":"opaque","showSeparator":true}},{"component":"Container-Base","props":{"semantic":"main","accessibilityLabel":"Settings","padding":"200"},"children":[{"component":"Container-Base","props":{"semantic":"section","accessibilityLabel":"Account"},"children":[{"component":"text-content","props":{"text":"Account","typography":"typography.labelMd","color":"color.text.muted","headingLevel":2}},{"component":"profile-row","props":{"displayName":"{Profile.displayName}","email":"{Profile.email}","avatarUrl":"{Profile.avatarUrl}","state":"{profile.state}"}},{"component":"Button-VerticalList-Set","props":{"mode":"tap"},"children":[{"component":"Button-VerticalList-Item","props":{"label":"Change password","visualState":"rest"}},{"component":"Button-VerticalList-Item","props":{"label":"Manage data","visualState":"rest"}},{"component":"Button-VerticalList-Item","props":{"label":"Sign out","visualState":"rest"}}]}]},{"component":"Container-Base","props":{"semantic":"section","accessibilityLabel":"Notifications"},"children":[{"component":"text-content","props":{"text":"Notifications","typography":"typography.labelMd","color":"color.text.muted","headingLevel":2}},{"component":"Input-Checkbox-Base","props":{"label":"Push notifications","helperText":"Alerts on this device","checked":"{UserPreferences.pushNotifications}","size":"md"}},{"component":"Input-Checkbox-Base","props":{"label":"Email digest","helperText":"A weekly summary by email","checked":"{UserPreferences.emailDigest}","size":"md"}}]},{"component":"Container-Base","props":{"semantic":"section","accessibilityLabel":"Appearance"},"children":[{"component":"text-content","props":{"text":"Appearance","typography":"typography.labelMd","color":"color.text.muted","headingLevel":2}},{"component":"text-content","props":{"text":"Theme","typography":"typography.bodyMd","color":"color.text.default"}},{"component":"Input-Radio-Set","props":{"selectedValue":"{UserPreferences.appearance}","size":"md"},"children":[{"component":"Input-Radio-Base","props":{"label":"Light","value":"light"}},{"component":"Input-Radio-Base","props":{"label":"Dark","value":"dark"}},{"component":"Input-Radio-Base","props":{"label":"System","value":"system"}}]},{"component":"Button-VerticalList-Set","props":{"mode":"tap"},"children":[{"component":"Button-VerticalList-Item","props":{"label":"Default view","description":"{UserPreferences.defaultView.display}","visualState":"rest"}},{"component":"Button-VerticalList-Item","props":{"label":"Language","description":"{UserPreferences.language.display}","visualState":"rest"}}]},{"component":"Input-Checkbox-Base","props":{"label":"Haptic feedback","checked":"{UserPreferences.hapticFeedback}","size":"md"}}]},{"component":"Container-Base","props":{"semantic":"section","accessibilityLabel":"Privacy"},"children":[{"component":"text-content","props":{"text":"Privacy","typography":"typography.labelMd","color":"color.text.muted","headingLevel":2}},{"component":"Input-Checkbox-Base","props":{"label":"Show activity status","helperText":"Others can see when you're active","checked":"{UserPreferences.showActivityStatus}","size":"md"}},{"component":"Button-CTA","props":{"label":"Delete account…","variant":"secondary","size":"md"}}]},{"component":"Container-Base","props":{"semantic":"section","accessibilityLabel":"About"},"children":[{"component":"text-content","props":{"text":"About","typography":"typography.labelMd","color":"color.text.muted","headingLevel":2}},{"component":"text-content","props":{"text":"Version 1.4.2 (318)","typography":"typography.caption","color":"color.text.subtle"}}]}]},{"component":"confirm-sheet","props":{"title":"Delete your account?","body":"Your profile, preferences and activity will be removed. This cannot be undone.","confirmLabel":"Delete account","cancelLabel":"Cancel","busy":"{deleting}"}}]}
```

---

## Impeccable — STOP 1 of 2: the brief (presented to Peter 2026-10-13; awaiting confirmation)

Gate: **Novel** (X1 → 0 prior settings screens), register **product** (S5), brand **not configured** (X6) → full gate. Skill references loaded (non-MCP): `impeccable/SKILL.md`, `reference/product-dp.md`, `reference/shape.md`. Visual Direction Probe step **skipped**: this harness has no native image generation.

1. **Feature summary.** The account Settings screen of `scratch-settings`, a small consumer mobile app. Used occasionally, with one intent per visit (flip one thing, check one value, leave). It must let that happen in one scroll without a label hunt, and make irreversible actions ask once in plain words.
2. **Primary user action.** Find one row and change it (most often: an on/off switch) with immediate effect.
3. **Design direction.** Color strategy **Restrained** (product default; X5's own example is a settings screen): neutral surfaces, cyan only on the active switch state, the active Appearance option, and focus; pink only on Delete. Scene sentence: *a commuter holding the phone one-handed in a bright train car at 8 am, turning off the email digest between two stops: light mode by default, dark follows the system, both must read at a glance.* Anchors: iOS Settings (the grouped inset list people already know), Linear's settings pages (typographic hierarchy and restraint), Wise's app settings (one accent, obvious structure). Identity is carried by spacing rhythm, Figtree weight contrast, a Rajdhani page title, and cyan precision; not by novelty. **Category-reflex note, candidly**: first-order, "settings → neutral grouped list with cyan toggles" is guessable from the category. In the product register that is the correct answer (product-dp: "don't reinvent standard affordances for flavor"; the Clarity Rule), so I am not reworking it; I flag it rather than hide it.
4. **Scope.** Fidelity: a screen **specification** (`settings.yaml` with layout, component tree, state model, tokens, a11y), not code. Breadth: one screen (confirm sheet for Delete is part of it). Interactivity: spec-level. Time intent: polish until the spec is final; this is the charter's one screen.
5. **Layout strategy.** Single column, top-to-bottom: header → profile row → five grouped sections (Account, Notifications, Appearance, Privacy, About) → version text. Grouping does the hierarchy; headings are small and quiet; rows are uniform in height and left-aligned so the eye scans one rail of labels. Target breakpoint **sm (375, 8 columns)**; at md (1024, 12) the column caps its width and centers rather than stretching rows to full width (the 8→12 pressure point).
6. **Key states.** Profile loading (placeholder row) · profile failed (row shows a retry, rest of screen live) · switch save failed (snaps back, brief "didn't save" message) · signing out / deleting in progress (confirm button busy, not re-tappable) · confirm sheet open (focus trapped).
7. **Interaction model.** Tap a switch: flips immediately, saves in the background. Tap a value row: pushes a detail screen. Tap an Appearance option: applies immediately. Sign out: acts at once (account-level, not destructive). Delete account: opens a confirm sheet; Cancel or Delete (red, verb+object). Back returns to the previous screen.
8. **Content.** Row labels as in needs N4–N6; one-line explanations under three switches; confirm copy says what is lost; version string "Version 1.4.2 (318)"; error message "Couldn't save that change. Try again."
9. **References for implementation.** `interaction-design.md`, `layout.md`, `cognitive-load.md`; `ux-writing.md` for the confirm copy.
10. **Open questions for Peter.** (a) Target breakpoint sm with md re-evaluation, as asserted: confirm or override. (b) The needs list N1–N11 is the scope: anything to drop or add before discovery starts? (c) Brand block stays unconfigured (product register defaults): confirm.

**Peter's ruling (2026-10-13)**: confirmed on all three (a: sm target, md re-evaluation; b: N1–N11 is the scope; c: brand unconfigured, product defaults). "Proceed to the pattern."

---

## Impeccable — STOP 2 of 2: direction (presented to Peter 2026-10-13; awaiting confirmation)

**Catalog accounted for without a catalog read**: the logged rows S1, D5, D6, D7, D8, D10 together name all 34 served components (Button ×4, Container ×2, Form Inputs ×8, Navigation ×5, Badge ×3, Chip ×3, Progress ×7, Avatar, Icon). There is no Switch, Modal/Dialog/Sheet, Toast/Snackbar, Divider, or Text component. Gap claims below rest on that enumeration, not on memory.

**Layout**: template `centered-content-page`, region `content` (sm 1-8; md 2-11 capped at `breakpointMd`; lg 3-14). Target breakpoint sm. No reactive annotations: the same content at every breakpoint; at md+ the column caps and centers. Vertical rhythm: `space.layout.separated.*` between sections, `space.grouped.*` inside a section, `space.inset.*` for page padding (exact names resolved at spec time via token lookup, logged).

**Component tree (shared)**
```
Nav-Header-Page            title "Settings" · leadingAction back · fixed · opaque
Container-Base             semantic main · a11y "Settings"
├─ Container-Base          section "Account" (visible heading = text content)
│  ├─ profile-row          ONE-OFF: Container-Base (pressable) ∘ Avatar-Base(lg, human, initials fallback) + name/email text → Edit profile
│  └─ Button-VerticalList-Set mode tap
│     ├─ Item  "Change password"
│     ├─ Item  "Manage data"
│     └─ Item  "Sign out"
├─ Container-Base          section "Notifications"
│  ├─ Input-Checkbox-Base  "Push notifications" · helper "Alerts on this device"         [G1 placeholder]
│  └─ Input-Checkbox-Base  "Email digest" · helper "A weekly summary by email"           [G1 placeholder]
├─ Container-Base          section "Appearance"
│  ├─ Input-Radio-Set      "Theme" → Input-Radio-Base ×3: Light / Dark / System
│  ├─ Button-VerticalList-Set mode tap
│  │  ├─ Item  "Default view" · description "List"                                       [G4 interim]
│  │  └─ Item  "Language" · description "English"                                        [G4 interim]
│  └─ Input-Checkbox-Base  "Haptic feedback"                                              [G1 placeholder]
├─ Container-Base          section "Privacy"
│  ├─ Input-Checkbox-Base  "Show activity status" · helper "Others can see when you're active"  [G1 placeholder]
│  └─ Button-CTA           secondary · "Delete account…" → opens confirm                   [G3]
├─ Container-Base          section "About"
│  └─ text                 "Version 1.4.2 (318)" · typography.bodySm · color.text.muted
confirm-sheet              ONE-OFF placeholder [G2]: Container-Base role dialog · heading "Delete your account?" ·
                           body (what is lost) · Button-CTA primary "Delete account" · Button-CTA secondary "Cancel"
```
Grouping honours Set `minCount: 2` everywhere (Manage data moved to Account; Default view + Language pair in Appearance).

**Color strategy: Restrained** (declared). Cyan only where the system already puts it: selected radio, checked checkbox, header back icon (`color.action.navigation`), focus rings. Neutral surfaces (`color.structure.canvas`), text `color.text.default` / `.muted`. **The brief said "a red Delete"; the system has no destructive variant (G3)**, so the interim is a `secondary` CTA on the page and `primary` inside the confirm per the Dialog Actions pattern, with the destructive meaning carried by copy. No hand-rolled color overrides on a system component.

**States** (state-model): profile `loading | ready | failed` (failed shows "Couldn't load your profile" + retry inside profile-row; the rest of the screen stays live) · each preference `saved | saving | failed` (failed snaps the control back and shows a brief message, G5: spec says platform-native transient message until a system component exists) · `signingOut`, `deleting` (confirm button busy; no double-tap) · `confirmOpen`.

**Platform notes**: iOS title centered by platform default, confirm presents as a sheet (`.confirmationDialog`/`.alert`), spring motion; Android leading title, `AlertDialog`, 64dp bar; web leading title, native `<dialog>`, 48px bar. Same tree, same tokens, same semantics.

**Gaps to escalate (Thurgood → Lina) after the spec is final**: G1 Switch · G2 Modal/Dialog/Sheet · G3 destructive Button-CTA variant · G4 VerticalList-Item trailing value + chevron · G5 transient message (toast/snackbar). G6 (headings as text content) is by design per the pattern, recorded as a note not a gap.

**Counter-argument I ran, and what survives**. *Objection*: speccing Input-Checkbox-Base for N5 means screen readers announce "checkbox, checked" instead of "switch, on" (N11), and visually a checkbox list is not a settings switch list. *Folded in*: helper text under each switch row, and the spec names the gap at every placeholder node so platform agents cannot read it as intent. *Residual*: until the system ships a switch, either the a11y semantics are wrong (checkbox) or the product builds its own one-off switch and diverges from the system. That is a fork, not mine to pick:
- **(i)** keep the system placeholder and escalate G1 (consistency with the system; wrong role until fixed), or
- **(ii)** spec `switch` as a product one-off in `product/components/` so platforms use native Toggle/Switch now (right role today; a second switch to reconcile when Lina ships one).
Second, smaller fork on Delete: **(a)** interim `secondary`/`primary` per the pattern and escalate G3, or **(b)** ask Ada/Lina for a destructive variant before this spec is final (blocks the ledger on a system change).

**Peter's ruling (2026-10-13)**: "Let's go with your lean" → fork 1 **(i)** system placeholder Input-Checkbox-Base, escalate G1; fork 2 **(a)** interim secondary/primary per the Dialog Actions pattern, escalate G3. Direction confirmed.

### Scaffolding log (non-MCP actions, charter § 8 "filling it is scaffolding")
- `product/overview.yaml` rewritten from init's Markdown-shaped template (headings + bullets, parsed to nothing) to valid YAML with `name`, `description`, `domain`, `register: product`, `platforms`, `principles` (two). Original saved in the session scratchpad.
- `mkdir -p product/experience-map/pages product/domain-objects` — init created neither.
- Token names for the spec were read from the generated `token-index/semantics.yaml` directly after the Application MCP token tools proved unrecoverable this session (X7–X9, S6).
- `npx designerpunk generate` → 3 platforms OK, 217 primitive / 193 semantic / 10 component tokens; **created `token-index/`**, which did not exist at birth although `.mcp.json` already pointed `TOKEN_INDEX_DIR` at it.

### Friction → Spec 123 U3 inbound (not this study's findings)
1. init's `product/overview.yaml` template is Markdown-shaped (`## Product Context` headings, `- "[CUSTOMIZE]"` bullets) and indexes as nothing; `get_product_overview` → "No product data indexed" until hand-rewritten.
2. init does not create `product/experience-map/` or `product/domain-objects/` though the Integration Guide's directory layout and the Product MCP's loaders expect them.
3. `token-index/` is absent until `generate` runs; the Application MCP's `TOKEN_INDEX_DIR` dangles at birth (token tools would answer empty).
4. `.mcp.json` sets `COMPONENTS_DIR`/`COMPONENT_DIR` to `./src/components` (contains only a README); the Integration Guide tells a product repo to point `COMPONENT_DIR` into `node_modules/@3fn/core/src/components/core` for gap detection. Catalog still reads 34 (package root is added), so whether gap detection fires on a bad name is checked when `settings.yaml` lands (see rows).
6. **Token tools dead for the session after a born-then-generate sequence**: the Application MCP resolves `token-index/` once at startup; if `generate` has not yet run, `tokenIndexDir` is `undefined` and `rebuild_index` cannot recover it (rows X7–X9, S6). Init's own message says to restart the session after generate; nothing in the MCP tells you WHY `search_tokens` is empty mid-session. Suggested fix: `rebuild_index` re-resolves the token-index path, or `search_tokens` returns the `run-generate`/restart message instead of `[]`.
7. **`rebuild_index` reports `degraded` in every born consumer**: family-guidance `companion:` paths (`governance/Component-Family-*.md`) resolve against the consumer root, but the package ships them under `node_modules/@3fn/core/governance/`. Cosmetic, but it makes health permanently `degraded`.
5. `find_docs` for the product-data format returned 75 `partial` matches although `limit: 6` was passed (limit ignored), with component-schema docs at ranks 1–2; the Integration Guide — the doc that answers it — ranked 43 (docs-side discovery note, not a components finding).

---

## Appendix A — `product/experience-map/pages/settings/settings.yaml` (verbatim, final; indexed at S8)
```yaml
name: settings
type: feature-page
tags: [settings, preferences, account]
template: centered-content-page
status:
  spec: in-review          # awaiting Peter's acceptance via the ledger PR
  web: not-started
  ios: not-started
  android: not-started

ux-direction: |
  The account Settings screen of scratch-settings. One intent per visit (flip one thing,
  check one value, leave) done in one scroll; irreversible actions ask once, in plain words.
  Register: product. Color strategy: Restrained (cyan only where the system already puts it:
  selected/checked controls, the back icon, focus rings; neutral surfaces). Identity through
  spacing rhythm and Figtree weight contrast, not novelty. Novel surface (first screen),
  full Impeccable gate: brief and direction confirmed by Peter 2026-10-13.
  [CONFLICT] product-dp reserves Rajdhani for page-level titles; Nav-Header-Page renders its
  title with typography.labelMd. Applying DesignerPunk (Priority 3, component contract).

layout:
  template: centered-content-page
  target-breakpoint: sm        # 375, 8 columns; most refinement here
  regions:
    - name: header
      component: Nav-Header-Page
      span: { xs: 1-4, sm: 1-8, md: 2-11, lg: 3-14 }   # follows the template's content region
      notes: fixed; safe-area aware; 48px (iOS/web) / 64dp (Android) from the component
    - name: content
      span: { xs: 1-4, sm: 1-8, md: 2-11 maxWidth breakpointMd, lg: 3-14 maxWidth breakpointMd }
      stacking: single column, document order (Account, Notifications, Appearance, Privacy, About)
      rhythm:
        page-padding: space.inset.200
        between-sections: space.separated.normal
        heading-to-list: space.grouped.normal
        version-text-top: space.sectioned.normal
  responsive: same content at every breakpoint; at md+ the content region caps at breakpointMd and centers; rows never stretch beyond it (8→12 column pressure point handled by the cap, not by re-flow)
  reactive: none

ui-tree:
  shared:
    - component: Nav-Header-Page
      props:
        title: Settings
        leadingAction: { type: back, accessibilityLabel: Back }
        scrollBehavior: fixed
        appearance: opaque
        showSeparator: true
      tokens:
        background: color.structure.canvas
        backIcon: color.action.navigation
        title: typography.labelMd
    - component: Container-Base
      props: { semantic: main, accessibilityLabel: Settings, padding: "200" }
      tokens:
        padding: space.inset.200
        background: color.structure.canvas
        sectionGap: space.separated.normal
      children:
        # ---- Account
        - component: Container-Base
          props: { semantic: section, accessibilityLabel: Account }
          tokens: { headingGap: space.grouped.normal }
          children:
            - component: text-content
              props: { text: Account, typography: typography.labelMd, color: color.text.muted, headingLevel: 2 }
              tokens: { typography: typography.labelMd, color: color.text.muted }
            - component: profile-row
              props: { displayName: "{Profile.displayName}", email: "{Profile.email}", avatarUrl: "{Profile.avatarUrl}", state: "{profile.state}" }
              tokens: { background: color.structure.surface, gap: space.grouped.normal, minHeight: tapAreaRecommended }
            - component: Button-VerticalList-Set
              props: { mode: tap }
              children:
                - component: Button-VerticalList-Item
                  props: { label: Change password, visualState: rest }
                  tokens: { label: typography.buttonMd, text: color.text.default }
                - component: Button-VerticalList-Item
                  props: { label: Manage data, visualState: rest }
                  tokens: { label: typography.buttonMd, text: color.text.default }
                - component: Button-VerticalList-Item
                  props: { label: Sign out, visualState: rest }
                  tokens: { label: typography.buttonMd, text: color.text.default }
        # ---- Notifications
        - component: Container-Base
          props: { semantic: section, accessibilityLabel: Notifications }
          tokens: { headingGap: space.grouped.normal, rowGap: space.related.tight }
          children:
            - component: text-content
              props: { text: Notifications, typography: typography.labelMd, color: color.text.muted, headingLevel: 2 }
              tokens: { typography: typography.labelMd, color: color.text.muted }
            - component: Input-Checkbox-Base     # GAP G1: switch placeholder (pattern-declared); role is checkbox until a Switch exists
              props: { label: Push notifications, helperText: Alerts on this device, checked: "{UserPreferences.pushNotifications}", size: md }
              tokens: { label: typography.titleSmall, helper: color.text.muted, selected: color.feedback.select.border.default }
            - component: Input-Checkbox-Base     # GAP G1
              props: { label: Email digest, helperText: A weekly summary by email, checked: "{UserPreferences.emailDigest}", size: md }
              tokens: { label: typography.titleSmall, helper: color.text.muted, selected: color.feedback.select.border.default }
        # ---- Appearance
        - component: Container-Base
          props: { semantic: section, accessibilityLabel: Appearance }
          tokens: { headingGap: space.grouped.normal, rowGap: space.related.tight }
          children:
            - component: text-content
              props: { text: Appearance, typography: typography.labelMd, color: color.text.muted, headingLevel: 2 }
              tokens: { typography: typography.labelMd, color: color.text.muted }
            - component: text-content
              props: { text: Theme, typography: typography.bodyMd, color: color.text.default }
              tokens: { typography: typography.bodyMd, color: color.text.default }
            - component: Input-Radio-Set
              props: { selectedValue: "{UserPreferences.appearance}", size: md }
              tokens: { optionGap: space.grouped.normal, selected: color.feedback.select.border.default }
              children:
                - component: Input-Radio-Base
                  props: { label: Light, value: light }
                - component: Input-Radio-Base
                  props: { label: Dark, value: dark }
                - component: Input-Radio-Base
                  props: { label: System, value: system }
            - component: Button-VerticalList-Set
              props: { mode: tap }
              children:
                - component: Button-VerticalList-Item   # GAP G4: value shown via description until a trailing-value variant exists
                  props: { label: Default view, description: "{UserPreferences.defaultView.display}", visualState: rest }
                  tokens: { label: typography.buttonMd, value: typography.bodySm, valueColor: color.text.muted }
                - component: Button-VerticalList-Item   # GAP G4
                  props: { label: Language, description: "{UserPreferences.language.display}", visualState: rest }
                  tokens: { label: typography.buttonMd, value: typography.bodySm, valueColor: color.text.muted }
            - component: Input-Checkbox-Base     # GAP G1
              props: { label: Haptic feedback, checked: "{UserPreferences.hapticFeedback}", size: md }
              tokens: { label: typography.titleSmall, selected: color.feedback.select.border.default }
        # ---- Privacy
        - component: Container-Base
          props: { semantic: section, accessibilityLabel: Privacy }
          tokens: { headingGap: space.grouped.normal, rowGap: space.related.normal }
          children:
            - component: text-content
              props: { text: Privacy, typography: typography.labelMd, color: color.text.muted, headingLevel: 2 }
              tokens: { typography: typography.labelMd, color: color.text.muted }
            - component: Input-Checkbox-Base     # GAP G1
              props: { label: Show activity status, helperText: "Others can see when you're active", checked: "{UserPreferences.showActivityStatus}", size: md }
              tokens: { label: typography.titleSmall, helper: color.text.muted, selected: color.feedback.select.border.default }
            - component: Button-CTA              # GAP G3: no destructive variant; secondary on the page, copy carries the meaning
              props: { label: "Delete account…", variant: secondary, size: md }
              tokens: { label: typography.buttonMd, border: color.action.primary }
        # ---- About
        - component: Container-Base
          props: { semantic: section, accessibilityLabel: About }
          tokens: { topGap: space.sectioned.normal }
          children:
            - component: text-content
              props: { text: About, typography: typography.labelMd, color: color.text.muted, headingLevel: 2 }
              tokens: { typography: typography.labelMd, color: color.text.muted }
            - component: text-content
              props: { text: "Version 1.4.2 (318)", typography: typography.caption, color: color.text.subtle }
              tokens: { typography: typography.caption, color: color.text.subtle }
    # ---- Presented on Delete account (GAP G2: no system Modal/Dialog/Sheet)
    - component: confirm-sheet
      props:
        title: Delete your account?
        body: Your profile, preferences and activity will be removed. This cannot be undone.
        confirmLabel: Delete account
        cancelLabel: Cancel
        busy: "{deleting}"
      tokens: { surface: color.structure.surface, shadow: shadow.modal, zIndex: zIndex.modal, gap: space.related.normal }
  ios:
    navigation: pushed onto the NavigationStack from the main tab; title centered (platform default); confirm presents as .confirmationDialog with a destructive role on Delete; spring motion
  android:
    navigation: destination in the nav graph; leading title; 64dp bar; confirm is an AlertDialog; expo-out motion
  web:
    navigation: client-side route /settings; leading title; 48px bar; confirm is a native <dialog> opened with showModal(); expo-out motion; prefers-reduced-motion respected

state-model:
  data:
    - Profile            # read once on enter
    - UserPreferences    # read on enter; each field saved on change
  states:
    profile: [loading, ready, failed]
    preference(each field): [saved, saving, failed]
    session: [idle, signingOut]
    deletion: [idle, confirmOpen, deleting]
  actions:
    - openEditProfile (profile-row press) → navigate
    - toggle(field) → optimistic update → save → saved | failed
    - selectTheme(value) → apply immediately → save
    - openValueRow(Default view | Language | Change password | Manage data) → navigate
    - signOut → session.signingOut → leave screen
    - requestDelete → deletion.confirmOpen
    - cancelDelete → deletion.idle; focus returns to Delete account
    - confirmDelete → deletion.deleting → account removed → leave app
  transitions:
    preference failed: >-
      control reverts to the last saved value; brief message "Couldn't save that change. Try again." (GAP G5: no system toast/snackbar; platform-native transient message, announced politely); state returns to saved on the next successful change
    profile failed: >-
      profile-row shows "Couldn't load your profile" + Retry; all other sections stay interactive
    deleting: >-
      confirm button shows progress and ignores further presses; Cancel removed (no disabled states)

accessibility:
  - Page has an h1 ("Settings") from Nav-Header-Page; back action labelled "Back"
  - "Each section is a landmark (semantic: section) whose accessibilityLabel equals its visible heading; headings are level 2 via text-content.headingLevel (pattern requirement, WCAG 1.3.1 / 2.4.1)"
  - Switch placeholders announce as "checkbox, checked/unchecked" (GAP G1 compromise, recorded); label and helper text are read together
  - Theme is a radiogroup (Input-Radio-Set) with arrow-key navigation; the "Theme" text-content labels it
  - Value rows are buttons whose accessible name includes the current value (label + description)
  - "profile-row is one button: '<name>, <email>, Edit profile'"
  - confirm-sheet traps focus, is announced by its title, returns focus to Delete account on close
  - All controls meet tapAreaRecommended; focus rings per accessibility.focus.* tokens

component-gaps:
  - id: G1
    need: on/off switch (N5)
    interim: Input-Checkbox-Base (the settings pattern's own placeholder)
    evidence: ledger D3, D5, D8
  - id: G2
    need: modal / dialog / sheet for destructive confirmation (N8)
    interim: product one-off confirm-sheet over platform-native dialogs
    evidence: ledger D9
  - id: G3
    need: destructive Button-CTA variant (N8)
    interim: secondary on the page, primary in the confirm per the Dialog Actions pattern
    evidence: ledger D12
  - id: G4
    need: Button-VerticalList-Item trailing value + chevron (N4)
    interim: description carries the current value
    evidence: ledger D3, D11
  - id: G5
    need: transient message / toast / snackbar (N10)
    interim: platform-native transient message
    evidence: ledger D10
```

## Appendix B — `product/overview.yaml` (verbatim, final)
```yaml
# scratch-settings — Product Overview
# Scaffolding for the Settings-screen call-ledger charter (DesignerPunk-v2
# .kiro/issues/2026-10-12-leonardo-settings-screen-call-ledger-charter.md).
# Rewritten from init's Markdown-shaped template (which indexed as 0) to valid YAML.

name: scratch-settings
description: >
  A small consumer mobile app used as disposable evidence scaffolding. Its one
  specified surface is the account Settings screen. The product exists so a real
  screen can be specified against DesignerPunk with every MCP call logged.
domain: consumer app — account and preferences management
register: product

platforms:
  web: not-started
  ios: not-started
  android: not-started

principles:
  plain-and-fast: >
    Settings are a utility, not a destination. Users arrive with one intent
    (flip one thing, check one value, leave). Every control must be reachable
    in one scroll and understandable without a label hunt.
  nothing-surprising: >
    Changes apply immediately where safe; anything irreversible or
    account-level asks once, in plain words, before it happens.
```

## Appendix C — the other consumer files the spec depends on (verbatim; the consumer is disposable)

#### `product/domain-objects/user-preferences.yaml`
```yaml
name: UserPreferences
description: Per-account settings the Settings screen reads and writes. Each boolean saves immediately on change; a failed save reverts the control.
fields:
  pushNotifications: { type: boolean, default: true, label: Push notifications }
  emailDigest: { type: boolean, default: false, label: Email digest }
  hapticFeedback: { type: boolean, default: true, label: Haptic feedback }
  showActivityStatus: { type: boolean, default: true, label: Show activity status }
  appearance: { type: enum, values: [light, dark, system], default: system, label: Theme }
  language: { type: string, default: en, label: Language, display: English }
  defaultView: { type: enum, values: [list, grid], default: list, label: Default view, display: List }
persistence: remote, optimistic (apply locally, save in background, revert on failure)
```

#### `product/domain-objects/profile.yaml`
```yaml
name: Profile
description: The signed-in account's identity as shown on the Settings screen. Read-only here; edited on the Edit profile screen.
fields:
  displayName: { type: string }
  email: { type: string }
  avatarUrl: { type: string, optional: true, fallback: initials from displayName }
```

#### `product/components/profile-row/profile-row.schema.yaml`
```yaml
name: profile-row
purpose: One tappable row at the top of Settings showing who is signed in (picture, display name, email) and opening Edit profile. Product one-off because Container-Base has no press handler and Button-VerticalList-Item has no avatar or trailing slot.
composed-from:
  - component: Container-Base
    role: row
    props: { semantic: div, padding: "200", background: color.structure.surface, borderRadius: normal, hoverable: true }
  - component: Avatar-Base
    role: picture
    props: { entity: human, size: lg }
  - component: text-content
    role: name
    props: { typography: typography.bodyLg, color: color.text.default }
  - component: text-content
    role: email
    props: { typography: typography.bodySm, color: color.text.muted }
  - component: Icon-Base
    role: navigation-arrow
    props: { name: chevron-right, size: icon.size100 }   # verify name against IconBaseName
props:
  displayName: { type: string, required: true }
  email: { type: string, required: true }
  avatarUrl: { type: string, required: false }
  state: { type: "'loading' | 'ready' | 'failed'", default: ready }
  onPress: { type: "() => void", required: true }
  onRetry: { type: "() => void", required: false }
tokens:
  gap: space.grouped.normal
  minHeight: tapAreaRecommended
  focus: [accessibility.focus.color, accessibility.focus.width, accessibility.focus.offset]
  pressed: blend.pressedDarker
```

#### `product/components/profile-row/profile-row.contracts.yaml`
```yaml
interaction_pressable:
  category: interaction
  description: Whole row acts as one button opening Edit profile
  behavior: Tap/click anywhere on the row, or Enter/Space when focused, calls onPress. Pressed feedback via blend.pressedDarker on the row background.
  wcag: 2.1.1 Keyboard
  platforms: [web, ios, android]
  validation: ["Row is a single focusable control", "Enter and Space trigger onPress"]
accessibility_name_role:
  category: accessibility
  description: Announced as a button with name, email and the destination
  behavior: "Accessible name: '<displayName>, <email>, Edit profile, button'. Avatar is decorative (Avatar-Base decorative mode); text is not read twice."
  wcag: 4.1.2 Name, Role, Value
  platforms: [web, ios, android]
  validation: ["Role is button", "Avatar hidden from assistive technology"]
state_loading_failed:
  category: state
  description: Loading placeholder and inline failure with retry
  behavior: loading shows a placeholder row of the same height (no spinner); failed shows "Couldn't load your profile" with a Retry action in the row. The rest of the screen stays interactive.
  wcag: 4.1.3 Status Messages
  platforms: [web, ios, android]
  validation: ["Row height is stable across states", "Retry is reachable by keyboard"]
```

#### `product/components/confirm-sheet/confirm-sheet.schema.yaml`
```yaml
name: confirm-sheet
purpose: Placeholder for the destructive confirmation (Delete account). DesignerPunk has no Modal/Dialog/Sheet component (gap G2); until it exists each platform uses its native dialog and this schema fixes the content, order and semantics.
composed-from:
  - component: Container-Base
    role: surface
    props: { layering: modal, background: color.structure.surface, padding: "300", borderRadius: loose }
  - component: text-content
    role: title
    props: { typography: typography.h3, color: color.text.default }
  - component: text-content
    role: body
    props: { typography: typography.bodyMd, color: color.text.default }
  - component: Button-CTA
    role: confirm
    props: { variant: primary, size: md }      # destructive variant is gap G3; copy carries the meaning
  - component: Button-CTA
    role: cancel
    props: { variant: secondary, size: md }
props:
  title: { type: string, required: true }
  body: { type: string, required: true }
  confirmLabel: { type: string, required: true }
  cancelLabel: { type: string, default: Cancel }
  busy: { type: boolean, default: false }
  onConfirm: { type: "() => void", required: true }
  onCancel: { type: "() => void", required: true }
tokens:
  gap: space.related.normal
  actionsGap: space.grouped.normal
  shadow: shadow.modal
  zIndex: zIndex.modal
platform:
  ios: ".confirmationDialog or .alert (destructive role on the confirm action)"
  android: AlertDialog (Material 3)
  web: native <dialog> with showModal()
```

#### `product/components/confirm-sheet/confirm-sheet.contracts.yaml`
```yaml
accessibility_dialog_semantics:
  category: accessibility
  description: Modal dialog role with title as accessible name
  behavior: role=dialog aria-modal=true (web); title labels the dialog and is announced on open. Background content is inert while open.
  wcag: 4.1.2 Name, Role, Value
  platforms: [web, ios, android]
  validation: ["Dialog announced with its title on open", "Background is not focusable while open"]
interaction_focus_trap:
  category: interaction
  description: Focus moves into the dialog and stays until it closes
  behavior: On open, focus lands on Cancel (the safe action). Tab cycles within the dialog. Escape (web), back gesture (Android), swipe-down (iOS sheet) cancel. On close, focus returns to the Delete account button.
  wcag: 2.4.3 Focus Order
  platforms: [web, ios, android]
  validation: ["Initial focus on Cancel", "Focus returns to the invoking control on close"]
state_busy:
  category: state
  description: Confirm is working and cannot be tapped twice
  behavior: While busy, the confirm button shows progress and ignores further presses; Cancel is removed (no disabled states in DesignerPunk).
  wcag: null
  platforms: [web, ios, android]
  validation: ["Second press during busy is ignored"]
```

#### `product/components/text-content/text-content.schema.yaml`
```yaml
name: text-content
purpose: Plain text rendered with a typography and color token. The settings experience pattern states section headings are "not a DesignerPunk component, rendered as text content"; this one-off gives that text a node in the UI tree so tokens are indexed and headings can declare a heading level.
composed-from: []
props:
  text: { type: string, required: true }
  typography: { type: TypographyTokenName, required: true }
  color: { type: ColorTokenName, default: color.text.default }
  headingLevel: { type: "2 | 3 | null", default: null, description: "When set, renders as a heading (web h2/h3; iOS .isHeader; Android heading())" }
tokens: []
```

---

## Summary (charter § 3)

**Scope of count**: discovery rows D1–D16 (16 calls). S-rows (scaffolding/verification), X-rows (design-context, product MCP, docs, token probes) and V1 are logged but are not discovery. All rows: 8 S · 10 X · 16 D · 1 V = **35 MCP calls**, every one listed above with its intent written first.

### Discovery calls by mode
| Mode | Rows | Count | Share of 16 |
|---|---|---|---|
| Keyword (`D-kw`) | D8, D9, D10 | **3** | **18.75 %** |
| Context/category filter (`D-filt`) | D5, D6, D7 | 3 | 18.75 % |
| Catalog / full-metadata read (`D-cat`) | D1, D2, D3, D4, D11, D12, D13, D14, D15, D16 | 10 | 62.5 % |

Counting the S1 verification keyword call as a keyword call too: 4 of 17 = 23.5 %. **Either way the keyword share is below D2's 25 % threshold.** This matches the charter's own expectation of Leonardo's path: template → pattern → context filter → prop guidance → full reads → validate; keyword only for one-offs and existence checks.

**Keyword → catalog-read fallback**: 0 of 3. No `get_component_catalog` call was made at all; the full 34 were enumerated from logged filter/keyword rows (S1, D5, D6, D7, D8, D10) before any gap was asserted.

### `strong` right vs wrong
| | Rank 1 | Top 2 |
|---|---|---|
| `strong` right | 0 | 0 |
| `strong` wrong | **3** (D8 Nav-SegmentedChoice-Base, D9 Button-CTA, D10 Badge-Count-Notification) | 3 (rank 2 in D8/D10 was `partial`; D9 had one result) |

(S1, verification only and P: 2 `strong` right in top 2 — excluded from the discovery count.) Structured filter rows carry no tier, so D5–D7 contribute nothing here by design.

**Clause-1 `strong`s (single high-signal token, < 50 % coverage), counted separately**: **2** — D9 (`dialog`, 1/3) and D10 (`change`, ≈1/5). **Boundary case**: D8 (`switch`, 1/2 = exactly 50 %; `on/off` was not split at the slash, so coverage reads 50 % rather than 33 %). All three keyword `strong`s were single-token strongs; none had a second matching token.

### Existence checks (Exist? = Y), four ways
| Outcome | Rows | Count |
|---|---|---|
| Found | D7 (Avatar-Base, via context filter, not keyword) | 1 |
| Missed (existed, not surfaced) | — | 0 |
| Correctly none / weak | — | **0** |
| **`strong` on something that does not exist (harm case)** | **D8, D9, D10** | **3** |

Every time the thing did not exist, the tool returned a confident `strong` on something else. No existence check for a missing thing produced a `none` or `partial`-only result.

### D2 criterion, as pre-stated
- Keyword calls ≥ 25 % of discovery calls: **not met** (18.75 %, or 23.5 % counting S1).
- ≥ 3 harmful outcomes, where D2 defines harm as *a wrong `strong` acted on* or *an existing component missed*: **0 acted on, 0 missed**. Candidly: I did not act on the three wrong `strong`s because the pattern (D3) and the filters (D5) had already framed switch, dialog and toast as absent, and because I am pre-exposed to all three. An author without those two advantages reads D8 at face value as "there is a switch-like control" and D9 as "Button-CTA handles confirm dialogs". The § 3 harm *class* (`strong` on a non-existent thing) fired 3 of 3 times.
- On D2's letter, Stage 2 for components does **not** go ahead. On the harm class the charter itself names in § 3, the evidence is 3/3 — thin basis (§ 8b), right kind.

### P vs non-P
- **Keyword rows**: 3 of 3 are P (D8 `P-m` via `switch`; D9 `P-m` via `dialog`; D10 `P-h`, no token overlap with reproduction 1 but its outcome was known to me). **Non-P keyword rows: 0.** Per-query correctness on keyword rows is therefore wholly discounted; the three wrong `strong`s are consistent with the Stage 0 before/after table, not independent of it.
- **Filter rows**: 3 of 3 are P by the mechanical rule (b) applied to the filter value (`settings`→`setting`, `app bar`, `sections`→`section`) and by hand. Filter rows have no tier, so the discount costs nothing here.
- **Catalog/full reads**: 10 of 10 non-P.
- **Call-mode shares are robust to pre-exposure** (charter § 5): the 3 / 3 / 10 split would be the same for a fresh author following the same path; the keyword share is the load-bearing non-P number.

### Rows for Lina to judge
Lina's column is blank on every row. The rows where her judgment changes a count: D8, D9, D10 (is each rank-1 `strong` wrong?), D7 (was Avatar-Base the right pick?), D5 (Input-Radio-Set over Nav-SegmentedChoice-Base for the Theme choice), D12 (interim `secondary`/`primary` for a destructive action).

### Component gaps surfaced (to Thurgood → Lina, after Peter's go)
G1 Switch · G2 Modal/Dialog/Sheet · G3 destructive Button-CTA variant · G4 VerticalList-Item trailing value + chevron · G5 transient message. Plus two tool lessons: `validate_assembly` cannot see `product/components/` while the Product MCP can (V1 vs S7); structured `find_components` filter rows carry no tier/`matchedOn`, so they cannot be scored by the rubric at all.

### Friction routed to Spec 123 U3 (not this study)
Items 1–7 in the scaffolding section; the two that bit hardest this session: the Application MCP token index is unrecoverable without a session restart when the session opens before `generate` (X7–X9, S6), and init's Markdown-shaped `overview.yaml`.

### Cost (actual)
One session: scaffolding ≈ 0.2, brief + two Peter stops + spec ≈ 0.6, ledger ≈ 0.2. Below the charter's 2–2.5 estimate because the consumer had already been born and the pattern/filters covered more of the screen than expected.

---

## Hand-offs (opened at Peter's "Go", 2026-10-13)

**[@LINA] — per-row judgments (charter § 3, "never Leonardo alone")**. Fill the **Lina** column on every D-row and on S1. The rows where your call changes a count: **D8, D9, D10** (is each rank-1 `strong` wrong for the need as written at the top?), **D7** (Avatar-Base for N2), **D5** (Input-Radio-Set over Nav-SegmentedChoice-Base for the Theme choice), **D12** (interim `secondary`/`primary` for a destructive action). Also yours: whether the component gaps G1–G5 are real gaps or misreads of existing components, and the clause-1 question in D3 of the charter (D8 sits at exactly 50 % coverage). Please judge against the needs N1–N11 and the query strings as logged, not against what you know the catalog should have returned.

**[@THURGOOD] — method conformance only (charter § 3, § 5)**. Check: intent written before every call (each D/X/S/V row was pre-written as `_pending_` and filled after); one row per MCP call (35 rows; the orchestrator cross-checks against the transcript); needs written before the first discovery call; P flags set mechanically (rule in the header) and by hand, with results reported with and without P; no padding (the only keyword calls are the three existence checks the needs demanded; no catalog read was added). Two things I want your eye on: (1) I counted the S1 verification keyword call outside the discovery denominator and reported the share both ways; (2) the mechanical rule (b) made the filter values `settings-screens` and `profile-sections` P-m by plural fold, which may be stricter than intended. Also route G1–G5 to Lina as system escalations when Peter rules, and the seven 123 U3 friction items to that spec's inbound.

**[@ORCHESTRATOR]** — transcript cross-check: every tool call in the session should appear as a row; the Skill load (`impeccable`) and the file reads are non-MCP and are in the scaffolding log.

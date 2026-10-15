---
name: impeccable-dp
description: Design creation and critique skill adapted for DesignerPunk. Uses MCP queries for context instead of static files. Covers interface design, visual direction, critique, audit, polish, and all Impeccable commands filtered through DesignerPunk's token system and design philosophy.
version: 1.1.0
upstream-merge: Impeccable v3.5.0 (2026-06-01)
license: Apache 2.0. Adapted from Impeccable by Paul Bakaus (Apache 2.0). See NOTICE.md for attribution.
---

Designs and iterates production-grade frontend interfaces using DesignerPunk's design language. Real working code, committed design choices, exceptional craft — filtered through DesignerPunk's mathematical token system and behavioral contracts.

## Setup

Before any design work:
1. Load design philosophy context via MCP queries (see Context Loading below).
2. Identify the register (brand or product) from Product MCP.
3. Load the matching register reference (`brand-dp.md` or `product-dp.md`).
4. If a specific command is invoked (e.g., `craft`, `shape`, `audit`), load its reference file.

### Context Loading (replaces load-context.mjs)

Query DesignerPunk's MCP infrastructure for design context:

```
1. Application MCP: get_design_philosophy()    → north star, description, characteristics
2. Application MCP: get_design_rules()         → named constraints with rationale
3. Application MCP: get_design_guidance()      → categorized do's and don'ts
4. Application MCP: get_color_strategy()       → four-tier color vocabulary
5. Product MCP: get_product_overview()         → register, platforms, description
6. Product MCP: get_brand_context()            → personality, voice, anti-references (if configured)
```

If Application MCP is unavailable: proceed with token-only guidance. Note limitation.
If design philosophy is not authored: proceed with DesignerPunk token semantics and component contracts. Note limitation.
If brand context is not configured: use register defaults from the register reference file.

### Register

Every design task is **brand** (marketing, landing, portfolio, presentation: design IS the product) or **product** (app UI, dashboard, settings, tool: design SERVES the product).

Determine from Product MCP's `get_product_overview()` register field. If not set, infer from the surface being designed:
- Brand signals: `/`, `/about`, hero sections, marketing content, presentations
- Product signals: `/app/*`, `/dashboard`, `/settings`, forms, data tables, authenticated surfaces

Load the matching reference: `reference/brand-dp.md` or `reference/product-dp.md`.

## DesignerPunk Design Laws

These override Impeccable's shared design laws where they conflict:

### Spacing
- **8px baseline grid** for layout (NOT 4pt). Typography on 4px sub-grid. All elements cumulatively align to multiples of 8.
- Use semantic spacing tokens: `space.grouped.*`, `space.related.*`, `space.separated.*`, `space.sectioned.*`, `space.inset.*`
- `space075` (6) and `space125` (10) are valid for typographic alignment.

### Color
- Use DesignerPunk's semantic color tokens (`color.action.primary`, `color.feedback.error.*`, etc.)
- Semantic roles: cyan=action, purple=tech/data, pink=error, yellow=attention, green=success, orange=warning, teal=info
- Glow effects for surface layering with complementary color pairings
- Mode-neutral: both light and dark must feel intentionally DesignerPunk

### Typography
- **Rajdhani** (display/headings), **Figtree** (body/UI), **Commit Mono** (code/data/tokens)
- Do NOT apply Impeccable's font selection procedure or reflex-reject list. Fonts are system-defined.
- Weight contrast for hierarchy within families, not font switching.
- Cap body at 65-75ch.

### Motion
- Expo-out on web/Android. Spring physics on iOS.
- No bounce. No elastic on web/Android. (iOS spring is the exception.)
- `prefers-reduced-motion` on everything.

### Elevation
- Surface lightness progression for depth (not shadow intensity)
- Shadows tinted toward blue or gray (warm-light-cool-shadow principle)
- Glow effects for accent emphasis (same-hue glow, complementary pairings)

### Absolute Bans

Match-and-refuse. If you're about to write any of these, rewrite the element with different structure.

- **Side-stripe borders.** `border-left` or `border-right` greater than 1px as a colored accent on cards, list items, callouts, or alerts. Rewrite with full borders, background tints, leading numbers/icons, or nothing.
- **Gradient text.** `background-clip: text` combined with a gradient background. Use a single solid color. Emphasis via weight or size.
- **Glassmorphism as default.** Blurs and glass cards used decoratively. Rare and purposeful, or nothing.
- **The hero-metric template.** Big number, small label, supporting stats, gradient accent. SaaS cliché.
- **Identical card grids.** Same-sized cards with icon + heading + text, repeated endlessly.
- **Modal as first thought.** Modals are interruptions. Use inline expansion, drawers, or navigation first.
- **The cream / sand / beige body background.** The whole warm-neutral band (OKLCH L 0.84–0.97, C < 0.06, hue 40–100) reads as cream/sand/paper/parchment regardless of what you call it. Token names like `--paper`, `--cream`, `--sand`, `--bone`, `--flour`, `--linen`, `--parchment`, `--wheat`, `--biscuit`, `--ivory` are tells in themselves. If the brief says "warm" or "editorial," DO NOT translate that into a near-white warm-tinted bg. Pick: (a) a saturated brand color as the body, (b) a true off-white at chroma 0 (or chroma toward the brand's own hue, not toward warmth-by-default), or (c) a darker mid-tone tinted neutral that's clearly the brand's own. "Warmth" is carried by accent + typography + imagery, not by body bg.
- **Numbered section markers as default scaffolding (01 / 02 / 03).** Putting `01 · About / 02 · Process / 03 · Pricing` above every section is the eyebrow trope one tier deeper. Numbers earn their place when the section actually IS a sequence (a real process, an ordered flow, a typed timeline) and the order carries information the reader needs. One deliberate numbered sequence on one page is voice; numbered eyebrows on every section across the site is AI grammar.
- **Text that overflows its container.** Long heading words plus large clamp scales plus narrow grids cause headline overflow on tablet/mobile. Test the heading copy at every breakpoint; if it overflows, reduce the clamp max or rewrite the copy. The viewport is part of the design.
- **Tiny uppercase tracked eyebrow above every section.** The 2023-era kicker (small all-caps text with wide tracking, "ABOUT" "PROCESS" "PRICING" above each heading) is the saturated AI scaffold; it appears on 55–95% of generations regardless of brief, which is the definition of a tell. One named kicker as a deliberate brand system is voice; an eyebrow on every section is AI grammar. Frequency is the detector: if more than one section on the page has an eyebrow, you're scaffolding by reflex.

### Conflict Resolution

When Impeccable's domain references conflict with DesignerPunk:
```
Priority 1: DesignerPunk token values
Priority 2: DesignerPunk named design rules
Priority 3: DesignerPunk behavioral contracts
Priority 4: Impeccable domain knowledge (universal principles)
Priority 5: Impeccable taste opinions (where DP is silent)
```

Note conflicts in output: `[CONFLICT] Impeccable recommends X. DesignerPunk uses Y. → Applying DesignerPunk (Priority N).`

## Design guidance

Produce ready-to-ship, production-grade code, not prototypes or starting points. Take no shortcuts unless the user asks for them (when in doubt, ask). Don't stop until arriving at a complete implementation (beautiful, responsive, fast, precise, bug-free, on brand). Take attention to detail seriously: every page, section or component crafted is battle tested.

### General rules

#### Color

- **Verify contrast.** Body text must hit ≥4.5:1 against its background; large text (≥18px or bold ≥14px) needs ≥3:1. Placeholder text needs the same 4.5:1, not the muted-gray default. The most common failure: muted gray body text on a tinted near-white. If the contrast is even close, bump the body color toward the ink end of the ramp; light gray "for elegance" is the single biggest reason AI designs feel hard to read.
- Gray text on a colored background looks washed out. Use a darker shade of the background's own hue, or a transparency of the text color.

#### Typography

- Hero / display heading ceiling: clamp() max ≤ 6rem (~96px). Above that the page is shouting, not designing.
- Display heading letter-spacing floor: ≥ -0.04em. Anything tighter and letters touch; cramped, not "designed".
- Use `text-wrap: balance` on h1–h3 for even line lengths; `text-wrap: pretty` on long prose to reduce orphans.
- Cap font-family count at 3 (display + body + optional mono). More than 3 reads as indecision, not richness. One well-tuned family with weight contrast usually beats three competing typefaces.
- Don't pair fonts that are similar but not identical (two geometric sans-serifs, two humanist sans-serifs). Pair on a contrast axis (serif + sans, geometric + humanist) or use one family in multiple weights.
- No all-caps body copy. Reserve uppercase for short labels (≤4 words), section eyebrows (used sparingly per the Absolute bans), and badges. Sentences in ALL CAPS are unreadable at body sizes.
- Hierarchy through scale + weight contrast (≥1.25 ratio between steps). Avoid flat scales.

#### Layout

- Vary spacing for rhythm.
- Cards are the lazy answer. Use them only when they're truly the best affordance. Nested cards are always wrong.
- Build a semantic z-index scale (dropdown → sticky → modal-backdrop → modal → toast → tooltip). Never arbitrary values like 999 or 9999.

#### Motion

- Staggering the items within one list is legitimate. The tell is the uniform reflex (one identical entrance applied to every section), not motion itself; each reveal should fit what it reveals. Suppressing the reflex is never a reason to ship a page with no motion at all.
- Reveal animations must enhance an already-visible default. Don't gate content visibility on a class-triggered transition; transitions pause on hidden tabs and headless renderers, so the reveal never fires and the section ships blank.
- Premium motion materials are not just transform/opacity. Blur, backdrop-filter, clip-path, mask, and shadow/glow are part of the palette when they materially improve the effect and stay smooth.

#### Interaction

- Dropdowns rendered with `position: absolute` inside an `overflow: hidden` or `overflow: auto` container will be clipped. Use the native `<dialog>` / popover API, `position: fixed`, or a portal to escape the stacking context.

### Copy

- Every word earns its place. No restated headings, no intros that repeat the title.
- **No em dashes.** Use commas, colons, semicolons, periods, or parentheses. Also not `--`.
- **No aphoristic-cadence body copy as a default voice.** Don't fall into the rhythm of "serious statement, then punchy short negation" as the page's recurring voice. If three or more section copy blocks on the page land on a short rebuttal-shaped sentence, rewrite. Specific, not aphoristic.
- **No marketing buzzwords.** The streamline / empower / supercharge / leverage / unleash / transform / seamless / world-class / enterprise-grade / next-generation / cutting-edge / game-changer / mission-critical family of phrases. Pick a specific noun and a verb that describes what the product literally does.
- Button labels: verb + object. "Save changes" beats "OK"; "Delete project" beats "Yes". The label should say what will happen.
- Link text needs standalone meaning. "View pricing plans" beats "Click here"; screen readers announce links out of context.

### The AI slop test

If someone could look at this interface and say "AI made that" without doubt, it's failed. Cross-register failures are the Absolute Bans above. Register-specific failures live in each register reference.

**Category-reflex check.** Run at two altitudes; the second one catches what the first one misses.

- **First-order:** if someone could guess the theme + palette from the category alone, it's the first training-data reflex. Rework the scene sentence and color strategy until the answer isn't obvious from the domain.
- **Second-order:** if someone could guess the aesthetic family from category-plus-anti-references ("AI workflow tool that's not SaaS-cream → editorial-typographic", "fintech that's not navy-and-gold → terminal-native dark mode"), it's the trap one tier deeper. The first reflex was avoided; the second wasn't. Rework until both answers are not obvious. The brand register's reflex-reject aesthetic lanes (in `reference/brand-dp.md`) list catches the currently-saturated families.

### New projects only (brand register)

When no prior design system or committed brand colors exist:

#### Color strategy vocabulary

Pick a **color strategy** before picking colors. Four steps on the commitment axis:

- **Restrained**: tinted neutrals + one accent ≤10%. Product register default; brand minimalism.
- **Committed**: one saturated color carries 30–60% of the surface. Brand register default for identity-driven pages.
- **Full palette**: 3–4 named roles, each used deliberately. Brand campaigns; product data viz.
- **Drenched**: the surface IS the color. Brand heroes, campaign pages. Break-Glass Rule applies.

This vocabulary is queryable via `get_color_strategy()` from the Application MCP.

## Commands

All commands from Impeccable are available, adapted for DesignerPunk context:

| Command | Category | Description | Reference |
|---------|----------|-------------|-----------|
| `craft` | Build | Shape, then build end-to-end | reference/craft.md |
| `shape` | Build | Plan UX/UI before code | reference/shape.md |
| `extract` | Build | Pull reusable tokens/components (governance-aware) | reference/extract-dp.md |
| `critique` | Evaluate | UX design review | reference/critique.md |
| `audit` | Evaluate | Technical quality checks | reference/audit.md |
| `polish` | Refine | Final quality pass | reference/polish.md |
| `bolder` | Refine | Amplify safe designs | reference/bolder.md |
| `quieter` | Refine | Tone down aggressive designs | reference/quieter.md |
| `distill` | Refine | Strip to essence | reference/distill.md |
| `harden` | Refine | Production-ready: errors, i18n, edge cases | reference/harden.md |
| `onboard` | Refine | First-run flows, empty states | reference/onboard.md |
| `animate` | Enhance | Add purposeful motion | reference/animate.md |
| `colorize` | Enhance | Add strategic color | reference/colorize.md |
| `typeset` | Enhance | Improve typography | reference/typeset.md |
| `layout` | Enhance | Fix spacing and hierarchy | reference/layout.md |
| `delight` | Enhance | Add personality | reference/delight.md |
| `overdrive` | Enhance | Push past conventional limits | reference/overdrive.md |
| `clarify` | Fix | Improve UX copy | reference/clarify.md |
| `adapt` | Fix | Adapt for different devices | reference/adapt.md |
| `optimize` | Fix | Performance improvements | reference/optimize.md |
| `live` | Iterate | Visual variant mode in browser | reference/live.md |

**Excluded commands:** `teach` and `document` (replaced by MCP authoring workflow).

### Routing Rules

1. **No argument**: Make the recommendation context-aware instead of showing a static menu. Gather signals, then lead with 2–3 highest-value commands with a one-line rationale each, followed by the full command table as fallback. **Never auto-run a command; the recommendation is a suggestion the user confirms.**

   **Signal gathering** (run once, in parallel where possible):
   - `get_product_overview()` → register, platforms, product status
   - `find_screens({ status: "in-progress" })` → active work surfaces
   - `find_screens({ status: "blocked" })` → blocked work
   - `git status` (shell) → dirty files, recent changes

   **Reasoning heuristics** (no score to obey; reason over the signals):
   - Active in-progress screens with no prior critique → `critique` scoped to that surface.
   - `git status` shows changed markup/style files → `audit` or `polish` scoped to those files specifically, naming them.
   - Product has screens but no design philosophy authored → `shape` to establish visual direction.
   - Brand register surface with no committed color strategy → `colorize` or `craft` with color strategy as focus.
   - Recent implementation work complete → `polish` for final quality pass.
   - No clear signal from any source → fall back to the full command table grouped by category. Ask what to do.

   Keep it to 2–3 pointed picks with the exact command to type. The menu stays the fallback; the recommendation is the lede.

2. **First word matches a command**: Load its reference file and follow instructions. Everything after the command name is the target.
3. **First word doesn't match, but intent clearly maps to one command** (e.g., "fix the spacing" → `layout`, "rewrite this error message" → `clarify`, "the colors feel flat" → `colorize`): load that command's reference and proceed as if invoked. If two commands could fit, ask once which.
4. **No clear command match**: General design invocation. Apply setup, DesignerPunk design laws, register reference, and the full argument as context.

## DesignerPunk-Specific Additions

Beyond Impeccable's standard flow, always:
- Validate component composition via `validate_assembly()` and `check_composition()`
- Select components via `find_components()` and `get_prop_guidance()`
- Reference behavioral contracts for state coverage (not just a checklist)
- Declare color strategy tier for every surface
- Check named design rules as constraints during implementation
- Run anti-slop checks (first-order and second-order category-reflex)

# Task 14 Summary: `generate` reads the consumer's own source (U9)

**Spec**: 129 - Consumer-Generation Completeness · **Unit**: U9 · **Date**: 2026-11-08

## What changed for an adopter

- `generate` now reads the whole token source `init` copied: the colour palette, the opacity values, the motion and layering tokens, the font-size and line-height values behind icon sizes, and the DTCG/Figma export, as well as spacing and the other non-colour primitives. Editing any of them in your copy changes your output. A packed-install test edits each group and finds the value in the output, and another deletes the package's own copies and finds identical output.
- The dark and WCAG override maps are read by registration. For each built-in theme your `designerpunk.config.ts` registers, `generate` reads your own map. `init` now writes the WCAG entry with both maps (`{ light, dark }`, `mode: 'both'`).
- A theme you register is applied. On web it is written as `:root[data-theme="<name>"]`, which matches the `<html>` element only; on iOS and Android it is a theme instance. A theme of one mode shows the base in its other scheme.
- `generate` refuses, naming the config entry, a theme it cannot name on both platforms. No readable config trips any of the eight refusals.
- `generate` now writes one small file, `<output>/.theme-notice.json`, which remembers the first-run count so it prints once per change.

## Release-note text

"**Dark and WCAG maps now come from your copy, with a bridge.** `generate` used to apply DesignerPunk's own dark and WCAG override maps whatever your config said. It now reads the map of each built-in theme your config registers (`dark`, and `wcag` light and dark), so a value you edit in your copy of `src/tokens/themes/` reaches your output. A built-in map your config does not register is still applied from the installed package, as before, with a warning on every run naming the config line that would make it yours. This bridge is retired at the next major release (planned 17.0.0), after which an unregistered built-in theme is not applied and `generate` says so. `generate` never fails on an unregistered built-in map. If your registered map differs from DesignerPunk's, the first run after upgrading prints how many values now differ: that is your own declared value arriving, not a change we made. A repo whose config registers `wcag` in the old one-map form keeps the package's WCAG dark map, with the warning, until it registers both maps. To register all three, use the entries `init` writes now: `{ name: 'dark', mode: 'dark', overrides: darkSemanticOverrides }` and `{ name: 'wcag', mode: 'both', overrides: { light: wcagSemanticOverrides, dark: darkWcagSemanticOverrides } }`."

"**A theme of one mode shows the base in its other scheme.** A registered theme of mode `light` or `dark` covers one colour scheme. On web its block writes `light-dark(<its value>, <the base value>)`, with no `color-scheme` line, so in the other scheme the page shows the base. On iOS and Android the other scheme's instance is the base instance (`brandLight` with `baseDark`). Register the theme with `mode: 'both'`, or in the `{ light, dark }` form, to give it its own look in both."

## Open

The four harness contexts and the instance check are green at head H = `ee069f45f` (run 42442859485; the lines are in the completion doc, rows 6 and 28). `verify-signing-chain --audit --pr 763` prints one `anomaly 4` line for Sparky's confirmation, a known instrument defect (Thurgood's record `.kiro/issues/2026-10-26-signing-chain-audit-false-verdicts.md` § 1 item 2); the criterion's "green" is unmet while it stands. Thurgood's rule 5 outcome line on the install-doc grant landed in #764 (`ac4f44687`, 03:42:48Z), before U9's merge (`c2b844152`, 03:57:47Z); completion-doc row 29 is ✅ from the post-merge evidence PR. The audit anomaly is being fixed by Peter's ruling of 03:55:36Z; the audit is re-read after that PR merges. `Token-Governance.md` L242 and L264 are the Req 15.6 ballot edit (tasks.md L246): Thurgood holds it, Ada writes the text, due before the S of the release carrying U9. The Q3b fork is its own root record (`manual` Trigger).

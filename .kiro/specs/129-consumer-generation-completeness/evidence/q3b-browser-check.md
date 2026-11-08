# Q3b browser check (Task 14.5)

**Author**: Sparky. **Date**: 2026-11-07. **Branch**: `task/129-14-sparky`, built from `ec23a5a18`.

## Browser

Google Chrome **149.0.7827.54** (`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --version`), run headless (`--headless=new`). It was already installed; nothing was downloaded. User agent reported by the page: `HeadlessChrome/149.0.0.0`.

## Q3b, as design states it

design.md § 10 "Effects", "On web": a registered custom theme emits as `:root[data-theme="<name>"]`, which matches `<html>` only, so the "page-wide" caveat stays until Q3b. And: "**Q3b**, the web `data-theme` selector's scope, stays Peter's fork after Sparky's committed browser check. Not decided here." This file gives the facts. The fork is Ada's to file, with Leonardo on intent.

## What the check shows for it

1. A custom theme on `<html>` themes a real DesignerPunk component **inside its shadow root**, in both colour schemes, including the single-mode form (`light-dark()` with base in the uncovered half). Chrome resolves `light-dark()` there against the inherited `color-scheme`.
2. The same attribute on a wrapping element does **not** theme anything: a `button-cta` inside `<div data-theme="brand">`, with `<html>` unthemed, resolved to base, not to the brand value. The selector `:root[data-theme=...]` matches `<html>` only, so the page-wide scope is a fact of the selector in a real browser, not only in the text.
3. The one-mode forms behave as design § 4 states: `brand` (mode `light`) shows its colour in light and base dark in dark; `default` (mode `dark`) shows base light in light and its colour in dark. Nothing forces the page's scheme.

What this does not settle: whether a subtree *should* be themeable (a different selector, such as `[data-theme]`, would change the block shape and the cascade). That is the fork. This check shows the current selector's behaviour only.

## Scratch consumer (never test01)

Commands, in order (paths under the session scratchpad `.../scratchpad/`):

```
cd <scratchpad>/wt-sparky            # worktree of task/129-14-sparky at ec23a5a18
npm run build                        # prepack builds dist/; exit 0
npm pack --ignore-scripts --pack-destination ../u9/pack     # -> 3fn-core-16.2.0.tgz
mkdir u9/q3b-consumer && cd u9/q3b-consumer && npm init -y && npm install ../pack/3fn-core-16.2.0.tgz
# designerpunk.config.ts = Task 11's config C (below)
npx designerpunk generate
```

Config C (as in `src/cli/__tests__/configCThemesReachNativeOutput.test.ts`):

```ts
export default {
  name: 'PB', abbreviation: 'PB',
  themes: [
    { name: 'wcag', mode: 'both', overrides: {} },
    { name: 'high-contrast', mode: 'both', overrides: { 'color.action.primary': { primitiveReferences: { value: 'purple500' } } } },
    { name: 'brand', mode: 'light', overrides: { 'color.action.primary': { primitiveReferences: { value: 'pink300' } } } },
    { name: 'default', mode: 'dark', overrides: { 'color.action.primary': { primitiveReferences: { value: 'teal300' } } } },
  ],
};
```

`generate` printed: `Themes: wcag (both), high-contrast (both), brand (light), default (dark) — registered and applied: ...`. The emitted web blocks (`dist/DesignTokens.web.css` L935-953):

```css
:root[data-theme="high-contrast"] { --color-action-primary: oklch(0.4 0.183 310); }
:root[data-theme="brand"]   { --color-action-primary: light-dark(oklch(0.65 0.242 10), oklch(0.76 0.148 202.5)); }
:root[data-theme="default"] { --color-action-primary: light-dark(oklch(0.76 0.148 202.5), oklch(0.52 0.08 209)); }
```

Base `:root` (L549): `--color-action-primary: oklch(0.76 0.148 202.5);` with `color-scheme: light dark` (L13).

## Page

Path: `<scratchpad>/u9/q3b-consumer/page/index.html`, SHA-256 `0ee01d207aa45b08344ee120ef3b6a43c720d61c32e4f4b599fc8d278dc97276`. Beside it are copies of the consumer's generated `DesignTokens.web.css` and `ComponentTokens.web.css` and the package's `dist/browser/designerpunk.umd.js` (defines `button-cta`). Source:

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="DesignTokens.web.css">
<link rel="stylesheet" href="ComponentTokens.web.css">
<script src="designerpunk.umd.js"></script>
</head>
<body>
<button-cta id="b" label="Probe"></button-cta>
<div id="wrap" data-theme="brand"><button-cta id="b2" label="Subtree"></button-cta></div>
<pre id="out">pending</pre>
<script>
const cases = [
  ['brand','light','oklch(0.65 0.242 10)'],
  ['brand','dark','oklch(0.76 0.148 202.5)'],
  ['default','light','oklch(0.76 0.148 202.5)'],
  ['default','dark','oklch(0.52 0.08 209)'],
  ['high-contrast','light','oklch(0.4 0.183 310)'],
  ['high-contrast','dark','oklch(0.4 0.183 310)'],
  [null,'light','oklch(0.76 0.148 202.5)'],
  [null,'dark','oklch(0.76 0.148 202.5)'],
];
function expected(v){const d=document.createElement('div');d.style.backgroundColor=v;document.body.appendChild(d);const r=getComputedStyle(d).backgroundColor;d.remove();return r;}
window.addEventListener('load', async () => {
  await customElements.whenDefined('button-cta');
  await new Promise(r=>setTimeout(r,500));
  const b = document.getElementById('b');
  const root = document.documentElement;
  const lines = ['ua: '+navigator.userAgent, 'shadowRoot: '+(b.shadowRoot?'yes':'NO')];
  const btn = b.shadowRoot && b.shadowRoot.querySelector('button');
  /* Harness: headless virtual time does not advance CSS transitions, so the button's background-color transition is switched off to read its settled value. */
  const nt=document.createElement('style');nt.textContent='*{transition:none !important}';b.shadowRoot.appendChild(nt);
  const probe=document.createElement('div');probe.style.cssText='background-color:var(--color-action-primary);transition:none';b.shadowRoot.appendChild(probe);
  for (const [theme, scheme, exp] of cases) {
    if (theme) root.setAttribute('data-theme', theme); else root.removeAttribute('data-theme');
    root.style.colorScheme = scheme;
    await new Promise(r=>setTimeout(r,1500));
    const probeResolved = getComputedStyle(probe).backgroundColor;
    const resolved = btn ? getComputedStyle(btn).backgroundColor : 'NO-BUTTON';
    const token = getComputedStyle(root).getPropertyValue('--color-action-primary').trim();
    const e = expected(exp);
    lines.push(`RESULT theme=${theme} scheme=${scheme} token=--color-action-primary declared=${token} expected=${exp} -> ${e} probe-in-shadow=${probeResolved} ${e===probeResolved?'MATCH':'MISMATCH'} button-cta-in-shadow=${resolved} ${e===resolved?'MATCH':'MISMATCH'}`);
  }
  root.removeAttribute('data-theme'); root.style.colorScheme='light';
  await new Promise(r=>setTimeout(r,500));
  const b2=document.getElementById('b2'); const nt2=document.createElement('style');nt2.textContent='*{transition:none !important}';b2.shadowRoot.appendChild(nt2);
  const sub=getComputedStyle(b2.shadowRoot.querySelector('button')).backgroundColor;
  const e2=expected('oklch(0.76 0.148 202.5)');
  lines.push(`SUBTREE data-theme="brand" on a wrapping div, <html> unthemed, scheme=light: expected-base=${e2} (brand light would be ${expected('oklch(0.65 0.242 10)')}) resolved-in-shadow=${sub} ${sub===e2?'BASE (theme did not apply)':'OTHER'}`);
  document.getElementById('out').textContent = lines.join('\n');
  document.title='done';
});
</script>
</body>
</html>
```

Run:

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --virtual-time-budget=30000 --allow-file-access-from-files --dump-dom "file://<scratchpad>/u9/q3b-consumer/page/index.html"
```

Two things about the harness, stated so nobody reads the check as more than it is:
- Headless virtual time does not advance CSS transitions, so the page switches the `button-cta`'s transitions off (a `<style>` appended inside its shadow root) before reading its settled background. Without that, the first run read a mid-transition value and showed false mismatches. The probe div (also inside the shadow root, `transition: none`) is untouched evidence and matched in every case in both runs.
- The scheme is forced by `document.documentElement.style.colorScheme`, not by the device's preference, which is the same inheritance the single-mode rule relies on.

## Results (the page's own output)

Token: `--color-action-primary`. "Expected" is the colour as a plain element in the same document resolves it. "Probe" is a div in the shadow root with `background-color: var(--color-action-primary)`; "button-cta" is the component's own `<button>` background, in its shadow root.

| `<html data-theme>` | scheme | expected | probe in shadow root | button-cta in shadow root |
|---|---|---|---|---|
| brand (light) | light | oklch(0.65 0.242 10) | oklch(0.65 0.242 10) | oklch(0.65 0.242 10) |
| brand (light) | dark | oklch(0.76 0.148 202.5) (base) | oklch(0.76 0.148 202.5) | oklch(0.76 0.148 202.5) |
| default (dark) | light | oklch(0.76 0.148 202.5) (base) | oklch(0.76 0.148 202.5) | oklch(0.76 0.148 202.5) |
| default (dark) | dark | oklch(0.52 0.08 209) | oklch(0.52 0.08 209) | oklch(0.52 0.08 209) |
| high-contrast (both) | light | oklch(0.4 0.183 310) | oklch(0.4 0.183 310) | oklch(0.4 0.183 310) |
| high-contrast (both) | dark | oklch(0.4 0.183 310) | oklch(0.4 0.183 310) | oklch(0.4 0.183 310) |
| none | light | oklch(0.76 0.148 202.5) | oklch(0.76 0.148 202.5) | oklch(0.76 0.148 202.5) |
| none | dark | oklch(0.76 0.148 202.5) | oklch(0.76 0.148 202.5) | oklch(0.76 0.148 202.5) |

Subtree case: `<div data-theme="brand">` around a `button-cta`, `<html>` unthemed, scheme light: expected base oklch(0.76 0.148 202.5) (brand light would be oklch(0.65 0.242 10)); resolved in the shadow root oklch(0.76 0.148 202.5). **The theme did not apply.**

All eight scheme cases: 16 of 16 comparisons match, 0 mismatches. Raw output: the page's `<pre id="out">` (`u9/dom-result.txt`).

Checked by one browser (Chrome 149, Blink). Firefox and Safari are installed but were not run.

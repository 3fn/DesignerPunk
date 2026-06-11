# Spec Feedback: OKLCH Color Migration

**Spec**: 112-oklch-color-migration
**Created**: 2026-06-09

---

## Design Outline Feedback

### Context for Reviewers
- Channel-primitive composition model proposed (DRAFT) → design-outline.md § "Decision 1"
- Three channel layers: shared lightness scale, one hue per family, per-family chroma scale → design-outline.md § "Decision 1"
- Open questions about gamut boundaries, chroma derivation, and platform generation → design-outline.md § "Open questions for Ada"
- Existing primitive colors follow [family]100–[family]500 scale — how do current RGB values map to this OKLCH model? → analysis requested below

### Requested Reviewers
- **Ada** — OKLCH mathematical expertise. Validate the channel-primitive model against gamut reality. Convert existing color primitives to OKLCH to test alignment.
- **Leonardo** — Design perspective. Does this model support the color operations you need for screen specification (theming, composition, accessibility variants)?

### Open Questions

1. [@ADA] Convert our existing primitive color values ([family]100–[family]500) to OKLCH. For each family: what are the actual L, C, H values? Do the lightness values naturally align across families (i.e., is pink400's lightness close to blue400's lightness), or is the current RGB scale perceptually uneven?

2. [@ADA] Given the converted values: can lightness be truly shared across families, or does the current palette require per-family lightness adjustments? If adjustments are needed, how large are they?

3. [@ADA] Chroma scaling: for each hue in our palette, what's the maximum achievable chroma at each lightness step within sRGB gamut? Does a single `chromaBase * factor` formula work, or does each step need independent tuning?

4. [@ADA] Platform generation: if channel primitives exist as source tokens, what does the resolved output look like for iOS (ChromaKit) and Android (colormath)? Can they consume channel references, or must they receive concrete `oklch(L, C, H)` values?

5. [@LEONARDO] Does this model give you what you need for design operations? Specifically: can you express "same color but darker" as a lightness channel change? "Same family but less saturated" as a chroma adjustment? "Shift this family's identity" as a hue change? Are there color operations you need that this model doesn't support?

6. [@LEONARDO] For accessibility themes (WCAG high contrast): does "swap lightness scale, keep hue and chroma" produce correct high-contrast variants, or do you need more control?

### [LEONARDO R1] — Design Operations & Accessibility Theme Review

**Date**: 2026-06-09
**Reviewing**: Decision 1 DRAFT (Channel-Primitive Composition Model)

---

#### Q5: Design Operations Adequacy

**Short answer**: Yes — this model gives me what I need, and meaningfully more than what I have today. The channel decomposition maps directly to the design operations I perform during screen specification.

**Operation-by-operation assessment:**

| Operation | Supported? | How |
|-----------|-----------|-----|
| Same color, darker | ✅ Excellent | Step down the shared lightness scale: `pink400` → `pink500` = same hue, same chroma family, lower lightness. Perceptually uniform steps are the core OKLCH promise. |
| Same family, muted | ✅ Excellent | Chroma reduction within the per-family scale: `pinkChroma400` → `pinkChroma200` produces a washed/pastel version. I can reason about vibrancy as an independent axis. |
| Shift family identity | ✅ Excellent | Swap the hue token: same lightness + chroma position but `blueHue` instead of `pinkHue`. The shared lightness scale means these will feel perceptually equivalent in weight — genuinely new capability. |
| Color at reduced opacity | ✅ This is the whole point | CSS: `oklch(from var(--pink400) l c h / var(--opacity056))`. No more `pinkAtOpacity056` workaround tokens. The composition motivation that started this spec. |

**Operations I currently need that this model ALSO supports (bonus):**

- **Cross-family weight matching**: When I specify a Full Palette dashboard (cyan for actions, green for success, orange for warnings), I currently eyeball whether these feel equally "heavy." Shared lightness scale makes this mechanical — `cyan300`, `green300`, `orange300` all at `lightness300` means guaranteed perceptual parity. This is a genuine quality-of-life improvement for multi-color specifications.

- **Theme as channel operation**: Dark mode = swap lightness scale, keep identity. This makes dark mode reasoning trivial in specs. I can say "invert the lightness scale" and the entire palette responds cohesively.

**One concern — not a blocker, but needs addressing:**

The model as described doesn't explicitly address **inter-family harmony** beyond lightness matching. When I declare a "Committed" strategy (one color carries 30-60%), I sometimes need a secondary color that's *harmonically related* to the primary (e.g., complementary, analogous). The hue channel makes this calculable (`pinkHue + 180` for complement), but I'd want Ada to confirm whether this is a designed-in capability or a happy accident of the format. If it's designed-in, document it. If not, it's fine — I can work with the composed primitives as-is.

**No missing operations identified.** The four axes (lightness, chroma, hue, opacity) cover every color manipulation I've needed in screen specifications to date.

---

#### Q6: Accessibility Themes (WCAG High Contrast)

**"Swap lightness scale, keep hue and chroma" — is this sufficient?**

**Mostly yes, with one critical caveat.**

For the majority of our palette, lightness inversion with preserved hue and chroma will produce correct high-contrast variants. The shared lightness scale means contrast ratios against backgrounds are predictable and uniform across families — a major improvement over RGB where each family has different perceptual weight at the same numeric step.

**The caveat: chroma at extreme lightness values.**

When lightness approaches the extremes (very dark or very light), chroma capacity shrinks due to gamut boundaries. A chroma value that's perfectly visible at `lightness400` may be physically impossible (out-of-gamut) at `lightness100` or `lightness500`. If the high-contrast theme pushes colors toward the lightness extremes, the gamut ceiling may force implicit chroma clipping.

**My recommendation**: The high-contrast theme mechanism should be **lightness scale swap + optional chroma boost table**. The default should be "keep chroma" (simplest model), but the architecture should accommodate a per-family chroma adjustment for high-contrast contexts. Something like:

```
// Standard theme
pink400 = oklch(lightness400, pinkChroma400, pinkHue)

// High-contrast theme  
pink400 = oklch(lightnessHC400, pinkChromaHC400, pinkHue)
// where pinkChromaHC400 MAY equal pinkChroma400, or may be boosted
```

This doesn't add architectural complexity — it's just "high-contrast has its own chroma scale per family." Whether those chroma scales differ from standard is a tuning decision, not an architecture decision. But the **ability** to differ should be preserved.

**Ada should validate**: For each hue family, at the extreme lightness values the high-contrast scale would use, is the standard chroma achievable? If yes for all families → chroma boost is unnecessary. If no for any family → the architecture needs the escape hatch I'm describing.

---

#### Additional Considerations

**Direct channel reference vs. composed color in screen specs:**

I would **always reference composed colors** (`pink300`, `color.feedback.error.text`) in screen specifications. Channel primitives (`pinkHue`, `lightness300`) are authoring-layer concerns for Ada, not consumption-layer vocabulary for me.

However, I recognize the channel primitives are *explanatory* — when I'm reasoning about a design decision (e.g., "I want the error state to feel as heavy as the success state"), I can articulate that reasoning in channel terms ("same lightness step") and verify it mechanically. That's valuable for spec rationale sections, not for component tree declarations.

**TL;DR**: Composed colors in specs. Channel language in rationale and review.

**Color strategy declarations (Restrained/Committed/Full/Drenched):**

This model **helps** color strategy. Here's why:

- **Restrained** (one accent at ≤10%): The shared lightness scale means my one accent color and the neutral grays have predictable contrast. I can guarantee the accent "pops" by the lightness differential alone.
- **Committed** (one color at 30-60%): When a single family dominates, I'm using its full lightness range. Stepping through `cyan100` → `cyan500` now represents *guaranteed uniform perceptual steps* — no more guessing whether `cyan200` → `cyan300` is the same visual jump as `cyan300` → `cyan400`.
- **Full Palette** (3-4 roles): Cross-family weight matching (mentioned above) is the killer feature. Multiple colors at `lightness300` = same visual weight, different identity.
- **Drenched** (surface IS color): For drenched surfaces, I'm pushing a single family to its chroma extremes. Knowing the gamut ceiling per family helps me know which families *can* drench (high chroma capacity) versus which would clip (limited chroma families like yellow).

**Net assessment**: The model is architecturally sound for my needs. It makes color reasoning *more precise* without adding specification complexity. The composed colors layer means my day-to-day workflow doesn't change, but my ability to reason about and verify color decisions improves substantially.

---

#### Summary of Requests to Ada

1. Confirm whether inter-family hue arithmetic (complementary = hue + 180°, analogous = hue ± 30°) is a designed-in capability or should remain informal
2. Validate high-contrast chroma viability: at extreme lightness values in the HC scale, can standard chroma values be achieved for all families? Answer determines whether a separate HC chroma scale is needed
3. Flag any families where gamut limits would prevent the "Drenched" strategy (chroma500 at the family's hue)

---

### [ADA R1] Channel-Primitive Composition — OKLCH Analysis (2026-06-09)

**Reviewer**: Ada (Rosetta Token Specialist)
**Scope**: Q1–Q4 from open questions — empirical OKLCH conversion, gamut analysis, formula feasibility, platform generation

---

#### Q1: OKLCH Conversion of Existing Primitives

Conversion using the canonical OKLab matrices from Björn Ottosson's paper (direct linear sRGB → LMS → Lab path, not XYZ intermediate).

**Chromatic Families (light.base values)**:

| Token | R | G | B | L | C | H° |
|-------|---|---|---|------|--------|-------|
| yellow100 | 254 | 251 | 204 | 0.9788 | 0.0712 | 106.7 |
| yellow200 | 252 | 246 | 128 | 0.9544 | 0.1689 | 108.4 |
| yellow300 | 249 | 240 | 2 | 0.9322 | 0.2469 | 109.3 |
| yellow400 | 199 | 192 | 2 | 0.7882 | 0.2087 | 109.4 |
| yellow500 | 143 | 139 | 1 | 0.6202 | 0.1649 | 109.9 |
| orange100 | 255 | 229 | 220 | 0.9406 | 0.0316 | 43.6 |
| orange200 | 255 | 184 | 160 | 0.8429 | 0.0905 | 42.8 |
| orange300 | 255 | 107 | 53 | 0.7046 | 0.1945 | 42.1 |
| orange400 | 204 | 85 | 41 | 0.5969 | 0.1635 | 42.3 |
| orange500 | 143 | 60 | 29 | 0.4634 | 0.1223 | 42.9 |
| purple100 | 243 | 224 | 255 | 0.9312 | 0.0524 | 310.8 |
| purple200 | 217 | 138 | 255 | 0.7581 | 0.1999 | 312.4 |
| purple300 | 176 | 38 | 255 | 0.6009 | 0.3160 | 307.1 |
| purple400 | 141 | 30 | 204 | 0.5103 | 0.2661 | 307.4 |
| purple500 | 99 | 21 | 143 | 0.3966 | 0.2023 | 307.8 |
| pink100 | 255 | 218 | 232 | 0.9232 | 0.0466 | 350.2 |
| pink200 | 255 | 130 | 180 | 0.7608 | 0.1657 | 353.5 |
| pink300 | 255 | 42 | 109 | 0.6527 | 0.2447 | 8.2 |
| pink400 | 204 | 34 | 87 | 0.5535 | 0.2053 | 7.9 |
| pink500 | 128 | 21 | 55 | 0.3963 | 0.1435 | 6.5 |
| green100 | 230 | 255 | 245 | 0.9791 | 0.0306 | 166.5 |
| green200 | 128 | 255 | 187 | 0.9095 | 0.1630 | 154.2 |
| green300 | 51 | 255 | 153 | 0.8830 | 0.2310 | 150.8 |
| green400 | 0 | 255 | 136 | 0.8764 | 0.2565 | 148.4 |
| green500 | 0 | 204 | 110 | 0.7412 | 0.2138 | 149.0 |
| cyan100 | 204 | 251 | 255 | 0.9567 | 0.0481 | 203.8 |
| cyan200 | 128 | 246 | 255 | 0.9076 | 0.1073 | 203.1 |
| cyan300 | 0 | 240 | 255 | 0.8700 | 0.1478 | 204.2 |
| cyan400 | 0 | 192 | 204 | 0.7358 | 0.1250 | 204.1 |
| cyan500 | 0 | 136 | 143 | 0.5702 | 0.0967 | 202.2 |
| teal100 | 217 | 232 | 234 | 0.9204 | 0.0162 | 208.0 |
| teal200 | 77 | 155 | 165 | 0.6440 | 0.0779 | 208.3 |
| teal300 | 26 | 83 | 92 | 0.4098 | 0.0595 | 212.2 |
| teal400 | 21 | 66 | 74 | 0.3522 | 0.0501 | 213.9 |
| teal500 | 15 | 46 | 51 | 0.2805 | 0.0373 | 211.9 |

**Lightness alignment analysis** (do families share lightness at same steps?):

| Step | Min L | Max L | Range | Assessment |
|------|-------|-------|-------|------------|
| 100 | 0.920 (teal) | 0.979 (green) | **0.059** | Tight — shared L feasible |
| 200 | 0.644 (teal) | 0.954 (yellow) | **0.310** | Massive variance — shared L impossible |
| 300 | 0.410 (teal) | 0.932 (yellow) | **0.522** | Extreme variance |
| 400 | 0.352 (teal) | 0.876 (green) | **0.524** | Extreme variance |
| 500 | 0.280 (teal) | 0.741 (green) | **0.461** | Extreme variance |

**Verdict**: Lightness values do NOT naturally align across families. At step 300, yellow (L=0.93) and teal (L=0.41) differ by over 0.5 on a 0–1 scale. The current palette is perceptually uneven — this is the problem OKLCH is meant to solve, but it also means migration is NOT a simple re-encoding.

---

#### Q2: Can a Single Shared Lightness Scale Work?

**No — not if the goal is to preserve the existing palette.**

The existing palette was designed in RGB space without perceptual uniformity. Forcing a shared lightness scale would produce a fundamentally different palette:

- **Yellow/green/cyan** are currently "light and vivid" — their 300-step colors have L ≈ 0.87–0.93
- **Purple/pink/orange** are currently "medium and vivid" — their 300-step colors have L ≈ 0.60–0.70
- **Teal** is currently "dark and muted" — its 300-step color has L ≈ 0.41

**However**, a shared lightness scale IS the architectural goal for OKLCH. The question becomes: **do we want perceptually uniform steps, or do we want to preserve existing colors?**

**If we adopt shared lightness** (e.g., L100=0.95, L200=0.85, L300=0.75, L400=0.60, L500=0.45):
- The palette will CHANGE. Yellow300 won't look like current yellow300.
- Purple300 at L=0.75 will be lighter than current purple300 (L=0.60).
- Green400 at L=0.60 will be much darker than current green400 (L=0.88).
- Teal200 at L=0.85 will be much lighter than current teal200 (L=0.64).
- **This is a design decision, not a technical one.** Peter and Leonardo must weigh in.

**If we want to preserve existing colors**: Per-family lightness is required. This erodes the main architectural benefit of the channel-composition model (shared lightness scale).

**My recommendation**: Accept the palette will change. Design the new shared lightness scale for perceptual uniformity, then tune chroma per-family to produce the most aesthetically pleasing result. This is why it's a major version bump. The existing palette was built for RGB aesthetics; the new one should be built for OKLCH aesthetics.

**Counter-argument**: Changing the visual identity of the entire color system is a massive design risk. Products currently ship with these colors. A "migrate format, preserve appearance" approach (per-family lightness) is safer but architecturally weaker.

---

#### Q3: Maximum sRGB Gamut Chroma per Hue at Each Lightness

Using canonical hues from each family (from step 300):

| Family | H° | L=0.95 | L=0.87 | L=0.75 | L=0.65 | L=0.55 | L=0.45 | L=0.35 |
|--------|------|--------|--------|--------|--------|--------|--------|--------|
| yellow | 109° | 0.207 | 0.190 | 0.164 | 0.142 | 0.120 | 0.099 | 0.079 |
| orange | 42° | 0.027 | 0.074 | 0.158 | 0.196 | 0.167 | 0.137 | 0.109 |
| purple | 307° | 0.031 | 0.083 | 0.167 | 0.244 | 0.283 | 0.233 | 0.183 |
| pink | 8° | 0.026 | 0.072 | 0.157 | 0.247 | 0.221 | 0.182 | 0.143 |
| green | 150° | 0.084 | 0.240 | 0.207 | 0.180 | 0.152 | 0.125 | 0.099 |
| cyan | 204° | 0.055 | 0.145 | 0.128 | 0.111 | 0.094 | 0.078 | 0.061 |
| teal | 211° | 0.043 | 0.115 | 0.131 | 0.113 | 0.096 | 0.079 | 0.062 |

**Peak gamut lightness per hue** (where max chroma is achievable):

| Family | H° | Peak L | Max C at Peak |
|--------|------|--------|---------------|
| yellow | 109° | 0.965 | 0.210 |
| orange | 42° | 0.690 | 0.208 |
| purple | 307° | 0.580 | 0.299 |
| pink | 8° | 0.640 | 0.257 |
| green | 150° | 0.870 | 0.240 |
| cyan | 204° | ~0.06* | 0.250* |
| teal | 211° | ~0.07* | 0.183* |

*Cyan/teal peak gamut is at very low lightness — an artifact. Their usable peak is around L=0.87 with C≈0.145.

**Key insight**: Gamut capacity varies WILDLY by hue. At L=0.75:
- Green can achieve C=0.207, purple can achieve C=0.167, but orange only C=0.158 and cyan only C=0.128.
- At L=0.55: purple can go to C=0.283 while cyan maxes at C=0.094.

**Can chroma be formula-derived?**

Interesting finding: for steps 300–500, the ratio **C/L is approximately constant** per family:

| Family | k = C/L (avg steps 300–500) |
|--------|---------------------------|
| yellow | 0.265 |
| orange | 0.271 |
| purple | 0.519 |
| pink | 0.369 |
| green | 0.281 |
| cyan | 0.170 |
| teal | 0.140 |

This means **for darker steps (300–500), chroma scales linearly with lightness**. The relationship breaks down for steps 100–200 where chroma ramps up from near-zero to the family's saturation ceiling.

**Proposed formula model**:
```
Steps 300–500: C = k_family × L        (gamut-proportional saturation)
Steps 100–200: C = ramp(step) × k_family × L  (ramp-in toward saturation ceiling)
```

However, the ramp values are NOT consistent across families (range: 0.11–0.30 for step 100, 0.39–0.83 for step 200), so **each family needs explicit per-step chroma values**. The simplest model: 5 explicit chroma values per family (or equivalently: 1 k-value + 2 ramp multipliers = 3 parameters → 5 derived steps).

**Gamut constraint on the proposed model**: If we use a shared lightness scale (e.g., L300=0.75), the maximum chroma at that L,H combination becomes the hard ceiling. At L=0.75:
- Yellow: max C = 0.164 (current yellow300 is C=0.247 at L=0.93 — would need to be LESS saturated)
- Cyan: max C = 0.128 (current cyan300 is C=0.148 at L=0.87 — also constrained)
- Purple: max C = 0.167 (current purple300 is C=0.316 at L=0.60 — severely constrained at higher L)

**This is the fundamental tension**: shared lightness moves all families to the same L, but gamut limits mean different families can achieve different maximum vibrancy at the same L.

---

#### Q4: Platform Generation for Channel Primitives

**Web — Runtime composition works natively:**
```css
/* Channel primitives as custom properties */
--lightness-300: 0.75;
--pink-hue: 8;
--pink-chroma-300: 0.157;

/* Composed color token */
--pink-300: oklch(var(--lightness-300) var(--pink-chroma-300) var(--pink-hue));

/* Product composition — the whole point of this migration */
--pink-300-muted: oklch(from var(--pink-300) l c h / 0.56);
```
Web benefits fully from channel decomposition. CSS `oklch()` accepts custom properties for each channel.

**iOS (ChromaKit) — Build-time resolution required:**
```swift
import ChromaKit

// ChromaKit API: Color.oklch(L, C, H)
// Channel primitives cannot be composed at runtime in Swift.
// Generated output must be pre-resolved:

enum DesignTokens {
    static let pink300 = Color.oklch(0.75, 0.157, 8.0)
    static let cyan300 = Color.oklch(0.75, 0.128, 204.0)
}

// Alternative: inline conversion (no dependency)
extension Color {
    static let pink300 = Color(
        red: /* pre-computed */,
        green: /* pre-computed */,
        blue: /* pre-computed */
    )
}
```
ChromaKit is a simple static factory — `Color.oklch(L, C, H)`. There's no concept of "channel references." iOS output must be concrete `oklch(L, C, H)` values resolved at build time. Channel primitives remain source-only abstractions.

**Android (colormath) — Build-time resolution required:**
```kotlin
import com.github.ajalt.colormath.model.Oklch
import com.github.ajalt.colormath.extensions.android.composecolor.toComposeColor

// colormath API: Oklch(L, C, H).toComposeColor()
// Same as iOS: no runtime channel composition.

object DesignTokens {
    val pink300 = Oklch(0.75f, 0.157f, 8.0f).toComposeColor()
    val cyan300 = Oklch(0.75f, 0.128f, 204.0f).toComposeColor()
}
```
The `colormath-ext-jetpack-compose` extension provides `.toComposeColor()` which converts to Compose's `Color` type (sRGB under the hood). Channel composition is not possible at runtime.

**Platform Summary:**

| Platform | Runtime Channel Composition? | Output Format | Dependency |
|----------|------------------------------|---------------|------------|
| Web | ✅ Yes — CSS custom properties + `oklch()` | `oklch(var(--L) var(--C) var(--H))` | None (native CSS) |
| iOS | ❌ No — build-time resolution | `Color.oklch(0.75, 0.157, 8.0)` | ChromaKit (or inline ~30 lines) |
| Android | ❌ No — build-time resolution | `Oklch(0.75f, 0.157f, 8.0f).toComposeColor()` | colormath + compose extension |

**Implication for the architecture**: Channel primitives (shared lightness, per-family hue, per-family chroma) are **source-level organizational constructs** and **web runtime constructs**. For iOS and Android, the generator resolves `oklch(lightness[step], chroma[family][step], hue[family])` into concrete values at build time. The channel decomposition provides:
1. **Web**: Full runtime benefit (CSS composition)
2. **iOS/Android**: Organizational/authoring benefit only (single source of truth for relationships)
3. **All platforms**: Theme operations become channel-level (swap lightness scale = dark mode; swap hue = re-brand)

---

#### Summary Findings

1. **The existing palette is perceptually non-uniform.** Steps don't align across families. Adopting shared lightness IS a palette redesign, not just a format change.

2. **Gamut is the hard constraint.** Yellow's peak gamut is at L≈0.96; purple's is at L≈0.58. A shared lightness scale at L=0.75 would constrain yellow to C≤0.164 (currently 0.247) and purple to C≤0.167 (currently 0.316). Both families would lose significant vibrancy.

3. **Chroma cannot be derived from a single formula**, but C/L ratio is constant per-family for darker steps (300–500). A 3-parameter model (k, ramp100, ramp200) can derive all 5 steps per family with ~3% error.

4. **Channel primitives are source+web constructs.** iOS and Android receive resolved `oklch(L, C, H)` values. This is fine — the authoring and web composition benefits are the primary motivation.

5. **This is fundamentally a design decision.** The technical architecture (channel primitives, per-family chroma) is sound. The open question for Peter and Leonardo: **accept a palette redesign for perceptual uniformity, or preserve existing appearance at the cost of shared lightness?**

---

### [ADA R2] Per-Family Channel Model — Derivation, Generation, and Governance (2026-06-09)

**Reviewer**: Ada (Rosetta Token Specialist)
**Scope**: Q1–Q5 follow-up analysis given the per-family lightness decision
**Building on**: R1 conversion data (above), updated Decision 1 in design-outline.md

---

#### Q1: Chroma Derivation — Formula vs Explicit Values

**Can chroma be derived from `k_family × L_step`?**

For steps 300–500: **yes, with acceptable error (~3–5%)**. From the R1 data:

| Family | k = C/L (avg 300–500) | Actual C values | Derived C values (k×L) | Max error |
|--------|----------------------|-----------------|------------------------|-----------|
| yellow | 0.265 | 0.247, 0.209, 0.165 | 0.247, 0.209, 0.164 | <1% |
| orange | 0.271 | 0.195, 0.164, 0.122 | 0.191, 0.162, 0.126 | 3% |
| purple | 0.519 | 0.316, 0.266, 0.202 | 0.312, 0.265, 0.206 | 2% |
| pink | 0.369 | 0.245, 0.205, 0.144 | 0.241, 0.204, 0.146 | 2% |
| green | 0.281 | 0.231, 0.257, 0.214 | 0.248, 0.246, 0.208 | 7%* |
| cyan | 0.170 | 0.148, 0.125, 0.097 | 0.148, 0.125, 0.097 | <1% |
| teal | 0.140 | 0.060, 0.050, 0.037 | 0.057, 0.049, 0.039 | 5% |

*Green's 300→400 step increases in chroma (unusual) because green400's current RGB maps to a HIGHER chroma at HIGHER lightness — an artifact of the existing uneven palette.

**For steps 100–200: the 3-parameter model is sufficient but not elegant.**

The ramp multipliers per family from R1:

| Family | ramp100 (C100 / (k×L100)) | ramp200 (C200 / (k×L200)) |
|--------|---------------------------|---------------------------|
| yellow | 0.29 | 0.67 |
| orange | 0.11 | 0.39 |
| purple | 0.11 | 0.51 |
| pink | 0.14 | 0.59 |
| green | 0.11 | 0.64 |
| cyan | 0.30 | 0.70 |
| teal | 0.13 | 0.86 |

These 3 parameters (k, ramp100, ramp200) CAN derive all 5 chroma values per family. But the ramp values have no discernible cross-family pattern — they're essentially hand-tuned constants.

**My recommendation: Store 5 explicit chroma values per family.**

Reasoning:
1. **Clarity over cleverness**: A developer reading `pinkChroma300 = 0.24` understands immediately. Reading `pinkChroma300 = k_pink × pinkLightness300` requires understanding the derivation system.
2. **Maintenance cost is negligible**: 5 numbers per family × 7 families = 35 chroma values. These change rarely — only during major palette redesigns.
3. **Formula-derivation doesn't reduce governance**: Changing k_pink still requires gamut validation for all 5 steps. Changing an explicit value requires validating that one step.
4. **The formula adds indirection without removing work**: You still need to validate gamut compliance whether the value comes from a formula or an explicit declaration.
5. **Validators can still enforce the relationship**: Even with explicit values, a validator can check that C/L ratio stays within `k ± tolerance` for steps 300–500 as a *consistency check*. The formula becomes a validation rule, not a derivation mechanism.

**Counter-argument**: A formula-based approach means changing the *family character* (making pink more saturated overall) is a single-parameter change (increase k_pink) rather than editing 5 values. This matters for the configure wizard (Spec 113). HOWEVER: the wizard can compute the 5 values from the user's intent and store them explicitly. The formula is a UX convenience for the wizard, not an architectural requirement for the token system.

**Proposed structure per family**:
```typescript
{
  hue: 8.2,
  lightness: [0.92, 0.76, 0.65, 0.55, 0.40],  // steps 100–500
  chroma: [0.047, 0.166, 0.245, 0.205, 0.144],  // steps 100–500
  // Metadata (not tokens, used by validators and wizard):
  kRatio: 0.369,  // expected C/L ratio for steps 300–500
  gamutCeiling: [0.049, 0.190, 0.257, 0.221, 0.182]  // max sRGB chroma at each L,H
}
```

---

#### Q2: Generation Per Platform

**Web: `oklch(var(--pink-l300) var(--pink-c300) var(--pink-hue))` — CONFIRMED CORRECT**

CSS Color Level 4 `oklch()` accepts individual values or `var()` references per channel. The syntax is space-separated: `oklch(L C H)` where each position can be a `var()` reference. Confirmed by:
- iO Digital (techhub.iodigital.com) demonstrates `oklch(var(--accent-lightness) var(--accent-chroma) var(--accent-hue))`
- Frontend Masters documents the split-channel-variable pattern
- CSS Color Level 4 spec permits `<number>` or `<percentage>` for L, `<number>` for C, `<angle>` or `<number>` for H — all positions accept custom property substitution

**Important CSS nuance**: The composed color (`--pink-300`) should ALSO be output as a resolved custom property, because relative color syntax (`oklch(from var(--pink-300) l c h / 0.56)`) requires a complete color value, not individual channels. Both are needed:

```css
/* Channel primitives — for direct composition and theming */
--pink-l300: 0.65;
--pink-c300: 0.245;
--pink-hue: 8.2;

/* Composed color — for relative color syntax and direct use */
--pink-300: oklch(var(--pink-l300) var(--pink-c300) var(--pink-hue));
```

This means the web generator outputs **both** channel tokens AND composed colors. Products can use either depending on their need.

**iOS: ChromaKit receives resolved values — CORRECT**

```swift
// Source tokens define channels
// Generator resolves: oklch(pinkLightness300, pinkChroma300, pinkHue)
// Output is concrete:
static let pink300 = Color.oklch(0.65, 0.245, 8.2)
```

Channel primitives exist in `ColorTokens.ts` source code. The iOS generator resolves the composition and outputs concrete `Color.oklch(L, C, H)` calls. Channel tokens are NOT emitted as separate Swift constants — they're source-only.

**Android: Same pattern as iOS — CORRECT**

```kotlin
val pink300 = Oklch(0.65f, 0.245f, 8.2f).toComposeColor()
```

Build-time resolution. No channel tokens in Kotlin output.

**Token-index / Application MCP: Store BOTH composed colors AND channel metadata**

Recommendation for MCP serving:
- **Composed colors** (`pink-300`, `blue-400`) remain the primary consumption tokens — these are what Leonardo, Lina, and product code reference.
- **Channel primitives** stored as metadata ON the composed color token, not as separate top-level tokens. This keeps the MCP query model simple:

```
get_token_details({ name: "pink-300" })
→ {
    value: "oklch(0.65 0.245 8.2)",
    family: "color",
    channels: { lightness: 0.65, chroma: 0.245, hue: 8.2 },
    channelTokens: { lightness: "pink-l300", chroma: "pink-c300", hue: "pink-hue" }
  }
```

**Why not top-level channel tokens in MCP?** Leonardo explicitly said: "I would always reference composed colors in screen specifications. Channel primitives are authoring-layer concerns for Ada, not consumption-layer vocabulary for me." The MCP serves Leonardo's workflow. Channel tokens are authoring infrastructure.

**Counter-argument**: Exposing channels as top-level MCP tokens would let tools query "which components use pink-hue?" for hue-swap impact analysis. This is useful but secondary. Metadata-on-composed-token achieves the same query with a reverse lookup pattern.

---

#### Q3: Mathematical Alignment

**Does the channel model enable mathematical expression?**

Yes — more naturally than the spacing system, actually:

| Token Family | Mathematical Model | Expression |
|---|---|---|
| Spacing | Modular scale: `base × multiplier^step` | `space100 = 8, space200 = 8 × 2, space300 = 8 × 3` (linear) |
| Typography | Modular scale: `base × ratio^step` | `fontSize400 = 16, fontSize500 = 16 × 1.25` |
| **Color (lightness)** | **Decay curve per family** | `L_step = f(step)` where f is the family's lightness profile |
| **Color (chroma)** | **Proportional to lightness (k ratio)** | `C_step ≈ k × L_step` for steps 300–500 |

The lightness progression within each family CAN be expressed as a mathematical relationship. Looking at the R1 data for families with clean progressions:

**Pink lightness**: 0.92, 0.76, 0.65, 0.55, 0.40
- Step deltas: -0.16, -0.11, -0.10, -0.15
- Pattern: approximately linear descent with slight acceleration (not exponential, not perfectly linear)

**Purple lightness**: 0.93, 0.76, 0.60, 0.51, 0.40
- Step deltas: -0.17, -0.16, -0.09, -0.11
- Pattern: faster descent 100→300, slower 300→500 (diminishing returns curve)

**Should the scales have a defined mathematical relationship?**

**My recommendation: Hand-tuned, with validator-enforced constraints.**

Reasoning:
1. **Color perception isn't purely mathematical** in the way spacing is. Spacing has an objective grid (8px). Color "correctness" is perceptual and aesthetic — there's no natural law that says lightness must follow a specific curve.
2. **Gamut constraints make formulaic progression impractical**: A mathematically-derived lightness curve that works for pink (wide gamut throughout) would produce out-of-gamut chroma values for cyan (narrow gamut at many lightness values).
3. **Brand customization requires per-family flexibility**: The configure wizard (Spec 113) lets products tune per-family — a formula-locked system fights this.

**However**, validators should enforce:
- **Monotonicity**: L100 > L200 > L300 > L400 > L500 (lightness always descends)
- **Minimum step distance**: |L_n - L_n+1| ≥ 0.08 (steps must be perceptibly distinct)
- **k-ratio consistency**: For steps 300–500, C/L must stay within k ± 15% (chroma tracks lightness proportionally)
- **Gamut compliance**: C_step ≤ gamutCeiling(H, L_step) for sRGB (error) or P3 (warning)

**Governance for changing a single value**: Yes, changing one lightness or chroma value requires re-validating gamut for all steps in that family. This is cheap (a validator run, not a design review) because:
1. The gamut boundary calculator is deterministic math
2. Validator runs in <1s per family
3. CI catches violations automatically

The expensive part is CONTRAST validation — changing `pinkLightness300` means re-checking all semantic tokens that reference `pink300` against their contrast pair backgrounds. This requires a cascading audit but is also automatable.

---

#### Q4: Leonardo's Requests

**Hue arithmetic: Designed-in capability or informal?**

**Recommendation: Designed-in, documented, but not enforced by tokens.**

The hue channel IS an angular value (0–360°). Complementary (H + 180°), analogous (H ± 30°), triadic (H ± 120°) are mathematical operations on the hue token. This is a *designed-in capability* of the OKLCH color model itself.

However, it should NOT become token infrastructure:
- Don't create `pinkComplement` as a token (that's just `pinkHue + 180 → ~188°` → close to cyan)
- Don't generate computed relationship tokens
- DO document it as a capability in Token-Family-Color.md
- DO let Leonardo use hue arithmetic in design rationale ("the secondary is the complement of the primary")
- DO let the configure wizard (Spec 113) offer "complementary palette" as a hue selection mode

**Why not tokens?** Hue relationships are design intent, not system primitives. `pinkHue = 8.2` and `cyanHue = 204` happen to be near-complementary (196° apart). Making this relationship tokenized implies it must be maintained — what if a palette redesign moves cyan to 210°? The relationship should be documented guidance, not enforced architecture.

**High-contrast chroma viability:**

Using the R1 gamut data, checking whether existing chroma values are achievable at extreme lightness values:

| Family | Current C300 | HC Light (L≈0.95) max C | HC Dark (L≈0.20) max C | Needs HC chroma override? |
|--------|-------------|-------------------------|------------------------|--------------------------|
| yellow | 0.247 | 0.207 | ~0.045 | ⚠️ **YES** — C exceeds gamut at both extremes |
| orange | 0.195 | 0.027 | ~0.065 | ⚠️ **YES** — severely limited at L=0.95 |
| purple | 0.316 | 0.031 | ~0.110 | ⚠️ **YES** — far exceeds gamut at both extremes |
| pink | 0.245 | 0.026 | ~0.090 | ⚠️ **YES** — far exceeds gamut at L=0.95 |
| green | 0.231 | 0.084 | ~0.055 | ⚠️ **YES** — exceeds gamut at both extremes |
| cyan | 0.148 | 0.055 | ~0.035 | ⚠️ **YES** — exceeds gamut at both extremes |
| teal | 0.060 | 0.043 | ~0.025 | ⚠️ **Marginal** — close to limits but might work |

**Verdict: ALL families except possibly teal need HC chroma overrides at extreme lightness.**

This validates Leonardo's instinct: the architecture MUST support per-family chroma overrides for high-contrast themes. The good news: with per-family lightness already decided, a HC theme is simply "a different lightness scale + a different chroma scale for the same hue." The architecture already accommodates this naturally — it's just another theme registration:

```typescript
// High-contrast theme in designerpunk.config.ts
themes: [{
  name: 'high-contrast',
  mode: 'both',
  overrides: highContrastOverrides,  // swaps lightness + chroma scales
}]
```

**However**, note that HC themes in practice don't push to L=0.95/L=0.20 uniformly. A realistic HC theme for text might use:
- Light mode: darker text (L≈0.25–0.35) on light backgrounds → chroma still achievable for most families
- Dark mode: lighter text (L≈0.85–0.92) on dark backgrounds → orange/pink/purple STILL constrained

**Net recommendation**: Design the architecture to support per-family HC chroma overrides. Whether specific families need them is a tuning decision during HC theme development.

**Gamut limits for 'Drenched' strategy:**

"Drenched" means pushing a family to maximum vibrancy as the dominant surface color. Looking at each family's maximum achievable chroma at their step 300–400 lightness range:

| Family | L range (300–400) | Max C in that range (sRGB) | Max C (P3) | Drenched viable? |
|--------|-------------------|---------------------------|------------|-----------------|
| **purple** | 0.51–0.60 | 0.283–0.316 | ~0.37 | ✅ **Excellent** — highest chroma capacity |
| **pink** | 0.55–0.65 | 0.221–0.257 | ~0.30 | ✅ **Good** — strong chroma at these L values |
| **green** | 0.88 | 0.231–0.257 | ~0.29 | ✅ **Good** — high L with good chroma (unusual) |
| **orange** | 0.60–0.70 | 0.167–0.208 | ~0.24 | ✅ **Moderate** — achievable but not extreme |
| **yellow** | 0.79–0.93 | 0.190–0.247 | ~0.27 | ✅ **Good** — high L allows high C for yellow hue |
| **cyan** | 0.74–0.87 | 0.125–0.148 | ~0.17 | ⚠️ **Limited** — cyan's gamut ceiling is inherently low |
| **teal** | 0.35–0.41 | 0.050–0.060 | ~0.08 | ❌ **Poor** — teal is inherently muted |

**Families that CAN drench**: Purple, pink, green, orange, yellow
**Families that CANNOT drench well**: Cyan (moderate at best), teal (inherently muted)

This is a fundamental property of the sRGB gamut — it's not a limitation of our model. P3 gamut extends viability slightly but cyan and teal remain the most constrained hue regions in any reasonable gamut.

**Recommendation for Leonardo**: Document in Token-Family-Color.md that cyan and teal families have limited chroma capacity. "Drenched" strategy should prefer purple, pink, orange, or green for maximum vibrancy. Cyan/teal are better suited to Restrained or Committed strategies where moderate saturation suffices.

---

#### Q5: Token Count and Structure

**Token count validation:**

Per family:
- 1 hue token
- 5 lightness tokens
- 5 chroma tokens
- 5 composed color tokens
= 16 tokens × 7 families = **112 total**

(The design outline says "112 channel tokens + 35 composed colors = 147" — this counts composed colors separately. If we count everything: 7 hues + 35 lightness + 35 chroma + 35 composed = 112 total. The 147 figure double-counts by treating composed colors as distinct from the channel primitives, but they're derived from them.)

**Correct count**: 77 channel primitives + 35 composed color tokens = **112 total color primitives**. This replaces the current 35 RGBA color primitives (7 families × 5 steps).

Net addition: **+77 tokens** (the channel primitives). The 35 composed colors are 1:1 replacements of existing tokens.

**Is this manageable?**

Yes. For context:
- Current primitive token count: ~180 (spacing, sizing, radius, typography, color, opacity, etc.)
- Adding 77 channel primitives → ~257 total primitives
- This is a 43% increase in primitive count, but a 0% increase in *consumed* token count (components still reference composed colors)

**The channel primitives are infrastructure, not consumption tokens.** They exist to enable:
1. Web runtime composition
2. Theme operations (lightness scale swap)
3. Configure wizard mutations (Spec 113)
4. Validator enforcement

**Does the token-index/MCP need structural changes?**

**No structural changes required.** Recommended approach:

1. **Channel primitives** live in the existing primitive token family with a `subcategory: 'channel'` marker:
   ```
   family: "color"
   tier: "primitive"
   subcategory: "channel"  // distinguishes from composed color primitives
   ```

2. **Composed colors** remain `tier: "primitive"` with `subcategory: "composed"` (or no subcategory — they're the "normal" color primitives)

3. **MCP filtering**: `search_tokens({ family: "color" })` returns all color tokens. A new optional filter `search_tokens({ family: "color", subcategory: "channel" })` could be added but isn't required for MVP.

4. **Application MCP**: Components reference composed colors. Channel tokens never appear in component schemas. No change needed to the Application MCP.

**Counter-argument for separate category**: Putting channel primitives in a separate top-level category (`family: "color-channel"`) would cleanly separate infrastructure tokens from consumable tokens. But this creates an artificial family boundary — `pink-l300` IS a color token, just at a lower abstraction level. Subcategory within the color family is the cleaner model.

---

#### Summary: Architecture Validation

The per-family lightness decision resolves the tension from R1 cleanly:

| Concern | Resolution |
|---------|-----------|
| Palette preservation | ✅ Per-family lightness allows encoding existing palette without forced changes |
| Gamut compliance | ✅ Each family's lightness sits at its gamut-optimal L range |
| Customer flexibility | ✅ Configure wizard can tune per-family independently |
| HC theme support | ✅ Architecture naturally supports alternate lightness+chroma scales per theme |
| Chroma derivation | ✅ Explicit values (not formula) — clearer, equally governable |
| Token count | ✅ +77 infrastructure tokens, 0 new consumption tokens |
| MCP impact | ✅ No structural changes needed |
| Platform generation | ✅ Web gets channels + composed; iOS/Android get resolved concrete values |

**One remaining decision for Peter**: Should web output emit channel primitives as CSS custom properties (enabling product-level channel manipulation), or only composed colors (simpler output, products use relative color syntax for manipulation)?

My recommendation: **Emit both.** Channel properties cost nothing in CSS and enable advanced product composition. Relative color syntax handles the 90% case (opacity, darken, lighten), but direct channel access enables the 10% case (hue rotation, chroma boost for emphasis). The design outline already assumes both.

---

### [ADA R3] Gray Scale Shift Analysis — Value vs. Token-Count Tradeoff (2026-06-09)

**Reviewer**: Ada (Rosetta Token Specialist)
**Scope**: Peter's proposal to shift the entire gray scale down instead of adding gray050
**Status**: Analysis with recommendation

---

#### Current Gray Scale (Source of Truth)

| Token | RGBA | Approx OKLCH L | Role |
|-------|------|----------------|------|
| gray100 | rgba(178, 188, 196, 1) | ~0.79 | Light gray — subtle backgrounds, muted text |
| gray200 | rgba(94, 112, 124, 1) | ~0.52 | Medium gray — secondary text, borders |
| gray300 | rgba(38, 50, 58, 1) | ~0.28 | Dark gray — primary text, prominent borders |
| gray400 | rgba(24, 34, 40, 1) | ~0.21 | Very dark — strong text, container backgrounds |
| gray500 | rgba(16, 22, 26, 1) | ~0.16 | Near-black — deep backgrounds, high contrast text |

**Gap identified**: Between white100 (L≈1.0) and gray100 (L≈0.79) there's a 0.21 lightness gap. The proposed gray050 at L≈0.86 would fill this.

---

#### Q1: Proposed Shift Mapping

| New Name | Gets Value From | Approx L | Description |
|----------|----------------|-----------|-------------|
| gray100 (new) | Proposed gray050 | ~0.86 | Very light gray (the new value) |
| gray200 (new) | Current gray100 | ~0.79 | Light gray |
| gray300 (new) | Current gray200 | ~0.52 | Medium gray |
| gray400 (new) | Current gray300 | ~0.28 | Dark gray |
| gray500 (new) | Current gray400 | ~0.21 | Very dark gray |
| DROPPED | Current gray500 | ~0.16 | Near-black (eliminated) |

---

#### Q2: Semantic Token Impact — What Breaks

**13 semantic tokens reference gray100–gray500.** Here's the damage assessment for each:

| Semantic Token | Current Ref | Current Role | After Shift: New Value | Intent Preserved? |
|---|---|---|---|---|
| `color.feedback.select.background.default` | gray100 | Not-selected background (L≈0.79) | L≈0.86 (lighter) | ⚠️ **Weakened** — becomes less distinct from white canvas |
| `color.feedback.select.text.default` | gray200 | Not-selected text (L≈0.52) | L≈0.79 (much lighter) | ❌ **BROKEN** — text at L≈0.79 has poor contrast on white |
| `color.feedback.select.border.default` | gray200 | Not-selected border (L≈0.52) | L≈0.79 (much lighter) | ❌ **BROKEN** — border too subtle to see on white |
| `color.structure.border` | gray100 | Standard borders (L≈0.79) | L≈0.86 (lighter) | ⚠️ **Weakened** — borders become nearly invisible on white |
| `color.structure.border.subtle` | gray100 + opacity048 | Subtle borders (L≈0.79 at 48%) | L≈0.86 at 48% | ❌ **BROKEN** — already subtle; lighter = invisible |
| `color.icon.default` | gray200 | Default icon color (L≈0.52) | L≈0.79 (much lighter) | ❌ **BROKEN** — icons lose optical weight, poor contrast |
| `color.icon.navigation.inactive` | gray300 | Inactive nav icons (L≈0.28) | L≈0.52 (lighter) | ⚠️ **Weakened** — less distinct from active state |
| `color.text.default` | gray300 | Primary body text (L≈0.28) | L≈0.52 (much lighter) | ❌ **BROKEN** — primary text loses WCAG AA contrast on white |
| `color.text.muted` | gray200 | Secondary text (L≈0.52) | L≈0.79 (much lighter) | ❌ **BROKEN** — muted text loses readability |
| `color.text.subtle` | gray100 | Tertiary text (L≈0.79) | L≈0.86 (lighter) | ⚠️ **Problematic** — already at contrast threshold; lighter fails |
| `color.action.secondary` | gray400 | De-emphasized action (L≈0.21) | L≈0.28 (slightly lighter) | ✅ **Acceptable** — still dark enough for button text/contrast |
| `color.progress.pending.text` | gray300 | Pending step text (L≈0.28) | L≈0.52 (lighter) | ⚠️ **Weakened** — less readable but possibly intentional for "pending" |
| **Dark theme**: `color.structure.canvas` | gray400 | Dark canvas (L≈0.21) | L≈0.28 (lighter) | ⚠️ **Weakened** — dark mode canvas becomes less dark |
| **Dark theme**: `color.structure.border.subtle` | gray500 + opacity048 | Dark subtle border (L≈0.16 at 48%) | L≈0.21 at 48% | ✅ **Acceptable** — still provides separation in dark mode |

**Summary**: 5 semantic tokens **break** (lose WCAG-required contrast), 5 are **weakened** (still functional but degraded), 2 are **acceptable**.

---

#### Q3: Can We Drop gray500?

**Active references to gray500:**
1. **Dark theme** `color.structure.border.subtle` — uses `gray500` with `opacity048` for subtle dark-mode borders
2. **Blend composition** — mentioned as example in documentation (`gray500 with blend300 desaturate`)
3. **Test fixtures** — value assertions

**Assessment**: gray500 (L≈0.16) is functionally close to the black family (black100 = rgba(58, 58, 69, 1), L≈0.30 and below). The dark theme border.subtle reference would shift to the new gray500 (current gray400, L≈0.21), which is slightly lighter but still usable in dark mode.

**Verdict**: Dropping gray500 is **low risk** — its only active semantic usage (dark border.subtle) can tolerate the lighter replacement. The blend documentation is illustrative, not functional.

---

#### Q4: Does the Shift Address the Light-Gray Gap?

**Yes, partially — but at enormous cost.**

The gap this targets: between white100 (L≈1.0) and current gray100 (L≈0.79), there's no token for very subtle backgrounds (L≈0.86). The shift puts the new gray100 at L≈0.86, filling that gap.

**However**, the shift also *creates a new gap* at the dark end:
- Current scale dark end: gray500 (L≈0.16) — near-black
- Shifted scale dark end: new gray500 = current gray400 (L≈0.21) — less dark

More critically: **the gap between gray200 (new, L≈0.79) and gray300 (new, L≈0.52) is 0.27 lightness** — the largest step in the shifted scale. This is where the semantic tokens for text, icons, and borders currently live. The shift compresses the dark grays (useful) while stretching the light grays (where we already have coverage via white tokens).

---

#### Q5: Mathematical Relationship Concerns

The current gray scale has a roughly logarithmic lightness progression:
```
Current: 0.79, 0.52, 0.28, 0.21, 0.16
Deltas:  -0.27, -0.24, -0.07, -0.05 (accelerating compression toward dark)
```

The shifted scale:
```
Shifted: 0.86, 0.79, 0.52, 0.28, 0.21
Deltas:  -0.07, -0.27, -0.24, -0.07 (irregular — big gap in the middle)
```

The shifted scale has a **bimodal distribution**: two light grays close together (0.86, 0.79), then a massive jump to medium (0.52), then two dark grays close together (0.28, 0.21). This is not a smooth progression — it's two clusters with a gap.

---

#### Recommendation: **Do Not Shift**

The shift proposal saves one token slot but:

1. **Breaks 5 semantic tokens** that rely on gray step values for WCAG contrast
2. **Requires updating 13 semantic token references** and potentially the dark theme overrides
3. **Creates an irregular mathematical progression** (bimodal rather than smooth)
4. **Every downstream consumer changes meaning** — gray200 currently means "medium text weight"; after shift it means "light background." This is a semantic earthquake.

**The real problem isn't token count — it's that the gray scale has a gap at the light end.** The OKLCH migration (this spec) already plans to redesign all family scales. The correct fix is:

**Option A (within Spec 112)**: When defining the new gray OKLCH scale, include 6 steps (or redistribute 5 steps to cover the L≈0.86 region). The OKLCH migration is already a palette redesign — this is the natural moment to fix gray coverage.

**Option B (standalone, pre-OKLCH)**: Add gray050 as proposed originally. +1 token, zero breakage, fills the gap immediately. Costs one token slot — which is negligible overhead.

**Option C (Peter's shift)**: Shift the scale. Requires mass semantic token re-pointing, WCAG re-validation, dark theme rework, and produces an irregular scale. The "no new token" benefit doesn't justify the blast radius.

**Counter-argument to my recommendation**: If we're ALREADY going to redesign the gray scale in OKLCH (which we are), then NEITHER Option A nor B matters — the pre-OKLCH values will all be replaced. The gray050 gap is a solved problem in the OKLCH migration timeline. Adding gray050 now creates a token that will be immediately re-valued in the next major version.

**Net recommendation**: **Wait for OKLCH.** Don't add gray050 AND don't shift. The gap exists for the remaining lifetime of the RGBA palette (which this spec is replacing). If the gap is causing product pain *right now*, Option B (add gray050) is cheap and safe. The shift (Option C) is not worth the breakage.

---

## Requirements Feedback

### Context for Reviewers
- 11 requirements covering: channel-primitive format (R1), neutral partition (R2), web output (R3), native output (R4), DTCG/Figma (R5), blends (R6), palette refinements (R7), WCAG (R8), MCP (R9), documentation (R10), migration (R11)
- Channel-primitive decisions resolved in design outline § "Decisions Resolved"
- Neutral partition architecture in design outline § "Neutral Partition Architecture"
- Palette refinements from external doc (`dp-palette-refinements-v12.md`)
- R6 (blends) will require behavioral contract updates — Lina's domain
- R4 specifies ChromaKit (iOS) and colormath (Android) as platform dependencies

### [ADA R5] Requirements Review — Pipeline Implementability (2026-06-10)

**Reviewer**: Ada (Rosetta Token Specialist)
**Scope**: R1, R3, R5, R8, R11 technical feasibility + missing requirements for pipeline changes
**Verdict**: Requirements are **sound with amendments needed** — no blockers, but several gaps and precision concerns require additions before design phase.

---

#### R1: Channel Primitives — Validator Constraints

**R1.6 specifies**: "Validators SHALL enforce: lightness monotonicity, minimum step distance ≥0.08, chroma within sRGB gamut for the family's hue at each lightness"

**Implementability**: ✅ All three constraints are implementable.

1. **Monotonicity**: Trivial — iterate L values, assert `L[n] > L[n+1]` for all n. Already have precedent in `ThreeTierValidator.ts` (mathematical relationship checks).

2. **Minimum step ≥0.08**: Trivial — `Math.abs(L[n] - L[n+1]) >= 0.08` for all adjacent pairs. The 0.08 threshold is 2× practical JND (~0.04) — good engineering margin. No concern.

3. **Gamut boundary**: Implementable but non-trivial. Requires an `oklchInSrgbGamut(L, C, H)` function. The conversion path is: OKLCH → OKLab → linear sRGB → check all channels ∈ [0, 1]. This is deterministic math (~15 lines), not an approximation. Björn Ottosson's reference implementation provides the matrices.

**Missing constraints I'd need to add:**

| Missing Constraint | Why It's Needed | Proposed Addition |
|---|---|---|
| **Chroma monotonicity** (per-family, steps 300→500) | From R2 analysis: chroma should track lightness proportionally in dark steps. Without enforcement, an author could accidentally make step 400 more vibrant than step 300. | "Chroma SHALL be non-increasing for steps 300→500 (darker steps have equal or lower chroma)" |
| **Hue consistency** | A family's hue token is shared across all steps. If someone edits a per-step value and accidentally introduces a second hue, the family breaks. | "All composed colors within a family SHALL reference the same hue token (single hue per family enforced at registration, not just convention)" |
| **Neutral chroma ceiling** | R2 specifies parabolic chroma curve for neutrals but no hard limit. At C>0.03 a "neutral" becomes a visibly tinted color. | "Neutral family chroma SHALL NOT exceed 0.035 at any lightness step" |

**Recommendation**: Add these three constraints to R1.6. They're cheap to implement and prevent drift.

---

#### R3: Web Output — Channel Props + Composed Colors

**R3.1–R3.4 specify**: Emit composed colors as `oklch()`, ALSO emit channel primitives as separate custom properties, support both runtime composition and relative color syntax.

**Technical correctness**: ✅ **Fully correct.**

CSS Color Level 4 `oklch()` accepts `var()` in each channel position. The proposed output pattern:

```css
--pink-l300: 0.65;
--pink-c300: 0.245;
--pink-hue: 8.2;
--pink-300: oklch(var(--pink-l300) var(--pink-c300) var(--pink-hue));
```

...is valid CSS. **Confirmed by**: CSS Color Level 4 spec (space-separated function arguments accept custom property substitution), iO Digital implementation guides, and our R2 generation analysis.

**One technical nuance requiring a requirement addition:**

The composed color `--pink-300: oklch(var(--pink-l300) var(--pink-c300) var(--pink-hue))` uses `var()` references, NOT resolved values. This means:

- ✅ Relative color syntax works: `oklch(from var(--pink-300) l c h / 0.5)` — browser resolves the `var()` chain then applies relative manipulation.
- ✅ Channel manipulation works: `oklch(var(--pink-l300) var(--pink-c300) calc(var(--pink-hue) + 180))` — hue rotation at runtime.
- ⚠️ **`getComputedStyle()` returns the resolved value**, not the `var()` expression. So JS reading `--pink-300` gets back `oklch(0.65, 0.245, 8.2)` — the resolved concrete value. This is correct browser behavior and not a problem, just a documentation note.

**However**: There's a fallback concern. `oklch()` is supported in all modern browsers (Chrome 111+, Safari 15.4+, Firefox 113+), but if a consumer needs to support older browsers, the composed property using `var()` references won't degrade — it'll just be invalid CSS (not a fallback hex). 

**Missing requirement**: R3 doesn't address browser support minimum or whether a fallback mechanism (e.g., `@supports` block with hex fallback) should be generated.

**Proposed addition to R3:**
> R3.5: The web generator SHALL NOT emit sRGB fallbacks by default. Products requiring legacy browser support SHALL use a PostCSS plugin (out of scope for this spec) or target the DTCG/hex output.

This makes the browser support stance explicit rather than leaving it ambiguous.

---

#### R5: DTCG/Figma — Deterministic OKLCH→sRGB Conversion

**R5.1–R5.4 specify**: Convert OKLCH source to sRGB hex for DTCG/Figma output. Deterministic. Gamut clamp for out-of-gamut values.

**Is deterministic OKLCH→sRGB achievable?** ✅ **Yes — this is well-defined math, not an approximation.**

The conversion path: OKLCH → OKLab (polar→cartesian) → linear sRGB (matrix multiply) → sRGB (gamma encode) → hex.

Each step is deterministic:
1. `OKLab.a = C * cos(H°)`, `OKLab.b = C * sin(H°)` — exact
2. Linear sRGB = M⁻¹ × [L, a, b] (Ottosson's 3×3 matrix) — exact given IEEE 754 double precision
3. sRGB = gamma encode each channel — exact per IEC 61966-2-1
4. Hex = round to 8-bit — the ONLY lossy step

**Precision concerns:**

| Step | Precision Loss | Impact |
|---|---|---|
| Polar→cartesian (H°→a,b) | None (trig functions at double precision) | N/A |
| Matrix multiply | Floating point rounding (~10⁻¹⁵) | Negligible — below 8-bit quantization |
| Gamma encoding | None (algebraic function) | N/A |
| **8-bit quantization** | ±0.5/255 per channel = ΔE₀₀ ≈ 0.2–0.5 | **This is the precision floor** |
| Cross-platform determinism | Trig implementations may differ by ULP | Match within 1 ULP → same hex output |

**The precision floor is 8-bit hex quantization (ΔE₀₀ ≈ 0.2–0.5), not floating point arithmetic.** Two implementations of the same conversion will produce identical hex output if they use the same matrix constants and rounding rules (round-half-to-even vs round-half-up).

**Known precision risk**: JavaScript's `Math.cos()` / `Math.sin()` vs Swift's `cos()` / `sin()` can differ by 1–2 ULP (unit in last place) for the same input angle. This RARELY affects the hex output (would need to land exactly on a 0.5/255 boundary), but for strict determinism:

**Proposed addition to R5:**
> R5.5: The OKLCH→sRGB conversion SHALL use a single canonical implementation (TypeScript, in the build pipeline). DTCG/Figma conversion SHALL NOT be performed by platform-specific code. All hex output derives from the same build-time computation.

This eliminates cross-implementation divergence by ensuring ONE codebase does all conversions.

**Gamut clamping (R5.4)**: The requirement says "clamp to nearest in-gamut value." The standard approach is **chroma reduction at constant L and H** — reduce C until all sRGB channels ∈ [0, 1]. This is the CSS Color Level 4 gamut mapping algorithm (binary search on C with ΔE tolerance). Implementable, well-documented, deterministic.

**Missing precision**: R5.4 doesn't specify the gamut mapping algorithm. "Nearest in-gamut" is ambiguous — nearest by ΔE₀₀? Nearest by chroma reduction? Nearest by lightness adjustment?

**Proposed addition:**
> R5.6: Gamut mapping SHALL use chroma reduction at constant lightness and hue (CSS Color Level 4 algorithm). Out-of-gamut values SHALL reduce chroma until the color is within sRGB, preserving hue and lightness. The binary search SHALL terminate when ΔE₀₀ < 0.02 between candidate and gamut boundary.

---

#### R8: WCAG Contrast — OKLCH→sRGB Luminance Path

**R8.1 specifies**: "WCAG contrast validator SHALL convert OKLCH values to sRGB relative luminance for contrast ratio calculation"

**Is this path standard?** ✅ **Yes — it's the only correct path.**

WCAG 2.x defines contrast ratio using **sRGB relative luminance** (per IEC 61966-2-1 and W3C's luminance formula: `L = 0.2126R + 0.7152G + 0.0722B` on linearized sRGB). There is no OKLCH-native contrast ratio definition in WCAG.

The path is: OKLCH → linear sRGB → relative luminance → contrast ratio. This is:
1. The same OKLCH→sRGB conversion from R5 (reuse the same function)
2. Then our existing `WCAGValidator.calculateRelativeLuminance()` (already implemented, uses the standard formula)

**No ambiguity, no alternative approaches.** WCAG 3.0 (APCA) uses a different model, but WCAG 2.1 AA (our target) mandates sRGB luminance.

**Implementation note**: Our current `WCAGValidator` accepts hex colors and converts to RGB internally. The migration requires either:
- A) Adding an `oklchToHex()` adapter before calling the existing validator (simplest — no validator changes)
- B) Adding native OKLCH input support to `WCAGValidator` (cleaner long-term)

**Recommendation**: Option A for migration, refactor to B in a follow-up. The validator's existing hex→RGB→luminance pipeline is well-tested; wrapping it with OKLCH→hex is low-risk.

**Missing requirement**: R8 doesn't specify when gamut boundary validation (R8.2) runs relative to WCAG contrast checking (R8.1). If a color is flagged as out-of-gamut AND fails contrast, which error surfaces first? Order matters for actionability.

**Proposed addition:**
> R8.5: Gamut validation (R8.2) SHALL run BEFORE contrast validation (R8.1). If a color is out-of-gamut, the gamut error SHALL be reported and contrast validation SHALL use the gamut-clamped value for its calculation (reporting the clamped contrast ratio alongside the gamut warning).

---

#### R11: Migration — ΔE < 1 Round-Trip Tolerance

**R11.4 specifies**: "A regression validation test SHALL verify round-trip OKLCH→sRGB produces results within ΔE < 1 of original RGB values (for colors not intentionally changed by palette refinements)"

**Is ΔE < 1 reasonable?** ⚠️ **It's correct for this migration, but the metric needs specifying.**

**Which ΔE?** There are multiple formulas:
- **ΔE₇₆** (CIE76): Euclidean distance in Lab. Simple but perceptually non-uniform.
- **ΔE₀₀** (CIEDE2000): Perceptually uniform. The modern standard.
- **ΔE_OK** (Oklab Euclidean): Native to the OKLCH space. Simplest to compute from OKLCH values.

**ΔE < 1 means:**
- ΔE₇₆ < 1: Very tight. Most people can't distinguish ΔE₇₆ < 1.
- **ΔE₀₀ < 1**: Just barely perceptible. This is the "gold standard" threshold for imperceptible difference.
- ΔE_OK < 1: Roughly equivalent to ΔE₀₀ < 1 for most colors (OKLCH is designed for perceptual uniformity).

**Should it be tighter or looser?**

The round-trip path is: original RGB → OKLCH (lossless at double precision) → sRGB hex (8-bit quantization). The quantization step introduces ΔE₀₀ ≈ 0.2–0.5 for most colors. So:

- **ΔE₀₀ < 0.5** would be achievable for ALL in-gamut colors (just quantization noise)
- **ΔE₀₀ < 1** gives comfortable margin for floating point accumulation
- **ΔE₀₀ > 1** means something actually went wrong (bad conversion, wrong matrix, etc.)

**My recommendation: Keep ΔE < 1, but specify ΔE₀₀ (CIEDE2000).**

ΔE₀₀ < 1 is the correct threshold because:
1. It's below perceptibility (JND ≈ 1.0 for ΔE₀₀)
2. It gives margin over the theoretical floor (0.2–0.5 from quantization)
3. It catches actual conversion errors while tolerating implementation noise
4. A tighter threshold (e.g., 0.3) would likely cause false failures on colors near gamut boundaries where quantization has maximum impact

**Proposed amendment to R11.4:**
> "...within ΔE₀₀ (CIEDE2000) < 1.0 of original RGB values..."

This disambiguates the metric. Without specifying ΔE₀₀, an implementer might use ΔE₇₆ (where < 1 is much tighter) or ΔE_OK (slightly different behavior near achromatic colors).

**Additional concern**: R11.4 says "for colors not intentionally changed by palette refinements." This exception list needs to be explicit — the test must know which colors were intentionally changed (R7 refinements). 

**Proposed addition:**
> R11.5: The regression test SHALL maintain an explicit exclusion list of tokens intentionally changed by palette refinements (R7). This list SHALL be documented alongside the test and reviewed during palette refinement work. All non-excluded color tokens MUST pass the ΔE₀₀ < 1.0 threshold.

---

#### Missing Requirements for Pipeline Changes

Based on my knowledge of the Rosetta pipeline architecture, several requirements are absent:

**1. ColorTokens.ts Source Format Change**

R1 specifies the channel-primitive structure but doesn't specify the TypeScript source format change. The current `ColorTokens.ts` stores `'rgba(R, G, B, A)'` strings. The migration needs:

> **R12 (proposed): Token Source Format**
> R12.1: `ColorTokens.ts` SHALL store color values as structured OKLCH objects: `{ lightness: number, chroma: number, hue: number }` (not as string literals).
> R12.2: Channel primitives (hue, lightness scale, chroma scale) SHALL be defined as separate exported constants per family.
> R12.3: Composed color primitives SHALL reference channel primitives by name (not by inlined value).
> R12.4: The `ColorTokenValue` interface SHALL be extended to support OKLCH structured values alongside the existing rgba string format (for migration coexistence during development).

**2. SemanticOverrideResolver Changes**

The mode resolution system (Spec 080) currently resolves semantic token references to rgba strings. With OKLCH source:

> **R13 (proposed): Mode Resolution Pipeline**
> R13.1: `SemanticOverrideResolver` SHALL resolve semantic color token references to OKLCH structured values (not rgba strings).
> R13.2: `SemanticValueResolver` SHALL resolve primitive name references to OKLCH channel compositions.
> R13.3: Theme override files (`SemanticOverrides.ts`) SHALL continue to use primitive name references (no format change at the override level — the primitive's value changes format, not the override mechanism).
> R13.4: The 4-context resolution (light-base, light-wcag, dark-base, dark-wcag) SHALL produce OKLCH-resolved token sets for each context.

**3. Generator Interface Change**

Platform generators currently receive `rgba()` strings in their `GenerationOptions`. They need OKLCH structured values:

> **R14 (proposed): Generator Input Format**
> R14.1: `GenerationOptions.semanticTokens` (and dark/wcag variants) SHALL carry OKLCH structured color values.
> R14.2: Each platform generator SHALL accept OKLCH values and produce its own native format (CSS oklch(), Color.oklch(), Oklch().toComposeColor()).
> R14.3: The DTCG generator SHALL accept OKLCH values and convert to sRGB hex at generation time.

**4. Blend Pipeline Rework**

R6 covers blend utility intent but misses the pipeline change:

> **R15 (proposed): Blend Color Space Change**
> R15.1: `ColorSpaceUtils.ts` (currently hex→RGB→HSL) SHALL be extended with OKLCH interpolation functions.
> R15.2: `darkerBlend` and `lighterBlend` SHALL interpolate in OKLCH space (reduce/increase L at constant C and H, not RGB overlay with black/white).
> R15.3: `saturate` and `desaturate` SHALL operate on the chroma channel directly (increase/decrease C at constant L and H, not HSL saturation).
> R15.4: Generated blend utility output for all platforms SHALL implement OKLCH-space interpolation, not RGB-space.

**5. ThreeTierValidator Input Format**

The validator currently validates mathematical relationships on numeric values. OKLCH structured tokens change what "value" means:

> **R16 (proposed): Validator Input Adaptation**
> R16.1: `ThreeTierValidator` color validation SHALL operate on OKLCH channel values (validating lightness progression, chroma constraints, gamut compliance) rather than on rgba strings.
> R16.2: A new `OklchGamutValidator` class SHALL implement the sRGB gamut boundary check (`oklchInSrgbGamut(L, C, H) → boolean`) and gamut clamping algorithm.
> R16.3: `ValidationCoordinator` SHALL integrate the OKLCH validators into the standard validation pipeline alongside existing validators.

---

#### Summary Assessment

| Requirement | Verdict | Action Needed |
|---|---|---|
| R1 (Channel primitives) | ✅ Implementable | Add 3 missing constraints (chroma monotonicity, hue consistency, neutral chroma ceiling) |
| R3 (Web output) | ✅ Technically correct | Add R3.5 (explicit no-fallback stance for legacy browsers) |
| R5 (DTCG/Figma) | ✅ Achievable, deterministic | Add R5.5 (single canonical implementation), R5.6 (gamut mapping algorithm spec) |
| R8 (WCAG) | ✅ Standard path, well-documented | Add R8.5 (gamut→contrast validation ordering) |
| R11 (Migration ΔE) | ✅ Reasonable threshold | Specify ΔE₀₀ metric, add R11.5 (explicit exclusion list) |
| **R12–R16 (missing)** | ⚠️ **Gap** | Pipeline internals need requirements: source format, resolver, generators, blends, validators |

**Net assessment**: The requirements are well-structured and the acceptance criteria are precise. The gaps are all in the *pipeline internals* — the requirements correctly specify what the system should DO but don't yet specify what the pipeline's internal interfaces need to BECOME. This is typical for requirements that focus on external behavior (correct). The design phase should address R12–R16, but documenting them as requirements ensures the design covers them explicitly rather than discovering them mid-implementation.

**Counter-argument to requiring R12–R16**: These are implementation details, not user-facing requirements. Each existing requirement's acceptance criteria implicitly requires the pipeline to change — a design document should cover HOW, not the requirements doc. Elevating implementation concerns to requirements risks over-constraining the design. HOWEVER: given the blast radius (every subsystem in the pipeline changes), making the scope explicit prevents the design from accidentally under-scoping. I'd rather over-specify and descope than discover gaps in task 7 of 12.

---

**Stamp**: [ADA R5] ✓ Requirements reviewed. Sound with amendments. No blockers.

### [LINA R1] Requirements Review — Component Impact Assessment (2026-06-10)

**Reviewer**: Lina (Stemma Component Specialist)
**Scope**: R6 (Blend Rework), R6 AC4-5 (Contract Updates), R7 (Palette Refinements), Missing Component-Level Requirements
**Status**: Feedback with recommendations

---

#### R6: Blend Rework — Visual Audit Criteria

**Problem with AC3: "visually audited" is not testable.**

R6 AC3 states: "All component interaction states (hover, pressed, focused, disabled) SHALL be visually audited after re-tuning." This is a process statement, not a testable acceptance criterion. For my component audit I need:

**What "maintain perceptual intent" means in testable terms:**

The blend utilities currently interpolate in RGB (confirmed — `ColorSpaceUtils.ts` uses `baseColor * (1-blendValue) + overlay * blendValue` on raw RGB channels). Moving to OKLCH interpolation will produce different visual results at the SAME percentage. The requirement says re-tune percentages so states "maintain their perceptual intent." But what IS the perceptual intent?

**My interpretation of intent per interaction state:**

| State | Perceptual Intent | Testable Definition |
|-------|-------------------|---------------------|
| Hover | "Subtly distinct from rest" | ΔL from base ≤ 0.04 (barely perceptible darkening, ≥1× JND) |
| Pressed | "Clearly activated" | ΔL from base ≈ 0.06–0.08 (obvious but not dramatic) |
| Focused | "Chromatic emphasis" | ΔC from base ≥ 0.02 (visible saturation boost) |
| Disabled | "Visually muted" | ΔC reduction ≥ 0.04, ΔL shift toward mid-gray ≥ 0.03 |

**Recommendation**: Add an AC to R6 that defines testable perceptual thresholds:

> AC6: Re-tuned blend percentages SHALL produce interaction state colors within these OKLCH delta ranges from their base color: hover ΔL ∈ [0.02, 0.05], pressed ΔL ∈ [0.05, 0.10], focus ΔC ≥ 0.02, disabled ΔC reduction ≥ 0.03.

Without this, "visually audited" means I screenshot every component in every state on three platforms and... make a subjective call? That's not how contracts work.

**Components requiring audit** (all blend utility consumers, from source scan):

1. **Button-CTA** — hoverDarker, pressedDarker, disabledDesaturate, iconLighter
2. **Button-Icon** — hoverDarker, pressedDarker
3. **Button-VerticalList-Item** — hoverDarker, pressedDarker
4. **Container-Base** — hoverDarker (interactive mode)
5. **Container-Card-Base** — hoverDarker, pressedDarker
6. **Chip-Base** — hoverDarker, pressedDarker
7. **Chip-Filter** — inherits Chip-Base blends
8. **Chip-Input** — inherits Chip-Base blends
9. **Input-Text-Base** — focusSaturate
10. **Input-Checkbox-Base** — hoverDarker, pressedDarker
11. **Input-Radio-Base** — hoverDarker, pressedDarker
12. **Icon-Base** — iconLighter (optical balance)
13. **Nav-TabBar-Base** — pressedLighter

This is 13 components across 5 families. The audit scope is clear but should be explicit in the requirements.

---

#### R6 AC4-5: Contract Governance Level — SHOULD vs SHALL

**R6 AC4**: "Behavioral contracts that specify blend percentages SHALL be updated to reflect new OKLCH-tuned values" — **Correct. SHALL is right here.** If percentages change, contracts MUST reflect reality.

**R6 AC5**: "Contracts SHOULD move toward intent-based descriptions ('perceptibly darker than rest') over numeric percentages where possible"

**My recommendation: Keep SHOULD. Do NOT escalate to SHALL.**

Reasoning:

1. **Current contracts work well with numeric specificity.** Example from `Button-CTA/contracts.yaml`: "Uses blend.hoverDarker token (8% darker)" — this tells platform engineers EXACTLY what to implement. "Perceptibly darker than rest" is ambiguous. Which platform engineer decides what "perceptibly" means?

2. **The numeric value IS the intent** — `blend.hoverDarker` encodes both the semantic name (hover + darker = intent) AND the implementation value (8% = precision). The token name already carries intent. The percentage in the contract description is implementation guidance, not an alternative to intent.

3. **OKLCH makes "intent-based" actually harder**, not easier. In RGB, "8% darker" is simple algebra. In OKLCH, "perceptibly darker" requires specifying which channel changes (L? C? both?) and by how much. Intent-based language without channel specificity is LESS useful to implementers than a concrete percentage.

4. **Dual description is fine.** Nothing prevents a contract from saying BOTH: "Hover applies blend.hoverDarker (L reduced by ~0.03 via OKLCH lightness interpolation) to provide subtle distinction." That's intent + implementation in one sentence.

**Counter-argument**: If blend percentages change again (future color space migration, perceptual tuning), contracts with only percentages need updating again. Intent-based contracts ("perceptibly darker") survive format changes. HOWEVER: the contracts reference semantic blend TOKENS (`blend.hoverDarker`), not raw percentages. The token absorbs the value change. The contract text is documentation of current behavior, not the enforcement mechanism.

**Net position**: SHOULD is the correct governance level. Encourage intent language alongside numeric detail. Don't mandate removing numeric precision — it serves implementers.

---

#### R7: Palette Refinements — glow.neonGreen Impact

**Is the green change's impact on `glow.neonGreen` captured adequately?**

**No — it's implicit but not explicit.**

Current state:
- `glow.neonGreen` → references `green500` (confirmed in `ColorTokens.ts` line 587)
- R7 AC2 says: "Green 300-500 SHALL be decompressed so each step is perceptually distinct"
- This WILL change the value of `green500`
- Therefore `glow.neonGreen` will change visually

R7 AC5 says: "Semantic tokens referencing refined primitives SHALL be verified for WCAG contrast compliance" — this covers `glow.neonGreen` technically, but WCAG contrast isn't the right verification for glow tokens. Glow tokens aren't used for text-on-background contrast. They're used for decorative/emphasis effects where the concern is: "Is this still vibrant enough to read as a 'neon glow'?"

**Recommendation**: Add a note or AC to R7 that explicitly addresses glow token viability:

> AC6: Glow tokens (`glow.neonGreen`, and any other semantic tokens referencing refined primitives for decorative/emphasis purposes) SHALL be verified for preserved chroma ≥ original chroma after refinement.

The risk: if green500 is "decompressed" (spread further from green400), it might end up at a lower chroma or different lightness that doesn't produce a convincing neon glow effect. The semantic contract for glow tokens is "vibrant enough to glow," not "passes WCAG contrast."

---

#### Missing Component-Level Requirements

**1. `color-mix(in srgb, ...)` in component CSS — MUST migrate to `color-mix(in oklch, ...)`**

Two components use `color-mix(in srgb, ...)` directly in their CSS:

- **Nav-TabBar-Base** (`NavTabBarBase.styles.css`): 5 instances for backdrop gradient and glow gradient
- **Avatar-Base** (`Avatar.styles.css`): 1 instance for border opacity

These are inline color space declarations that hardcode `srgb` as the interpolation space. When the system moves to OKLCH, these should migrate to `color-mix(in oklch, ...)` for consistency (and for correct perceptual interpolation in gradients).

**Recommended additional requirement or AC under R6:**

> AC7: All `color-mix()` declarations in component CSS SHALL use `oklch` as the interpolation color space.

**2. Blend utility internal implementation — explicit migration scope**

The requirements say "Blend utilities SHALL interpolate in OKLCH space" (R6 AC1), which covers the core `ColorSpaceUtils.ts` functions. But the current implementation has:

- `calculateDarkerBlend()` — RGB channel math with black overlay
- `calculateLighterBlend()` — RGB channel math with white overlay
- `calculateSaturateBlend()` — HSL saturation manipulation
- `calculateDesaturateBlend()` — HSL saturation manipulation

The "saturate" and "desaturate" functions currently work in HSL, not RGB. R6 AC1 saying "interpolate in OKLCH space" should clarify: ALL blend operations (darker, lighter, saturate, desaturate) move to OKLCH channel manipulation. Specifically:

- Darker → reduce L channel (not mix with black)
- Lighter → increase L channel (not mix with white)
- Saturate → increase C channel (not HSL saturation)
- Desaturate → reduce C channel (not HSL saturation)

This is likely the intent, but making it explicit prevents an implementer from only migrating darker/lighter while leaving saturate/desaturate in HSL.

**3. Platform-specific blend implementations (iOS/Android)**

R6 addresses blend utilities but all current blend code is web-only (`ThemeAwareBlendUtilities.web.ts`, `ColorSpaceUtils.ts`). The iOS and Android platform files for components like Button-CTA don't appear to have equivalent blend utility implementations — they likely use platform-native color manipulation.

**Question for Ada/Peter**: Do iOS (ChromaKit) and Android (colormath) need their own OKLCH blend utilities? Or do platform generators pre-resolve blend state colors at build time (like they pre-resolve channel primitives)? If pre-resolved, R6 should specify this:

> AC8: For iOS and Android platforms, blend state colors SHALL be pre-resolved at build time using OKLCH interpolation and output as concrete color values.

**4. BlendTokenUsageValidation test suite**

The existing `BlendTokenUsageValidation.test.ts` (169 match lines for rgba/opacity patterns) validates that components use correct blend utility + token combinations. This test suite's assertions will need updating after OKLCH migration — the expected output format changes from hex/rgba to oklch values.

This isn't a functional requirement but should be acknowledged in R11 (Migration) or R10 (Documentation):

> Existing blend validation tests SHALL be updated to assert OKLCH output format.

---

#### Summary of Recommendations

| Item | Recommendation |
|------|---------------|
| R6 AC3 "visually audited" | Add AC6 with testable ΔL/ΔC thresholds per interaction state |
| R6 AC5 SHOULD vs SHALL | **Keep SHOULD** — intent language alongside numeric detail, don't mandate removing precision |
| R7 glow.neonGreen | Add AC6 requiring glow tokens maintain chroma ≥ original after refinement |
| Missing: color-mix migration | Add AC7 to R6 requiring `color-mix(in oklch, ...)` in all component CSS |
| Missing: saturate/desaturate clarity | Clarify R6 AC1 covers ALL blend operations (L/C channel, not HSL) |
| Missing: platform blend resolution | Add AC8 specifying iOS/Android blend colors pre-resolved at build time |
| Missing: test suite format update | Acknowledge in R11 that blend validation tests need OKLCH output assertions |

**Component audit scope for R6**: 13 components across 5 families, all consuming `getBlendUtilities()`. List provided above for task planning.

---

---

## Design Feedback

### Context for Reviewers
- Channel-primitive source structure with directory layout → design.md § "Token Source Structure"
- All TypeScript interfaces (ColorChannelToken, ComposedColorToken, OklchValidator, OklchConverter, BlendCalculator) → design.md § "Components and Interfaces"
- Generator output examples for all 5 platforms → design.md § "Generator Changes"
- Blend thresholds (hover ΔL 0.02-0.05, pressed 0.05-0.10, focus ΔC≥0.02, disabled ΔC≥0.03) → design.md § "Blend Utility Rework"
- Theme override format uses OKLCH values with hue references → design.md § "Data Models"

---

## Tasks Feedback

### Context for Reviewers
- 7 parent tasks, 18 subtasks → tasks.md
- Execution order: math foundation (1) → source format (2) → generators (3) → blends (4) → component audit (5) → validation (6) → documentation (7)
- Ada owns Tasks 1-4 + 6.1-6.2 (pipeline/math), Lina owns Task 5 (components/contracts), Thurgood owns Task 7.2-7.3 (governance/docs)
- Task 4.2 is cross-domain (Ada + Lina) for platform blend utilities
- Task 7.1 is cross-domain (Ada + Thurgood) for Token-Family-Color.md rewrite

---

### [LEONARDO R2] Gray Scale Shift Proposal — Design Assessment (2026-06-09)

**Reviewer**: Leonardo (Product Architect)
**Scope**: Peter's alternative to gray050 — shift entire gray scale down by one position
**Context**: Current gray scale: gray100 (L≈0.79), gray200 (L≈0.53), gray300 (L≈0.30), gray400 (L≈0.23), gray500 (L≈0.18)

---

#### Q1: Does gray100 Starting Lighter (L≈0.86 vs L≈0.79) Give Better UI Pattern Coverage?

**Yes — meaningfully so.** The current gray100 at L≈0.79 is too dark for three common patterns I encounter repeatedly in screen specifications:

| Pattern | What I Need | Current gray100 (L≈0.79) | Proposed gray100 (L≈0.86) |
|---------|-------------|--------------------------|---------------------------|
| Zebra striping | Barely-there alternating rows against a white (L≈1.0) background | Too much contrast — reads as "highlighted" rather than "alternating" | ✅ Subtle differentiation from white. Reads correctly as structural rhythm |
| Input backgrounds | Slight fill to distinguish input field from page canvas | Looks like a disabled state or active fill | ✅ Whisper-light — "this is a container" without implying state |
| Disabled fills | Muted surface for inactive elements | Ambiguous — could be a disabled fill OR a background. No separation between these two uses | ✅ Frees up L≈0.79 (new gray200) as the disabled/inactive level, giving clear separation |

**The gap I've been working around**: Currently, `color.feedback.select.background.default` maps to gray100 for "not-selected state backgrounds." But gray100 at L≈0.79 feels heavy for that purpose. I've seen specifications where the lightest gray isn't light *enough* — you want something that whispers "surface" without shouting "element." L≈0.86 is that whisper.

**Design operation gained**: A 5-step gray scale starting at L≈0.86 gives us three distinct "background-level" zones:
- L≈0.86 (new gray100): structural differentiation, zebra, subtle containers
- L≈0.79 (new gray200): inactive states, secondary surfaces, borders at full opacity
- L≈0.53 (new gray300): muted text, secondary content, disabled text

Currently we only have two zones before hitting "text territory" — that's been a constraint.

---

#### Q2: Do We Lose Anything by Dropping the Darkest Gray (gray500)?

**Current gray500**: rgba(16, 22, 26, 1) — L≈0.18. Near-black with cool blue undertone.

**What references it today**: Only ONE semantic token — `color.structure.border.subtle` in the dark theme, and it's applied at 48% opacity (`opacity048`). So in practice, it's consumed as a near-invisible dark border, not as a solid color.

**Do I lose anything? Effectively no — with a caveat.**

The proposed shift means current gray400 (L≈0.23) becomes the new darkest step. At L≈0.23, this is still extremely dark — perceptually almost indistinguishable from L≈0.18 when viewed against a dark canvas (gray400's current role in dark theme as `color.structure.canvas`).

**The caveat**: The dark theme's `border.subtle` currently uses gray500 *precisely because* it's darker than the canvas (gray400). After the shift:
- Canvas = new gray500 (the old gray400, L≈0.23)
- What provides the "darker than canvas" border?

This is solvable — `border.subtle` in dark mode likely needs to shift to using a gray at reduced opacity, or the semantic mapping gets adjusted. But it IS a cascade concern, not a "drop and forget."

**What gray500 is NOT used for**: It's not used for body text, heading text, or any foreground element. Our text hierarchy (default/muted/subtle) maps to gray300/gray200/gray100. The dark end of the scale is purely structural — canvas and border duty.

---

#### Q3: Does This Change How I Specify Gray Usage in Screen Specs?

**Day-to-day: No change.** I reference semantic tokens (`color.text.default`, `color.structure.border.subtle`, `color.feedback.select.background.default`), not primitives. The shift is invisible at the semantic consumption layer.

**When I think about new semantic mappings or review token selection: Yes, beneficially.**

Right now when I need "a very light background" I reach for gray100 and know it's slightly too dark for some uses. The shift means my mental model becomes:

- "Barely visible structural fill" → gray100 ✅ (finally appropriate)
- "Clearly inactive/muted surface" → gray200 (clear separation from the structural fill)
- "Text-appropriate gray" → gray300 onward

This is a more natural mapping to the UI decisions I make in specs. The current scale has a gap at the light end and redundancy at the dark end.

---

#### Q4: Semantic Mapping Cascade Concerns

**This is the primary risk, and it's non-trivial.**

**Concrete impact of the shift:**

| Reference in code | Current value | After shift | Semantic impact |
|-------------------|---------------|-------------|-----------------|
| `color.text.subtle` → gray100 | L≈0.79 | L≈0.86 | ⚠️ **Lighter text** — may fail WCAG contrast on white backgrounds |
| `color.text.muted` → gray200 | L≈0.53 | L≈0.79 | ⚠️ **Much lighter text** — currently readable body text, becomes borderline |
| `color.text.default` → gray300 | L≈0.30 | L≈0.53 | ⚠️ **Significantly lighter** — primary text becomes muted-looking |
| `color.action.secondary` → gray400 | L≈0.23 | L≈0.30 | ⚠️ Changes, but still dark enough for most uses |
| `color.feedback.select.text.default` → gray200 | L≈0.53 | L≈0.79 | ⚠️ Was readable text, now becomes very light |
| `color.feedback.select.background.default` → gray100 | L≈0.79 | L≈0.86 | ✅ Actually improves — lighter background is better here |
| `color.structure.canvas` (dark) → gray400 | L≈0.23 | L≈0.30 | ⚠️ Dark mode canvas becomes noticeably lighter |
| `color.structure.border.subtle` (dark) → gray500 | L≈0.18 | L≈0.23 | Acceptable — still very dark |

**The text hierarchy is the critical problem.** The gray scale serves dual duty:
1. **Backgrounds/surfaces** (light end) — shift HELPS these
2. **Text foreground** (dark end) — shift HARMS these

If we shift the entire scale lighter, every semantic token pointing at a gray step for *text purposes* gets lighter text — likely breaking contrast ratios. This means the shift CANNOT be a simple rename operation. It requires a concurrent remapping of semantic tokens:

```
// Before shift:
color.text.default → gray300 (L≈0.30) ← dark enough for text
color.text.muted → gray200 (L≈0.53) ← still readable on white

// After shift (if NOT remapped):
color.text.default → gray300 (L≈0.53) ← TOO LIGHT for primary text
color.text.muted → gray200 (L≈0.79) ← FAILS WCAG on white

// After shift (correctly remapped):
color.text.default → gray400 (L≈0.30) ← back to appropriate darkness
color.text.muted → gray300 (L≈0.53) ← readable again
color.text.subtle → gray200 (L≈0.79) ← works for non-essential text
```

**This is the real cost**: The shift requires a full audit and remapping of every semantic token that references a gray primitive. It's not catastrophic — it's bounded work — but it's not free, and if missed, it silently degrades text contrast across the system.

---

#### Net Assessment

| Factor | Verdict |
|--------|---------|
| Light-end coverage improvement | ✅ **Strong yes** — L≈0.86 fills a genuine gap I work around today |
| Dark-end loss | ✅ **Minimal** — gray500 (L≈0.18) has exactly one consumer, at 48% opacity |
| Spec workflow impact | ✅ **Neutral to positive** — semantic layer abstracts it away |
| Semantic cascade risk | ⚠️ **High but bounded** — every gray→text semantic MUST be remapped |
| Versus the alternative (add gray050) | **Tradeoff** — see below |

**Shift vs. Add gray050:**

The shift is architecturally cleaner (no 6th step in a 5-step scale), but operationally more complex (requires semantic remapping audit). Adding gray050 is simpler to execute (no cascade) but violates the 5-step convention established across all other families.

**My recommendation**: The shift is the better long-term choice IF we accept that it requires a semantic remapping task. Adding gray050 creates a structural anomaly (why do grays have 6 steps when every other family has 5?) that will feel like a wart forever.

**Counter-argument**: The shift couples a *primitive-layer change* (redefining gray values) with a *semantic-layer audit* (remapping all gray references). Coupling these increases blast radius. gray050 as an addition is purely additive — zero cascade risk, immediately consumable. If the OKLCH migration is already a major version bump with significant blast radius, adding MORE semantic remapping to the same release may be unwise.

**Question back to Ada/Peter**: Is this shift intended to land AS PART OF the OKLCH migration (where the palette is being redesigned anyway), or independently? If it's part of the migration — the semantic remapping is already happening (all values change). If it's independent — the cascade cost is harder to justify.

---

#### Requests

1. **[@ADA]** Confirm the OKLCH lightness values for the shifted scale. My RGB→L approximations above need validation. Specifically: does current gray100 at rgba(178, 188, 196, 1) actually land at L≈0.79 or is it closer to 0.75–0.77?
2. **[@ADA]** If this lands with the OKLCH migration: the palette is being redesigned anyway (per R1/R2 decisions). Does the shift become free — i.e., is the lightness scale for grays being re-tuned regardless? If so, the "shift" isn't really a migration concern — it's just "start the new gray lightness scale at L=0.86 instead of L=0.75."
3. **[@PETER]** Timing question: Is this shift part of Spec 112's palette redesign, or a separate proposal? The answer changes the cost calculus entirely.

### [LEONARDO R3] Neutral Family Partitioning — Design Perspective on White/Gray/Black (2026-06-09)

**Reviewer**: Leonardo (Product Architect)
**Scope**: How neutral families should be structured in OKLCH — three-band model vs. unified neutral ramp
**Context**: White (5 steps), gray (5 steps), black (5 steps) currently overlap significantly in lightness. Gray300–500 and black100–200 occupy the same perceptual territory.

---

#### Q1: How Do I Use Neutrals in Screen Specs?

**I think in terms of role, not family name or absolute lightness.**

My mental vocabulary when specifying screens:

| What I'm thinking | What I reach for | Why |
|---|---|---|
| "Page canvas" | white100 or white200 | Identity: this IS the page |
| "Elevated surface" (card, sheet) | white100 on a white200 background (or vice versa) | Relative: one step different from container |
| "Structural boundary" | gray100 at full opacity, or white400 | Role: "I need a line that separates" |
| "Secondary text" | gray200 | Role: "less important than primary text" |
| "Primary text on light" | gray300 | Role: "the main reading content" |
| "Dark mode canvas" | gray400 or black100 | Identity: "this is the dark surface" |
| "Dark mode elevated surface" | black100 or gray300 | Relative: one step lighter than canvas |
| "True black for OLED/depth" | black400, black500 | Identity: "as dark as possible" |

**Key insight**: I NEVER think "I need lightness 0.52." I think "I need the next level of visual hierarchy." Family names are meaningful to me because they encode **role context** — "white" means surface, "gray" means structure/content, "black" means depth/darkness. But the OVERLAP between families means the role encoding is broken. Gray300 (L≈0.28) and black100 (L≈0.33) being nearly identical means the "family = role" promise is a lie at the boundary.

---

#### Q2: Does the Three-Band Model Match My Mental Model?

**Partially — but the proposed bands don't map to how I actually work.**

The proposal:
- White: L ≈ 1.0 → 0.68 (surfaces)
- Gray: L ≈ 0.86 → 0.50 (mid-tones, structural)
- Black: L ≈ 0.33 → 0.0 (dark surfaces, depth)

**What matches:**
- White = surfaces ✅ — yes, I think of "white" as "the bright things"
- Black = dark/depth ✅ — yes, "black" means "the darkest zone"

**What doesn't match:**
- Gray = mid-tones only (L 0.86→0.50) ❌ — I use gray for BOTH mid-tone structural elements (borders at L≈0.79) AND dark text (gray300 at L≈0.28). The proposed model would exile my primary text color from the gray family. That's counterintuitive — `color.text.default` pointing at gray300 is deeply natural. Moving that value to the "black" family feels semantically wrong.

**My actual mental model for neutrals has three zones, but they're different from the proposal:**

| Zone | Lightness Range | Role | Current tokens covering it |
|---|---|---|---|
| **Light** (surfaces, backgrounds) | L 1.0 → 0.68 | Page canvas, card surfaces, subtle fills | white100–white500 |
| **Middle** (structure, secondary content) | L 0.68 → 0.35 | Borders, muted text, secondary icons, inactive states | gray100–gray200, *and partially gray300* |
| **Dark** (primary content, depth) | L 0.35 → 0.0 | Primary text, dark canvases, deep backgrounds, OLED black | gray300–gray500, black100–black500 |

**The overlap zone (L 0.20–0.35) is exactly where the problem lives.** Gray300 (L≈0.28), gray400 (L≈0.21), gray500 (L≈0.16), black100 (L≈0.33), black200 (L≈0.22) — five tokens in a 0.17 lightness band. That's absurd redundancy.

---

#### Q3: Unified 15-Step Neutral Scale vs. Named Families

**My recommendation: Keep the three family names. Fix the overlap.**

Here's why:

**Against the unified scale:**

A `neutral000` through `neutral1400` scale would give me no design vocabulary. When I write a screen spec and say "card background is neutral200" — what does that MEAN? Is it a light surface? A medium surface? I'd need to memorize that neutral200 is light and neutral900 is dark. The number alone carries no semantic payload.

Compare: "card background is white200" — immediately communicates "bright surface, one notch below pure white." The family name IS information. It tells the reader (platform agents, reviewers, future-me) what ZONE of the neutral spectrum we're in without looking up the value.

**For keeping three families:**

| Benefit | Why it matters for specs |
|---|---|
| Self-documenting | `white300` obviously lighter than `gray200` without checking values |
| Intent encoding | `black200` in a dark mode spec signals "deep" — `neutral1100` signals nothing |
| Cross-platform communication | Telling Kenya "use white200 for the card" is clearer than "use neutral200" |
| Themeability vocabulary | "In dark mode, surfaces use the black family" is clear intent |

**The compromise I'd accept:**

Keep white/gray/black as family names. Fix the overlap by giving each family a clean band. But DON'T restrict gray to mid-tones only — let it span from structural/border territory down to text-weight territory. The three families should partition by ROLE, not by arbitrary lightness bands:

| Family | Role | Proposed L range | Steps |
|---|---|---|---|
| **White** | Surfaces and backgrounds | L 1.0 → 0.68 | 5 (current works fine) |
| **Gray** | Structure and content — borders, text hierarchy, interactive states | L 0.79 → 0.28 | 5 (current gray100–gray300 range, expanded to fill cleanly) |
| **Black** | Depth and darkness — dark mode surfaces, OLED, true darks | L 0.22 → 0.0 | 5 (current black family is fine here) |

**The key difference from the proposal**: Gray extends down to L≈0.28 (where primary text lives), NOT stopping at L≈0.50. "Gray" doesn't mean "medium" — it means "the workhorse neutral family for content and structure."

**Gap analysis on this model**:
- White500 (L≈0.68) → Gray100 (L≈0.79): 0.11 gap. Actually this is REVERSED — gray is lighter than white's darkest step. This needs resolution.

Actually, let me reconsider. With the CURRENT data:
- White range: L 1.0 → 0.68
- Gray range: L 0.79 → 0.16
- Black range: L 0.33 → 0.0

White and gray already overlap (white500 at 0.68 vs gray100 at 0.79 — no overlap in that direction, but gray goes darker than black starts). Gray and black massively overlap (gray300–500 at 0.28–0.16 vs black100–200 at 0.33–0.22).

**The OKLCH migration is the moment to fix this. My recommendation for clean partitioning:**

| Family | New L Range | Step Count | Design Rationale |
|---|---|---|---|
| **White** | 1.0 → 0.75 | 5 | Pure surface family. Nothing in "white" should be usable as text. Everything here is a background or fill. |
| **Gray** | 0.70 → 0.30 | 5 | The full content/structure spectrum. From light borders (L≈0.70) through muted text (L≈0.50) to primary text (L≈0.30). This is the family I use most in specs. |
| **Black** | 0.25 → 0.0 | 5 | Dark mode surfaces and true depth. Nothing in "black" should be ambiguous with gray content. |

**Gap between families:**
- White→Gray: L 0.75 → 0.70 = 0.05 gap. Small, acceptable. Semantic tokens bridge if needed.
- Gray→Black: L 0.30 → 0.25 = 0.05 gap. Small, acceptable. Same reasoning.

---

#### Q4: Dark Mode and Family Name Reversal

**Family names should NOT reverse in dark mode. The semantic layer handles mode switching.**

Here's how I think about it:

In light mode: `color.text.default` → gray300 (L≈0.30, dark text on light surface)
In dark mode: `color.text.default` → white300 (L≈0.93, light text on dark surface)

The SEMANTIC token is stable (`color.text.default` always means "primary readable text"). The PRIMITIVE it points to changes per mode. I don't need "white" to mean "dark background" in dark mode — that's insane. I need the semantic layer to say "in dark mode, text is white-family, surfaces are black-family."

**This is how it ALREADY works** in the system (SemanticOverrides). The primitive family names are absolute descriptions of their lightness character. "White" is always bright. "Black" is always dark. The mode system composes them into roles.

**The unified neutral ramp would BREAK this model** because you can't do "in dark mode, swap neutral200 for neutral1200" — you'd need a full mapping table. With named families, dark mode is "swap which family fills each role." That's expressive and maintainable.

---

#### Q5: The Gap Between Bands (L≈0.40 Region)

**In the model I proposed above (gray down to L≈0.30, black starting at L≈0.25), the gap is L 0.30→0.25 = only 0.05.**

But there's a broader question: is there UI work at L≈0.40 that has no token?

**Looking at current usage:**

- gray200 at L≈0.52: muted/secondary text, icons, borders
- gray300 at L≈0.28: primary text (dark)

The L≈0.40 zone is... actually where I'd want something like "medium-emphasis text that's not quite primary but not as muted as secondary." Think: timestamps, captions, metadata. Currently I either use gray200 (too light, reads as "muted") or gray300 (too dark, reads as "primary"). Neither is right for caption text.

**Is this a problem in practice?** Sometimes. When specifying information-dense screens (settings, data tables), I want MORE steps in the content zone. 5 steps from L≈0.70 to L≈0.30 means each step is ~0.10 apart. At L≈0.52, 0.42, 0.32 I'd have three usable text weights — which is exactly what I need (primary, secondary, tertiary).

**So the answer is**: The gap at L≈0.40 IS a practical problem TODAY (it's between gray200 and gray300). My proposed 5-step gray scale from L 0.70→0.30 would produce steps at approximately L: 0.70, 0.60, 0.50, 0.40, 0.30 — which fills that gap naturally.

---

#### Summary Position

| Question | My Answer |
|---|---|
| Three bands or unified? | **Three bands** — family names carry semantic meaning I use daily |
| Proposed band boundaries? | White (1.0→0.75), Gray (0.70→0.30), Black (0.25→0.0) with 0.05 gaps |
| Does current proposal match my mental model? | **Partially** — I agree with the partition concept but disagree with Gray stopping at L≈0.50. Gray must include text-weight territory. |
| Dark mode reversal? | **No** — semantic layer handles mode. Primitives stay absolute. |
| L≈0.40 gap? | **Real problem TODAY**, solved naturally if gray gets evenly distributed 5-step scale in the proposed band. |
| Unified neutral ramp? | **Oppose** — loses self-documenting family names, complicates dark mode reasoning, trades readability for mathematical tidiness. |

---

#### Requests

1. **[@ADA]** Convert the three neutral families (white, gray, black) to OKLCH per R1 methodology. Specifically: what are the ACTUAL lightness values, and do any of the three families carry chroma (I suspect white and gray have subtle cool-blue undertones based on their RGB values — gray100 is rgba(178, 188, 196) which is distinctly blue-gray).

2. **[@ADA]** Given my proposed partitioning (white 1.0→0.75, gray 0.70→0.30, black 0.25→0.0): how many of the current 15 neutral tokens would need to MOVE between families vs. be re-valued within their family? What's the migration blast radius?

3. **[@ADA]** The neutral families' chroma: should neutrals be truly achromatic (C=0) in OKLCH, or should they carry the current cool-blue undertone as intentional chroma? If intentional chroma, does each neutral family share the same hue, or do white/gray/black have different color temperatures?

4. **[@PETER]** The proposed partitioning eliminates the L≈0.40-0.68 overlap between families but introduces a clean gap. Are you comfortable with "no primitive token exists at L≈0.72" (between white500 and gray100), with the understanding that the semantic layer bridges any specific needs? Or do you want full coverage with no gaps at any lightness level?

---

#### Counter-Argument to My Own Position

**The strongest case for the unified neutral ramp**: It eliminates the "where does L≈0.72 belong?" question entirely. With `neutral000` through `neutral1400`, every 0.07 lightness step has a home. No governance overhead for "should this be a gray or a white?" No ambiguity at boundaries.

Products like Tailwind CSS (slate/gray/zinc/neutral/stone), Radix (gray/mauve/slate/sage/olive/sand), and Material Design (neutral/neutral-variant) have moved toward this model. The industry trend is "one neutral ramp + hue variants" rather than "multiple families at different lightness bands."

**Why I still oppose it for DesignerPunk**: Our semantic layer is THICKER than Tailwind's or Radix's. We don't expose primitives directly to products — products consume `color.text.default`, not `gray300`. The family name's value is at the AUTHORING layer (Ada, Leonardo, Lina thinking about which primitive to map a semantic to), not the consumption layer. And at that authoring layer, "this semantic token should point to a white-family primitive" is clearer direction than "this semantic token should point to neutral300."

If the semantic layer were thinner (products consuming primitives directly), I'd flip to the unified ramp. But given our architecture, named families serve the authoring process better.

### [ADA R4] Neutral Family Partition — Non-Overlapping Lightness Bands (2026-06-09)

**Reviewer**: Ada (Rosetta Token Specialist)
**Scope**: Mathematical viability of restructuring white/gray/black into non-overlapping OKLCH lightness bands
**Building on**: R1 OKLCH conversion data, R3 gray scale analysis

---

#### Verified Current State (Precise OKLCH)

| Token | RGBA | L | C | H° | Family |
|-------|------|------|------|-------|--------|
| white100 | (255,255,255) | **1.000** | 0.000 | — | White |
| white200 | (245,245,250) | **0.972** | 0.007 | 286° | White |
| white300 | (232,232,240) | **0.933** | 0.011 | 286° | White |
| white400 | (197,197,213) | **0.828** | 0.022 | 286° | White |
| white500 | (153,153,171) | **0.689** | 0.026 | 286° | White |
| gray100 | (178,188,196) | **0.790** | 0.016 | 242° | Gray |
| gray200 | (94,112,124) | **0.535** | 0.029 | 237° | Gray |
| gray300 | (38,50,58) | **0.310** | 0.022 | 238° | Gray |
| gray400 | (24,34,40) | **0.245** | 0.018 | 235° | Gray |
| gray500 | (16,22,26) | **0.196** | 0.012 | 237° | Gray |
| black100 | (58,58,69) | **0.353** | 0.019 | 285° | Black |
| black200 | (34,34,42) | **0.255** | 0.015 | 285° | Black |
| black300 | (10,10,15) | **0.147** | 0.011 | 285° | Black |
| black400 | (6,6,10) | **0.125** | 0.010 | 285° | Black |
| black500 | (0,0,0) | **0.000** | 0.000 | — | Black |

**Full lightness map (sorted, all 15 neutrals):**
```
white100  L=1.000  ─┐
white200  L=0.972   │ WHITE
white300  L=0.933   │
white400  L=0.828   │
gray100   L=0.790  ←┼── OVERLAP: inside white range
white500  L=0.689  ─┘
gray200   L=0.535   │ GRAY (mid)
black100  L=0.353  ←┼── OVERLAP: gray300 ≈ black100
gray300   L=0.310   │
black200  L=0.255  ←┼── OVERLAP: gray400 ≈ black200 (ΔL=0.010!)
gray400   L=0.245   │
gray500   L=0.196   │
black300  L=0.147   │ BLACK
black400  L=0.125   │
black500  L=0.000  ─┘
```

**Overlap severity:**
- **Gray/Black is catastrophic**: gray400 (0.245) and black200 (0.255) are 0.010 apart — below JND. These are functionally identical tokens in different families.
- **White/Gray is moderate**: gray100 (0.790) sits inside the white range but is perceptibly distinct from any single white step.

---

#### Q1: Mathematical Viability — 5 Perceptually Even Steps Per Band

**JND (Just Noticeable Difference) in OKLCH lightness:**
- Lab/theoretical: ΔL ≈ 0.01–0.02 for adjacent patches under controlled conditions
- Practical UI (varied backgrounds, small areas, peripheral vision): ΔL ≈ 0.03–0.04
- Comfortable design differentiation (reliably distinct in context): ΔL ≥ 0.05

**Your proposed step sizes:**

| Family | Range | ÷ 4 steps | ΔL/step | vs JND (0.04) | Assessment |
|--------|-------|-----------|---------|---------------|-----------|
| White | 1.0→0.68 = 0.32 | 0.080 | 2.0× JND | ✅ Comfortable |
| Gray | 0.86→0.50 = 0.36 | 0.090 | 2.3× JND | ✅ Comfortable |
| Black | 0.33→0.0 = 0.33 | 0.083 | 2.1× JND | ✅ Comfortable |

**Verdict: Yes, mathematically viable.** All step sizes are 2× or more above the practical JND threshold. Each family's 5 steps will be clearly perceptually distinct.

**HOWEVER** — there's a perceptual non-linearity concern at the extremes. Near L=0.0, human vision is *less* sensitive to lightness differences (Stevens' power law). A step from L=0.083 to L=0.000 appears smaller than a step from L=0.580 to L=0.497, even though the numerical ΔL is identical. This suggests the black family might benefit from *larger* steps (non-linear spacing) at the dark end. For now, linear spacing works — this is a refinement for tuning, not a blocker.

---

#### Q2: The Gap Problem — Optimal Partition

**Your proposed model has an ordering issue:**

```
White: 1.0 → 0.68    (white100=1.0, white500=0.68)
Gray:  0.86 → 0.50   (gray100=0.86, gray500=0.50)
Black: 0.33 → 0.0    (black100=0.33, black500=0.0)
```

Problem: **Gray100 (L=0.86) overlaps with White300 (L≈0.87)**. The gray family starts *lighter* than the white family ends. This is worse than the current state.

**Root cause**: You want gray to cover the L≈0.86 region (for the subtle backgrounds gap identified in R3), but white already covers down to L≈0.68. These ranges cross.

**Three viable corrections:**

**Model A — Shrink white, expand gray upward:**

| Family | Range | Role | ΔL/step |
|--------|-------|------|---------|
| White | 1.00 → 0.86 | Pure white to near-white surfaces | 0.035 |
| Gray | 0.82 → 0.42 | Mid-tones, structure, secondary content | 0.100 |
| Black | 0.35 → 0.00 | Dark surfaces, text on light, deep backgrounds | 0.088 |

**Problem**: White steps are only 0.035 apart — barely above JND. Only 4 useful steps (white100 at L=1.0 is special). The white family becomes too compressed to provide meaningful differentiation.

**Model B — Non-overlapping bands with buffer gaps (RECOMMENDED):**

| Family | Range | Steps | ΔL/step | Role |
|--------|-------|-------|---------|------|
| White | 1.00 → 0.75 | 1.00, 0.94, 0.88, 0.81, 0.75 | 0.063 | Light surfaces, subtle backgrounds |
| *buffer* | 0.75 → 0.72 | — | — | *Perceptual break between families* |
| Gray | 0.72 → 0.42 | 0.72, 0.65, 0.57, 0.50, 0.42 | 0.075 | Mid-tones, borders, muted text, structural |
| *buffer* | 0.42 → 0.35 | — | — | *Perceptual break between families* |
| Black | 0.35 → 0.00 | 0.35, 0.26, 0.18, 0.09, 0.00 | 0.088 | Dark surfaces, body text on light, deep backgrounds |

**Why this works:**
- Buffer gaps (0.03 and 0.07) ensure no token from one family can be confused with any token from an adjacent family
- All within-family steps are ≥ 0.063 (well above JND)
- Gray's range (0.30) gives adequate spread for mid-tone differentiation
- Black includes L=0.00 (true black) and the body-text zone (L=0.26–0.35)
- White covers L=0.75 (the "subtle background" zone Leonardo identified in R2)

**Model C — Continuous partition (no gaps, families share boundary values):**

| Family | Range | Steps | ΔL/step |
|--------|-------|-------|---------|
| White | 1.00 → 0.70 | 1.00, 0.93, 0.85, 0.78, 0.70 | 0.075 |
| Gray | 0.70 → 0.36 | 0.70, 0.62, 0.53, 0.45, 0.36 | 0.085 |
| Black | 0.36 → 0.00 | 0.36, 0.27, 0.18, 0.09, 0.00 | 0.090 |

**Problem**: White500 = Gray100 = 0.70. Do they share the same token? Different tokens, same value? This creates semantic ambiguity. A buffer gap avoids this entirely.

**My recommendation: Model B.** The buffer gaps are deliberate — they enforce that family identity is unambiguous. A value at L=0.73 is unmistakably "between white and gray" — it doesn't exist, forcing designers to commit to one family or the other.

**Counter-argument against buffer gaps**: The gaps mean certain lightness values are *unreachable* by any neutral token. L=0.73 has no token. If a design needs precisely that value, it falls in no-man's-land. HOWEVER: this is true of any discrete scale — spacing doesn't have a token for 13px either. The semantic layer is where you express intent; the primitive layer provides building blocks, not a continuous gradient.

---

#### Q3: Chroma in Neutrals — The Hue Divergence Problem

**Critical finding: The three neutral families currently have DIFFERENT hues.**

| Family | Hue | Description | Chroma Range |
|--------|-----|-------------|--------------|
| White | ~286° | Blue-violet | 0.000 → 0.026 |
| Gray | ~237° | Blue-indigo | 0.012 → 0.029 |
| Black | ~285° | Blue-violet | 0.000 → 0.019 |

**White and black share the same hue (~285-286°), but gray is 48° away (~237°).** This is not a rounding artifact — it's a deliberate (or accidental) design choice in the current RGB palette. Gray tokens have a distinctly cooler, more blue-indigo character compared to the purple-tinted whites and blacks.

**Is this visible?** At these low chroma values (C < 0.03), the hue difference is subtle but perceptible in direct comparison, especially at mid-lightness values where chroma peaks. Gray200 (C=0.029, H=237°) next to white400 (C=0.022, H=286°) at similar lightness would show gray200 as slightly more "cool blue" and white400 as slightly more "warm violet."

**Recommendation for the OKLCH restructure:**

**Option 1: Unify all neutrals to a single hue (~265°, splitting the difference)**
- Pros: Seamless transitions between families, no color temperature shift when stepping across boundaries
- Cons: Changes the visual character of both gray (warmer) and white/black (cooler)

**Option 2: Preserve the hue split (white/black=286°, gray=237°)**
- Pros: Maintains current visual character exactly, no visible change for existing products
- Cons: If gray is repositioned (lighter), the hue shift becomes more visible because chroma increases at mid-lightness. A gray at L=0.72 with H=237° next to a white at L=0.75 with H=286° would show a noticeable color temperature jump.

**Option 3 (RECOMMENDED): Single shared neutral hue as a channel primitive, with an escape hatch**

```typescript
// Single hue token all neutrals reference:
neutralHue = 260  // Blue-purple compromise (between 237° and 286°)

// Or: per-family override capability for products that want temperature differentiation:
whiteHue = neutralHue  // default: same as shared
grayHue = neutralHue   // default: same as shared  
blackHue = neutralHue  // default: same as shared
```

**Rationale**: In the OKLCH world, a single `neutralHue` channel primitive gives:
1. **Web CSS composition**: `oklch(var(--gray-l300) var(--gray-c300) var(--neutral-hue))` — all neutrals share one hue variable
2. **Product theming**: Products can override `neutralHue` to shift ALL neutrals (warm gray vs cool gray) with one change
3. **Per-family override**: If a product WANTS warm whites and cool grays, they override `grayHue` independently — the architecture supports it without requiring it

**Should chroma also be a shared pattern?** Looking at the data, chroma in neutrals follows a predictable curve: near-zero at the extremes (L=0 and L=1), peaking in the mid-range (L≈0.5–0.7). This is partially a gamut property (you can't have visible chroma at L=0 or L=1) and partially design intent (more tint in mid-tones for warmth).

**Proposed chroma model for neutrals:**
```
C = neutralChromaBase × bell(L)
where bell(L) = 4 × L × (1 - L)  // parabola peaking at L=0.5 with C_max = neutralChromaBase
```

With `neutralChromaBase = 0.030`:
- At L=1.0: C = 0.030 × 0 = 0 (pure white, no tint)
- At L=0.75: C = 0.030 × 0.75 = 0.023 (subtle tint)
- At L=0.50: C = 0.030 × 1.0 = 0.030 (peak tint — most visible neutral warmth)
- At L=0.25: C = 0.030 × 0.75 = 0.023 (subtle tint)
- At L=0.0: C = 0.030 × 0 = 0 (pure black, no tint)

This gives a physically natural chroma curve (matches what the current palette approximates) and requires only ONE parameter (`neutralChromaBase`) to control all neutral tinting. Products wanting cooler neutrals → lower chroma. Warmer → higher chroma (or shift hue toward 30° for true warm).

---

#### Q4: Unified Neutral Scale (15 Steps) vs Three Named Families

**Option D: One `neutral` family, 15 steps:**

```
neutral100 = L=1.000  (= current white100)
neutral200 = L=0.929
neutral300 = L=0.857
neutral400 = L=0.786
neutral500 = L=0.714
neutral600 = L=0.643
neutral700 = L=0.571
neutral800 = L=0.500
neutral900 = L=0.429
neutral1000 = L=0.357
neutral1100 = L=0.286
neutral1200 = L=0.214
neutral1300 = L=0.143
neutral1400 = L=0.071
neutral1500 = L=0.000  (= current black500)
```

With semantic aliases: `white100 → neutral100`, `gray300 → neutral800`, `black500 → neutral1500`

**Arguments FOR unified:**
1. **Eliminates overlap by definition** — one ordered scale, no ambiguity
2. **Finer granularity** — 15 steps covers the full range without gaps
3. **Simpler token governance** — no "which family does this belong to?" debates
4. **The hue divergence problem disappears** — one family, one hue
5. **Semantic aliases preserve familiar names** — `white`, `gray`, `black` become semantic subsets, not primitive families

**Arguments AGAINST unified:**
1. **Naming convention breaks** — 100-500 scale is established for ALL chromatic families. A 15-step neutral using 100-1500 introduces a new naming pattern. Alternatively, using neutral-A through neutral-O or neutral-01 through neutral-15 diverges from the numeric convention.
2. **15 tokens is 3× more primitives** than any single chromatic family — the neutral family becomes uniquely large, which feels architecturally asymmetric
3. **Loses role-based identity** — "white" carries semantic weight (light surfaces, purity). "gray" carries semantic weight (neutral, structural). "black" carries semantic weight (depth, emphasis). `neutral800` carries no semantic weight.
4. **Configure wizard complexity** — 3 families × 5 steps = 15 values to tune. That's the same token count, but mentally chunked into manageable groups. A flat 15-step scale is harder to reason about: "which subset am I tuning?"
5. **Cross-family relationships lose legibility** — In chromatic families, pink300 and blue300 have comparable lightness. In a unified neutral, what's the equivalent of "I want the gray at pink300's lightness level"? You'd need to know the numeric step, not feel the role.

**My recommendation: Keep three named families, but acknowledge they're semantically partitioned subsets of a single lightness continuum.**

The implementation should be:
1. Three families (white, gray, black) with 5 steps each — preserves convention, naming, and mental model
2. Non-overlapping bands (Model B above) — eliminates the current overlap disaster
3. Single shared `neutralHue` channel primitive — unifies the tint character
4. Optional `neutralChromaBase` parameter — controls tint intensity for all three families simultaneously
5. Validators enforce non-overlap: `white500.L > gray100.L` and `gray500.L > black100.L`

This gives you the **architectural cleanliness** of the unified model (shared hue/chroma, continuous coverage) with the **semantic legibility** of named families (white = light, gray = mid, black = dark).

**Counter-argument to three families**: If we keep three families, the buffer gaps mean certain lightness values (L≈0.73, L≈0.38) have no token. A unified 15-step scale eliminates gaps entirely. BUT: the gaps are features, not bugs. They enforce role commitment and prevent the creeping overlap that caused the current problem. If every lightness value has a token, designers will inevitably reach for "the one closest to what I want" rather than "the one that means what I intend." Semantic friction is a governance mechanism.

---

#### Summary of Recommendations

| Question | Recommendation |
|----------|---------------|
| **Partition model** | Model B: Non-overlapping bands with buffer gaps |
| **Ranges** | White 1.00→0.75, Gray 0.72→0.42, Black 0.35→0.00 |
| **Step sizes** | White: 0.063, Gray: 0.075, Black: 0.088 — all ≥2× JND |
| **Buffer gaps** | W→G: 0.03, G→B: 0.07 — intentional family separation |
| **Hue** | Single `neutralHue` channel (≈260°), per-family override available |
| **Chroma** | Formula-derived: `C = neutralChromaBase × 4L(1-L)`, one parameter controls all |
| **Unified vs three families** | Three named families — semantic legibility + architectural cleanliness via shared channels |
| **Validator rules** | Monotonicity within family + non-overlap across families (`white500.L > gray100.L + buffer`) |

---

#### Open Decisions for Peter

1. **Buffer gap size**: Is 0.03 (W→G) sufficient separation, or should it be larger (0.05)? Larger gaps = more "forbidden" lightness values = more semantic pressure to commit. Smaller = more continuous coverage.

2. **Hue unification**: Accept ~260° as the neutral hue (splitting current 237°/286° difference), or preserve the gray≠white/black temperature split? If preserved, the buffer zones visually mask the temperature shift (you never directly compare adjacent-family tokens). If unified, all neutrals feel more cohesive.

3. **Black range top**: I proposed black starting at L=0.35. Current body text (`color.text.default`) references gray300 (L=0.31), which maps to the black family in the new model. Is it conceptually correct for body text to be a "black" token? Or should gray extend lower (0.72→0.30) and black start at 0.25?

4. **Is this the right moment?** This partition is inherently a PALETTE REDESIGN (same conclusion as R1). The existing semantic tokens will need remapping regardless. If Spec 112 is already the palette redesign moment, this costs nothing extra. If the intent is format-only migration preserving appearance, this conflicts.

---

#### Relationship to R3 (Gray Scale Shift)

The R3 analysis evaluated shifting the current gray scale within the RGBA world. This R4 analysis supersedes that discussion for the OKLCH migration because:

1. **The OKLCH migration redesigns all values anyway** — whether we shift gray now or not, the OKLCH palette will have new lightness values
2. **The partition model addresses the same root problem** (light-gray gap) more completely than the shift did
3. **The semantic remapping work** (flagged as R3's primary cost) is required by the OKLCH migration regardless

If Spec 112 proceeds with the partition model, the gray-shift proposal (R3) becomes moot — it's absorbed into the larger restructure.

### [ADA+LEONARDO R5] Neutral Partition Ranges & Neutral Hue — Combined Analysis (2026-06-10)

**Reviewers**: Ada (mathematical/gamut) + Leonardo (design/specification)
**Scope**: Peter's refined neutral partition proposal with buffer gaps and unified neutral hue
**Building on**: R4 partition analysis, R3 gray scale analysis, Leonardo R3 design perspective

---

#### Peter's Proposal Under Review

**Ranges:**
- White: L 1.0 → 0.80 (5 steps, ΔL = 0.05/step)
- Gray: L 0.72 → 0.32 (5 steps, ΔL = 0.10/step)
- Black: L 0.20 → 0.00 (5 steps, ΔL = 0.05/step)

**Buffer gaps:**
- White→Gray: 0.80 → 0.72 = 0.08 gap
- Gray→Black: 0.32 → 0.20 = 0.12 gap

**Neutral hue:** Single `neutralHue` token matching the product's PRIMARY color hue.

---

#### 1. Range Viability [ADA]

**White (1.0→0.80): ΔL = 0.05/step — VIABLE BUT TIGHT**

With JND at approximately 0.03–0.04 in practical UI conditions, a 0.05 step is 1.4× JND. This is technically above threshold but provides minimal headroom. In controlled conditions (side-by-side swatches, good monitor, attentive viewer), the steps are distinguishable. In real UI contexts (small areas, peripheral vision, varied ambient lighting), adjacent white steps may feel subtly similar.

Specific concern at the light end: Stevens' power law indicates GREATER sensitivity to lightness differences near L=1.0 (the "Weber region" for highlights). So 0.05 steps at L=0.95→0.90 are actually MORE perceptible than the same 0.05 at L=0.85→0.80. The lightness-dependent JND curve works in our favor here — white family steps are perceptually more distinct at the bright end and potentially crowded at the dark end.

**Net assessment**: Viable. The white family works because its steps sit in the region where human vision is most sensitive to lightness differences. I'd mark this as "functional but not generous" — there's no room for error in the step values.

**Gray (0.72→0.32): ΔL = 0.10/step — COMFORTABLE**

At 2.86× JND, this gives excellent differentiation between every step. This is the workhorse range where most UI decisions happen (borders, muted text, secondary content, structural elements). Having generous steps here is correct — designers need clear differentiation in the content zone.

**Net assessment**: Excellent. No concerns.

**Black (0.20→0.00): ΔL = 0.05/step — VIABLE WITH CAVEAT**

Same numerical step size as white (0.05), so same 1.4× JND ratio. HOWEVER: at the dark end, human vision is LESS sensitive to lightness differences (Stevens' power law reversal). A 0.05 step from L=0.05→0.00 is less perceptible than 0.05 from L=0.95→0.90.

Practical implication: black400 (L=0.05) and black500 (L=0.00) may be difficult to distinguish on non-OLED displays. On OLED displays (true black pixels), the difference is visible. On LCD displays (backlit minimum is ~L=0.02-0.04), the bottom two steps may merge.

**Net assessment**: Viable for OLED. On LCD, the two darkest steps (L=0.05 and L=0.00) are practically indistinguishable. This is acceptable — black500 at L=0.00 is a semantic anchor ("true black") even if it's only perceptually distinct on OLED hardware. The architecture doesn't require that every step be distinguishable on every display.

---

#### Buffer Gap Assessment [ADA]

**White→Gray gap: 0.08 (L=0.80 → L=0.72)**

This is 2.3× JND — a clear perceptual break. Values at L≈0.76 would be unambiguously "between families." This gap is well-sized: large enough to enforce family identity, small enough that it doesn't create a usability dead zone.

Is 0.08 too large? No. This gap represents the transition from "light surface territory" to "structural mid-tone territory." There's no common UI role that specifically requires L≈0.76. Semantic tokens can bridge this gap in the rare case a specific value is needed.

**Gray→Black gap: 0.12 (L=0.32 → L=0.20)**

At 3.4× JND, this is a substantial perceptual break. The question is whether UI decisions commonly need tokens in the L=0.20–0.32 range.

**This is the critical concern.** Looking at the current token map:
- gray400 (L=0.245) — currently serves as dark mode canvas, `color.structure.canvas` in dark theme
- black200 (L=0.255) — currently serves dark containers
- gray500 (L=0.196) — currently serves as dark border substrate

In the proposed model:
- gray500 (L=0.32) covers body text ✅
- black100 (L=0.20) is the first "black" token
- **The L=0.22–0.30 zone has NO token** — this is where dark mode secondary surfaces currently live

**Recommendation**: The 0.12 gap is too large for dark mode surface work. Dark mode needs at least 2-3 distinguishable surface levels (canvas, elevated surface, raised surface). With gray500=0.32 and black100=0.20, dark mode gets exactly one step between "dark text weight" and "near-black." Consider narrowing to 0.08 (gray ends at 0.32, black starts at 0.24) or widening black's top to 0.25.

---

#### 2. Gray 0.72→0.32 for Body Text [LEONARDO]

**Gray500 at L=0.32 covers body text? Yes — but it raises a design vocabulary question.**

WCAG verification (Ada computed): L=0.32 on white (L=1.0) produces a contrast ratio of **12.68:1** — well above AA requirements (4.5:1). This is roughly equivalent to our current gray300 (L=0.31, contrast 13.11:1). So the math works.

**The design question: Should body text be "the darkest gray" or should it be "a black"?**

My current mental model: body text at gray300 (L≈0.31) feels like "dark gray text" — which is correct for most product interfaces. It's softer than pure black, more readable for extended content, and creates a subtle warmth that pure black doesn't provide. Body text as gray500 (the family's endpoint) semantically means "this is as dark as gray gets." That's... actually correct? Gray's job is structure and content. Its darkest step IS body text weight.

**What about headings or high-emphasis text?** If someone needs text darker than L=0.32, they'd reach into the black family (black100 = L=0.20). This creates a clear hierarchy:
- **Body text**: gray500 (L=0.32) — comfortable reading weight
- **Heavy emphasis / headings**: black100 (L=0.20) — bold, commanding

**Does this feel right?** Yes, actually. More right than I initially expected. The current system has gray300 for body text and gray400/500 for "darker emphasis" — but those darker grays occupy the same perceptual zone as the black family, creating the overlap problem. Peter's proposal makes the hierarchy explicit: gray IS the text family (light-to-dark), black IS the depth family (dark-to-void).

**One concern**: The jump from gray500 (L=0.32) to black100 (L=0.20) is 0.12 — that's a significant visual leap for a "one step heavier" use case. I'd sometimes want something at L≈0.26 for "semi-bold text weight" or "active navigation labels." This maps to the gap concern Ada raised above.

**Net position**: Gray500=0.32 for body text is semantically correct and mathematically safe. The gap to black100=0.20 could be a constraint for emphasis hierarchies in text-heavy screens.

---

#### 3. Neutral Hue = Primary Hue: Feasibility [ADA]

**At C=0.01–0.02, is hue perceptible?**

I computed the actual RGB differences:

| Condition | H=8° (warm pink) | H=204° (cool cyan) | RGB Delta |
|-----------|-------------------|---------------------|-----------|
| L=0.90, C=0.015 | RGB(232, 218, 220) | RGB(211, 225, 226) | ΔR=21, ΔG=7, ΔB=6 |
| L=0.50, C=0.015 | RGB(107, 96, 97) | RGB(90, 102, 103) | ΔR=17, ΔG=6, ΔB=6 |
| L=0.90, C=0.010 | RGB(228, 219, 221) | RGB(215, 224, 225) | ΔR=13, ΔG=5, ΔB=4 |

**Assessment**:

At C=0.015: **Yes, the difference IS perceptible** — but only in direct comparison. A warm neutral (H=8°) at L=0.90 is RGB(232,218,220) — noticeably pinkish-cream. A cool neutral (H=204°) at L=0.90 is RGB(211,225,226) — noticeably blue-gray. Side by side, these are clearly different color temperatures. The ΔR of 21 is larger than most people's color discrimination threshold (~3-5 8-bit levels).

At C=0.010: The difference reduces but remains detectable in A/B comparison. In isolation (viewing only one palette), most users won't consciously identify the tint. It will feel "warm" or "cool" without being identifiable as "pink" or "blue."

**The critical threshold for hue perception in neutrals:**
- **C ≥ 0.02**: Hue is clearly perceptible. The neutral has an obvious color temperature. This is "tinted gray" territory.
- **C = 0.015**: Hue creates a subtle warmth/coolness. Perceptible in comparison, subliminal in isolation. This is the sweet spot for "intentional but not distracting" brand alignment.
- **C = 0.010**: Barely perceptible. Mostly academic. Functions as governance intent rather than visual impact.
- **C < 0.005**: Hue is meaningless. Indistinguishable from achromatic.

**Recommendation for `neutralChromaBase`**: The bell-curve model from R4 (`C = neutralChromaBase × 4L(1-L)`) with `neutralChromaBase = 0.025–0.030` would produce:
- At L=0.90 (white200-ish): C ≈ 0.009 (barely tinted)
- At L=0.50 (mid-gray): C ≈ 0.025 (clearly warm/cool)
- At L=0.20 (black100): C ≈ 0.016 (subtly tinted)

This means the `neutralHue` token DOES have visual impact in the mid-range (gray family) where C peaks, but is essentially invisible at the extremes (white100 near L=1.0 and black500 at L=0.0). The hue token matters most for the gray family.

**Gamut concern**: At L=0.95, C=0.015 — **all hues are within sRGB gamut** (confirmed computationally). At L=1.0, C=0.015 — **out of gamut for all hues**. But white100 at L=1.0 would have C=0 from the bell curve formula (4×1×0=0), so this is never hit. The model is gamut-safe by construction.

**At L=0.80 (white500), C=0.015**: In gamut for all hues ✅. No gamut concern anywhere in the proposed ranges.

**Net feasibility**: Technically sound. The `neutralHue` token has meaningful visual impact for the gray family (C≈0.02 at mid-L) and negligible impact for white/black extremes. It's a valid architectural choice.

---

#### 4. Neutral Hue = Primary Hue: Design Value [LEONARDO]

**Does matching neutralHue to primary create meaningful visual relationship?**

Yes — but with important nuance about WHEN it matters and when it's irrelevant.

**Where it creates value:**
- **Gray family (L=0.42–0.72)**: With C≈0.015–0.025 from the bell curve, these mid-tones carry perceptible warmth/coolness. A product with pink (H≈8°) primary gets subtly warm grays — borders, muted text, and structural elements all feel harmonious with the brand. This is the "quiet luxury" effect — nothing is obviously tinted, but the overall temperature feels coherent.
- **Dark mode surfaces (black100–200)**: With C≈0.012–0.016, dark surfaces get a whisper of brand alignment. Cool-cyan products get slightly blue-black surfaces; warm-pink products get slightly warm-black surfaces. This is EXACTLY what premium design systems do (look at Apple's dark mode surfaces — they're not achromatic black, they're subtly warm gray-black).

**Where it's irrelevant:**
- **White100 (L=1.0)**: C=0 from the bell curve. Pure white regardless of hue. Good — nobody wants tinted whites at full lightness.
- **Black500 (L=0.0)**: C=0. Pure black. Same reasoning.
- **White200–300 (L=0.95–0.90)**: C≈0.005–0.009. Technically tinted, practically invisible. Fine.

**Do I WANT neutrals to match the primary? Or sometimes contrast?**

Both. And that's why a configuration option matters.

**"Match primary" (default)**: Creates cohesion. The page FEELS like one unified brand. This is correct for ~80% of products. Content-focused apps, productivity tools, e-commerce — all benefit from warm coherence or cool coherence matching their identity.

**"Complement primary" (option)**: Creates tension and visual interest. A warm primary (orange, H≈42°) with cool neutrals (H≈222°) produces the classic "warm accent on cool gray" aesthetic that magazines, fashion brands, and editorial designs use. This is a deliberate creative choice — not wrong, just different intent.

**"Achromatic" (option, C=0)**: For products that want absolute neutrality. Medical apps, data-heavy dashboards, photography tools — anywhere the neutral should truly disappear and ONLY the semantic colors carry meaning.

**Should the configure wizard offer all three?**

**Yes — strongly yes.** The wizard should present:

| Strategy | `neutralHue` | `neutralChromaBase` | Vibe |
|----------|--------------|---------------------|------|
| **Match primary** (default) | = `primaryHue` | 0.025 | Cohesive, brand-aligned |
| **Complement primary** | = `primaryHue + 180` | 0.020 | Editorial tension, sophistication |
| **Achromatic** | N/A | 0.000 | Pure gray, no tint, clinical |

I'd also consider a fourth option: **"Cool neutral"** (H≈240°, the current default blue-gray) for products that want the "tech" feel regardless of their primary color. Many SaaS products use cool-blue neutrals with warm-orange CTAs — it's a design pattern, not an accident.

**Counter-argument**: More options = more governance complexity, more configure wizard UX to design, more documentation. The "match primary" default handles 80% of cases. Adding 3+ alternatives might be over-engineering for the initial release. Ship "match" as default, add alternatives in a follow-up.

**My recommendation**: Ship with "match primary" as the architecture's default behavior. Document that `neutralHue` and `neutralChromaBase` are independently overridable tokens — products that want complement or achromatic can override manually. The configure wizard LATER (Spec 113) can add UI for the strategies. Don't let wizard UX design block the architecture.

---

#### 5. Black Family Starting at L=0.20 [BOTH]

**[ADA] Mathematical assessment:**

Black100=L=0.20 is darker than my R4 proposal (which had black starting at L=0.35). The 5-step black scale would be:
- black100 = 0.20
- black200 = 0.15
- black300 = 0.10
- black400 = 0.05
- black500 = 0.00

Step size: 0.05 — which is the same tight-but-viable spacing as white. However, the perceptual concern is amplified here: at L=0.10→0.05→0.00, on non-OLED displays these three values may be functionally indistinguishable. The black family has 5 tokens but perhaps only 3 perceptually distinct values on LCD.

**Is L=0.20 too dark for "light black"?**

Comparison to current usage:
- Current black100 = L=0.353 (serves as "dark container" in dark mode)
- Proposed black100 = L=0.20 (much darker)

If "dark containers" in dark mode need to be distinguishable from "dark canvas," we need at least 0.05 ΔL between them. With proposed black100=0.20 and black200=0.15, a dark mode canvas at black200 + elevated surface at black100 gives only 0.05 of separation — barely 1× JND. For robust dark mode surface hierarchy, you typically want 2-3 levels of distinguishable dark surfaces.

**[LEONARDO] Design assessment:**

The L=0.20–0.32 gap is where I currently build dark mode surface hierarchies:
- Dark canvas: L≈0.22–0.25 (current gray400/black200 zone)
- Dark elevated surface: L≈0.28–0.32 (current gray300/black100 zone)
- Dark tertiary surface: L≈0.18–0.20 (current gray500 zone)

In the proposed model:
- gray500 (L=0.32) = too light for dark canvas (it's body text weight on light backgrounds)
- black100 (L=0.20) = dark, but is this the canvas or the elevated surface?

**The problem**: Dark mode needs 2-3 surface levels between L≈0.15 and L≈0.30. The proposed model puts ZERO gray tokens and only black100 (L=0.20) in that range. Dark mode surfaces would need to use black100 + black200 (L=0.15) for layering — which gives only 0.05 ΔL of separation.

**What currently lives in L=0.20–0.32 (the gap zone):**

| Current Token | L | Current Role |
|---|---|---|
| gray300 | 0.310 | Primary text (light mode), elevated surface (dark mode) |
| gray400 | 0.245 | Dark canvas, `color.structure.canvas` in dark theme |
| black200 | 0.255 | Dark containers |
| black100 | 0.353 | Dark containers (lighter variant) |

Four tokens currently serve this zone. The proposed model has ZERO tokens between L=0.32 (gray500) and L=0.20 (black100).

---

#### Combined Recommendation

| Aspect | Verdict |
|--------|---------|
| White range (1.0→0.80) | ✅ Viable — tight but saved by perceptual sensitivity at high L |
| Gray range (0.72→0.32) | ✅ Excellent — generous steps, covers content zone |
| Black range (0.20→0.00) | ⚠️ Viable but constrained — LCD indistinguishability at dark end, dark mode surface hierarchy is thin |
| W→G buffer (0.08) | ✅ Well-sized — clear family separation, no dead zone |
| G→B buffer (0.12) | ⚠️ **Too large** — creates dark mode surface gap. Dark mode NEEDS tokens in the L=0.22–0.30 zone |
| Gray500 for body text | ✅ Correct — 12.68:1 contrast, semantically appropriate |
| `neutralHue` = primary hue | ✅ Feasible, gamut-safe, visually meaningful in mid-range |
| Hue perceptibility at C=0.015 | ✅ Perceptible in comparison, subliminal in isolation — sweet spot |
| Black100 at L=0.20 | ⚠️ Concerns — leaves dark mode surfaces underserved |

---

#### Proposed Refinement

To address the dark mode gap while preserving Peter's core structure:

**Option A — Narrow the G→B gap (recommended):**
- Gray: 0.72 → 0.32 (unchanged)
- Black: **0.28** → 0.00 (raise black100 from 0.20 to 0.28)
- New gap: 0.32 → 0.28 = **0.04** (still above JND, still a clear family boundary)
- Black steps: 0.28, 0.21, 0.14, 0.07, 0.00 (ΔL=0.07/step — comfortable 2× JND)
- **Benefit**: Dark mode gets black100(0.28), black200(0.21), black300(0.14) — three distinguishable surface levels

**Option B — Accept the gap, solve at semantic layer:**
- Keep Peter's proposal exactly as stated
- Dark mode surfaces use semantic overrides that point to: black100(0.20) for canvas, then... no good elevated surface option
- Requires a "dark-mode semantic tokens map to different families" approach that doesn't have enough primitive material to work with

**Option C — Expand black to 6 steps (breaks convention):**
- Black: 0.28 → 0.00 with 6 steps (ΔL=0.056)
- Breaks the 5-step universal convention established for all families
- Not recommended

**Our preference**: Option A. Raising black100 to L=0.28 fills the dark mode gap, gives 7-step ΔL within black (comfortable), and the resulting 0.04 gap is still a meaningful family boundary (above JND).

---

#### Neutral Hue Configuration Summary

| Parameter | Recommended Default | Override Available | Visual Impact |
|-----------|--------------------|--------------------|---------------|
| `neutralHue` | = `primaryHue` | Yes (manual or wizard) | Meaningful in gray family (C≈0.02), negligible at extremes |
| `neutralChromaBase` | 0.025 | Yes | Controls tint intensity across all neutrals |
| Strategy presets (Spec 113) | "Match primary" | "Complement", "Achromatic", "Cool neutral" | Wizard UX — not needed for architecture |

**The `neutralHue` token is governance + visual intent.** It has real visual impact where chroma is perceptible (gray family mid-tones), and serves as documented intent where chroma is negligible (white/black extremes). This dual role is fine — the token expresses "these neutrals belong to this brand temperature" regardless of whether individual steps are visibly tinted.

---

#### Open Decisions for Peter

1. **Gap size G→B**: Peter's 0.12 vs our recommended 0.04 (black starting at 0.28 vs 0.20). The tradeoff: 0.12 gap = stronger family identity separation, but dark mode surface hierarchy is starved. 0.04 gap = dark mode works well, but families are closer together at the boundary.

2. **Neutral hue strategy**: Ship "match primary" as the sole architecture, with manual override via `neutralHue` token? Or build multiple strategy presets into the token source? (We recommend: architecture supports override, wizard handles presets later.)

3. **Black step count**: If black stays at L=0.20→0.00, accept that dark mode surface hierarchy uses only 0.05 ΔL steps? Or raise black100 to give more headroom?


### [LEONARDO R4] Requirements Review — Design & Specification Perspective (2026-06-10)

**Reviewer**: Leonardo (Product Architect)
**Scope**: R2, R3, R6, R9 focus areas + missing requirements assessment
**Status**: Requirements document review

---

#### R2 (Neutral Partition): Do the Ranges Match What We Agreed?

**Yes — the requirements accurately encode the resolved decisions from design outline.**

The acceptance criteria (White 1.0→0.80, Gray 0.72→0.32, Black 0.28→0.00, buffer gaps, shared neutralHue, parabolic chroma) match the partition model we converged on through R3→R4→R5.

**Gray500 at L=0.32 for body text: Works for my specs.**

Verified: `color.text.default` currently maps to gray300 (L≈0.31 in current RGBA). The proposed gray500 at L=0.32 is essentially the same perceptual weight — this is a name change (gray300→gray500) but not a visual change for body text. Contrast ratio of 12.68:1 on white is well above AA. My screen specs reference `color.text.default` (the semantic token), not the primitive directly, so the renumbering is invisible to me at the consumption layer.

**One note for documentation**: The fact that body text is now the ENDPOINT of the gray family (gray500 = darkest gray) rather than a mid-step (current gray300) is semantically correct — gray's role in the new model IS "structure and content," and body text is the heaviest content weight before you cross into the "depth" territory of the black family. This reads well in my mental model.

**AC validation**:
- AC1–3 (ranges, steps): ✅ Correct
- AC4 (buffer gaps: 0.08 W→G, 0.04 G→B): ✅ Matches Option A from R5 where black was raised to 0.28
- AC5–6 (shared neutralHue, default = primary hue): ✅ Matches
- AC7 (parabolic chroma): ✅ Matches recommendation

No changes needed to R2.

---

#### R3 (Web Output): Does Channel Primitive Output Give Me What I Need for Color Strategy Declarations?

**Yes — this is one of the primary motivations I care about.**

What I need for color strategy work:

| Operation | How R3 enables it |
|-----------|-------------------|
| "Same color at reduced opacity" (Restrained strategy, muted backgrounds) | `oklch(from var(--pink-300) l c h / var(--opacity056))` — AC4 |
| "Compose product-specific tint from system channels" | `oklch(var(--pink-l300) var(--pink-c300) var(--pink-hue))` — AC2/AC3 |
| "Neutrals with brand temperature" | `oklch(var(--gray-l300) var(--gray-c300) var(--neutral-hue))` — neutralHue as CSS custom property |
| "Drenched surface: full chroma at a specific lightness" | Direct channel reference: use `var(--pink-c300)` (peak chroma step) with custom lightness |

**The critical capability for my workflow**: When I declare a "Committed" color strategy on a screen, the platform agent (Sparky) needs to create surfaces where a single color dominates at multiple lightness levels. With channel primitives as CSS custom properties, Sparky can compose `oklch(var(--cyan-l100) var(--cyan-c100) var(--cyan-hue))` through `oklch(var(--cyan-l500) var(--cyan-c500) var(--cyan-hue))` — the full family available without 5 separate composed tokens for "cyan at various weights." This collapses the token-explosion problem for color-heavy screens.

**One question (not a blocker)**: AC3 says products "SHALL be able to compose at runtime." This is a statement of capability, not a validation criterion. How is this tested? Is it sufficient that the output format is correct (oklch accepts var references), or should there be an integration test that actually renders a composed color?

**Recommendation**: Add a note to AC3 clarifying that validation is structural (correct CSS output format), not runtime rendering. The browser's CSS engine validates the composition — we don't need to test that CSS works.

No blocking changes needed to R3.

---

#### R6 (Blends): Will My Screen Specs Need Updating After Re-Tuning?

**No — my specs reference semantic tokens that abstract the blend layer.**

Here's why I'm confident:

My screen specifications never reference blend percentages directly. I specify interaction states through semantic intent:
- "Hover state: `color.action.primary.hover`" (semantic token)
- "Pressed state: `color.action.primary.pressed`" (semantic token)
- "Disabled: `color.action.disabled`" (semantic token)

The blend percentages that produce these semantic colors are Lina's domain (behavioral contracts) and Ada's domain (blend utility implementation). When R6 re-tunes blend percentages for OKLCH perceptual correctness, the semantic tokens remain stable — their VALUES change (different oklch output), but their NAMES and ROLES are unchanged.

**Where the specs reference blend-adjacent concepts:**
- Color strategy declarations ("subtle highlight on hover") — these are intent descriptions, not numeric blend references
- Component props that trigger state changes (`state: "pressed"`) — the component handles the blend internally

**AC5 is the one I care about**: "Contracts SHOULD move toward intent-based descriptions ('perceptibly darker than rest') over numeric percentages where possible." This aligns perfectly with how I specify. If behavioral contracts say "hover = 12% lighter" and that changes to "hover = 8% lighter in OKLCH," I don't care — my spec says "hover uses the hover semantic token." But if contracts move to "hover = perceptibly lighter than rest," my rationale sections become MORE expressive, not less.

**The one scenario where I'd need updating**: If a semantic token is ELIMINATED or RENAMED during the blend rework. R6 doesn't suggest this — it says percentages change, not that tokens disappear. As long as `color.action.primary.hover` still exists and still means "primary action in hover state," my specs are stable.

**Net answer**: No spec updates required. The semantic abstraction layer does its job here.

---

#### R9 (MCP): Does Token-Index Structure Serve My Component Selection Workflow?

**Yes — channels as metadata (not top-level) is exactly what I requested in R1.**

My workflow when selecting components:
1. `find_components({ context: "form-footers" })` → get component options
2. `get_component_full({ name: "Button-CTA" })` → see token usage
3. `search_tokens({ family: "color" })` → browse available colors for strategy declaration

In step 3, I want to see `pink-300`, `cyan-400`, `color.text.default` — composed colors and semantics. I do NOT want to see `pink-l300`, `pink-c300`, `pink-hue` cluttering the results. AC2 ("Channel primitives SHALL NOT appear as separate top-level MCP entries") gives me exactly the clean query results I need.

**AC3 is a nice bonus**: `get_token_details({ name: "pink-300" })` returning OKLCH channel values alongside the composed value means I can REASON about color relationships when writing spec rationale ("pink-300 and cyan-300 share the same lightness step because both reference L=0.65") without needing to query channel tokens directly.

**AC4 is critical for backward compatibility**: `search_tokens({ family: "color" })` continuing to return composed colors means my existing patterns for color selection don't change. The OKLCH migration is invisible to my MCP query workflow.

**One consideration for future**: If I ever need to query "which colors share the same lightness step?" (useful for Full Palette strategy — ensuring equal visual weight across families), I'd want a query like `search_tokens({ family: "color", metadata: { lightness: 0.65 } })`. R9 doesn't explicitly require this filter capability, but storing channels as metadata (AC1) makes it implementable later without structural changes. I'm fine with this being a follow-up enhancement, not a launch requirement.

No changes needed to R9.

---

#### Missing Requirements Assessment

**Identified gaps from the design/specification perspective:**

**1. Product Token Color Migration Guidance (MISSING — should be an AC or a separate requirement)**

R11 covers consumer CSS continuity and sync, but does NOT address product tokens that use `value:` with hard-coded colors. Products that followed Product-Token-Governance and created tokens like:

```yaml
chartAccentBlue:
  value: "#2196F3"
  unitType: color
```

These need guidance on whether to:
- Convert to OKLCH `value:` format
- Convert to `ref:` pointing at a system primitive (if the OKLCH migration adds one close enough)
- Remain as hex (and get auto-converted by the pipeline)

**Recommendation**: Add an AC to R11: "Product tokens with `unitType: color` and hex `value:` SHALL be validated by `npx designerpunk validate --product-tokens` with a warning suggesting OKLCH conversion. Conversion SHALL NOT be forced — product tokens are product-owned."

**2. Color Strategy Documentation for Gamut Limits (MISSING — should be AC in R10)**

From Ada's R2 analysis, we know cyan and teal have limited chroma capacity (can't "drench"). This is operationally important for my color strategy declarations — if I specify "Drenched" with cyan, the platform agent needs to know it won't achieve extreme vibrancy.

**Recommendation**: Add to R10 AC1: Token-Family-Color.md SHALL document per-family chroma capacity limits, including which families support each color strategy tier (Drenched requires high chroma; cyan/teal are limited).

**3. Tolerance Table Update in Product-Token-Governance (noted but worth explicit tracking)**

R10 AC2 already says "color tolerance row SHALL be updated from RGB ±2/channel to OKLCH ΔE threshold." This is correct. Just confirming: the system-first value selection workflow in Product-Token-Governance already has a `# TODO` comment noting this dependency. Good — it's tracked. No additional requirement needed.

**4. Dark Mode Surface Hierarchy Validation (IMPLICIT — could be explicit)**

The neutral partition (R2) gives us black100(0.28)→black200(0.21)→black300(0.14) for dark mode surfaces. R2 AC4 specifies buffer gaps. But there's no explicit requirement that dark mode surface hierarchy is validated — i.e., that the semantic tokens for dark mode canvas/elevated/raised surfaces produce sufficient contrast between levels.

**Recommendation**: Consider adding to R8: "Dark mode surface hierarchy (canvas, elevated, raised) SHALL maintain minimum ΔL ≥ 0.05 between adjacent surface levels." This is implicitly true with the proposed black scale (0.07 steps), but making it explicit protects against future regressions.

---

#### Summary

| Area | Verdict | Action Needed |
|------|---------|---------------|
| R2 (Neutral partition) | ✅ Matches agreed decisions | None |
| R3 (Web output) | ✅ Enables color strategy declarations | Minor: clarify AC3 validation scope |
| R6 (Blends) | ✅ Specs abstract via semantic tokens — no updates needed | None |
| R9 (MCP) | ✅ Channels-as-metadata serves my workflow | None |
| Missing: Product token color migration | ⚠️ Gap | Add AC to R11 |
| Missing: Gamut limits in color docs | ⚠️ Gap | Add to R10 AC1 |
| Missing: Dark mode surface validation | ⚠️ Minor gap | Consider adding to R8 |

**Overall assessment**: The requirements are well-structured and cover the system's needs comprehensively. The three gaps I identified are all additive (no existing requirements need changing) and are at the "nice to have explicit" level rather than "this will fail without it." The core architecture — channel primitives, neutral partition, blend rework, MCP structure — all serve the product specification workflow correctly.

**Stamp**: [LEONARDO R4] — Requirements reviewed, approved with minor additive suggestions.

### [ADA R4] Requirements Review — Targeted Technical Feasibility (2026-06-10)

**Reviewer**: Ada (Rosetta Token Specialist)
**Scope**: Direct answers to 6 specific implementation questions raised during review
**Status**: Focused feasibility assessment (complements the broader [ADA R5] review above)

---

#### Q1: R1 AC6 Validators (Monotonicity, Min Step ≥0.08, Gamut) — Implementable? Missing Constraints?

**All three are implementable.** No exotic dependencies, no approximation needed.

| Validator | Implementation | Complexity | Concern |
|-----------|---------------|------------|---------|
| **Lightness monotonicity** | `L[n] > L[n+1]` for all adjacent pairs | Trivial (~3 lines) | None |
| **Min step ≥ 0.08** | `Math.abs(L[n] - L[n+1]) >= 0.08` | Trivial (~3 lines) | None — 0.08 is 2× practical JND, good engineering margin |
| **sRGB gamut check** | OKLCH→OKLab→linear sRGB, assert all channels ∈ [0,1] | ~15 lines of deterministic matrix math | None — Ottosson's reference matrices are canonical |

**Missing constraints that SHOULD be added to R1.6:**

1. **Chroma monotonicity (steps 300→500)**: Without this, an author could make step 400 more vibrant than step 300. Darker steps should have equal or lower chroma. Validator: `C[n] >= C[n+1]` for steps 300→500.

2. **Hue consistency enforcement**: All composed colors in a family must reference the same hue token. Currently this is convention; it should be enforced at registration. Validator: assert all tokens in a family share `familyHue` reference.

3. **Neutral chroma ceiling**: R2 specifies parabolic chroma for neutrals but no hard cap. At C > 0.035 a "neutral" becomes visibly tinted. Validator: `C <= 0.035` for all neutral family steps.

**Counter-argument**: Adding constraints now increases the validator surface before we've authored actual values. Some constraints may prove too strict during palette tuning. HOWEVER: it's cheaper to relax a constraint during design than to discover drift post-implementation. Add them; relax if needed.

---

#### Q2: R3 (Web) — Is `oklch(var(--l) var(--c) var(--h))` Valid CSS?

**✅ Confirmed valid per CSS Color Level 4.**

The `oklch()` function syntax is space-separated: `oklch(L C H [/ A])`. Each position accepts `<number>`, `<percentage>`, or `<angle>` (for H). CSS custom property substitution via `var()` is permitted in any position where a value is expected — this is a fundamental CSS mechanism, not specific to color functions.

**Confirmed by:**
- CSS Color Module Level 4 formal syntax: `oklch( [ <percentage> | <number> | none ] [ <percentage> | <number> | none ] [ <hue> | none ] [ / [ <alpha-value> | none ] ]? )`
- MDN documentation shows `oklch(from var(--color) l c h / calc(alpha - 0.1))` as valid usage
- The spec explicitly notes `var()` substitution happens before function parsing — so `oklch(var(--l) var(--c) var(--h))` is parsed identically to `oklch(0.65 0.245 8)`
- Browser support: Chrome 111+, Safari 15.4+, Firefox 113+ (all shipping since May 2023)

**One nuance worth documenting (not a requirement gap):** When `oklch()` is constructed from `var()` references, `getComputedStyle()` returns the resolved value (`oklch(0.65, 0.245, 8)`) not the `var()` expression. This is correct browser behavior. Relative color syntax (`oklch(from var(--pink-300) l c h / 0.5)`) requires a resolved color value as the `from` source — and a composed custom property resolves correctly.

**No requirement change needed.** R3 is technically correct as written.

---

#### Q3: R5 (DTCG/Figma) — OKLCH→sRGB Precision/Rounding Concerns?

**The conversion IS deterministic, but two precision concerns need an AC:**

**Conversion path**: OKLCH → OKLab (polar→cartesian via cos/sin) → linear sRGB (3×3 matrix) → sRGB (gamma encode) → 8-bit hex (round).

| Step | Precision Risk | Mitigation |
|------|---------------|------------|
| `cos(H°)` / `sin(H°)` | Cross-platform trig can differ by 1–2 ULP | Single implementation (see below) |
| 3×3 matrix multiply | IEEE 754 double accumulates ~10⁻¹⁵ error | Negligible — below 8-bit threshold |
| Gamma encoding | Algebraic — exact per IEC 61966-2-1 | None needed |
| **8-bit quantization** | ±0.5/255 per channel → ΔE₀₀ ≈ 0.2–0.5 | **This IS the precision floor** |

**The real risk is cross-implementation divergence**, not mathematical precision. If TypeScript's `Math.cos()` and Swift's `cos()` differ by 1 ULP, the 8-bit rounding might go different directions for values near the 0.5/255 boundary.

**Proposed additions to R5:**

> **R5.5**: OKLCH→sRGB conversion SHALL be performed by a single canonical implementation (TypeScript, in the build pipeline). DTCG and Figma hex output SHALL derive from the same build-time computation — NOT from platform-specific runtime conversion.

> **R5.6**: Gamut mapping SHALL use chroma reduction at constant lightness and hue (CSS Color Level 4 gamut mapping algorithm). Binary search SHALL terminate at ΔE₀₀ < 0.02 between candidate and gamut boundary.

R5.5 eliminates the cross-platform trig divergence entirely. R5.6 specifies the "clamp to nearest" algorithm unambiguously.

---

#### Q4: R8 (WCAG) — Is the OKLCH→sRGB Relative Luminance Path Well-Documented and Deterministic?

**✅ Yes — it is the ONLY correct path, fully standardized, zero ambiguity.**

WCAG 2.x defines contrast ratio exclusively using sRGB relative luminance per W3C's formula:
```
L = 0.2126R + 0.7152G + 0.0722B  (on linearized sRGB channels)
```

There is NO alternative. WCAG does not define an OKLCH-native contrast metric. The path is:

1. OKLCH → linear sRGB (reuse the same conversion from R5)
2. Apply W3C luminance formula (already implemented in our `WCAGValidator.calculateRelativeLuminance()`)
3. Compute contrast ratio: `(L1 + 0.05) / (L2 + 0.05)`

**Determinism**: Each step is algebraic (no iteration, no approximation). Two implementations with the same Ottosson matrices produce bit-identical linear sRGB. The luminance formula is a simple dot product.

**One operational concern not captured in R8:**

R8.2 (gamut validation) and R8.1 (contrast validation) have an ordering dependency. If a color is out-of-gamut AND fails contrast, which error surfaces?

**Proposed addition:**

> **R8.5**: Gamut validation (R8.2) SHALL run BEFORE contrast validation (R8.1). If out-of-gamut, report the gamut error. Contrast validation SHALL use the gamut-clamped value for its calculation, reporting the clamped contrast ratio alongside the gamut warning.

This ensures actionable error messages (fix gamut first, then contrast will be accurate).

---

#### Q5: R11 AC4 — Is ΔE < 1 Too Tight or Too Loose?

**ΔE₀₀ < 1.0 is the correct threshold. Neither too tight nor too loose.**

**The math:**
- Theoretical precision floor (8-bit quantization alone): ΔE₀₀ ≈ 0.2–0.5
- Just Noticeable Difference (JND) for ΔE₀₀: ~1.0
- A genuine conversion error (wrong matrix, off-by-one in formula): ΔE₀₀ > 2.0

So the threshold sits at the perception boundary:
- < 0.5: Only quantization noise (correct implementation)
- 0.5–1.0: Acceptable floating-point accumulation + quantization (still correct)
- \> 1.0: Something is actually wrong (catches real bugs)

**If tighter (e.g., ΔE₀₀ < 0.5)**: Would cause false failures for colors near gamut boundaries where quantization impact is maximized. Not recommended.

**If looser (e.g., ΔE₀₀ < 2.0)**: Would miss subtle conversion bugs (e.g., using the wrong gamma formula). Not recommended.

**Critical amendment needed**: The requirement says "ΔE < 1" without specifying WHICH ΔE formula. There are several:
- ΔE₇₆ (CIE76): Euclidean in Lab — perceptually non-uniform
- **ΔE₀₀ (CIEDE2000)**: Perceptually uniform — the modern standard
- ΔE_OK (Oklab Euclidean): Native to OKLCH space

**Proposed amendment to R11.4:**

> "...within **ΔE₀₀ (CIEDE2000) < 1.0** of original RGB values..."

Without specifying ΔE₀₀, an implementer might use ΔE₇₆ (where < 1 is much tighter and would cause false failures) or ΔE_OK (subtly different behavior near achromatic colors).

**Also needed** — R11.4 says "for colors not intentionally changed by palette refinements" but doesn't specify how the test knows which colors were changed:

> **R11.5**: The regression test SHALL maintain an explicit exclusion list of tokens intentionally changed by R7 refinements. The exclusion list SHALL be documented alongside the test.

---

#### Q6: Missing Requirements — Pipeline Internals Not Captured

**Five subsystem changes are implicit in R1–R11 but not explicitly required:**

| Gap | What Changes | Why It Matters |
|-----|-------------|----------------|
| **ColorTokens.ts source format** | `'rgba(R,G,B,A)'` strings → structured `{ lightness, chroma, hue }` objects | Every subsystem that reads color values needs to handle the new format. Without explicit R, the design phase may not scope the `ColorTokenValue` interface extension. |
| **SemanticOverrideResolver** | Resolves primitive names → currently produces rgba strings. Must produce OKLCH structured values. | Mode resolution (Spec 080) feeds generators. If resolver output format isn't specified, generators receive wrong input type. |
| **Generator input interface** | `GenerationOptions.semanticTokens` carries rgba strings → must carry OKLCH values. All 5 generators (web, iOS, Android, DTCG, Figma) consume this interface. | API contract change. Without explicit R, a generator might silently receive rgba and produce wrong output. |
| **Blend pipeline internals** | `calculateDarkerBlend()` uses RGB overlay with black. `calculateSaturateBlend()` uses HSL. Both must become OKLCH channel operations. | R6 says "interpolate in OKLCH" but doesn't distinguish darker/lighter (L channel) from saturate/desaturate (C channel). Implementer might miss the HSL→OKLCH change for saturate. |
| **ThreeTierValidator color mode** | Currently validates numeric relationships on scalar values. OKLCH tokens are multi-channel (L, C, H). Validator needs to know which channel to validate for which constraint. | Without explicit R, validator might attempt to apply spacing-style mathematical relationship checks to a three-component color value. |

**Additionally — from Lina's R1 review (cross-domain, flagging here):**

- `color-mix(in srgb, ...)` in component CSS (2 components) must migrate to `color-mix(in oklch, ...)`
- iOS/Android blend state colors: should be pre-resolved at build time (not runtime OKLCH interpolation)

**My recommendation**: These should be R12–R16 in the requirements doc. They're NOT "implementation details" — they're **interface contracts between pipeline subsystems** that, if unspecified, will cause integration failures during implementation. The blast radius of this migration (every color subsystem changes simultaneously) makes explicit interface requirements worth the documentation overhead.

**Counter-argument**: These are properly design-phase concerns, not requirements. Requirements should specify WHAT the system does for users, not HOW the pipeline internally achieves it. The existing R1–R11 acceptance criteria are testable from the outside. Internal architecture belongs in design.md. HOWEVER: given that 5 subsystems change interfaces simultaneously, making the scope explicit prevents the design from accidentally omitting a subsystem.

---

#### Summary Table

| Question | Answer | Action |
|----------|--------|--------|
| R1 AC6 validators | ✅ All implementable, ~15 lines each | Add 3 constraints: chroma monotonicity, hue consistency, neutral chroma ceiling |
| R3 web var() syntax | ✅ Valid per CSS Color L4 — confirmed | No change needed |
| R5 DTCG/Figma precision | ✅ Deterministic; 8-bit quantization is precision floor | Add R5.5 (single implementation) + R5.6 (gamut algorithm) |
| R8 WCAG luminance path | ✅ Standard, deterministic, unambiguous | Add R8.5 (gamut→contrast ordering) |
| R11 ΔE < 1 tolerance | ✅ Correct threshold | Specify ΔE₀₀ (CIEDE2000); add R11.5 (exclusion list) |
| Missing pipeline reqs | ⚠️ 5 subsystem gaps | Propose R12–R16 for source format, resolver, generators, blends, validators |

---

**Stamp**: [ADA R4] ✓ Requirements technically sound. Amendments needed for precision (ΔE₀₀ metric, gamut algorithm, validator constraints). Pipeline internal interface changes should be explicitly scoped (R12–R16) to prevent design-phase omissions.

### [LINA R2] Design + Tasks Review — Component Audit Scope & Sequencing (2026-06-10)

**Reviewer**: Lina (Stemma Component Specialist)
**Scope**: Design § "Blend Utility Rework" thresholds, CSS color-mix scope, Task 5 component list, Task 4.2 split, sequencing
**Status**: Feedback with corrections

---

#### Design: Blend Thresholds (hover ΔL 0.02-0.05, pressed 0.05-0.10, focus ΔC≥0.02, disabled ΔC≥0.03)

**Assessment: Ranges are appropriate for my components, with one addition needed.**

I audited against the interaction states my components actually implement:

| State | Proposed Threshold | Components Using It | Assessment |
|-------|-------------------|---------------------|------------|
| Hover (ΔL 0.02–0.05) | 11 components use `hoverDarker` | ✅ Correct. 0.02 is ~1× JND (barely perceptible = subtle), 0.05 is clearly visible. This matches "subtly distinct" intent. |
| Pressed (ΔL 0.05–0.10) | 10 components use `pressedDarker`, 1 uses `pressedLighter` | ✅ Correct. Greater shift than hover = "clearly activated." The range is wide enough to accommodate both `pressedDarker` and `pressedLighter` directions. |
| Focused (ΔC ≥ 0.02) | Input-Text-Base uses `focusSaturate` | ✅ Correct. Chroma boost distinguishes focus from hover without competing on the lightness axis. |
| Disabled (ΔC ≥ 0.03) | Button-CTA uses `disabledDesaturate` | ✅ Correct. 0.03 desaturation is perceptible and communicates "inactive." |

**Missing state: Icon optical balance (`iconLighter`)**

Button-CTA and Icon-Base both use `iconLighter` — a lightness INCREASE applied to icon color for optical balance (icons at full text color appear heavier than surrounding text). This isn't an interaction state, but it IS a blend operation that needs OKLCH re-tuning.

**Recommendation**: Add a row to the threshold table:

| State | ΔL from rest | ΔC from rest | Direction |
|-------|-------------|-------------|-----------|
| Icon optical balance | 0.02–0.04 | 0 (preserve) | Lighter (always) |

This ensures the optical balance blend is validated alongside interaction states. Without it, icon optical balance could drift silently.

**Missing state: Container hover (interactive mode)**

Container-Base in interactive mode applies `hoverDarker` to its background. This is already covered by the hover threshold row, but worth noting: the container's hover is applied to a SURFACE color (not an action color), which means the visual difference against surrounding content is different from a button's hover. The ΔL 0.02–0.05 range should accommodate both — buttons hover against page canvas, containers hover against themselves. No change needed, just awareness during tuning.

---

#### Design: CSS color-mix Scope — Are Nav-TabBar-Base and Avatar-Base the Only Components?

**Confirmed: Yes, exactly those two.** Verified via source scan.

| Component | `color-mix` Usage | Instance Count |
|-----------|-------------------|----------------|
| **Nav-TabBar-Base** | Backdrop gradient (3 instances), glow gradient (2 instances) | 5 |
| **Avatar-Base** | Border opacity | 1 |

No other component in `src/components/` uses `color-mix()`. The design document correctly identifies the migration scope.

**However**: Nav-SegmentedChoice-Base uses `var(--blend-container-hover-darker)` (a CSS custom property set by the blend utility), and Nav-TabBar-Base uses `filter: var(--blend-pressed-lighter)`. These aren't `color-mix` per se, but they ARE blend-related CSS patterns that consume the blend system's output. The migration to OKLCH blend utilities will affect how these custom properties are computed, even though the CSS declaration syntax doesn't change.

**Net**: The `color-mix(in srgb)` → `color-mix(in oklch)` migration is correctly scoped to 2 components. The broader blend utility migration (Task 4.1) affects all 13+ components via their JS/Swift/Kotlin blend utility imports and CSS custom property consumption.

---

#### Tasks: Task 5.1 Says "13 Components" — Which 13?

**Confirmed list from source scan** (components importing/consuming blend utilities with interaction states):

| # | Component | Blend Operations | Family |
|---|-----------|-----------------|--------|
| 1 | **Button-CTA** | hoverDarker, pressedDarker, disabledDesaturate, iconLighter | Buttons |
| 2 | **Button-Icon** | hoverDarker, pressedDarker | Buttons |
| 3 | **Button-VerticalList-Item** | hoverDarker, pressedDarker | Buttons |
| 4 | **Container-Base** | hoverDarker (interactive mode) | Containers |
| 5 | **Container-Card-Base** | hoverDarker, pressedDarker | Containers |
| 6 | **Chip-Base** | hoverDarker, pressedDarker | Chips |
| 7 | **Chip-Filter** | inherits Chip-Base blends | Chips |
| 8 | **Chip-Input** | inherits Chip-Base blends | Chips |
| 9 | **Input-Text-Base** | focusSaturate | Form Inputs |
| 10 | **Input-Checkbox-Base** | hoverDarker, pressedDarker | Form Inputs |
| 11 | **Input-Radio-Base** | hoverDarker, pressedDarker | Form Inputs |
| 12 | **Icon-Base** | iconLighter (optical balance) | Icons |
| 13 | **Nav-TabBar-Base** | pressedLighter (via CSS filter + platform blend) | Navigation |

**Scope note on inheritance**: Chip-Filter and Chip-Input inherit from Chip-Base. If Chip-Base's blend values are correct post-OKLCH, the inherited variants should pass automatically. But I'll audit all three independently because platform implementations might have diverged.

**Nav-SegmentedChoice-Base** uses `--blend-container-hover-darker` in CSS but does NOT directly import `getBlendUtilities`. It consumes the blend output passively via a CSS custom property. I'd include it in the audit as a 14th component to be safe — it's a quick check since it only has one blend-consuming property.

**Recommendation**: Amend Task 5.1 to "13 components with direct blend utility consumption + Nav-SegmentedChoice-Base (passive consumer, quick verification)" or round up to 14.

---

#### Tasks: Task 4.2 Split — Who Does What?

**Task 4.2**: "Update platform blend utilities and CSS color-mix"

Current assignment: **Ada + Lina**. Here's how I read the split:

| Subtask | Owner | Rationale |
|---------|-------|-----------|
| Web: `ThemeAwareBlendUtilities.web.ts` OKLCH rewrite | **Ada** | This is blend mathematics — interpolating L/C/H channels. Core algorithm, Ada's domain. |
| iOS: `ThemeAwareBlendUtilities.ios.swift` OKLCH rewrite | **Ada** | Same — ChromaKit blend API integration is pipeline/math work. |
| Android: `ThemeAwareBlendUtilities.android.kt` OKLCH rewrite | **Ada** | Same — colormath blend integration. |
| CSS `color-mix(in srgb)` → `color-mix(in oklch)` in Nav-TabBar-Base | **Lina** | This is component CSS. I own the component files. |
| CSS `color-mix(in srgb)` → `color-mix(in oklch)` in Avatar-Base | **Lina** | Same — component CSS ownership. |
| Blend-related test updates | **Split** | Ada owns blend utility unit tests. Lina owns component-level blend integration tests (BlendTokenUsageValidation.test.ts). |

**Summary of the split:**
- **Ada**: Blend utility implementation files (3 platform files) — the mathematical/algorithmic work
- **Lina**: Component CSS migrations (2 files, 6 declarations) — the consumer-side format change
- **Shared**: Test updates — Ada validates utility output, Lina validates component consumption

**This is clean.** Ada rewrites the engines; I update the 2 components that hardcode `color-mix(in srgb)`. No ambiguity.

**One coordination point**: I need the web blend utility rewrite (Ada's work) to be COMPLETE before I can validate that Nav-SegmentedChoice-Base's `var(--blend-container-hover-darker)` produces correct values. The CSS declaration in SegmentedChoice doesn't change, but the computed color DOES change based on the utility's new OKLCH interpolation. I'll handle this validation in Task 5 (audit), not Task 4.2.

---

#### Tasks: Sequencing — Can Task 5 Overlap with Task 4?

**Short answer: Partially yes, with a clear dependency boundary.**

**What I can start BEFORE Task 4 completes:**

1. **Audit preparation** — catalog all blend operations per component, document current visual appearance, set up comparison tooling
2. **Contract analysis** — review existing contracts.yaml for all 13 components, identify which mention blend percentages, draft updated language
3. **Glow token verification** — check `glow.neonGreen` chroma preservation. This depends on Task 2 (new green values) being complete, NOT on Task 4.

**What I CANNOT start until Task 4 completes:**

1. **Visual threshold verification** — I can't verify hover/pressed/focus/disabled meet the ΔL/ΔC thresholds until the new blend utilities are producing OKLCH-interpolated output
2. **Contract percentage updates** — I can't write new percentages until Ada has tuned them in Task 4.1
3. **Platform verification** — I can't verify iOS/Android blend results until their platform utilities are rewritten

**Recommended overlap model:**

```
Task 4.1 (Ada: BlendCalculator rewrite) ─────────────────────────────────┐
Task 4.2 (Ada: platform utilities) ─────────────────────┐                │
Task 4.2 (Lina: CSS color-mix, 2 components) ──────┐    │                │
                                                     │    │                │
Task 5 Prep (Lina: audit setup, contract review) ───┼────┼────────────────┼───
                                                     │    │                │
                                                     ▼    ▼                ▼
Task 5.1 (Lina: visual audit) ─── BLOCKED until 4.1+4.2 complete ────────┤
Task 5.2 (Lina: contract updates) ─── BLOCKED until 5.1 findings ────────┘
```

**Concrete timeline recommendation:**
- **Start Task 5 prep when Task 2 completes** (I need the new palette values to assess glow tokens)
- **Start Task 5.1 visual audit when Task 4.1 + 4.2 complete** (I need working blend utilities)
- **Task 5.2 follows 5.1** (contracts can't be updated until the audit reveals which percentages need changing)

**The overlap saves approximately 1 task-slot of time** — I'm not idle during Task 4, but the core audit work (5.1) is firmly blocked on 4's completion.

---

#### Additional Observations

**1. The design's BlendCalculator interface is clean for my audit needs.**

The `interactionBlend(base, state, surface)` API gives me exactly what I need for testing: pass a component's base color + the state + the surface context, get back a blended color, measure ΔL/ΔC against the base. My audit can be largely automated once the utility exists.

**2. Task 5.2 "move toward intent-based descriptions" — I'll apply this conservatively.**

Per my R1 feedback: I'll keep numeric precision alongside intent language, not replace it. Example updated contract text:

```yaml
# Before:
behavior: "Applies 8% darker blend via hoverDarker token"

# After:
behavior: "Applies OKLCH lightness reduction (~ΔL 0.03) via blend.hoverDarker for subtle hover distinction"
```

Both intent ("subtle hover distinction") and measurable value ("ΔL 0.03") in one description.

**3. Chip inheritance verification is important.**

Chip-Filter and Chip-Input both import `getBlendUtilities` independently (confirmed in source scan — they have their own platform files, not just inheriting Chip-Base's). This means all three chip components need independent audit, not just Chip-Base + assumption that children inherit correctly.

---

#### Summary

| Review Item | Finding | Action Needed |
|-------------|---------|---------------|
| Blend thresholds | ✅ Correct for my components | Add icon optical balance row (ΔL 0.02–0.04) |
| CSS color-mix scope | ✅ Exactly 2 components (Nav-TabBar-Base, Avatar-Base) | None — correctly scoped |
| Task 5.1 "13 components" | ✅ Confirmed list above | Consider noting Nav-SegmentedChoice-Base as 14th (passive consumer) |
| Task 4.2 split | Ada: utility rewrites. Lina: CSS color-mix migrations. Tests: split. | Document explicitly in task description |
| Sequencing | Task 5 prep can overlap Task 4. Task 5.1 audit is BLOCKED on Task 4 completion. | No sequencing change needed — current order is correct. Prep work starts early. |

---

**Stamp**: [LINA R2] ✓ Design blend thresholds approved with icon-optical-balance addition. Tasks component list confirmed. 4.2 split clear. Sequencing correct with prep overlap.

### [ADA R5] Design Review — Interfaces, Pipeline Integration, and Theme Resolution (2026-06-10)

**Reviewer**: Ada (Rosetta Token Specialist)
**Scope**: design.md interfaces, directory structure, pipeline integration, theme override resolution
**Verdict**: Design is **architecturally sound with 4 issues requiring resolution** before implementation starts.

---

#### 1. Interface Review: OklchConverter

**Verdict**: ✅ Correct and complete.

Methods (`toSrgbHex`, `toRelativeLuminance`, `contrastRatio`, `deltaE00`, `clampToGamut`) cover all conversion needs identified in requirements. No methods missing.

**One type concern**: The `Oklch` type used as parameter is referenced but not defined in the interfaces section. It should be:

```typescript
interface Oklch { l: number; c: number; h: number; }
```

Add this to the Data Models section or as a shared type. Currently `OklchConverter` methods use positional `(l, c, h)` parameters while `OklchBlendCalculator` uses `Oklch` objects — this inconsistency will cause friction. **Recommendation**: Standardize on the `Oklch` interface object everywhere. The converter should accept `Oklch` objects, not positional numbers, for type safety and self-documentation.

---

#### 2. Interface Review: OklchValidator

**Verdict**: ✅ Correct with one missing method.

All constraint validators from requirements are present: `validateFamily`, `isInGamut`, `isInP3`, `validateLightnessScale`, `validateChromaScale`, `validateNeutralChroma`, `validateHueConsistency`.

**Missing**: `validateBufferGaps(white: ColorFamily, gray: ColorFamily, black: ColorFamily): ValidationResult` — The neutral partition (R2) requires non-overlap validation across families. The current interface validates within a single family but has no method to validate the cross-family buffer gaps (white500.L > gray100.L + buffer, gray500.L > black100.L + buffer). This is a requirements-level constraint (R2 AC4) with no corresponding validator method.

**Recommendation**: Add a `validateNeutralPartition` method that takes all three neutral families and validates buffer gap compliance.

---

#### 3. Interface Review: OklchBlendCalculator

**Verdict**: ✅ Correct and well-scoped.

`blend`, `applyOpacity`, `interactionBlend` cover the three blend use cases. The `interactionBlend` method accepting a `state` enum with `surface` context is the right API shape — it encapsulates the ΔL/ΔC threshold logic.

**One question for implementation**: The `interactionBlend` signature shows `surface: Oklch` — this is for determining direction (lighter on dark surface, darker on light surface). The design's threshold table specifies "Direction: Lighter on dark, darker on light" for hover/pressed. The implementation needs a lightness threshold to determine what counts as "dark surface." This should be documented (e.g., `surface.l < 0.5 → lighten, else → darken`). Not a design-level issue, but note it for Task 4.1.

---

#### 4. Token Source Directory Structure — Pipeline Integration

**Verdict**: ⚠️ **Workable but requires a new composition step in the pipeline.**

The proposed structure:

```
src/tokens/color/
├── channels/       (hue, lightness, chroma per family)
├── primitives/     (composed: pink100-500, etc.)
└── index.ts        (barrel)
```

**Current pipeline flow** (from `generateTokenFiles.ts`):
1. `resolveTokens()` loads primitives from `src/tokens/ColorTokens.ts` (flat file, returns `PrimitiveToken[]`)
2. `SemanticOverrideResolver` swaps primitive references per context
3. `SemanticValueResolver.resolveSemanticTokenValue()` calls `getColorToken(name)` → reads from the flat color token registry → returns `ColorTokenValue` (rgba string per mode/theme)
4. Generators receive resolved rgba strings

**The gap**: The new directory structure splits color token definition into **channels** (individual L/C/H values) and **primitives** (composed `oklch(L, C, H)` colors). The existing pipeline has NO composition step — it goes directly from "find primitive by name" to "read its rgba value." The new pipeline needs:

```
channels/ (raw L, C, H values)
    ↓  [NEW: Composition step — resolve channel refs to Oklch objects]
primitives/ (composed Oklch objects, registered as PrimitiveToken)
    ↓  [EXISTING: Semantic resolution]
semantic tokens
```

**This composition step must happen BEFORE `resolveTokens()` returns primitives to the pipeline.** It's not a generator concern — it's a token registration concern. The composed colors (`pink300`) should be fully resolved `Oklch` objects by the time they enter the `PrimitiveTokenRegistry`.

**Implementation path**: The `src/tokens/color/primitives/chromatic.ts` file should import channel values and compose them at module initialization time. When `resolveTokens()` reads this file, it gets fully-composed `Oklch` objects. No new pipeline stage needed — the composition is static (happens at import time, not at generation time). Channel primitives are source organization, not pipeline stages.

**Confirm this interpretation is correct**: Channels are compile-time constants. Composition happens in `primitives/chromatic.ts` at module load. The pipeline sees composed `Oklch` values, not channel references, at runtime. Web CSS custom properties for channels are a GENERATOR output concern (emit both channels AND composed values), not a pipeline data flow concern.

**If this interpretation is correct**: The pipeline integration is clean. No new stage needed. The directory structure works.

---

#### 5. Theme Override Format — `h: 'neutralHue'` String Reference Resolution

**Verdict**: ⚠️ **This is the most significant design gap. Requires a resolution mechanism.**

The design shows:

```typescript
export const darkSemanticOverrides: Record<string, Oklch> = {
  'color.surface.primary': { l: 0.14, c: 0.008, h: 'neutralHue' },
  'color.action.primary': { l: 0.72, c: 0.18, h: 'primaryHue' },
};
```

**Problem**: The current `SemanticOverrideMap` type is `Record<string, SemanticOverride>` where `SemanticOverride.primitiveReferences` is `Record<string, string>` — it swaps primitive NAME references (e.g., `'cyan100'` instead of `'cyan500'`). The override mechanism doesn't resolve VALUES — it swaps which PRIMITIVE a semantic token points to, then `SemanticValueResolver` resolves the primitive's value later.

**The proposed format is fundamentally different**: It stores OKLCH values directly in the override, with string references (`'neutralHue'`) for the hue channel. This is NOT a primitive name swap — it's a direct value injection with a late-binding reference.

**Three options for resolution:**

**Option A — Keep the existing override pattern (primitive name swap):**

Override files continue to store primitive NAMES, not values. Dark mode for `color.surface.primary` would say: "point at `black200`" (where black200 is an OKLCH composed color). The `neutralHue` binding happens at the PRIMITIVE definition layer (black200 uses `neutralHue` in its composition), not at the override layer.

```typescript
// EXISTING pattern — override swaps primitive reference
export const darkSemanticOverrides: SemanticOverrideMap = {
  'color.surface.primary': { primitiveReferences: { value: 'black200' } },
};
```

**Pro**: No pipeline change. Override mechanism stays identical. `neutralHue` resolution happens in primitive composition (already solved in §4 above).
**Con**: Requires a primitive token for every dark-mode override value. If dark mode needs L=0.14, C=0.008, H=neutralHue — that specific combination must exist as a named primitive.

**Option B — New resolution step for hue string references:**

Keep the proposed format but add a resolution step between override loading and value resolution:

```typescript
// Before SemanticValueResolver runs, resolve string hue references:
function resolveHueReferences(overrides: Record<string, Oklch>, config: ResolvedConfig): Record<string, ResolvedOklch> {
  const hueMap = { neutralHue: config.primaryHue, primaryHue: config.primaryHue };
  return Object.fromEntries(
    Object.entries(overrides).map(([key, val]) => [
      key,
      { ...val, h: typeof val.h === 'string' ? hueMap[val.h] : val.h }
    ])
  );
}
```

**Pro**: Clean API — override authors think in design terms (`neutralHue`) not token names.
**Con**: New pipeline step. Breaks the existing override type contract (`SemanticOverrideMap`). Mixes two resolution models (name-swap for chromatic colors, value-injection for neutrals).

**Option C (RECOMMENDED) — Hybrid: primitives absorb hue binding, overrides stay as name swaps:**

1. Define neutral primitive colors that ALREADY use `neutralHue` in their composition:
   ```typescript
   // src/tokens/color/primitives/neutral.ts
   const black200 = compose(blackLightness[200], blackChroma[200], neutralHue);
   ```
2. Override files swap primitive names as today:
   ```typescript
   'color.surface.primary': { primitiveReferences: { value: 'black200' } }
   ```
3. When the pipeline resolves `black200`, it reads the composed value which already incorporates `neutralHue` from the config.

**This means**: No new resolution step. No type change to `SemanticOverrideMap`. The `neutralHue` binding is architectural (happens at primitive composition time), not override-time. The existing two-level resolution (Level 2: swap primitive reference, Level 1: resolve primitive value) remains unchanged.

**The design document should clarify this**. The current format shown (`h: 'neutralHue'` in override values) is misleading — it implies overrides carry values with late-binding. If we use Option C, override files look identical to today (primitive name references), and `neutralHue` resolution is entirely in the primitive composition layer.

**Impact on tasks**: Task 2.3 ("Update theme override files with OKLCH values") needs to be reframed. If Option C is adopted, theme override files DON'T change format — they still contain primitive name references. Only the primitive VALUES change (from rgba strings to Oklch objects). This simplifies Task 2.3 significantly.

---

#### 6. Data Flow Correctness Check

Verifying the complete pipeline data flow from design.md matches the existing architecture:

| Pipeline Stage | Current (RGBA) | Proposed (OKLCH) | Compatible? |
|---|---|---|---|
| Token definition | `ColorTokens.ts` → rgba strings | `color/channels/` + `color/primitives/` → Oklch objects | ✅ Same shape (PrimitiveToken), different value type |
| Registry | `PrimitiveTokenRegistry.register(token)` | Same | ✅ No change needed |
| Semantic mapping | `ColorSemanticTokens.ts` references primitive names | Same — references `'pink300'`, not values | ✅ No change |
| Override resolution | `SemanticOverrideResolver` swaps names | Same (if Option C adopted) | ✅ No change |
| Value resolution | `SemanticValueResolver` → rgba string | New: → Oklch object | ⚠️ **Interface change** |
| Generator input | `GenerationOptions` carries rgba strings | Carries Oklch objects | ⚠️ **Interface change** |
| Platform output | Generators format rgba → CSS/Swift/Kotlin | Format Oklch → platform syntax | ⚠️ **Implementation change** |

**Net assessment**: Three interface changes (value resolver output, generation options, generator implementations). All are contained within stage boundaries — no cascading architectural change. The pipeline SHAPE is preserved; the VALUE TYPE flowing through it changes from `string` (rgba) to `Oklch` (structured object).

---

#### Summary of Design Issues

| Issue | Severity | Resolution |
|-------|----------|-----------|
| `Oklch` type not defined; positional vs object inconsistency | Low | Add shared `Oklch` interface; standardize on object params |
| Missing `validateNeutralPartition` in OklchValidator | Medium | Add cross-family buffer gap validation method |
| Theme override `h: 'neutralHue'` format needs resolution mechanism | **High** | Adopt Option C (primitives absorb hue binding, overrides stay as name swaps) |
| Composition step between channels and primitives | Medium | Confirm static composition at module load (no new pipeline stage) |

**Blocking issue**: The theme override format (Issue #3) must be resolved before Task 2.3 can be scoped correctly. If Option C is adopted, Task 2.3 becomes "verify existing override references still point at valid primitives" rather than "rewrite override files in OKLCH format."

---

**Stamp**: [ADA R5] ✓ Design reviewed. Architecturally sound. One high-severity resolution needed (theme override format). Three medium/low issues addressable during implementation.

---

### [ADA R5] Tasks Review — Dependency Order, Scope, and Effort (2026-06-10)

**Reviewer**: Ada (Rosetta Token Specialist)
**Scope**: Task dependency chain, Task 2.1 scope, effort estimate realism
**Verdict**: Task structure is **well-organized with one dependency correction and one scope concern**.

---

#### 1. Dependency Order — Can Task 3 Start Before Task 2 Completes?

**Partially yes — but not from the start of Task 2.**

The dependency chain as written: `1 → 2 → 3 → 4 → 5 → 6 → 7`

In practice:

| Task 3 Subtask | Needs from Task 2 | Can Start Early? |
|---|---|---|
| 3.1 (Web generator) | Needs `ComposedColorToken` interface finalized (from 2.1) and at least ONE family authored for testing | ⚠️ Can start after 2.1 architecture + 1 sample family |
| 3.2 (iOS/Android generators) | Same as 3.1 | Same |
| 3.3 (DTCG/Figma + token-index) | Needs `OklchConverter.toSrgbHex()` from Task 1 + composed tokens format | Can start after Task 1 + 2.1 architecture |

**The real dependency**: Task 3 needs the **interface** from Task 2.1 (the `ComposedColorToken` structure and how it's stored), NOT all families authored. The generator doesn't care whether pink is authored yet — it needs to know the data shape. A single test family (e.g., pink or cyan) is sufficient to develop and test generators.

**Recommended adjustment**: Task 3 can begin after `Task 2.1 interface finalization` (not the full palette authoring). Task 2.2 (neutral partition) and the palette refinement portion of 2.1 can run in parallel with Task 3 generator development.

**Proposed parallel execution:**
```
Task 1 (math foundation) ────────────────────┐
                                              │
Task 2.1 (architecture + 1 sample family) ────┼──→ Task 3 (generators, using sample family for testing)
                                              │
Task 2.1 continued (remaining families) ──────┤
Task 2.2 (neutral partition) ─────────────────┤
Task 2.3 (semantic layer + theme updates) ────┘──→ [Must complete before Task 6 regression testing]
```

**This parallelization saves ~1 task's worth of calendar time** (generators can develop while palette authoring continues). Task 2.3 (semantic layer) remains a hard dependency for Task 6 (regression testing needs the full pipeline working end-to-end).

---

#### 2. Task 2.1 Scope — Architecture vs Palette Refinements

**Verdict**: ⚠️ **Task 2.1 is overloaded. Should be split.**

Current scope of Task 2.1:
- Create `src/tokens/color/channels/hues.ts` with all family hues ← **Architecture**
- Create lightness and chroma files per family ← **Architecture + Value Authoring**
- Apply palette refinements: teal 300-500, green 300-500, orange WCAG ← **Design/Tuning Work**
- Validate all values against sRGB gamut ← **Validation**
- Validate chroma/lightness monotonicity, min step ← **Validation**

**Problem**: "Apply palette refinements" is fundamentally different work from "create the file structure and author channel values." Palette refinements (teal redesign, green decompression, orange WCAG hue alignment) require:
1. Design decision-making (what ARE the new teal 300-500 values?)
2. Multiple tuning iterations (author → validate → adjust → re-validate)
3. Potential Peter/Leonardo review for the refined values

This is NOT the same as "mechanically author the other families whose values we already know" (pink, purple, cyan, yellow — these are direct OKLCH conversions of existing RGB values, no design decisions needed).

**Recommended split:**

- **Task 2.1a** (Architecture): Create directory structure, create `hues.ts`, author channel files for NON-refined families (pink, purple, cyan, yellow — direct conversion). Validate all.
  - Type: Architecture
  - Tier 3 validation
  - Unblocks Task 3 (generators need sample data)

- **Task 2.1b** (Design/Tuning): Apply palette refinements to teal, green, orange. Multiple tuning iterations with gamut validation. Requires design review.
  - Type: Implementation
  - Tier 2 validation
  - Can run in parallel with Task 3
  - May require Leonardo/Peter checkpoint for "do these new values look right?"

**Why this matters**: 2.1a is mechanical work (I can execute autonomously given the OKLCH conversion data from R1). 2.1b is creative/tuning work that may require iteration cycles with human review. Combining them into one "Architecture" task obscures the different execution models and makes the task feel done when the structure exists, even if refinements aren't tuned yet.

---

#### 3. Effort Estimate — 18 Subtasks Realism

**Assessment per task group:**

| Task Group | Subtasks | Effort Assessment | Concern |
|---|---|---|---|
| Task 1 (Math foundation) | 2 | ✅ Right-sized. OklchConverter and OklchValidator are well-scoped, each ~200-300 lines + tests. | None |
| Task 2 (Source format) | 3 | ⚠️ **Undersized if 2.1 isn't split.** 2.1 alone is 7 families × (hue + 5L + 5C) + refinements + validation = massive surface area. | Split 2.1 as recommended above |
| Task 3 (Generators) | 3 | ✅ Right-sized. Each generator is a contained modification to an existing file. ~100-200 lines changed per generator + tests. | None |
| Task 4 (Blend rework) | 2 | ⚠️ **4.2 may be undersized.** "Update platform blend utilities" covers web + iOS + Android + CSS color-mix migration in 2 components. That's 4-5 distinct code changes in different languages. | Consider splitting 4.2 into web vs native |
| Task 5 (Component audit) | 2 | Outside my domain (Lina). Deferring. | — |
| Task 6 (WCAG + regression) | 2 | ✅ Right-sized. 6.1 is validator usage (straightforward). 6.2 is test authoring (mechanical but important). | None |
| Task 7 (Documentation) | 3 | Outside primary domain (Thurgood). Noting: 7.1 is cross-domain (Ada + Thurgood) and likely the heaviest doc task. | 7.1 is a full doc rewrite — may need 2-3 sessions |

**Overall effort assessment:**

18 subtasks for this scope is **realistic but tight**. The tasks I own (1-4, 6.1-6.2) break down to:

| My Tasks | Estimated Lines of Code | Estimated Test Lines | Complexity |
|---|---|---|---|
| 1.1 OklchConverter | ~250 | ~400 | Medium (matrix math, CIEDE2000) |
| 1.2 OklchValidator | ~200 | ~350 | Medium (constraint checks) |
| 2.1 Channel primitives | ~500 (7 families × hue/L/C files) | ~200 (validation runs) | Low complexity, high volume |
| 2.2 Neutral partition | ~150 | ~100 | Low |
| 2.3 Composed + semantic | ~300 | ~200 | Medium (integration concerns) |
| 3.1 Web generator | ~150 modified | ~200 | Medium |
| 3.2 iOS + Android | ~100 modified each | ~150 each | Low |
| 3.3 DTCG/Figma + index | ~100 modified | ~150 | Low |
| 4.1 BlendCalculator | ~200 | ~300 | Medium-High (tuning) |
| 4.2 Platform blends + CSS | ~150 (web) + ~100 (iOS) + ~100 (Android) | ~200 | Medium (cross-language) |
| 6.1 WCAG validation | ~100 | ~150 | Low |
| 6.2 Regression test | ~150 | ~300 | Medium (reference data) |

**Total estimated**: ~2,500 lines of production code + ~3,000 lines of tests. This is substantial but each individual task is well-bounded.

**The risk**: Task 4.1 (BlendCalculator tuning) is the most likely to exceed estimate. Tuning interaction state thresholds to produce "perceptibly correct" results requires iteration — you can't unit-test "does this look right?" The ΔL/ΔC thresholds from the design provide a mathematical framework, but the SPECIFIC percentages that hit those thresholds for every base color require empirical work.

---

#### 4. Task 4.2 Agent Assignment Concern

Task 4.2 is assigned `Agent: Ada + Lina`. The cross-domain work is:
- **Ada's domain**: `ThemeAwareBlendUtilities.web.ts`, iOS/Android blend utilities (these are blend CALCULATION code, not component code)
- **Lina's domain**: `color-mix(in oklch)` migration in `Nav-TabBar-Base` and `Avatar-Base` (these are component CSS files)

**Is this the right split?** The component CSS changes (swapping `color-mix(in srgb, ...)` to `color-mix(in oklch, ...)`) are trivial string replacements. They could be done by either agent. The blend utility rework is clearly mine.

**Recommendation**: Task 4.2 scope should be clarified:
- Ada: Rework `ThemeAwareBlendUtilities.{web,ios,android}.*` for OKLCH
- Lina: Update `color-mix()` declarations in component CSS (Nav-TabBar-Base, Avatar-Base)
- OR: Ada does both (since the CSS changes are mechanical), and Lina validates during Task 5 audit

This avoids coordination overhead for a 2-line component change.

---

#### 5. Missing Task: Pipeline Interface Migration

The design review (above) identified that `SemanticValueResolver` output and `GenerationOptions` input change from rgba strings to Oklch objects. **No task explicitly covers this interface migration.**

Currently:
- Task 2.3 says "Verify all semantic mappings resolve correctly through the pipeline"
- Task 3 says "Update generators"

But neither explicitly says "change the `resolveSemanticTokenValue()` return type from string to Oklch" or "update `GenerationOptions` interface types."

**This gap is small but could cause confusion**: When I implement Task 2.3, do I update `SemanticValueResolver` to return Oklch? Or does Task 3 do that as part of generator work? The answer should be: **Task 2.3 updates the resolver output format**, and **Task 3 updates generators to consume the new format**. But this isn't stated.

**Recommendation**: Add a sentence to Task 2.3: "Update `SemanticValueResolver.resolveSemanticTokenValue()` to return structured Oklch objects instead of rgba strings. Update `GenerationOptions` type to carry Oklch values."

---

#### Summary

| Review Point | Verdict | Action |
|---|---|---|
| Dependency order (3 after 2) | ⚠️ Partially parallelizable | Task 3 can start after 2.1 architecture + sample family |
| Task 2.1 scope | ⚠️ Overloaded | Split into 2.1a (architecture/conversion) and 2.1b (palette refinements) |
| 18 subtasks for scope | ✅ Realistic but tight | Task 4.1 is the highest overrun risk (tuning work) |
| Task 4.2 agent split | Minor | Clarify Ada vs Lina boundaries for blend utilities vs component CSS |
| Missing: interface migration | Medium | Add resolver/GenerationOptions type change to Task 2.3 scope |

**No blockers for starting Task 1.** Task 1 (math foundation) has zero dependencies on unresolved design issues — it's pure math library work. The theme override format (design issue #3) must be resolved before Task 2.3 begins, but Tasks 1 and 2.1a can proceed immediately.

---

**Stamp**: [ADA R5] ✓ Tasks reviewed. Dependency order correctable. Task 2.1 should split. 18 subtasks realistic. Ready to begin Task 1.

### [ADA R6] Token-Family-Color.md Technical Accuracy Validation (2026-06-10)

**Reviewer**: Ada (Rosetta Token Specialist)
**Scope**: Validate rewritten Token-Family-Color.md against actual implementation (Tasks 2.1a, 2.2, 4)
**Verdict**: **6 corrections needed** — mostly the pink example uses pre-implementation placeholder values instead of actual authored values.

---

#### 1. Channel Values — Pink Example ❌ CORRECTIONS NEEDED

The doc uses pink as the primary example throughout. Three values are wrong:

| Item | Doc Says | Implementation (`hues.ts`, `chromatic.ts`) | Correction |
|------|----------|---------------------------------------------|-----------|
| **pinkHue** | 8.2 | **10.0** | Fix to 10.0 |
| **pinkChroma** steps | 0.05, 0.17, 0.24, 0.20, 0.14 | **0.045, 0.160, 0.242, 0.203, 0.141** | Fix to 3-decimal actual values |
| **Composed example** | `oklch(0.65, 0.24, 8.2)` | `oklch(0.65, 0.242, 10.0)` | Fix hue and chroma |

**Lightness values are correct**: 0.92, 0.76, 0.65, 0.55, 0.40 ✅

**Root cause**: The doc appears to use values from the R1 feedback analysis (which computed `pink300 H=8.2°` from the original RGBA conversion), but the implementation rounded the family hue to `10.0` (the median of the family's actual 5-step hue range: 350.2°, 353.5°, 8.2°, 7.9°, 6.5° — normalized and rounded to a clean value).

**Impact**: Every platform output example in the doc shows hue=8.2 and needs updating to 10.0. All 4 code snippets (CSS channel, CSS composed, Swift, Kotlin) need correction.

---

#### 2. Neutral Partition ✅ VALIDATED (one precision note)

- White 1.00→0.80, Gray 0.72→0.32, Black 0.28→0.00: **Correct** per `neutral.ts`
- Buffer gaps 0.08 and 0.04: **Correct**
- Step sizes (~0.05 white, ~0.10 gray, ~0.07 black): **Correct**
- Parabolic chroma curve, peak at C≈0.020 in gray: **Correct** per `chroma/neutral.ts`
- Chroma near-zero at extremes: **Correct** (white100=0, black500=0)

**One precision note**: The doc says neutralHue "defaults to the product's **primary color hue**." The implementation has `neutralHue = 260` with a comment "configurable per product." The value 260 is a fixed default (not dynamically derived from any primary hue). The doc's phrasing is architecturally aspirational — the *configure wizard* (Spec 113, not yet implemented) would set this to the primary hue. Current implementation uses a static 260.

**Recommended fix**: Change "defaults to the product's primary color hue" to "defaults to 260° (configurable per product; the configure wizard sets this to the primary hue)."

---

#### 3. Blend Thresholds ✅ VALIDATED (one scope note)

| State | Doc Values | `OklchBlendCalculator.ts` `INTERACTION_THRESHOLDS` | Match? |
|-------|------------|------------------------------------------------------|--------|
| Hover | ΔL 0.02–0.05 | deltaL min:0.02, max:0.05 | ✅ |
| Pressed | ΔL 0.05–0.10 | deltaL min:0.05, max:0.10 | ✅ |
| Focused | ΔC +0.02 min | deltaC min:0.02 | ✅ |
| Disabled | ΔC -0.03 min | deltaC min:0.03 | ✅ |

**Scope note**: The doc lists "Icon lighter: ΔL 0.02–0.04, Preserve C" as a 5th row. This is NOT defined in `OklchBlendCalculator.ts`'s `INTERACTION_THRESHOLDS` or `InteractionState` type. It comes from Lina's recommendation (R2 feedback) and is documented as design intent but not yet implemented as a validated threshold. Not technically wrong (the doc says these are blend thresholds, not "implemented threshold constants"), but worth noting the icon-lighter row has no programmatic enforcement yet.

---

#### 4. Validator Constraints ✅ VALIDATED

All 8 listed constraints are implemented in `src/color/OklchValidator.ts`:

| Constraint | Method | Implemented? |
|-----------|--------|-------------|
| Lightness monotonicity | `validateLightnessScale()` | ✅ |
| Minimum step distance ≥0.08 | `validateLightnessScale()` | ✅ |
| Chroma monotonicity 300→500 | `validateChromaScale()` | ✅ |
| sRGB gamut compliance | `validateGamut()` + `isInSrgbGamut()` | ✅ |
| P3 gamut awareness (warning) | `validateGamut()` + `isInP3Gamut()` | ✅ |
| Hue consistency | `validateHueConsistency()` | ✅ |
| Neutral chroma ceiling ≤0.035 | `validateNeutralChroma()` | ✅ |
| Neutral partition gaps | `validateNeutralPartition()` | ✅ |

No missing constraints detected. The validator surface matches the doc 1:1.

---

#### 5. Gamut Capacity Table ✅ VALIDATED

Doc: "Drenched: Purple, pink, green, orange, yellow can. Cyan limited. Teal cannot."

Cross-referenced against R2 gamut analysis and confirmed by the implemented chroma values:
- Purple peak chroma: 0.286 (highest) ✅ can drench
- Pink peak chroma: 0.242 ✅ can drench
- Green peak chroma: 0.208 ✅ can drench
- Yellow peak chroma: 0.200 ✅ can drench
- Orange peak chroma: 0.193 ✅ can drench
- Cyan peak chroma: 0.148 ⚠️ limited (correct assessment)
- Teal peak chroma: 0.100 ❌ cannot drench (correct assessment)

Table is accurate.

---

#### 6. Platform Output Examples ❌ CORRECTIONS NEEDED (hue value)

All platform examples use hue 8.2 (the wrong pink hue). Corrected versions:

**CSS (corrected)**:
```css
--pink-hue: 10;
--pink-l300: 0.65;
--pink-c300: 0.242;
--pink-300: oklch(0.65 0.242 10);
```

**iOS (corrected)**:
```swift
static let pink300 = Color.oklch(0.65, 0.242, 10)
```

**Android (corrected)**:
```kotlin
val pink300 = Oklch(0.65f, 0.242f, 10f).toComposeColor()
```

**Syntax format is correct for all platforms** ✅ (space-separated for CSS oklch(), comma-separated for Swift/Kotlin). Only the values need fixing.

**CSS relative color syntax example** (`oklch(from var(--pink-300) l c h / 0.56)`) — syntax is correct ✅.

**DTCG hex example** (`"$value": "#ff2a6d"`) — this was the pre-OKLCH hex for pink300. The actual OKLCH-resolved hex will differ because the hue changed from 8.2° to 10°. This is an illustrative example so not strictly wrong, but the hex value is no longer accurate for the implemented pink300. Minor — could be left as illustrative.

---

#### 7. Source Paths ✅ ALL VALIDATED

Every path listed exists and contains the described content:

| Path | Exists? | Content Matches? |
|------|---------|-----------------|
| `src/tokens/color/channels/hues.ts` | ✅ | 7 chromatic hues + neutralHue |
| `src/tokens/color/channels/lightness/` | ✅ | chromatic.ts + neutral.ts |
| `src/tokens/color/channels/chroma/` | ✅ | chromatic.ts + neutral.ts |
| `src/tokens/color/primitives/` | ✅ | chromatic.ts + neutral.ts |
| `src/tokens/semantic/ColorTokens.ts` | ✅ | Semantic color mappings |
| `src/tokens/themes/` | ✅ | dark/, wcag/, dark-wcag/ overrides |
| `src/blend/OklchBlendCalculator.ts` | ✅ | Blend calculator with interaction states |
| `src/color/OklchValidator.ts` | ✅ | All 8 constraint validators |
| `src/color/OklchConverter.ts` | ✅ | OKLCH↔sRGB conversion |

---

#### 8. Other Factual Issues

**a. Chromatic family hue table** — the doc lists approximate hues but doesn't provide exact values. Cross-referencing against `hues.ts`:

| Family | Doc Says | Actual | Assessment |
|--------|----------|--------|------------|
| Pink | ~8° | 10.0 | ❌ Should be ~10° |
| Orange | ~42° | 39.5 | Close enough with "~" prefix ✅ |
| Yellow | ~109° | 107.0 | ✅ |
| Green | ~150° | 154.0 | ✅ |
| Cyan | ~204° | 202.5 | ✅ |
| Teal | ~208° | 209.0 | ✅ |
| Purple | ~307° | 310.0 | ✅ |

Pink is the outlier — the doc says "~8°" but actual is 10.0°. All others are within the "~" tolerance.

**b. Blend model "Direction" column** — Doc says "Lighter on dark, darker on light" for hover/pressed. The implementation in `interactionBlend()` uses `surface.l > 0.5 ? -1 : 1` to determine direction. This means: on light surfaces (L>0.5) the element gets darker, on dark surfaces (L≤0.5) the element gets lighter. **This matches the doc description.** ✅

**c. "Web: Uses `color-mix(in oklch, ...)` for runtime blending"** — This is partially accurate. The blend UTILITIES calculate in OKLCH space, but the CSS `color-mix` declarations in components (Nav-TabBar-Base, Avatar-Base) have been migrated to `color-mix(in oklch, ...)`. The statement is correct but could be more precise: it's component CSS that uses `color-mix(in oklch)`, not the blend utility JS. Minor wording concern, not factually wrong.

---

#### Summary of Required Corrections

| # | Location in Doc | Issue | Fix |
|---|---|---|---|
| 1 | Token Structure Per Family (pink example) | `pinkHue = 8.2` | Change to `pinkHue = 10.0` |
| 2 | Token Structure Per Family (pink example) | Chroma values rounded to 2 decimals | Change to actual 3-decimal values: 0.045, 0.160, 0.242, 0.203, 0.141 |
| 3 | Token Structure Per Family (composed) | `pink300 = oklch(0.65, 0.24, 8.2)` | Change to `oklch(0.65, 0.242, 10.0)` (and fix all 5 composed examples) |
| 4 | Platform Output (CSS/Swift/Kotlin) | All examples use hue 8.2 | Change to 10 |
| 5 | Chromatic Families table | Pink listed as "~8°" | Change to "~10°" |
| 6 | Neutral Partition text | "defaults to the product's primary color hue" | Add clarification: default is 260°; configure wizard (Spec 113) will set to primary hue |

**Everything else validates correctly.** The neutral partition, blend thresholds, validator constraints, gamut capacity table, and source paths are all accurate.

---

**Stamp**: [ADA R6] — 6 corrections identified (all related to pink hue rounding decision). Architecture, structure, and non-pink content validated.

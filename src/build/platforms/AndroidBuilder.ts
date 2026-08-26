/**
 * Android Motion Token Generator
 *
 * Generates the Kotlin motion-token section (Duration/Easing/Scale objects and
 * semantic motion composites) consumed by TokenFileGenerator.generateMotionSection().
 * Motion names use PascalCase Kotlin type/object naming (e.g. Duration.Duration250,
 * Easing.EasingStandard) — a deliberate convention for nested Kotlin objects,
 * distinct from the snake_case constant contract below.
 *
 * NOT the shipping Android constant generator. Primitive/semantic/component token
 * constants ship via TokenFileGenerator + src/providers/AndroidFormatGenerator.ts,
 * which enforces the governed snake_case naming contract (val space_100 = 8.dp;
 * see rosetta-system-principles § "Naming Convention Governance").
 *
 * History: this class previously implemented PlatformBuilder with a full
 * Android-library build() path (build.gradle.kts, Compose components, and a
 * camelCase toKotlinConstantName transform that contradicted the snake_case
 * contract). That path was never wired into any shipping pipeline and was
 * retired 2026-08-26 (see .kiro/issues/2026-08-26-androidbuilder-camelcase-dead-path.md).
 */
export class AndroidBuilder {
  /**
   * Generate duration token Kotlin constants
   *
   * Generates Kotlin constants for animation duration tokens.
   * Format: val Duration150 = 150
   *
   * Duration values are in milliseconds for Android.
   *
   * Requirements: 1.7, 6.3
   *
   * @param durationTokens - Duration primitive tokens from token system
   * @returns Kotlin constant declarations
   */
  generateDurationTokens(durationTokens: Record<string, any>): string {
    const lines: string[] = [];

    lines.push('    // MARK: Duration Tokens');
    lines.push('    ');
    lines.push('    /** Animation duration values in milliseconds */');
    lines.push('    object Duration {');

    for (const [name, token] of Object.entries(durationTokens)) {
      const kotlinName = this.toKotlinTypeName(name);
      const value = token.platforms.android.value; // Milliseconds
      const comment = `        /** ${name}: ${value}ms */`;
      lines.push(comment);
      lines.push(`        val ${kotlinName} = ${value}`);
    }

    lines.push('    }');
    lines.push('    ');

    return lines.join('\n');
  }

  /**
   * Generate easing token Kotlin constants
   *
   * Generates Kotlin constants for animation easing tokens using CubicBezierEasing().
   * Format: val EasingStandard = CubicBezierEasing(0.4f, 0.0f, 0.2f, 1.0f)
   *
   * Converts cubic-bezier CSS format to Kotlin CubicBezierEasing format.
   *
   * Requirements: 2.7, 6.3, 6.7
   *
   * @param easingTokens - Easing primitive tokens from token system
   * @returns Kotlin constant declarations
   */
  generateEasingTokens(easingTokens: Record<string, any>): string {
    const lines: string[] = [];
    const hasLinear = Object.values(easingTokens).some((t: any) => t.easingType === 'linear');

    lines.push('    // MARK: Easing Tokens');
    lines.push('    ');

    if (hasLinear) {
      lines.push('    /** Piecewise linear easing via lookup table interpolation */');
      lines.push('    class PiecewiseLinearEasing(private val stops: List<Pair<Float, Float>>) : Easing {');
      lines.push('        override fun transform(fraction: Float): Float {');
      lines.push('            if (fraction <= 0f) return 0f');
      lines.push('            if (fraction >= 1f) return 1f');
      lines.push('            var lo = 0; var hi = stops.size - 1');
      lines.push('            while (lo < hi - 1) { val mid = (lo + hi) / 2; if (stops[mid].first <= fraction) lo = mid else hi = mid }');
      lines.push('            val seg = stops[lo]; val next = stops[hi]');
      lines.push('            val frac = if (next.first > seg.first) (fraction - seg.first) / (next.first - seg.first) else 1f');
      lines.push('            return seg.second + (next.second - seg.second) * frac');
      lines.push('        }');
      lines.push('    }');
      lines.push('    ');
    }

    lines.push('    /** Animation easing curves */');
    lines.push('    object Easing {');

    for (const [name, token] of Object.entries(easingTokens)) {
      const kotlinName = this.toKotlinTypeName(name);
      if (token.easingType === 'linear' && token.stops) {
        const stops = (token.stops as Array<[number, number]>)
          .map(([time, progress]) => `${time}f to ${progress}f`).join(', ');
        lines.push(`        /** ${name}: piecewise linear (${(token.stops as Array<[number, number]>).length} stops, ${token.easingDuration}ms) */`);
        lines.push(`        val ${kotlinName} = PiecewiseLinearEasing(listOf(${stops}))`);
      } else {
        const cubicBezier = token.platforms.android.value;
        const match = cubicBezier.match(/cubic-bezier\(([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\)/);
        if (match) {
          const [, p1, p2, p3, p4] = match;
          const formatFloat = (val: string) => {
            const num = parseFloat(val);
            return num === Math.floor(num) ? `${num}.0f` : `${val}f`;
          };
          lines.push(`        /** ${name}: ${cubicBezier} */`);
          lines.push(`        val ${kotlinName} = CubicBezierEasing(${formatFloat(p1)}, ${formatFloat(p2)}, ${formatFloat(p3)}, ${formatFloat(p4)})`);
        }
      }
    }

    lines.push('    }');
    lines.push('    ');

    return lines.join('\n');
  }

  /**
   * Generate scale token Kotlin constants
   *
   * Generates Kotlin constants for transform scale tokens.
   * Format: val Scale088 = 0.88f
   *
   * Scale tokens are unitless factors that should be applied to base values.
   * When applying scale tokens to base values during token generation,
   * use unitConverter.applyScaleWithRounding() to ensure whole pixel values.
   *
   * Example:
   *   const baseSize = 16;
   *   const scaledSize = unitConverter.applyScaleWithRounding(baseSize, 0.88);
   *   // Result: 14 (16 × 0.88 = 14.08 → rounds to 14)
   *
   * In Kotlin, components should apply rounding when using scale tokens:
   *   val scaledSize = round(baseSize * Tokens.Scale.Scale088).toInt()
   *
   * Requirements: 3.1, 4.2, 4.3, 6.3
   *
   * @param scaleTokens - Scale primitive tokens from token system
   * @returns Kotlin constant declarations
   */
  generateScaleTokens(scaleTokens: Record<string, any>): string {
    const lines: string[] = [];

    lines.push('    // MARK: Scale Tokens');
    lines.push('    ');
    lines.push('    /** Transform scale factors (unitless) */');
    lines.push('    /** When applying to base values, use round() for whole pixels */');
    lines.push('    object Scale {');

    for (const [name, token] of Object.entries(scaleTokens)) {
      const kotlinName = this.toKotlinTypeName(name);
      const value = token.platforms.android.value;
      // Format float values to always include .0 for whole numbers (1.0f instead of 1f)
      const formattedValue = value === Math.floor(value) ? `${value}.0f` : `${value}f`;
      const comment = `        /** ${name}: ${value} */`;
      lines.push(comment);
      lines.push(`        val ${kotlinName} = ${formattedValue}`);
    }

    lines.push('    }');
    lines.push('    ');

    return lines.join('\n');
  }

  /**
   * Generate semantic motion token Kotlin constants
   *
   * Generates Kotlin objects for semantic motion tokens that compose
   * primitive duration, easing, and scale tokens.
   *
   * Format:
   *   object MotionFloatLabel {
   *     val duration = Duration.Duration250
   *     val easing = Easing.EasingStandard
   *   }
   *
   * Requirements: 5.1, 5.2, 6.7
   *
   * @param motionTokens - Semantic motion tokens from token system
   * @returns Kotlin object declarations
   */
  generateSemanticMotionTokens(motionTokens: Record<string, any>): string {
    const lines: string[] = [];

    lines.push('    // MARK: Semantic Motion Tokens');
    lines.push('    ');
    lines.push('    /** Composed motion styles for specific animation contexts */');

    for (const [name, token] of Object.entries(motionTokens)) {
      const objectName = this.toKotlinTypeName(name);
      const { duration, easing, scale } = token.primitiveReferences;

      // Use context instead of description to avoid including specific values
      const comment = token.context || token.description;

      lines.push('    ');
      lines.push(`    /** ${comment} */`);
      lines.push(`    object ${objectName} {`);

      // Generate duration reference
      const durationKotlinName = this.toKotlinTypeName(duration);
      lines.push(`        val duration = Duration.${durationKotlinName}`);

      // Generate easing reference
      const easingKotlinName = this.toKotlinTypeName(easing);
      lines.push(`        val easing = Easing.${easingKotlinName}`);

      // Generate scale reference if present
      if (scale) {
        const scaleKotlinName = this.toKotlinTypeName(scale);
        lines.push(`        val scale = Scale.${scaleKotlinName}`);
      }

      lines.push('    }');
    }

    lines.push('    ');

    return lines.join('\n');
  }

  /**
   * Convert token name to Kotlin type name (PascalCase)
   *
   * Converts names like "motion.floatLabel" to "MotionFloatLabel"
   * or "duration150" to "Duration150"
   * Used for object and class names.
   */
  private toKotlinTypeName(name: string): string {
    return name
      .split(/[.\-]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  }
}

/**
 * iOS Motion Token Generator
 *
 * Generates the Swift motion-token section (duration/easing/scale constants and
 * semantic motion structs) consumed by TokenFileGenerator.generateMotionSection().
 *
 * NOT the shipping iOS constant generator. Primitive/semantic/component token
 * constants ship via TokenFileGenerator + src/providers/iOSFormatGenerator.ts.
 *
 * History: this class previously implemented PlatformBuilder with a full
 * Swift-package build() path (Package.swift, SwiftUI components, validators).
 * That path was never wired into any shipping pipeline and was retired
 * 2026-08-26 alongside AndroidBuilder's (see
 * .kiro/issues/2026-08-26-androidbuilder-camelcase-dead-path.md).
 */
export class iOSBuilder {
  /**
   * Generate duration token Swift constants
   * 
   * Generates Swift constants for animation duration tokens.
   * Format: let duration150: TimeInterval = 0.15
   * 
   * Converts milliseconds to seconds for iOS TimeInterval.
   * 
   * Requirements: 1.6, 6.2, 6.5
   * 
   * @param durationTokens - Duration primitive tokens from token system
   * @returns Swift constant declarations
   */
  generateDurationTokens(durationTokens: Record<string, any>): string {
    const lines: string[] = [];
    
    lines.push('    // MARK: - Duration Tokens');
    lines.push('    ');
    lines.push('    /// Animation duration values in seconds (TimeInterval)');
    lines.push('    public enum Duration {');
    
    for (const [name, token] of Object.entries(durationTokens)) {
      const swiftName = this.toSwiftConstantName(name);
      const valueInSeconds = token.platforms.ios.value; // Already converted to seconds in token definition
      const comment = `        /// ${name}: ${valueInSeconds}s (${token.baseValue}ms)`;
      lines.push(comment);
      lines.push(`        public static let ${swiftName}: TimeInterval = ${valueInSeconds}`);
    }
    
    lines.push('    }');
    lines.push('    ');
    
    return lines.join('\n');
  }

  /**
   * Generate easing token Swift constants
   * 
   * Generates Swift constants for animation easing tokens using Animation.timingCurve().
   * Format: let easingStandard = Animation.timingCurve(0.4, 0.0, 0.2, 1.0)
   * 
   * Converts cubic-bezier CSS format to Swift Animation.timingCurve format.
   * 
   * Requirements: 2.6, 6.2, 6.6
   * 
   * @param easingTokens - Easing primitive tokens from token system
   * @returns Swift constant declarations
   */
  generateEasingTokens(easingTokens: Record<string, any>): string {
    const lines: string[] = [];
    const hasLinear = Object.values(easingTokens).some((t: any) => t.easingType === 'linear');
    
    lines.push('    // MARK: - Easing Tokens');
    lines.push('    ');

    if (hasLinear) {
      lines.push('    /// Piecewise linear easing via CustomAnimation (iOS 17+)');
      lines.push('    struct PiecewiseLinearEasing: CustomAnimation {');
      lines.push('        let stops: [(time: Double, progress: Double)]');
      lines.push('        let duration: Double');
      lines.push('        func animate<V>(value: V, time: TimeInterval, context: inout AnimationContext<V>) -> V? where V: VectorArithmetic {');
      lines.push('            let t = min(time / duration, 1.0)');
      lines.push('            guard t < 1.0 else { return nil }');
      lines.push('            var lo = 0, hi = stops.count - 1');
      lines.push('            while lo < hi - 1 { let mid = (lo + hi) / 2; if stops[mid].time <= t { lo = mid } else { hi = mid } }');
      lines.push('            let seg = stops[lo], next = stops[hi]');
      lines.push('            let frac = next.time > seg.time ? (t - seg.time) / (next.time - seg.time) : 1.0');
      lines.push('            let progress = seg.progress + (next.progress - seg.progress) * frac');
      lines.push('            return value.scaled(by: progress)');
      lines.push('        }');
      lines.push('    }');
      lines.push('    ');
    }

    lines.push('    /// Animation easing curves');
    lines.push('    public enum Easing {');
    
    for (const [name, token] of Object.entries(easingTokens)) {
      const swiftName = this.toSwiftConstantName(name);
      if (token.easingType === 'linear' && token.stops) {
        const stops = (token.stops as Array<[number, number]>)
          .map(([time, progress]) => `(${time}, ${progress})`).join(', ');
        const dur = (token.easingDuration / 1000).toFixed(2);
        lines.push(`        /// ${name}: piecewise linear (${(token.stops as Array<[number, number]>).length} stops, ${token.easingDuration}ms)`);
        lines.push(`        public static let ${swiftName} = Animation(PiecewiseLinearEasing(stops: [${stops}], duration: ${dur}))`);
      } else {
        const cubicBezier = token.platforms.ios.value;
        const match = cubicBezier.match(/cubic-bezier\(([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\)/);
        if (match) {
          const [, p1, p2, p3, p4] = match;
          lines.push(`        /// ${name}: Animation.timingCurve(${p1}, ${p2}, ${p3}, ${p4})`);
          lines.push(`        public static let ${swiftName} = Animation.timingCurve(${p1}, ${p2}, ${p3}, ${p4})`);
        }
      }
    }
    
    lines.push('    }');
    lines.push('    ');
    
    return lines.join('\n');
  }

  /**
   * Generate scale token Swift constants
   * 
   * Generates Swift constants for transform scale tokens.
   * Format: let scale088: CGFloat = 0.88
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
   * In Swift, components should apply rounding when using scale tokens:
   *   let scaledSize = round(baseSize * Tokens.Scale.scale088)
   * 
   * Requirements: 3.1, 4.2, 4.3, 6.2
   * 
   * @param scaleTokens - Scale primitive tokens from token system
   * @returns Swift constant declarations
   */
  generateScaleTokens(scaleTokens: Record<string, any>): string {
    const lines: string[] = [];
    
    lines.push('    // MARK: - Scale Tokens');
    lines.push('    ');
    lines.push('    /// Transform scale factors (unitless)');
    lines.push('    /// When applying to base values, use round() for whole pixels');
    lines.push('    public enum Scale {');
    
    for (const [name, token] of Object.entries(scaleTokens)) {
      const swiftName = this.toSwiftConstantName(name);
      const value = token.platforms.ios.value;
      const comment = `        /// ${name}: ${value}`;
      lines.push(comment);
      lines.push(`        public static let ${swiftName}: CGFloat = ${value}`);
    }
    
    lines.push('    }');
    lines.push('    ');
    
    return lines.join('\n');
  }

  /**
   * Generate semantic motion token Swift constants
   * 
   * Generates Swift structs for semantic motion tokens that compose
   * primitive duration, easing, and scale tokens.
   * 
   * Format:
   *   struct MotionFloatLabel {
   *     let duration = Duration.duration250
   *     let easing = Easing.easingStandard
   *   }
   * 
   * Requirements: 5.1, 5.2, 6.5
   * 
   * @param motionTokens - Semantic motion tokens from token system
   * @returns Swift struct declarations
   */
  generateSemanticMotionTokens(motionTokens: Record<string, any>): string {
    const lines: string[] = [];
    
    lines.push('    // MARK: - Semantic Motion Tokens');
    lines.push('    ');
    lines.push('    /// Composed motion styles for specific animation contexts');
    
    for (const [name, token] of Object.entries(motionTokens)) {
      const structName = this.toSwiftTypeName(name);
      const { duration, easing, scale } = token.primitiveReferences;
      
      lines.push('    ');
      lines.push(`    /// ${token.description}`);
      lines.push(`    public struct ${structName} {`);
      
      // Generate duration reference
      const durationSwiftName = this.toSwiftConstantName(duration);
      lines.push(`        public static let duration = Duration.${durationSwiftName}`);
      
      // Generate easing reference
      const easingSwiftName = this.toSwiftConstantName(easing);
      lines.push(`        public static let easing = Easing.${easingSwiftName}`);
      
      // Generate scale reference if present
      if (scale) {
        const scaleSwiftName = this.toSwiftConstantName(scale);
        lines.push(`        public static let scale = Scale.${scaleSwiftName}`);
      }
      
      lines.push('    }');
    }
    
    lines.push('    ');
    
    return lines.join('\n');
  }

  /**
   * Convert token name to Swift type name (PascalCase)
   * 
   * Converts names like "motion.floatLabel" to "MotionFloatLabel"
   * Used for struct and enum names.
   */
  private toSwiftTypeName(name: string): string {
    return name
      .split('.')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  }

  /**
   * Convert token name to Swift constant name
   */
  private toSwiftConstantName(name: string): string {
    // Convert names like "space100" to "space100"
    // Convert names like "color.blue.500" to "colorBlue500"
    return name
      .replace(/\./g, '_')
      .replace(/-/g, '_')
      .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }
}

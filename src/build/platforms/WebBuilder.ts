/**
 * Web Motion Token Generator
 *
 * Generates the CSS custom-property motion-token section (duration/easing/scale
 * and semantic motion composites) consumed by
 * TokenFileGenerator.generateMotionSection().
 *
 * NOT the shipping web token generator. Primitive/semantic/component token
 * output ships via TokenFileGenerator + src/providers/WebFormatGenerator.ts.
 *
 * History: this class previously implemented PlatformBuilder with a full
 * NPM-package build() path (package.json, Lit components, CSS/TS token files).
 * That path was never wired into any shipping pipeline and was retired
 * 2026-08-26 alongside AndroidBuilder's (see
 * .kiro/issues/2026-08-26-androidbuilder-camelcase-dead-path.md).
 */
export class WebBuilder {
  /**
   * Generate duration token CSS custom properties
   * 
   * Generates CSS custom properties for animation duration tokens.
   * Format: --duration-150: 150ms;
   * 
   * Requirements: 1.5, 6.1
   * 
   * @param durationTokens - Duration primitive tokens from token system
   * @returns CSS custom property declarations
   */
  generateDurationTokens(durationTokens: Record<string, any>): string {
    const lines: string[] = [];
    
    lines.push('  /* Duration Tokens */');
    lines.push('  /* Animation timing values in milliseconds */');
    lines.push('  ');
    
    for (const [name, token] of Object.entries(durationTokens)) {
      const cssName = this.toCSSVariableName(name);
      const value = token.platforms.web.value;
      lines.push(`  --${cssName}: ${value}ms;`);
    }
    
    lines.push('  ');
    
    return lines.join('\n');
  }

  /**
   * Generate easing token CSS custom properties
   * 
   * Generates CSS custom properties for animation easing tokens.
   * Format: --easing-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
   * 
   * Requirements: 2.5, 6.1
   * 
   * @param easingTokens - Easing primitive tokens from token system
   * @returns CSS custom property declarations
   */
  generateEasingTokens(easingTokens: Record<string, any>): string {
    const lines: string[] = [];
    
    lines.push('  /* Easing Tokens */');
    lines.push('  /* Animation curve definitions */');
    lines.push('  ');
    
    for (const [name, token] of Object.entries(easingTokens)) {
      const cssName = this.toCSSVariableName(name);
      if (token.easingType === 'linear' && token.stops) {
        const stops = token.stops as Array<[number, number]>;
        const parts = stops.map(([time, progress], i) => {
          if (i === 0 && time === 0) return `${progress}`;
          if (i === stops.length - 1 && time === 1) return `${progress}`;
          return `${progress} ${(time * 100).toFixed(1)}%`;
        });
        lines.push(`  --${cssName}: linear(${parts.join(', ')});`);
      } else {
        lines.push(`  --${cssName}: ${token.platforms.web.value};`);
      }
    }
    
    lines.push('  ');
    
    return lines.join('\n');
  }

  /**
   * Generate scale token CSS custom properties
   * 
   * Generates CSS custom properties for transform scale tokens.
   * Format: --scale-088: 0.88;
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
   * Requirements: 3.1, 4.2, 4.3, 6.1
   * 
   * @param scaleTokens - Scale primitive tokens from token system
   * @returns CSS custom property declarations
   */
  generateScaleTokens(scaleTokens: Record<string, any>): string {
    const lines: string[] = [];
    
    lines.push('  /* Scale Tokens */');
    lines.push('  /* Transform scale factors (unitless) */');
    lines.push('  /* When applying to base values, use Math.round() for whole pixels */');
    lines.push('  ');
    
    for (const [name, token] of Object.entries(scaleTokens)) {
      const cssName = this.toCSSVariableName(name);
      const value = token.platforms.web.value;
      lines.push(`  --${cssName}: ${value};`);
    }
    
    lines.push('  ');
    
    return lines.join('\n');
  }

  /**
   * Generate semantic motion token CSS custom properties
   * 
   * Generates CSS custom properties for semantic motion tokens that compose
   * primitive duration, easing, and scale tokens.
   * 
   * Format: 
   *   --motion-float-label-duration: var(--duration-250);
   *   --motion-float-label-easing: var(--easing-standard);
   * 
   * Requirements: 5.1, 5.2, 6.4
   * 
   * @param motionTokens - Semantic motion tokens from token system
   * @returns CSS custom property declarations
   */
  generateSemanticMotionTokens(motionTokens: Record<string, any>): string {
    const lines: string[] = [];
    
    lines.push('  /* Semantic Motion Tokens */');
    lines.push('  /* Composed motion styles for specific animation contexts */');
    lines.push('  ');
    
    for (const [name, token] of Object.entries(motionTokens)) {
      const cssName = this.toCSSVariableName(name);
      const { duration, easing, scale } = token.primitiveReferences;
      
      // Generate duration reference
      const durationCssName = this.toCSSVariableName(duration);
      lines.push(`  --${cssName}-duration: var(--${durationCssName});`);
      
      // Generate easing reference
      const easingCssName = this.toCSSVariableName(easing);
      lines.push(`  --${cssName}-easing: var(--${easingCssName});`);
      
      // Generate scale reference if present
      if (scale) {
        const scaleCssName = this.toCSSVariableName(scale);
        lines.push(`  --${cssName}-scale: var(--${scaleCssName});`);
      }
      
      lines.push('  ');
    }
    
    return lines.join('\n');
  }

  /**
   * Convert token name to CSS variable name
   * Example: space100 -> space-100, colorBlue500 -> color-blue-500
   */
  private toCSSVariableName(name: string): string {
    return name
      .replace(/([A-Z])/g, '-$1')  // Convert camelCase to kebab-case
      .replace(/\./g, '-')          // Convert dots to hyphens
      .replace(/([a-z])(\d)/g, '$1-$2')  // Insert hyphen between letter and number
      .toLowerCase()
      .replace(/^-/, '');
  }
}

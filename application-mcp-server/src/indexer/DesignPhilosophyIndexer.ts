/**
 * DesignPhilosophyIndexer — Parse and serve design philosophy YAML.
 *
 * Loads design-philosophy.yaml and provides structured access to
 * philosophy, rules, guidance, and color strategy data.
 *
 * @see Spec 107 design.md § "Application MCP Design Language Tools"
 */

import * as fs from 'fs';
import * as yaml from 'js-yaml';

export interface Philosophy {
  northStar: string;
  description: string;
  characteristics: string[];
}

export interface DesignRule {
  name: string;
  constraint: string;
  rationale: string;
}

export interface GuidanceItem {
  category: string;
  directive: string;
}

export interface ColorStrategyTier {
  tier: string;
  definition: string;
  whenToUse: string;
  whenNotToUse: string;
  example: string;
}

interface RawPhilosophyData {
  schemaVersion?: number;
  philosophy?: Philosophy;
  rules?: DesignRule[];
  guidance?: { do?: GuidanceItem[]; dont?: GuidanceItem[] };
  colorStrategy?: ColorStrategyTier[];
}

export class DesignPhilosophyIndexer {
  private data: RawPhilosophyData | null = null;
  private warnings: string[] = [];

  async index(filePath: string): Promise<void> {
    this.data = null;
    this.warnings = [];

    if (!fs.existsSync(filePath)) {
      this.warnings.push(`Design philosophy file not found: ${filePath}`);
      return;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      this.data = yaml.load(content) as RawPhilosophyData;
      this.validate();
    } catch (err) {
      this.warnings.push(`Failed to parse design philosophy: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  getPhilosophy(): Philosophy | null {
    return this.data?.philosophy ?? null;
  }

  getRules(): DesignRule[] {
    return this.data?.rules ?? [];
  }

  getGuidance(category?: string): { do: GuidanceItem[]; dont: GuidanceItem[] } {
    const doItems = this.data?.guidance?.do ?? [];
    const dontItems = this.data?.guidance?.dont ?? [];

    if (!category) return { do: doItems, dont: dontItems };

    return {
      do: doItems.filter(i => i.category === category),
      dont: dontItems.filter(i => i.category === category),
    };
  }

  getColorStrategy(tier?: string): ColorStrategyTier[] {
    const tiers = this.data?.colorStrategy ?? [];
    if (!tier) return tiers;
    return tiers.filter(t => t.tier.toLowerCase() === tier.toLowerCase());
  }

  getWarnings(): string[] {
    return this.warnings;
  }

  private validate(): void {
    if (!this.data) return;

    if (!this.data.philosophy?.northStar) {
      this.warnings.push('Missing required field: philosophy.northStar');
    }
    if (!this.data.philosophy?.description) {
      this.warnings.push('Missing required field: philosophy.description');
    }
    if (!this.data.rules || this.data.rules.length === 0) {
      this.warnings.push('No design rules defined');
    }
    if (!this.data.colorStrategy || this.data.colorStrategy.length === 0) {
      this.warnings.push('No color strategy tiers defined');
    }
  }
}

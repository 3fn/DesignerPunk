/**
 * ReverseIndexBuilder — pure accumulator for reverse indexes.
 *
 * Receives addComponent/addToken/addDomainObject calls from ProductIndexer's
 * tree walk. No traversal logic — just data storage.
 *
 * @see .kiro/specs/097-product-mcp-intelligence-layer/design.md § "ReverseIndexBuilder Interface"
 */

import type { ScreenRef, DomainScreenRef, ReverseIndexes } from '../models';

export class ReverseIndexBuilder {
  private componentToScreens = new Map<string, ScreenRef[]>();
  private tokenToScreens = new Map<string, ScreenRef[]>();
  private domainObjectToScreens = new Map<string, DomainScreenRef[]>();

  addComponent(screen: string, component: string, path: string): void {
    const refs = this.componentToScreens.get(component);
    if (refs) {
      if (!refs.some(r => r.screen === screen && r.path === path)) {
        refs.push({ screen, path });
      }
    } else {
      this.componentToScreens.set(component, [{ screen, path }]);
    }
  }

  addToken(screen: string, token: string, path: string): void {
    const refs = this.tokenToScreens.get(token);
    if (refs) {
      if (!refs.some(r => r.screen === screen && r.path === path)) {
        refs.push({ screen, path });
      }
    } else {
      this.tokenToScreens.set(token, [{ screen, path }]);
    }
  }

  addDomainObject(screen: string, domainObject: string): void {
    const refs = this.domainObjectToScreens.get(domainObject);
    if (refs) {
      if (!refs.some(r => r.screen === screen)) {
        refs.push({ screen });
      }
    } else {
      this.domainObjectToScreens.set(domainObject, [{ screen }]);
    }
  }

  getIndexes(): ReverseIndexes {
    return {
      componentToScreens: this.componentToScreens,
      tokenToScreens: this.tokenToScreens,
      domainObjectToScreens: this.domainObjectToScreens,
    };
  }

  clear(): void {
    this.componentToScreens.clear();
    this.tokenToScreens.clear();
    this.domainObjectToScreens.clear();
  }
}

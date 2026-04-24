/**
 * @jest-environment node
 * @category evergreen
 * @purpose Unit tests for ReverseIndexBuilder — index population, duplicate handling, clear
 */

import { ReverseIndexBuilder } from '../indexer/ReverseIndexBuilder';

describe('ReverseIndexBuilder', () => {
  let builder: ReverseIndexBuilder;

  beforeEach(() => {
    builder = new ReverseIndexBuilder();
  });

  describe('addComponent', () => {
    it('creates an entry for a new component', () => {
      builder.addComponent('screen-a', 'Button-CTA', 'ui-tree.children[0]');
      const idx = builder.getIndexes().componentToScreens;
      expect(idx.get('Button-CTA')).toEqual([{ screen: 'screen-a', path: 'ui-tree.children[0]' }]);
    });

    it('appends to existing component entry from a different screen', () => {
      builder.addComponent('screen-a', 'Button-CTA', 'ui-tree.children[0]');
      builder.addComponent('screen-b', 'Button-CTA', 'ui-tree.children[1]');
      expect(builder.getIndexes().componentToScreens.get('Button-CTA')).toHaveLength(2);
    });

    it('deduplicates same screen+path', () => {
      builder.addComponent('screen-a', 'Button-CTA', 'ui-tree.children[0]');
      builder.addComponent('screen-a', 'Button-CTA', 'ui-tree.children[0]');
      expect(builder.getIndexes().componentToScreens.get('Button-CTA')).toHaveLength(1);
    });

    it('allows same screen with different paths', () => {
      builder.addComponent('screen-a', 'Button-CTA', 'ui-tree.children[0]');
      builder.addComponent('screen-a', 'Button-CTA', 'ui-tree.children[1]');
      expect(builder.getIndexes().componentToScreens.get('Button-CTA')).toHaveLength(2);
    });
  });

  describe('addToken', () => {
    it('creates an entry for a new token', () => {
      builder.addToken('screen-a', 'color.action.primary', 'ui-tree.children[0]');
      const idx = builder.getIndexes().tokenToScreens;
      expect(idx.get('color.action.primary')).toEqual([{ screen: 'screen-a', path: 'ui-tree.children[0]' }]);
    });

    it('handles flat token names', () => {
      builder.addToken('screen-a', 'bodyMd', 'ui-tree.children[0]');
      expect(builder.getIndexes().tokenToScreens.get('bodyMd')).toHaveLength(1);
    });

    it('deduplicates same screen+path', () => {
      builder.addToken('screen-a', 'color.action.primary', 'ui-tree.children[0]');
      builder.addToken('screen-a', 'color.action.primary', 'ui-tree.children[0]');
      expect(builder.getIndexes().tokenToScreens.get('color.action.primary')).toHaveLength(1);
    });
  });

  describe('addDomainObject', () => {
    it('creates an entry for a new domain object', () => {
      builder.addDomainObject('screen-a', 'bill');
      expect(builder.getIndexes().domainObjectToScreens.get('bill')).toEqual([{ screen: 'screen-a' }]);
    });

    it('deduplicates same screen', () => {
      builder.addDomainObject('screen-a', 'bill');
      builder.addDomainObject('screen-a', 'bill');
      expect(builder.getIndexes().domainObjectToScreens.get('bill')).toHaveLength(1);
    });

    it('appends different screens', () => {
      builder.addDomainObject('screen-a', 'bill');
      builder.addDomainObject('screen-b', 'bill');
      expect(builder.getIndexes().domainObjectToScreens.get('bill')).toHaveLength(2);
    });

    it('has no path property on refs', () => {
      builder.addDomainObject('screen-a', 'bill');
      const ref = builder.getIndexes().domainObjectToScreens.get('bill')![0];
      expect(ref).toEqual({ screen: 'screen-a' });
      expect('path' in ref).toBe(false);
    });
  });

  describe('getIndexes', () => {
    it('returns empty maps when nothing added', () => {
      const idx = builder.getIndexes();
      expect(idx.componentToScreens.size).toBe(0);
      expect(idx.tokenToScreens.size).toBe(0);
      expect(idx.domainObjectToScreens.size).toBe(0);
    });

    it('returns all three indexes', () => {
      builder.addComponent('s', 'C', 'p');
      builder.addToken('s', 'T', 'p');
      builder.addDomainObject('s', 'D');
      const idx = builder.getIndexes();
      expect(idx.componentToScreens.size).toBe(1);
      expect(idx.tokenToScreens.size).toBe(1);
      expect(idx.domainObjectToScreens.size).toBe(1);
    });
  });

  describe('clear', () => {
    it('resets all indexes', () => {
      builder.addComponent('s', 'C', 'p');
      builder.addToken('s', 'T', 'p');
      builder.addDomainObject('s', 'D');
      builder.clear();
      const idx = builder.getIndexes();
      expect(idx.componentToScreens.size).toBe(0);
      expect(idx.tokenToScreens.size).toBe(0);
      expect(idx.domainObjectToScreens.size).toBe(0);
    });
  });
});

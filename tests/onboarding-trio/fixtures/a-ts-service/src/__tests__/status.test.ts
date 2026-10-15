import { classify } from '../status';

describe('classify', () => {
  const promisedBy = new Date('2026-01-10T00:00:00Z');

  it('is failed when the order failed', () => {
    expect(classify({ id: 'x', promisedBy, failed: true })).toBe('failed');
  });

  it('is ok when delivered on time', () => {
    expect(classify({ id: 'x', promisedBy, deliveredAt: new Date('2026-01-09T00:00:00Z') })).toBe('ok');
  });

  it('is delayed when still undelivered after the promise', () => {
    expect(classify({ id: 'x', promisedBy }, new Date('2026-01-11T00:00:00Z'))).toBe('delayed');
  });
});

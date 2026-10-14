export type OrderStatus = 'ok' | 'delayed' | 'failed';

export interface OrderRecord {
  id: string;
  promisedBy: Date;
  deliveredAt?: Date;
  failed?: boolean;
}

/** Classifies an order against its promised delivery time. */
export function classify(order: OrderRecord, now: Date = new Date()): OrderStatus {
  if (order.failed) return 'failed';
  if (order.deliveredAt) return order.deliveredAt <= order.promisedBy ? 'ok' : 'delayed';
  return now <= order.promisedBy ? 'ok' : 'delayed';
}

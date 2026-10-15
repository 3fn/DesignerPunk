import { createServer } from 'node:http';
import { classify, OrderRecord } from './status';

const orders = new Map<string, OrderRecord>([
  ['A100', { id: 'A100', promisedBy: new Date('2030-01-01T00:00:00Z') }],
  ['A101', { id: 'A101', promisedBy: new Date('2020-01-01T00:00:00Z') }],
  ['A102', { id: 'A102', promisedBy: new Date('2030-01-01T00:00:00Z'), failed: true }],
]);

const server = createServer((req, res) => {
  const match = /^\/orders\/([^/]+)\/status$/.exec(req.url ?? '');
  const order = match ? orders.get(match[1]) : undefined;
  if (!order) {
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'not found' }));
    return;
  }
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ id: order.id, status: classify(order), updatedAt: new Date().toISOString() }));
});

server.listen(Number(process.env.PORT ?? 3000));

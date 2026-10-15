# order-status

Small HTTP service that answers "where is my order?" for the support team's tools.

- `GET /orders/:id/status` returns `{ id, status, updatedAt }`, where `status` is `ok`, `delayed` or `failed`.
- `npm run build && npm start` serves on port 3000 (`PORT` overrides it).
- `npm test` runs the unit tests.

There is no frontend yet.

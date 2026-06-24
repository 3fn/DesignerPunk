/**
 * Minimal CJS stub for @modelcontextprotocol/sdk/types.js
 * See mcp-sdk-server.js for the rationale.
 *
 * index.ts uses CallToolRequestSchema and ListToolsRequestSchema only as arguments to
 * server.setRequestHandler(schema, handler). The stubs are sentinel strings — the stubbed
 * Server.setRequestHandler is a no-op, so the values never need to match the real schemas.
 */
'use strict';

module.exports = {
  CallToolRequestSchema: 'CallToolRequestSchema',
  ListToolsRequestSchema: 'ListToolsRequestSchema',
};

/**
 * Minimal CJS stub for @modelcontextprotocol/sdk/server/index.js
 *
 * The SDK ships ESM-only; Jest/CommonJS cannot parse it.  The tool-boundary contract test
 * (Spec 121 Task 4) imports index.ts which imports the SDK at the top level.  This stub
 * provides just enough surface for ComponentMCPServer to construct without a real MCP Server
 * or transport — the test calls handleTool() directly and never calls server.connect().
 *
 * INTENTIONALLY MINIMAL — do not grow this unless index.ts starts using more SDK surface.
 */
'use strict';

class Server {
  constructor(_info, _options) {
    // No-op — we never call server.connect() in tests
  }
  setRequestHandler(_schema, _handler) {
    // No-op — handlers are registered but never invoked via the protocol transport
  }
  async connect(_transport) {
    // No-op — start() calls this; tests never call start()
  }
}

module.exports = { Server };

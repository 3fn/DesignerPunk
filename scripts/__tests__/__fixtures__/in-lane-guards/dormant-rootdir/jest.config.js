// Fixture jest config (in-lane-guards case `dormant-rootdir`). rootDir is pointed at a SUBDIRECTORY
// of the fixture dir, so the registered guard under guards/ falls outside selection. Selection is
// the suffix *.guard-fixture.ts, never *.test.ts. Read only by `npx jest --config <this> --listTests`.
const path = require('path');
module.exports = {
  rootDir: path.join(__dirname, 'elsewhere'),
  testMatch: ['**/*.guard-fixture.ts'],
};

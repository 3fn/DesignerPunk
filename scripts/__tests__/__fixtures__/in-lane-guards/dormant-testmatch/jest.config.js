// Fixture jest config (in-lane-guards case `dormant-testmatch`). rootDir = this fixture dir; selection is the
// suffix *.guard-fixture.ts, never *.test.ts. Read only by `npx jest --config <this> --listTests`.
module.exports = {
  rootDir: __dirname,
  testMatch: ['**/selected.guard-fixture.ts'],
};

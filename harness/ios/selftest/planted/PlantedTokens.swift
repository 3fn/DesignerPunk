// Self-test fixture (K-4, case 2). A two-member token module with ONE member that is not `public`.
// The planted index beside this file names both members, so the generated probe reads both
// (a read count of 2 of 2) and the compiler rejects exactly one read:
//   'plantedInternal' is inaccessible due to 'internal' protection level
// That shows the probe imports the module by plain `import` (an `@testable` import would see the
// internal member) and that it reads members whatever their declared access level (D1).
public struct DesignTokens {
    public static let plantedPublic: Int = 1
    static let plantedInternal: Int = 2
}

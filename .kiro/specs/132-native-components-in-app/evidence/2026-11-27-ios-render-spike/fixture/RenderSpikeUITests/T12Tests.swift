import XCTest

final class T12Tests: XCTestCase {
    func testDynamicTypeAudit() throws {
        let app = XCUIApplication()
        app.launchArguments = ["-fixtureScreen", "t12", "-fixtureScheme", "light"]
        app.launch()
        XCTAssertTrue(app.staticTexts["t12.fixed"].waitForExistence(timeout: 10))
        var flagged: [String] = []
        try app.performAccessibilityAudit(for: .dynamicType) { issue in
            flagged.append(issue.element?.identifier ?? "nil")
            print("SPIKE t12 type=\(issue.auditType.rawValue) element=\(issue.element?.identifier ?? "nil") — \(issue.compactDescription)")
            return true
        }
        print("SPIKE t12 flagged=\(flagged)")
    }
}

import XCTest

final class T13Tests: XCTestCase {
    private func run(_ screen: String) {
        let app = XCUIApplication()
        app.launchArguments = ["-fixtureScreen", screen, "-fixtureScheme", "light"]
        app.launch()
        XCTAssertTrue(app.staticTexts["t13.anchor"].waitForExistence(timeout: 10))
        let images = app.images
        print("SPIKE t13 \(screen) images.count=\(images.count) ids=\(images.allElementsBoundByIndex.map { $0.identifier }) labels=\(images.allElementsBoundByIndex.map { $0.label })")
        print("SPIKE t13 \(screen) any.count=\(app.descendants(matching: .any).count)")
        app.buttons["t13.walk"].tap()
        let report = app.staticTexts["t13.report"]
        _ = report.waitForExistence(timeout: 5)
        print("SPIKE t13 \(screen) walk=\(report.label)")
    }
    func testHidden() { run("t13hidden") }
    func testVisible() { run("t13visible") }
}

// Self-test fixture (K-4, case 1). A function that falls off its end without returning.
// `-typecheck` exits 0 on this file; a compile that emits object code (`-c`) rejects it with
// exactly one `missing return` error. The lane compiles it first, under each stage's own
// invocation, and fails the context as `self-test` unless it gets exactly that one error:
// that is what shows the invocation compiles and does not only typecheck.
func harnessSelfTestMissingReturn(flag: Bool) -> Int {
    if flag {
        return 1
    }
}

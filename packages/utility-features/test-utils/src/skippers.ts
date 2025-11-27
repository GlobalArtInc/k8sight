/**
 * Conditionally run a test
 */
export function itIf(condition: boolean) {
  return condition ? it : it.skip;
}

/**
 * Conditionally run a block of tests
 */
export function describeIf(condition: boolean) {
  return condition ? describe : describe.skip;
}

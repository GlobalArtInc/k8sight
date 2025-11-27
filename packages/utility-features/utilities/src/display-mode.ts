/**
 * Format `mode` in octal notation
 */
export function displayMode(mode: number): string {
  return `0o${mode.toString(8)}`;
}

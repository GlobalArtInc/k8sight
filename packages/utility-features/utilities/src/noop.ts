/**
 * A function that does nothing
 */
export function noop<T extends any[]>(...args: T): void {
  return void args;
}

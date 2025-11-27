import type { ReadonlyDeep } from "type-fest";

export function readonly<T>(src: T): ReadonlyDeep<T> {
  return src as ReadonlyDeep<T>;
}

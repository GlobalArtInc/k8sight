import { runInAction } from "mobx";

export function replaceObservableObject<Key extends string | number | symbol>(
  target: Partial<Record<Key, unknown>>,
  source: Partial<Record<Key, unknown>>,
): void {
  runInAction(() => {
    for (const key in target) {
      if (!(key in source)) {
        delete target[key];
      }
    }

    Object.assign(target, source);
  });
}

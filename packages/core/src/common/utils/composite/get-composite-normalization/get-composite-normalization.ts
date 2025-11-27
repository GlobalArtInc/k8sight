import type { Composite } from "../get-composite/get-composite";

export const getCompositeNormalization = <T>(composite: Composite<T>) => {
  const _normalizeComposite = <T>(
    composite: Composite<T>,
    previousPath: string[] = [],
  ): (readonly [path: string[], composite: Composite<T>])[] => {
    const currentPath = [...previousPath, composite.id];

    const pathAndCompositeTuple = [currentPath, composite] as const;

    return [
      pathAndCompositeTuple,

      ...composite.children.flatMap((child) => _normalizeComposite(child, currentPath)),
    ];
  };

  return _normalizeComposite(composite);
};

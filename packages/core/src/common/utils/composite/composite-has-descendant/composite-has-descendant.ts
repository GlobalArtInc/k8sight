import type { Composite } from "../get-composite/get-composite";

const compositeHasDescendant = <T>(predicate: (referenceComposite: Composite<T>) => boolean) => {
  const _compositeHasDescendant = (composite: Composite<T>): boolean =>
    predicate(composite) || !!composite.children.find((childComposite) => _compositeHasDescendant(childComposite));

  return _compositeHasDescendant;
};

export { compositeHasDescendant };

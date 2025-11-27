export const findExactlyOne =
  <T>(predicate: (item: T) => boolean) =>
  (collection: T[]): T => {
    const itemsFound = collection.filter(predicate);

    if (!itemsFound.length) {
      throw new Error("Tried to find exactly one, but didn't find any");
    }

    if (itemsFound.length > 1) {
      throw new Error("Tried to find exactly one, but found many");
    }

    return itemsFound[0];
  };

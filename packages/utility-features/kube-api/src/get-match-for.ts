export const getMatchFor =
  (...patterns: RegExp[]) =>
  (reference: string) => {
    for (const pattern of patterns) {
      const match = reference.match(pattern);

      if (match) {
        return match;
      }
    }

    return undefined;
  };

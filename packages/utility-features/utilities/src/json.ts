import type { Result } from "./result";

export const json = {
  parse: (input: string): Result<unknown, Error> => {
    try {
      return {
        callWasSuccessful: true,
        response: JSON.parse(input) as unknown,
      };
    } catch (error) {
      return {
        callWasSuccessful: false,
        error: error as Error,
      };
    }
  },
};

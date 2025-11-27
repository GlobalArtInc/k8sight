import { JsonApiErrorParsed } from "@kubesightapp/json-api";

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (error instanceof JsonApiErrorParsed) {
    return error.toString();
  }

  return JSON.stringify(error);
};

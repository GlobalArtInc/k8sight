import type { K8sightApiResult } from "./route";

export interface K8sightApiResultContentType {
  resultMapper: (result: K8sightApiResult<unknown>) => {
    statusCode: number;
    content: unknown;
    headers: Record<string, string>;
  };
}

const resultMapperFor =
  (contentType: string): K8sightApiResultContentType["resultMapper"] =>
  ({ response, error, statusCode = error ? 400 : 200, headers = {} }) => ({
    statusCode,
    content: error || response,
    headers: { ...headers, "Content-Type": contentType },
  });

export type SupportedFileExtension =
  | "json"
  | "txt"
  | "html"
  | "css"
  | "gif"
  | "jpg"
  | "png"
  | "svg"
  | "js"
  | "woff2"
  | "ttf";

export interface ContentTypes extends Record<SupportedFileExtension, K8sightApiResultContentType> {
  [key: string]: K8sightApiResultContentType | undefined;
}

export const contentTypes: ContentTypes = {
  json: {
    resultMapper: (result: K8sightApiResult<unknown>) => {
      const resultMapper = resultMapperFor("application/json");

      const mappedResult = resultMapper(result);

      const contentIsObject = typeof mappedResult.content === "object";
      const contentIsBuffer = mappedResult.content instanceof Buffer;
      const contentShouldBeStringified = contentIsObject && !contentIsBuffer;

      const content = contentShouldBeStringified ? JSON.stringify(mappedResult.content) : mappedResult.content;

      return {
        ...mappedResult,
        content,
      };
    },
  },

  txt: {
    resultMapper: resultMapperFor("text/plain"),
  },

  html: {
    resultMapper: resultMapperFor("text/html"),
  },

  css: {
    resultMapper: resultMapperFor("text/css"),
  },

  gif: {
    resultMapper: resultMapperFor("image/gif"),
  },

  jpg: {
    resultMapper: resultMapperFor("image/jpeg"),
  },

  png: {
    resultMapper: resultMapperFor("image/png"),
  },

  svg: {
    resultMapper: resultMapperFor("image/svg+xml"),
  },

  js: {
    resultMapper: resultMapperFor("application/javascript"),
  },

  woff2: {
    resultMapper: resultMapperFor("font/woff2"),
  },

  ttf: {
    resultMapper: resultMapperFor("font/ttf"),
  },
};

import type { RequestChannel } from "@kubesightapp/messaging";

import type { OpenDialogOptions } from "electron";

export type PathPickingResponse =
  | {
      canceled: true;
    }
  | {
      canceled: false;
      paths: string[];
    };

export const openPathPickingDialogChannel: RequestChannel<OpenDialogOptions, PathPickingResponse> = {
  id: "open-path-picking-dialog",
};

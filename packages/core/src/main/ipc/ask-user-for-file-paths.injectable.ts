import { getInjectable } from "@ogre-tools/injectable";
import showOpenDialogInjectable from "../electron-app/features/show-open-dialog.injectable";
import showApplicationWindowInjectable from "../start-main-application/k8sight-window/show-application-window.injectable";

import type { RequestChannelHandler } from "@kubesightapp/messaging";

import type { openPathPickingDialogChannel } from "../../features/path-picking-dialog/common/channel";

// TODO: Replace leaking electron with abstraction
export type AskUserForFilePaths = RequestChannelHandler<typeof openPathPickingDialogChannel>;

const askUserForFilePathsInjectable = getInjectable({
  id: "ask-user-for-file-paths",

  instantiate: (di): AskUserForFilePaths => {
    const showApplicationWindow = di.inject(showApplicationWindowInjectable);
    const showOpenDialog = di.inject(showOpenDialogInjectable);

    return async (dialogOptions) => {
      await showApplicationWindow();

      const { canceled, filePaths } = await showOpenDialog(dialogOptions);

      if (canceled) {
        return {
          canceled,
        };
      }

      return {
        canceled: false,
        paths: filePaths,
      };
    };
  },
});

export default askUserForFilePathsInjectable;

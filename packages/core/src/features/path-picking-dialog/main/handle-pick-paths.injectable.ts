import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import askUserForFilePathsInjectable from "../../../main/ipc/ask-user-for-file-paths.injectable";
import { openPathPickingDialogChannel } from "../common/channel";

const openPathPickingDialogListener = getRequestChannelListenerInjectable({
  id: "open-path-picking-dialog",
  channel: openPathPickingDialogChannel,
  getHandler: (di) => di.inject(askUserForFilePathsInjectable),
});

export default openPathPickingDialogListener;

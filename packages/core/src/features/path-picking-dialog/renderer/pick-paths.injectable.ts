import { requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { openPathPickingDialogChannel } from "../common/channel";

import type { PathPickOpts } from "../../../renderer/components/path-picker";

export type OpenPathPickingDialog = (options: PathPickOpts) => Promise<void>;

const openPathPickingDialogInjectable = getInjectable({
  id: "open-path-picking-dialog",
  instantiate: (di): OpenPathPickingDialog => {
    const requestFromChannel = di.inject(requestFromChannelInjectionToken);

    return async (options) => {
      const { onPick, onCancel, ...dialogOptions } = options;
      const response = await requestFromChannel(openPathPickingDialogChannel, dialogOptions);

      if (response.canceled) {
        await onCancel?.();
      } else {
        await onPick?.(response.paths);
      }
    };
  },
});

export default openPathPickingDialogInjectable;

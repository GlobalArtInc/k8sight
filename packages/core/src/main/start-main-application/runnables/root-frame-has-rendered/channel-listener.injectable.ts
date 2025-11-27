import { getMessageChannelListenerInjectable } from "@kubesightapp/messaging";
import { runManyFor } from "@kubesightapp/run-many";
import { rootFrameHasRenderedChannel } from "../../../../common/root-frame/root-frame-rendered-channel";
import { afterRootFrameIsReadyInjectionToken } from "../../runnable-tokens/phases";

const rootFrameRenderedChannelListenerInjectable = getMessageChannelListenerInjectable({
  id: "action",
  channel: rootFrameHasRenderedChannel,
  getHandler: (di) => {
    const runMany = runManyFor(di);

    return runMany(afterRootFrameIsReadyInjectionToken);
  },
});

export default rootFrameRenderedChannelListenerInjectable;

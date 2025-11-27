import { getMessageChannelListenerInjectable } from "@kubesightapp/messaging";
import { syncBoxChannel } from "./channels";
import syncBoxStateInjectable from "./sync-box-state.injectable";

const syncBoxChannelListenerInjectable = getMessageChannelListenerInjectable({
  id: "init",
  channel: syncBoxChannel,
  getHandler:
    (di) =>
    ({ id, value }) =>
      di.inject(syncBoxStateInjectable, id).set(value),
});

export default syncBoxChannelListenerInjectable;

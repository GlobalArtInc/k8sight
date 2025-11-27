import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import { getActiveHelmRepositoriesChannel } from "../../../../common/helm/get-active-helm-repositories-channel";
import getActiveHelmRepositoriesInjectable from "./get-active-helm-repositories.injectable";

const getActiveHelmRepositoriesChannelListenerInjectable = getRequestChannelListenerInjectable({
  id: "get-active-helm-repositories-channel-listener",
  channel: getActiveHelmRepositoriesChannel,
  getHandler: (di) => di.inject(getActiveHelmRepositoriesInjectable),
});

export default getActiveHelmRepositoriesChannelListenerInjectable;

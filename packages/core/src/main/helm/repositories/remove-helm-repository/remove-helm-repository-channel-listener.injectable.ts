import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import { removeHelmRepositoryChannel } from "../../../../common/helm/remove-helm-repository-channel";
import removeHelmRepositoryInjectable from "./remove-helm-repository.injectable";

const removeHelmRepositoryChannelListenerInjectable = getRequestChannelListenerInjectable({
  id: "remove-helm-repository-channel-listener",
  channel: removeHelmRepositoryChannel,
  getHandler: (di) => di.inject(removeHelmRepositoryInjectable),
});

export default removeHelmRepositoryChannelListenerInjectable;

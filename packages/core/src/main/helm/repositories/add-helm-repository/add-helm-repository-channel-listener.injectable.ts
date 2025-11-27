import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import { addHelmRepositoryChannel } from "../../../../common/helm/add-helm-repository-channel";
import addHelmRepositoryInjectable from "./add-helm-repository.injectable";

const addHelmRepositoryChannelListenerInjectable = getRequestChannelListenerInjectable({
  id: "add-helm-repository-channel-listener",
  channel: addHelmRepositoryChannel,
  getHandler: (di) => di.inject(addHelmRepositoryInjectable),
});

export default addHelmRepositoryChannelListenerInjectable;

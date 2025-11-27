import { requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { kubectlDeleteAllChannel, kubectlDeleteAllInjectionToken } from "../../common/kube-helpers/channels";

const kubectlDeleteAllInjectable = getInjectable({
  id: "kubectl-delete-all",
  instantiate: (di) => {
    const requestFromChannel = di.inject(requestFromChannelInjectionToken);

    return (req) => requestFromChannel(kubectlDeleteAllChannel, req);
  },
  injectionToken: kubectlDeleteAllInjectionToken,
});

export default kubectlDeleteAllInjectable;

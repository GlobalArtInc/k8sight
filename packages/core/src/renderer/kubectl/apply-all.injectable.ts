import { requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { kubectlApplyAllChannel, kubectlApplyAllInjectionToken } from "../../common/kube-helpers/channels";

const kubectlApplyAllInjectable = getInjectable({
  id: "kubectl-apply-all",
  instantiate: (di) => {
    const requestFromChannel = di.inject(requestFromChannelInjectionToken);

    return (req) => requestFromChannel(kubectlApplyAllChannel, req);
  },
  injectionToken: kubectlApplyAllInjectionToken,
});

export default kubectlApplyAllInjectable;

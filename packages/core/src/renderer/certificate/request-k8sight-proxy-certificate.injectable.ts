import { requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { k8sightProxyCertificateChannel } from "../../common/certificate/k8sight-proxy-certificate-channel";

const requestK8sightProxyCertificateInjectable = getInjectable({
  id: "request-k8sight-proxy-certificate",
  instantiate: (di) => {
    const requestFromChannel = di.inject(requestFromChannelInjectionToken);

    return () => requestFromChannel(k8sightProxyCertificateChannel);
  },
});

export default requestK8sightProxyCertificateInjectable;

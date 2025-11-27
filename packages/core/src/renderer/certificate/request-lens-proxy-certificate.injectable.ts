import { requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { lensProxyCertificateChannel } from "../../common/certificate/lens-proxy-certificate-channel";

const requestLensProxyCertificateInjectable = getInjectable({
  id: "request-lens-proxy-certificate",
  instantiate: (di) => {
    const requestFromChannel = di.inject(requestFromChannelInjectionToken);

    return () => requestFromChannel(lensProxyCertificateChannel);
  },
});

export default requestLensProxyCertificateInjectable;

import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import lensProxyCertificateInjectable from "../../common/certificate/lens-proxy-certificate.injectable";
import { lensProxyCertificateChannel } from "../../common/certificate/lens-proxy-certificate-channel";

const lensProxyCertificateRequestHandlerInjectable = getRequestChannelListenerInjectable({
  id: "lens-proxy-certificate-request-handler-listener",
  channel: lensProxyCertificateChannel,
  getHandler: (di) => {
    const lensProxyCertificate = di.inject(lensProxyCertificateInjectable).get();

    return () => ({
      cert: lensProxyCertificate.cert,
      public: lensProxyCertificate.public,
      private: "",
    });
  },
});

export default lensProxyCertificateRequestHandlerInjectable;

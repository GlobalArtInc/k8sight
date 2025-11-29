import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import k8sightProxyCertificateInjectable from "../../common/certificate/k8sight-proxy-certificate.injectable";
import { k8sightProxyCertificateChannel } from "../../common/certificate/k8sight-proxy-certificate-channel";

const k8sightProxyCertificateRequestHandlerInjectable = getRequestChannelListenerInjectable({
  id: "k8sight-proxy-certificate-request-handler-listener",
  channel: k8sightProxyCertificateChannel,
  getHandler: (di) => {
    const k8sightProxyCertificate = di.inject(k8sightProxyCertificateInjectable).get();

    return () => ({
      cert: k8sightProxyCertificate.cert,
      public: k8sightProxyCertificate.public,
      private: "",
    });
  },
});

export default k8sightProxyCertificateRequestHandlerInjectable;

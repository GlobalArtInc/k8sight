import { getInjectable } from "@ogre-tools/injectable";
import k8sightProxyCertificateInjectable from "../../../common/certificate/k8sight-proxy-certificate.injectable";
import requestK8sightProxyCertificateInjectable from "../../certificate/request-k8sight-proxy-certificate.injectable";
import { beforeFrameStartsFirstInjectionToken } from "../tokens";

const setupK8sightProxyCertificateInjectable = getInjectable({
  id: "setup-k8sight-proxy-certificate",
  instantiate: (di) => ({
    run: async () => {
      const requestK8sightProxyCertificate = di.inject(requestK8sightProxyCertificateInjectable);
      const k8sightProxyCertificate = di.inject(k8sightProxyCertificateInjectable);

      k8sightProxyCertificate.set(await requestK8sightProxyCertificate());
    },
  }),
  injectionToken: beforeFrameStartsFirstInjectionToken,
});

export default setupK8sightProxyCertificateInjectable;

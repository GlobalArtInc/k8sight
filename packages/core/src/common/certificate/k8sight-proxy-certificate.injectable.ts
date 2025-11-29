import { getInjectable } from "@ogre-tools/injectable";

import type { SelfSignedCert } from "selfsigned";

const k8sightProxyCertificateInjectable = getInjectable({
  id: "k8sight-proxy-certificate",
  instantiate: () => {
    let certState: SelfSignedCert;
    const cert = {
      get: () => {
        if (!certState) {
          throw "certificate has not been set";
        }

        return certState;
      },
      set: (certificate: SelfSignedCert) => {
        if (certState) {
          throw "certificate has already been set";
        }

        certState = certificate;
      },
    };

    return cert;
  },
});

export default k8sightProxyCertificateInjectable;

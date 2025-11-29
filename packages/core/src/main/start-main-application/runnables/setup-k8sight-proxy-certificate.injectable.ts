import { beforeElectronIsReadyInjectionToken } from "@kubesightapp/application-for-electron-main";
import { getInjectable } from "@ogre-tools/injectable";
import { generate } from "selfsigned";
import k8sightProxyCertificateInjectable from "../../../common/certificate/k8sight-proxy-certificate.injectable";

const setupK8sightProxyCertificateInjectable = getInjectable({
  id: "setup-k8sight-proxy-certificate",

  instantiate: (di) => ({
    run: () => {
      const k8sightProxyCertificate = di.inject(k8sightProxyCertificateInjectable);

      const cert = generate(
        [
          { name: "commonName", value: "K8Sight Certificate Authority" },
          { name: "organizationName", value: "K8Sight" },
        ],
        {
          keySize: 2048,
          algorithm: "sha256",
          days: 365,
          extensions: [
            {
              name: "basicConstraints",
              cA: true,
            },
            {
              name: "subjectAltName",
              altNames: [
                { type: 2, value: "*.renderer.k8sight.app" },
                { type: 2, value: "renderer.k8sight.app" },
                { type: 2, value: "localhost" },
                { type: 7, ip: "127.0.0.1" },
              ],
            },
          ],
        },
      );

      k8sightProxyCertificate.set(cert);

      return undefined;
    },
  }),

  injectionToken: beforeElectronIsReadyInjectionToken,
});

export default setupK8sightProxyCertificateInjectable;

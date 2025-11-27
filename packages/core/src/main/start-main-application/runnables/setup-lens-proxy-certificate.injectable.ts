import { beforeElectronIsReadyInjectionToken } from "@kubesightapp/application-for-electron-main";
import { getInjectable } from "@ogre-tools/injectable";
import { generate } from "selfsigned";
import lensProxyCertificateInjectable from "../../../common/certificate/lens-proxy-certificate.injectable";

const setupLensProxyCertificateInjectable = getInjectable({
  id: "setup-lens-proxy-certificate",

  instantiate: (di) => ({
    run: () => {
      const lensProxyCertificate = di.inject(lensProxyCertificateInjectable);

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

      lensProxyCertificate.set(cert);

      return undefined;
    },
  }),

  injectionToken: beforeElectronIsReadyInjectionToken,
});

export default setupLensProxyCertificateInjectable;

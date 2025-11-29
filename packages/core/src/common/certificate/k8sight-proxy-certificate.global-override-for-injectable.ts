import { getGlobalOverride } from "@kubesightapp/test-utils";
import k8sightProxyCertificateInjectable from "./k8sight-proxy-certificate.injectable";

export default getGlobalOverride(k8sightProxyCertificateInjectable, () => {
  return {
    get: () => ({
      public: "<public-data>",
      private: "<private-data>",
      cert: "<ca-data>",
    }),
    set: () => {},
  };
});

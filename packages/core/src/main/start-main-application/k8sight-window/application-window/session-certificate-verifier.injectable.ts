import { getInjectable } from "@ogre-tools/injectable";
import { timingSafeEqual, X509Certificate } from "crypto";
import k8sightProxyCertificateInjectable from "../../../../common/certificate/k8sight-proxy-certificate.injectable";

import type { Request } from "electron";

// see https://www.electronjs.org/docs/latest/api/session#sessetcertificateverifyprocproc
export enum ChromiumNetError {
  SUCCESS = 0,
  FAILURE = -2,
  RESULT_FROM_CHROMIUM = -3,
}

export type CertificateVerificationCallback = (error: ChromiumNetError) => void;

const sessionCertificateVerifierInjectable = getInjectable({
  id: "session-certificate-verifier",
  instantiate: (di) => {
    const k8sightProxyCertificate = di.inject(k8sightProxyCertificateInjectable).get();
    const k8sightProxyX509Cert = new X509Certificate(k8sightProxyCertificate.cert);

    return (request: Request, shouldBeTrusted: CertificateVerificationCallback) => {
      const { certificate } = request;
      const cert = new X509Certificate(certificate.data);
      const shouldTrustCert =
        cert.raw.length === k8sightProxyX509Cert.raw.length && timingSafeEqual(cert.raw, k8sightProxyX509Cert.raw);

      shouldBeTrusted(shouldTrustCert ? ChromiumNetError.SUCCESS : ChromiumNetError.RESULT_FROM_CHROMIUM);
    };
  },
});

export default sessionCertificateVerifierInjectable;

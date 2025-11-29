import { getRequestChannel } from "@kubesightapp/messaging";

import type { SelfSignedCert } from "selfsigned";

export const k8sightProxyCertificateChannel = getRequestChannel<void, SelfSignedCert>("request-k8sight-proxy-certificate");

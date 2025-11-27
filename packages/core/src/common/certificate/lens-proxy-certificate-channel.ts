import { getRequestChannel } from "@kubesightapp/messaging";

import type { SelfSignedCert } from "selfsigned";

export const lensProxyCertificateChannel = getRequestChannel<void, SelfSignedCert>("request-lens-proxy-certificate");

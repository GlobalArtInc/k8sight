import { getInjectable } from "@ogre-tools/injectable";
import tls from "tls";

const caCertificatesInjectable = getInjectable({
  id: "ca-certificates",
  instantiate: () => tls.getCACertificates("default").concat(tls.getCACertificates("system")),
});

export default caCertificatesInjectable;

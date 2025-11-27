import { applicationInformationToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";

const bundledKubectlVersionInjectable = getInjectable({
  id: "bundled-kubectl-version",
  instantiate: (di) => di.inject(applicationInformationToken).bundledKubectlVersion,
});

export default bundledKubectlVersionInjectable;

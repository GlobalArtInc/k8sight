import { kubectlVersions } from "@kubesightapp/kubectl-versions";
import { getInjectable } from "@ogre-tools/injectable";
import { SemVer } from "semver";
import bundledKubectlVersionInjectable from "../../common/vars/bundled-kubectl-version.injectable";

const kubectlVersionMapInjectable = getInjectable({
  id: "kubectl-version-map",
  instantiate: (di) => {
    const bundledKubectlVersion = di.inject(bundledKubectlVersionInjectable);
    const bundledKubectlSemVer = new SemVer(bundledKubectlVersion);

    return new Map([
      ...kubectlVersions,
      [`${bundledKubectlSemVer.major}.${bundledKubectlSemVer.minor}`, bundledKubectlVersion],
    ]);
  },
});

export default kubectlVersionMapInjectable;

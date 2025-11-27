import { getInjectable } from "@ogre-tools/injectable";
import bundledBinaryPathInjectable from "../../common/utils/bundled-binary-path.injectable";

const bundledKubectlBinaryPathInjectable = getInjectable({
  id: "bundled-kubectl-binary-path",
  instantiate: (di) => di.inject(bundledBinaryPathInjectable, "kubectl"),
});

export default bundledKubectlBinaryPathInjectable;

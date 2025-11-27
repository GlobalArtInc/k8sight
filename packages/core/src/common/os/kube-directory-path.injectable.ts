import { getInjectable } from "@ogre-tools/injectable";
import path from "path";
import userInfoInjectable from "../vars/user-info.injectable";

const kubeDirectoryPathInjectable = getInjectable({
  id: "kube-directory-path",
  instantiate: (di) => {
    return path.join(di.inject(userInfoInjectable).homedir, ".kube");
  },
});

export default kubeDirectoryPathInjectable;

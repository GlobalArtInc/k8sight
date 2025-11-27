import { onLoadOfApplicationInjectionToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";
import fileSystemProvisionerStoreInjectable from "../../../extensions/extension-loader/file-system-provisioner-store/file-system-provisioner-store.injectable";

const initFileSystemProvisionerStoreInjectable = getInjectable({
  id: "init-file-system-provisioner-store",
  instantiate: (di) => ({
    run: () => {
      const store = di.inject(fileSystemProvisionerStoreInjectable);

      store.load();
    },
  }),
  injectionToken: onLoadOfApplicationInjectionToken,
});

export default initFileSystemProvisionerStoreInjectable;

import { getInjectable } from "@ogre-tools/injectable";
import discoverKubeconfigSyncKindInjectable from "./discover-sync-kind.injectable";

import type { SyncKind } from "./discover-sync-kind.injectable";

export type DiscoverAllKubeconfigSyncKinds = (filePaths: string[]) => Promise<[string, SyncKind][]>;

const discoverAllKubeconfigSyncKindsInjectable = getInjectable({
  id: "discover-all-kubeconfig-sync-kinds",
  instantiate: (di): DiscoverAllKubeconfigSyncKinds => {
    const discoverKubeconfigSyncKind = di.inject(discoverKubeconfigSyncKindInjectable);

    return (filePaths) => Promise.all(filePaths.map(discoverKubeconfigSyncKind));
  },
});

export default discoverAllKubeconfigSyncKindsInjectable;

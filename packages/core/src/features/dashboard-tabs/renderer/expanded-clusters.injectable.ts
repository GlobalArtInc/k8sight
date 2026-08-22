import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

/**
 * Which clusters are unfolded in the navigator.
 *
 * Deliberately not persisted, unlike the expansion of the sections inside a cluster. An unfolded
 * cluster is one we are connected to -- listing its pages means asking it what it serves -- so
 * restoring that across restarts would either reconnect every cluster on launch or leave the
 * navigator showing sections for connections that do not exist.
 */
const expandedClustersInjectable = getInjectable({
  id: "expanded-clusters",
  instantiate: () => observable.set<string>(),
});

export default expandedClustersInjectable;

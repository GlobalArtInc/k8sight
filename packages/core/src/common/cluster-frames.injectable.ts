import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

export interface ClusterFrameInfo {
  frameId: number;
  processId: number;
}

const clusterFramesInjectable = getInjectable({
  id: "cluster-frames",
  instantiate: () => observable.map<string, ClusterFrameInfo>(),
});

export default clusterFramesInjectable;

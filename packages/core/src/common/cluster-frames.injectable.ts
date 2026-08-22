import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

export interface ClusterFrameInfo {
  clusterId: string;
  frameId: number;
  processId: number;
}

/**
 * Identifies one frame, not one cluster.
 *
 * A cluster can be open in several tabs at once, each with its own frame, so keying by cluster id
 * would let the newest frame displace the others and quietly cut them off from broadcasts.
 */
export const clusterFrameKey = ({ processId, frameId }: Pick<ClusterFrameInfo, "processId" | "frameId">) =>
  `${processId}:${frameId}`;

const clusterFramesInjectable = getInjectable({
  id: "cluster-frames",
  instantiate: () => observable.map<string, ClusterFrameInfo>(),
});

export default clusterFramesInjectable;

/**
 * Forgets every frame belonging to a cluster.
 *
 * Callers act on a whole cluster -- disconnecting it, deleting it -- while the registry is keyed
 * per frame, and a cluster may have several.
 */
export const deleteFramesOfCluster = (frames: Map<string, ClusterFrameInfo>, clusterId: string) => {
  for (const [key, frame] of [...frames.entries()]) {
    if (frame.clusterId === clusterId) {
      frames.delete(key);
    }
  }
};
